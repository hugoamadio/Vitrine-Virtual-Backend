import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import AuthRequest from "../middlewares/AuthRequest";

const routes = () => {
  const router = Router();
  const categoryController = new CategoryController()

  router.post("/", AuthRequest, categoryController.create);
  router.get("/", categoryController.list)
  router.put("/:id", categoryController.update)
  router.delete("/:id", categoryController.delete)

  return router;
};

export default routes;
