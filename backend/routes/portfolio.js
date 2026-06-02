const express = require("express");
const db = require("../database");

const verifyToken =
require("../middleware/authMiddleware");

const router = express.Router();


// USER HOLDINGS

router.get(
    "/portfolio",
    verifyToken,

    (req, res) => {

        const userId = req.user.id;

        db.all(
            `
            SELECT *
            FROM holdings
            WHERE user_id=?
            `,
            [userId],

            (err, rows) => {

                if (err) {

                    return res.status(500).json({
                        message:
                        "Database Error"
                    });

                }

                res.json(rows);

            }
        );

    }
);


// USER TRANSACTIONS

router.get(
    "/transactions",
    verifyToken,

    (req, res) => {

        const userId = req.user.id;

        db.all(
            `
            SELECT *
            FROM transactions
            WHERE user_id=?
            ORDER BY created_at DESC
            `,
            [userId],

            (err, rows) => {

                if (err) {

                    return res.status(500).json({
                        message:
                        "Database Error"
                    });

                }

                res.json(rows);

            }
        );

    }
);

module.exports = router;