const getPluginService = require('../utils/getPluginService');

module.exports = () => ({
  'update': async (userId, newPassword) => {
    await getPluginService('user').edit(userId, {
      resetPasswordToken: null,
      password: newPassword,
    });
  }
});
