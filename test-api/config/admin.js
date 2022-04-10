module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'b708316b5328c1d25e5869480e26627a'),
  },
});
