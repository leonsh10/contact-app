import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import contactRoute from "./api/routes/contact";
import genericErrorHandler from "./api/middlewares/genericErrorHandler";
import errorHandler from "./api/middlewares/errorHandler";

mongoose.connect("mongodb://localhost:27017/contact-app").then(() =>{
    console.log("Mongodb is connected, port:27017");
});

const app = express();

const port = process.env.port || 3001;

app.use(
    cors({
        origin: "*",
    })
);

app.use(helmet());

app.use(express.json());

app.use("/contact", contactRoute);

app.use(errorHandler);
app.use(genericErrorHandler);

app.listen(port, () =>{
    console.log(`Contact app listening on ${port}`);
})