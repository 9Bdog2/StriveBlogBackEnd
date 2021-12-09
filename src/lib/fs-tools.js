import fs from "fs-extra";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const { writeJSON, readJSON, writeFile, createReadStream } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const authorsPublicFolderPath = join(process.cwd(), "./src/img/authors");
const blogPostsPublicFolderPath = join(process.cwd(), "./src/img/blogPosts");
/*
 console.log("DATA FOLDER PATH:", dataFolderPath);
 console.log("AUTHORS PUBLIC FOLDER PATH:", blogPostsPublicFolderPath); 
 console.log("AUTHORS PUBLIC FOLDER PATH:", authorsPublicFolderPath);
 */

const blogPostsJSONPath = join(dataFolderPath, "blogPosts.json");
const authorsJSONPath = join(dataFolderPath, "authors.json");

export const getBlogPosts = () => readJSON(blogPostsJSONPath);
export const writeBlogPosts = (content) =>
  writeJSON(blogPostsJSONPath, content);

export const getAuthors = () => readJSON(authorsJSONPath);
export const writeAuthors = (content) => writeJSON(authorsJSONPath, content);

export const saveAuthorsAvatar = (filename, contentAsBuffer) =>
  writeFile(join(authorsPublicFolderPath, filename), contentAsBuffer);
export const saveBlogPostCover = (filename, contentAsBuffer) =>
  writeFile(join(blogPostsPublicFolderPath, filename), contentAsBuffer);

export const getBlogPostsPdf = () => createReadStream(blogPostsJSONPath);
export const getCSVReadableStream = () => createReadStream(blogPostsJSONPath);
