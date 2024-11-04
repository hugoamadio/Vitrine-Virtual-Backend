import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import AuthRequest from "../middlewares/AuthRequest";

const routes = () => {
  const router = Router();
  const categoryController = new CategoryController()

  router.post("/", AuthRequest, categoryController.create);
  router.get("/", AuthRequest, categoryController.list)
  router.put("/:id", AuthRequest ,categoryController.update)
  router.delete("/:id", AuthRequest, categoryController.delete)

  return router;
};

export default routes;
