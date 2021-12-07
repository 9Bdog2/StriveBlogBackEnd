import express from "express";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./services/authors/index.js";
import cors from "cors";
import blogPostsRouter from "./services/blogPosts/index.js";
import {
  genericHandlers,
  badRequestHandlers,
  unauthorisedHandler,
  notFoundHandlers,
} from "./errorHandlers.js";
import { loggerMiddleware } from "./middlewares.js";
import { join } from "path";

const server = express();

const port = 3001;

const srcFolderPath = join(process.cwd(), "src");

//------------------- MIDDLEWARES-------------------
server.use(express.static(srcFolderPath));
server.use(loggerMiddleware);
server.use(cors());
server.use(express.json());
//------------------- MIDDLEWARES-------------------
//------------------- ENDPOINTS-------------------
server.use("/authors", authorsRouter);
server.use("/blogPosts", blogPostsRouter);
//------------------- ENDPOINTS-------------------

//------------------- Error Handlers-------------------
server.use(genericHandlers);
server.use(badRequestHandlers);
server.use(unauthorisedHandler);
server.use(notFoundHandlers);
//------------------- Error Handlers-------------------

//-------------------List endpoints-------------------
console.log(listEndpoints(server));
//-------------------List endpoints-------------------

//-------------------Establish server connection-------------------
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//-------------------Establish server connection-------------------
