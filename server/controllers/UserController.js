const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} = require("firebase/auth");

const { auth } = require("../libs/firebase");

const addUser = async (req, res) => {
    try {
        const body = req.body;
        const { email, password, confirmPassword } = body;

        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                // save refreshToken to cookie
                let refreshToken = user?.stsTokenManager.refreshToken;
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.status(201).json({ message: "User created successfully", user });
            })
            .catch((error) => {
                const errorMessage = error.message;
                res
                    .status(500)
                    .json({ message: "Error creating user", error: errorMessage });
            });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error adding data", error: error.message });
    }
};

const loginWithCredentials = async (req, res) => {
    try {
        const body = req.body;
        const { email, password } = body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        // save refreshToken to cookie
        let refreshToken = user?.stsTokenManager.refreshToken;
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 10000,
        });

        res.status(200).json({ message: "User logged in successfully", user });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error adding data", error: error.message });
    }
};
const currentUser = async (req, res) => {
    try {
        let refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        auth.onAuthStateChanged((user) => {
            if (user) {
                res.status(200).json({ message: "User logged in successfully", user });
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error adding data", error: error.message });
    }
};

const logout = async (req, res) => {
    try {
        let refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        auth
            .signOut()
            .then(() => {
                res.clearCookie("refreshToken");
                res.status(200).json({ message: "User logged out successfully" });
            })
            .catch((error) => {
                res
                    .status(500)
                    .json({ message: "Error adding data", error: error.message });
            });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error adding data", error: error.message });
    }
};

module.exports = { addUser, loginWithCredentials, currentUser, logout};