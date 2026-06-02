const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    console.log("HEADERS:", req.headers);

    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {

        return res.status(401).json({
            message: "No Token"
        });

    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    console.log(
        "VERIFY SECRET:",
        process.env.JWT_SECRET
    );

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED:", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log(
            "JWT ERROR:",
            error.message
        );

        return res.status(403).json({
            message: "Invalid Token"
        });

    }

};

module.exports = verifyToken;