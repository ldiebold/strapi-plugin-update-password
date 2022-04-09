module.exports = {
  api: {
    type: 'content-api',
    routes: [
      {
        method: 'PUT',
        path: '/',
        handler: 'changePasswordController.change',
        config: {
          middlewares: ['plugin::change-password.validate-change-password-request'],
          policies: [],
        },
      },
    ]
  }
};
