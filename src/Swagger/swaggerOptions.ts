import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Brand API",
      version: "1.0.0",
    },
  },
  apis: ["./src/Routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export default specs;
