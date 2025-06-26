import express from "express";
import { create, deletUser, getAll, getOne, Login, Logout, Registration, update } from "../controller/userController.js";

const route = express.Router();

route.post("/register",Registration)
route.post("/login", Login);
route.post("/logout", Logout);

route.post("/create", create);
route.get("/getAll",getAll);
route.get("/getone/:id",getOne);
route.put("/update/:id", update)
route.delete("/delete/:id", deletUser);

export default route;