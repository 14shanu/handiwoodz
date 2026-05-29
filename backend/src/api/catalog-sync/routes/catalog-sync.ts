export default {
  routes: [
    {
      method: 'POST',
      path: '/catalog-sync',
      handler: 'catalog-sync.sync',
      config: {
        auth: false,
      },
    },
  ],
};
