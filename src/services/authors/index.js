import express from "express";
import fs from "fs";
import uniqid from "uniqid";
import {
  getAuthors,
  writeAuthors,
  saveAuthorsAvatar,
} from "../../lib/fs-tools.js";
import createHttpError from "http-errors";
import multer from "multer";

const authorsRouter = express.Router();
//------------------- File Path as no DB connection-------------------

/* const currentFilePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(currentFilePath);
const authorsJSONPath = join(currentFolderPath, "authors.json");

const blogPostsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../blogPosts/blogPosts.json"
); */

/* const getBlogPosts = () => JSON.parse(fs.readFileSync(blogPostsJSONPath)); */
//--------------------------------------
/* 
name
surname
ID (Unique and server-generated)
email
date of birth
avatar (e.g. https://ui-avatars.com/api/?name=John+Doe) 
*/
//------------------- ENDPOINTS-------------------

authorsRouter.get("/", async (req, res, next) => {
  try {
    /* const fileContent = fs.readFileSync(authorsJSONPath);
    const authors = JSON.parse(fileContent); */
    const authors = await getAuthors();
    res.status(201).send(authors);
  } catch (error) {
    next(error);
  }
});

authorsRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = {
      ...req.body,
      createdAt: new Date(),
      id: uniqid(),
      avatar: req.body.avatar,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
    };
    /* const authors = JSON.parse(fs.readFileSync(authorsJSONPath)); */
    const authors = await getAuthors();
    authors.push(newAuthor);
    /* fs.writeFileSync(authorsJSONPath, JSON.stringify(authors)); */
    await writeAuthors(authors);
    authors.forEach((author) => {
      if (author.email === req.body.email) {
        res.status(400).send({ error: "E-mail already in use" });
      } else {
        res.status(201).send({ id: author.id });
      }
    });
  } catch (error) {
    next(error);
  }
});

authorsRouter.get("/:authorId", async (req, res, next) => {
  try {
    /* const fileContent = fs.readFileSync(authorsJSONPath);
    const authors = JSON.parse(fileContent); */
    const authors = await getAuthors();
    const author = authors.find((author) => author.id === req.params.authorId);
    res.status(200).send(author);
  } catch (error) {
    next(error);
  }
});

authorsRouter.put("/:authorId", async (req, res, next) => {
  try {
    /* const fileContent = fs.readFileSync(authorsJSONPath);
    const author = JSON.parse(fileContent); */
    const author = await getAuthors();
    const authorIndex = author.findIndex(
      (author) => author.id === req.params.authorId
    );
    author[authorIndex] = {
      ...author[authorIndex],
      ...req.body,
      updatedAt: new Date(),
    };
    /* fs.writeFileSync(authorsJSONPath, JSON.stringify(author)); */
    await writeAuthors(author);
    res.status(200).send(author[authorIndex]);
  } catch (error) {
    next(error);
  }
});

authorsRouter.delete("/:authorId", async (req, res, next) => {
  try {
    /* const fileContent = fs.readFileSync(authorsJSONPath);
    const author = JSON.parse(fileContent); */
    const author = await getAuthors();
    const newAuthor = author.filter(
      (author) => author.id !== req.params.authorId
    );
    /* fs.writeFileSync(authorsJSONPath, JSON.stringify(newAuthor)); */
    await writeAuthors(newAuthor);
    res
      .status(204)
      .send(`Author ${req.body.name} ${req.body.surname} was deleted`);
  } catch (error) {
    next(error);
  }
});

/*Extra 
GET /authors/:id/blogPosts/ => get all the posts for an author with a given ID
*/

authorsRouter.get("/:authorId/blogPosts", async (req, res, next) => {
  try {
    const blogPosts = await getBlogPosts();
    const authorBlogPosts = blogPosts.filter(
      (blogPost) => blogPost.author._id === req.params.authorId
    );
    res.status(200).send(authorBlogPosts);
  } catch (error) {
    next(error);
  }
});

/* 
POST /authors/:id/uploadAvatar, uploads a picture
 (save as idOfTheAuthor.png in the public/img/authors folder) for the author specified by the id. 
 Store the newly created URL into the corresponding author in authors.json
*/
const uploadFile = multer({
  fileFilter: (req, file, multerNext) => {
    if (file.mimetype !== "image/png") {
      multerNext(createHttpError(400, "Wrong file type"));
    } else {
      multerNext(null, true);
    }
  },
}).single("avatar");

authorsRouter.post(
  "/:authorId/uploadAvatar",
  uploadFile,
  async (req, res, next) => {
    try {
      console.log("The File : ", req.file);
      await saveAuthorsAvatar(req.params.authorId, req.file.buffer);
      // modify user record by adding/editing avatar field

      // 1. get author
      const authors = await getAuthors();
      // 2. find specific author by id
      const author = authors.find(
        (author) => author.id === req.params.authorId
      );
      // 3. add/edit cover field
      author.avatar = req.params.uploadAvatar;
      console.log(author);
      // 4. save author back into authors.json
      /* await writeAuthors(author); */
      res.status(201).send("The Avatar has been posted");
    } catch (error) {
      next(error);
    }
  }
);

export default authorsRouter;
