module.exports = {
  swagger: "3.0",
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: "EG - API",
      version: "1.0.0",
      description: "Node API - Estamos Grávidos. Cybernetic Group"
    },
    basePath: "/",
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "bearer",
        in: "header"
      }
    },
    tags: [
      { name: "Pregnants", description: "API's relacionadas as gestantes" },
      {
        name: "HealthcareProfessionals",
        description: "API's relacionadas aos profissionais de saúde"
      },
      { name: "Partners", description: "API's relacionadas aos acompanhantes" },
      { name: "Clinics", description: "API's relacionadas as clínicas" },
      { name: "Babies", description: "API's relacionadas aos bebês" }
    ]
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: [
    `${__dirname}/../app/models/*.js`,
    `${__dirname}/../app/models/**/*.js`,
    `${__dirname}/../app/controllers/*.js`,
    `${__dirname}/../app/utils/*.js`
  ]
};
