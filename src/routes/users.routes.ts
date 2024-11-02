import { Router } from "express";
import UserController from "../controllers/user.controller";

const routes = () => {
  const router = Router();
  const usersController = new UserController();

  router.post("/", usersController.create);
  router.get("/", usersController.list)
  router.put("/:id", usersController.update)
  router.delete("/:id", usersController.deleteUser)

  return router;
};

export default routes;
