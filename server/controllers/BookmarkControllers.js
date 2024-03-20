const { db } = require("../libs/firebase");

const getAllBookmark = async (req, res) => {
    try {
        const snapshot = await db.collection("bookmarks").get();
        const data = snapshot.docs.map((doc) => doc.data());
        res.status(200).json({ message: "Data retrieved successfully", data });
    } catch (error) {
        console.error("Error getting bookmarks:", error);
        res
            .status(500)
            .json({ error: "Failed to get bookmarks: " + error.message });
    }
};

const getBookmarkById = async (req, res) => {
    const id = req.params.id;
    try {
        const doc = await db.collection("bookmarks").doc(id).get();
        if (doc.exists) {
            res.status(200).json(doc.data());
        } else {
            res.status(404).json({ error: "Bookmark not found" });
        }
    } catch (error) {
        console.error("Error getting bookmarks:", error);
        res
            .status(500)
            .json({ error: "Failed to get bookmarks: " + error.message });
    }
};

const updateBookmark = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
        await db.collection("bookmarks").doc(id).update(data);
        res.status(200).json({ message: "Data updated successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error updating data", error: error.message });
    }
};

const deleteBookmark = async (req, res) => {
    const id = req.params.id;

    try {
        await db.collection("bookmarks").doc(id).delete();
        res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error deleting data", error: error.message });
    }
};

const addBookmark = async (req, res) => {
    const data = req.body;

    try {
        const docRef = await db.collection("bookmarks").add(data);
        res.status(201).json({ message: "Data added successfully", id: docRef.id });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error adding data", error: error.message });
    }
};

const getByUserIdAndRecipeId = async (req, res) => {
    try {
        const { id_user, id_recipe } = req.query
        const doc = await db
        .collection("bookmarks")
        .where("id_recipe", "==", id_recipe)
        .where("id_user", "==", id_user)
        .get()
    if (doc.exist) {
        res.status(200).json(doc.data())
    } else {
        res.status(404).json({ error: "Bookmark not found"})
    }
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error adding data", error: error.message })
    }
}

module.exports = {
    getAllBookmark,
    getBookmarkById,
    updateBookmark,
    deleteBookmark,
    addBookmark,
    getByUserIdAndRecipeId
};
