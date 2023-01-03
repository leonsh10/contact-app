import express from "express";
import contact from "../controllers/contact";
import contactController from "../controllers/contact";

const contactRoute = express.Router();

contactRoute.get("/list", contactController.list);

contactRoute.route("/:id").get(contactController.get);

contactRoute.route("/create").post(contactController.post);

contactRoute.route("/update").put(contactController.put);

contactRoute.route("/delete/:id").delete(contactController.delete);

export default contactRoute;