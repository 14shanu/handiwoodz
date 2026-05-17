export default {
  routes: [
    {
      method: 'POST',
      path: '/cloudinary-sync',
      handler: 'cloudinary-sync.sync',
      config: {
        auth: false,
      },
    },
  ],
};
