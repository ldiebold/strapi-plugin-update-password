module.exports = {
  api: {
    type: 'content-api',
    routes: [
      {
        method: 'PUT',
        path: '/',
        handler: 'updatePasswordController.update',
        config: {
          middlewares: ['plugin::update-password.validate-update-password-request'],
          policies: [],
        },
      },
    ]
  }
};
