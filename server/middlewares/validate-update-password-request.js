'use strict';

const formatValidationError = require('../utils/formatValidationError');
const getPluginService = require('../utils/getPluginService');

function ValidationException (message, path) {
  this.message = message;
  this.name = 'ValidationError';
  this.path = path;
  this.formattedForResponse = formatValidationError(message, 'ValidationError', path);
}

function validatePassword (password) {
  if (!password) {
    throw new ValidationException(
      'The "password" field is required.',
      ['password'],
    );
  }
}

function validateNewPassword (newPassword) {
  if (!newPassword) {
    throw new ValidationException(
      'The "new password" field is required.',
      ['newPassword'],
    );
  }
}

function validatePasswordConfirmation (passwordConfirmation) {
  if (!passwordConfirmation) {
    throw new ValidationException(
      'The "password confirmation" field is required.',
      ['passwordConfirmation'],
    );
  }
}

function validatePasswordsMatch (newPassword, confirmPassword) {
  if (newPassword !== confirmPassword) {
    throw new ValidationException(
      'New Passwords do not match.',
      ['passwordConfirmation'],
    );
  }
}

async function findUserOrFail (ctx) {
  const query = { provider: 'local' };

  /**
   * TODO: Allow changing of identifier in config
   */
  query.id = ctx.state.user.id;

  const user = await strapi.query('plugin::users-permissions.user')
    .findOne({ where: query });

  if(user) {
    return user;
  } else {
    throw new ValidationException(
      'Unable to identify the user.',
      [],
    );
  }
}

async function validateOriginalPassword (originalPassword, user) {
  const validPassword = await getPluginService('user').validatePassword(
    originalPassword,
    user.password
  );

  if (!validPassword) {
    throw new ValidationException(
      'Identifier or password invalid.',
      ['password'],
    );
  }
}

module.exports = (config) => {
  return async (ctx, next) => {
    const params = ctx.request.body;
    try {
      const user = await findUserOrFail(ctx, config.identifier);
      await validateOriginalPassword(params.password, user);
      validatePassword(params.password);
      validateNewPassword(params.newPassword);
      validatePasswordConfirmation(params.confirmPassword);
      validatePasswordsMatch(params.newPassword, params.confirmPassword);
    } catch (error) {
      ctx.response.status = 400
      return ctx.response.body = {
        data: null,
        error: {
          details: {
            errors: error.formattedForResponse
          },
          message: 'ValidationError',
          name: 'ValidationError',
          status: 400
        }
      }
    }

    await next();
  };
};
