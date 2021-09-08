"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

const GUEST_ID = 3;

module.exports = {
  async place(ctx) {
    const {
      shippingAddress,
      billingAddress,
      shippingInfo,
      billingInfo,
      shippingOption,
      subtotal,
      tax,
      total,
      items,
    } = ctx.request.body;

    const orderCustomer = ctx.state.user ? ctx.state.user.id : GUEST_ID;
    const shippingOptions = [
      { label: "Free shipping", price: 0 },
      { label: "2 day shipping", price: 9.99 },
      { label: "Overnight shipping", price: 29.99 },
    ];
    let serverTotal = 0;
    const unavailable = [];

    await Promise.all(
      items.map(async (clientItem) => {
        const serverItem = await strapi.services.variant.findOne({
          id: clientItem.variant.id,
        });

        if (serverItem.qty < clientItem.qty) {
          unavailable.push({ id: serverItem.id, qty: serverItem.qty });
        } else {
          await strapi.services.variant.update(
            { id: clientItem.variant.id },
            { qty: serverItem.qty - clientItem.qty }
          );
        }
        serverTotal += serverItem.price * clientItem.qty;
      })
    );

    const shippingValid = shippingOptions.find(
      (option) =>
        option.label === shippingOption.label &&
        option.price === shippingOption.price
    );

    if (
      !shippingValid ||
      (serverTotal * 1.21 + shippingValid.price).toFixed(2) !== total
    ) {
      ctx.send({ error: "Invalid Cart" }, 400);
    } else if (unavailable.length > 0) {
      ctx.send({ unavailable }, 409);
    } else {
      let order = await strapi.services.order.create({
        shippingAddress,
        billingAddress,
        shippingInfo,
        billingInfo,
        shippingOption,
        subtotal,
        tax,
        total,
        items,
        user: orderCustomer,
      });

      order = sanitizeEntity(order, { model: strapi.models.order });

      if (order.user.username === "Guest") {
        order.user = { username: "Guest" };
      }

      ctx.send({ order }, 200);
    }
  },
};
