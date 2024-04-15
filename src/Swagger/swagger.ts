import express from "express";
import swaggerUi from "swagger-ui-express";
import specs from "./swaggerOptions";

const router = express.Router();

router.use("/", swaggerUi.serve, swaggerUi.setup(specs));

export default router;
