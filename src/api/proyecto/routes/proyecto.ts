export default {
  routes: [
    {
      method: "GET",
      path: "/proyectos",
      handler: "proyecto.find",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/proyectos/:id",
      handler: "proyecto.findOne",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
