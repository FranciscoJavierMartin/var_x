"use strict";

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

const stripe = require("stripe")(process.env.STRIPE_SK);

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  "0 9 * * *": async (date) => {
    const subscriptions =
      await SVGAnimatedPreserveAspectRatio.services.subscriptions.find({
        next_delivery: new Date(),
      });

    await Promise.allSettled(
      subscriptions.map(async (subscription) => {
        const paymentMethods = await stripe.paymentMethods.list({
          customer: subscription.user.stripeID,
          type: "card",
        });

        const paymentMethod = paymentMethods.data.find(
          (method) => method.card.last4 === subscription.paymentMethod.last4
        );

        try {
          const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(subscription.variant.price * 1.21 * 100),
            currency: "usd",
            customer: subscription.user.stripeID,
            payment_method: paymentMethod.id,
            off_session: true,
            confirm: true,
          });

          const order = await strapi.services.order.create({
            shippingAddress: subscription.shippingAddress,
            billingAddress: subscription.billingAddress,
            shippingInfo: subscription.shippingInfo,
            billingInfo: subscription.billingInfo,
            shippingOption: { label: "subscription", price: 0 },
            subtotal: subscription.variant.price,
            total: subscription.variant.price * 1.21,
            tax: subscription.variant.price * 0.21,
            items: [
              {
                variant: subscription.variant,
                name: subscription.name,
                qty: subscription.quantity,
                stock: subscription.variant.qty,
                product: subscription.variant.product,
              },
            ],
            transaction: paymentIntent.id,
            paymentMethod: subscription.paymentMethod,
            user: subscription.user.id,
            subscription: subscription.id,
          });

          const frequencies = await strapi.services.order.frequency();
          const confirmation = await strapi.services.order.confirmationEmail(
            order
          );

          await strapi.plugins["email"].services.email.send({
            to: subscription.billingInfo.email,
            subject: "VAR-X Order confirmation",
            html: confirmation,
          });

          const frequency = frequencies.find(
            (option) => option.value === subscription.frequency
          );

          await strapi.services.subscription.update(
            { id: subscription.id },
            {
              next_delivery: frequency.delivery(),
              last_delivery: new Date(),
            }
          );
        } catch (error) {
          console.log(error);
        }
      })
    );
  },
};
