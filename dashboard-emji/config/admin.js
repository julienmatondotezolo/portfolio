module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'b5a7158fbc0bbf4b5b73fc359338fe65'),
  },
});
