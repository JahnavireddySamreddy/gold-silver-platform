const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();


// =====================
// REGISTER
// =====================

router.post("/register", async (req, res) => {

    console.log("BODY RECEIVED:", req.body);

    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {

        return res.status(400).json({
            message: "All fields required"
        });

    }

    try {

        const hashedPassword =
            await bcrypt.hash(password, 10);

        db.run(
            `
            INSERT INTO users
            (name, email, password)
            VALUES (?, ?, ?)
            `,
            [
                name,
                email,
                hashedPassword
            ],

            function (err) {

                if (err) {

                    console.log("Register Error:", err);

                    return res.status(400).json({
                        message: "Email already exists"
                    });

                }

                res.status(201).json({
                    message: "User Registered Successfully"
                });

            }
        );

    }
    catch (error) {

        console.log("Server Error:", error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// =====================
// LOGIN
// =====================

router.post("/login", (req, res) => {

    const { email, password } = req.body || {};

    if (!email || !password) {

        return res.status(400).json({
            message: "Email and Password are required"
        });

    }

    db.get(
        `
        SELECT * FROM users
        WHERE email = ?
        `,
        [email],

        async (err, user) => {

            if (err) {

                return res.status(500).json({
                    message: "Database Error"
                });

            }

            if (!user) {

                return res.status(401).json({
                    message: "Invalid Credentials"
                });

            }

            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isMatch) {

                return res.status(401).json({
                    message: "Invalid Credentials"
                });

            }
            console.log("LOGIN SECRET:",process.env.JWT_SECRET);
            const token = jwt.sign(

                {
                    id: user.id,
                    email: user.email
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "1d"
                }

            );

            res.json({

                message: "Login Successful",

                token,

                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }

            });

        }

    );

});


// =====================
// LOGOUT
// =====================

router.post("/logout", (req, res) => {

    res.json({
        message: "Logout Successful"
    });

});


// =====================
// PROFILE (PROTECTED)
// =====================

router.get(
    "/profile",
    verifyToken,

    (req, res) => {

        res.json({

            message: "Protected Route Accessed",

            user: req.user

        });

    }
);

module.exports = router;