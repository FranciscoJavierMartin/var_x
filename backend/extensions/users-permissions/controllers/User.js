const { sanitizeEntity } = require("strapi-utils");

const sanitizeUser = (user) =>
  sanitizeEntity(user, {
    model: strapi.query("user", "users-permissions").model,
  });

module.exports = {
  async setSettings(ctx) {
    const { id, contactInfo, locations } = ctx.state.user;
    const { details, detailSlot, location, locationSlot } = ctx.request.body;

    let newInfo = [...contactInfo];
    let newLocations = [...locations];

    if (typeof details !== "undefined" && typeof detailSlot !== "undefined") {
      newInfo[detailSlot] = details;
    } else if (
      typeof details === "undefined" &&
      typeof detailSlot !== "undefined"
    ) {
      newInfo[detailSlot] = { name: "", email: "", phone: "" };
    }

    if (
      typeof location !== "undefined" &&
      typeof locationSlot !== "undefined"
    ) {
      newLocations[locationSlot] = location;
    } else if (
      typeof location === "undefined" &&
      typeof locationSlot !== "undefined"
    ) {
      newInfo[locationSlot] = { street: "", city: "", zip: "", state: "" };
    }

    let newUser = await strapi.plugins["users-permissions"].services.user.edit(
      { id },
      { contactInfo: newInfo, locations: newLocations }
    );

    newUser = sanitizeUser(newUser);

    ctx.send(newUser, 200);
  },
  async changePassword(ctx) {
    const { id } = ctx.state.user;
    const { password } = ctx.request.body;

    const newUser = await strapi.plugins[
      "users-permissions"
    ].services.user.edit({ id }, { password });

    ctx.send("Password changed successfully", 200);
  },
};
