import express from "express";
import userController from "../controller/user-controller.js";
import geckoController from "../controller/gecko-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// Gecko API
userRouter.post("/api/geckos", geckoController.create);
userRouter.get("/api/geckos/:geckoId", geckoController.get);
userRouter.put("/api/geckos/:geckoId", geckoController.update);
userRouter.get("/api/geckos/", geckoController.search);
userRouter.delete("/api/geckos/:geckoId", geckoController.remove);

export { userRouter };
