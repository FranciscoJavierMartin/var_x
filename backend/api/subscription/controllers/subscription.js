"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async userSubscriptions(ctx) {
    const subscriptionsFromServer = await strapi.services.subscription.find({
      user: ctx.state.user.id,
    });
    const subscriptions = subscriptionsFromServer.map((subscription) => {
      delete subscription.user;
      return sanitizeEntity(subscription, {
        model: strapi.models.subscription,
      });
    });

    ctx.send(subscriptions, 200);
  },
};
