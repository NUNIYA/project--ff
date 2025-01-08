const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const path = require("path");
const fs = require("fs");
const expressLayouts = require("express-ejs-layouts");

const configureExpress = (app) => {
  // View engine setup
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../views"));

  // Express layouts setup
  app.use(expressLayouts);
  app.set("layout", "layouts/main");
  app.set("layout extractScripts", true);
  app.set("layout extractStyles", true);

  // Static files
  app.use(express.static(path.join(__dirname, "../../public")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(__dirname, "../../public/uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Session configuration
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "your-secret-key",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 24 * 60 * 60, // 1 day
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
      },
    })
  );

  app.use(flash());

  // Global variables middleware
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.user = req.user || null;
    next();
  });
};

module.exports = configureExpress;
