const express = require("express");
const db = require("../database");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();


// ======================
// BUY API
// ======================

router.post(
    "/buy",
    verifyToken,

    (req, res) => {

        const { metal_type, amount } = req.body;

        const userId = req.user.id;

        if (!metal_type || !amount) {

            return res.status(400).json({
                message: "Metal Type and Amount Required"
            });

        }

        db.get(
            `
            SELECT current_price
            FROM live_prices
            WHERE metal_type=?
            `,
            [metal_type],

            (err, priceRow) => {

                if (err) {

                    return res.status(500).json({
                        message: "Database Error"
                    });

                }

                if (!priceRow) {

                    return res.status(404).json({
                        message: "Metal Not Found"
                    });

                }

                const quantity =
                    amount / priceRow.current_price;

                const totalAmount = amount;

                // Save Transaction

                db.run(
                    `
                    INSERT INTO transactions
                    (
                        user_id,
                        metal_type,
                        transaction_type,
                        quantity,
                        price,
                        total_amount
                    )
                    VALUES(?,?,?,?,?,?)
                    `,
                    [
                        userId,
                        metal_type,
                        "BUY",
                        quantity,
                        priceRow.current_price,
                        totalAmount
                    ]
                );

                // Check Existing Holding

                db.get(
                    `
                    SELECT *
                    FROM holdings
                    WHERE user_id=?
                    AND metal_type=?
                    `,
                    [userId, metal_type],

                    (err, existingHolding) => {

                        if (existingHolding) {

                            const newQuantity =
                                existingHolding.quantity +
                                quantity;

                            db.run(
                                `
                                UPDATE holdings
                                SET quantity=?
                                WHERE id=?
                                `,
                                [
                                    newQuantity,
                                    existingHolding.id
                                ]
                            );

                        }
                        else {

                            db.run(
                                `
                                INSERT INTO holdings
                                (
                                    user_id,
                                    metal_type,
                                    quantity,
                                    average_price
                                )
                                VALUES(?,?,?,?)
                                `,
                                [
                                    userId,
                                    metal_type,
                                    quantity,
                                    priceRow.current_price
                                ]
                            );

                        }

                        res.json({

                            message:
                                "Purchase Successful",

                            quantity

                        });

                    }

                );

            }

        );

    }

);


// ======================
// SELL API
// ======================

router.post(
    "/sell",
    verifyToken,

    (req, res) => {

        const {
            metal_type,
            quantity
        } = req.body;

        const userId = req.user.id;

        if (!metal_type || !quantity) {

            return res.status(400).json({
                message:
                    "Metal Type and Quantity Required"
            });

        }

        db.get(
            `
            SELECT *
            FROM holdings
            WHERE user_id=?
            AND metal_type=?
            `,
            [userId, metal_type],

            (err, holding) => {

                if (err) {

                    return res.status(500).json({
                        message:
                            "Database Error"
                    });

                }

                if (
                    !holding ||
                    holding.quantity < quantity
                ) {

                    return res.status(400).json({
                        message:
                            "Insufficient Holdings"
                    });

                }

                db.get(
                    `
                    SELECT current_price
                    FROM live_prices
                    WHERE metal_type=?
                    `,
                    [metal_type],

                    (err, priceRow) => {

                        if (!priceRow) {

                            return res.status(404).json({
                                message:
                                    "Metal Not Found"
                            });

                        }

                        const saleValue =
                            quantity *
                            priceRow.current_price;

                        const newQty =
                            holding.quantity -
                            quantity;

                        // Update Holdings

                        db.run(
                            `
                            UPDATE holdings
                            SET quantity=?
                            WHERE id=?
                            `,
                            [
                                newQty,
                                holding.id
                            ]
                        );

                        // Save Transaction

                        db.run(
                            `
                            INSERT INTO transactions
                            (
                                user_id,
                                metal_type,
                                transaction_type,
                                quantity,
                                price,
                                total_amount
                            )
                            VALUES(?,?,?,?,?,?)
                            `,
                            [
                                userId,
                                metal_type,
                                "SELL",
                                quantity,
                                priceRow.current_price,
                                saleValue
                            ]
                        );

                        res.json({

                            message:
                                "Sell Successful",

                            saleValue

                        });

                    }

                );

            }

        );

    }

);

module.exports = router;