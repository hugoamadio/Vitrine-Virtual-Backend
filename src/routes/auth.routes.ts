import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const routes = () => {
  const router = Router();
  const authController = new AuthController;

  router.post("/", authController.login);

  return router;
};

export default routes;
