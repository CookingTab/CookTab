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


module.exports = {
    getAllBookmark,
    getBookmarkById
};
