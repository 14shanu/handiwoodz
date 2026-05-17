export default {
  routes: [
    {
      method: 'POST',
      path: '/bulk-import',
      handler: 'bulk-import.import',
      config: {
        auth: false,
      },
    },
  ],
};
