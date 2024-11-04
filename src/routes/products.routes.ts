import { Router } from "express";
import ProductsController from "../controllers/products.controller";
import AuthRequest from "../middlewares/AuthRequest";


const routes = () => {
  const router = Router();
  const productsController = new ProductsController();

  router.post("/", AuthRequest, productsController.create);
  router.get("/", productsController.list)
  router.get("/:id", productsController.show)
  router.put("/:id", AuthRequest, productsController.update)
  router.delete("/:id", AuthRequest, productsController.delete)

  return router;
};

export default routes;
