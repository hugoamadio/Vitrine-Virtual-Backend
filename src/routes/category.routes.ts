import { Router } from "express";
import CategoryController from "../controllers/category.controller";

const routes = () => {
  const router = Router();
  const categoryController = new CategoryController()

  router.post("/", categoryController.create);
  // router.get("/", usersController.list)
  // router.put("/:id", usersController.update)
  // router.delete("/:id", usersController.deleteUser)

  return router;
};

export default routes;
