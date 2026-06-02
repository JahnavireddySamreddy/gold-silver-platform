const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
    "./goldsilver.db",
    (err) => {

        if (err) {

            console.log(
                "Database Error:",
                err.message
            );

        } else {

            console.log(
                "Connected to SQLite Database"
            );

        }

    }
);


// =====================================
// CREATE TABLES IN ORDER
// =====================================

db.serialize(() => {

    console.log("Creating Database Tables...");

    // USERS TABLE

    db.run(`
    CREATE TABLE IF NOT EXISTS users (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        email TEXT UNIQUE NOT NULL,

        password TEXT NOT NULL

    )
    `);

    console.log("Users Table Ready");


    // HOLDINGS TABLE

    db.run(`
    CREATE TABLE IF NOT EXISTS holdings (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        user_id INTEGER NOT NULL,

        metal_type TEXT NOT NULL,

        quantity REAL DEFAULT 0,

        average_price REAL DEFAULT 0,

        FOREIGN KEY(user_id)
        REFERENCES users(id)

    )
    `);

    console.log("Holdings Table Ready");


    // TRANSACTIONS TABLE

    db.run(`
    CREATE TABLE IF NOT EXISTS transactions (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        user_id INTEGER NOT NULL,

        metal_type TEXT NOT NULL,

        transaction_type TEXT NOT NULL,

        quantity REAL NOT NULL,

        price REAL NOT NULL,

        total_amount REAL NOT NULL,

        created_at DATETIME
        DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY(user_id)
        REFERENCES users(id)

    )
    `);

    console.log("Transactions Table Ready");


    // LIVE PRICES TABLE

    db.run(`
    CREATE TABLE IF NOT EXISTS live_prices (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        metal_type TEXT UNIQUE NOT NULL,

        current_price REAL NOT NULL,

        updated_at DATETIME
        DEFAULT CURRENT_TIMESTAMP

    )
    `);

    console.log("Live Prices Table Ready");


    // DEFAULT GOLD PRICE

    db.run(
        `
        INSERT OR IGNORE INTO live_prices
        (metal_type,current_price)

        VALUES
        ('Gold',9500)
        `
    );

    console.log("Gold Price Inserted");


    // DEFAULT SILVER PRICE

    db.run(
        `
        INSERT OR IGNORE INTO live_prices
        (metal_type,current_price)

        VALUES
        ('Silver',110)
        `
    );

    console.log("Silver Price Inserted");

    console.log("Database Setup Complete");

});

module.exports = db;