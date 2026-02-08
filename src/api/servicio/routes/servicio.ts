export default {
  routes: [
    {
      method: "GET",
      path: "/servicios",
      handler: "servicio.find",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/servicios/:id",
      handler: "servicio.findOne",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
