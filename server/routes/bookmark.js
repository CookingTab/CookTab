const express = require("express");
const {
    getAllBookmark,
    updateBookmark,
    deleteBookmark,
    addBookmark,
    getBookmarkById,
    getByUserIdAndRecipeId,
} = require("../controllers/BookmarkControllers");
const bookmarkRouter = express.Router();

bookmarkRouter.post("/", addBookmark);
bookmarkRouter.get("/", getAllBookmark);
bookmarkRouter.get("/:id", getBookmarkById);
bookmarkRouter.put("/:id", updateBookmark);
bookmarkRouter.post("/delete/:id", deleteBookmark);
bookmarkRouter.get("/getbyid", getByUserIdAndRecipeId);

module.exports = bookmarkRouter;
