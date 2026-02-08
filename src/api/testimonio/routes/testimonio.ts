export default {
  routes: [
    {
      method: "GET",
      path: "/testimonios",
      handler: "testimonio.find",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/testimonios/:id",
      handler: "testimonio.findOne",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
