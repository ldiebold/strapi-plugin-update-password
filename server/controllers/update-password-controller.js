'use strict';

const sanitizeUser = require('../helpers/sanitize-user');

module.exports = {
  update: async ctx => {
    const { auth, user } = ctx.state;

    strapi.plugin('update-password')
      .service('update-password')
      .update(user.id, ctx.request.body.newPassword);

    // Return new jwt token
    ctx.send({
      jwt: strapi.service('plugin::users-permissions.jwt').issue({
        id: user.id,
      }),
      user: sanitizeUser(user, auth),
    });

  },
};
