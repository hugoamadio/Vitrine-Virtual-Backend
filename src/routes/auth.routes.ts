import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const routes = () => {
  const router = Router();
  const usersController = new AuthController;

  router.post("/", usersController.login);

  return router;
};

export default routes;
