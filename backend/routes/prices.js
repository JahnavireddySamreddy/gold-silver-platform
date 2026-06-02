const express = require("express");
const db = require("../database");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();


// GET LIVE PRICES

router.get("/prices", (req, res) => {

    db.all(
        `SELECT * FROM live_prices`,
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({ message: "Database Error" });
            }

            res.json(rows);
        }
    );

});


// UPDATE PRICE (Admin)

router.put("/prices", verifyToken, (req, res) => {

    const { metal_type, price } = req.body;

    if (!metal_type || !price) {
        return res.status(400).json({ message: "metal_type and price required" });
    }

    db.run(
        `UPDATE live_prices
         SET current_price = ?, updated_at = CURRENT_TIMESTAMP
         WHERE metal_type = ?`,
        [price, metal_type],
        function (err) {
            if (err) {
                return res.status(500).json({ message: "Database Error" });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Metal not found" });
            }
            res.json({ message: "Price updated successfully", metal_type, price });
        }
    );

});


// PRICE HISTORY (Future Feature)

router.get("/prices/history", (req, res) => {
    res.json({ message: "Price History Feature Coming Soon" });
});

module.exports = router;
