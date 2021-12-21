module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ebf24e46b2d937c1d011595da92fa9d6'),
  },
});
