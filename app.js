const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Middleware to check if the request is within working hours
function checkWorkingHours(req, res, next) {
  const now = new Date();
  const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = now.getHours(); // 0 to 23

  // Check if it's a weekday and within working hours
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Continue to the route
  } else {
    res
      .status(403)
      .send(
        "The application is only available during working hours (Monday to Friday, 9 to 17)."
      );
  }
}

// Apply the middleware
app.use(checkWorkingHours);

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, "public")));

// Set view engine (optional, e.g., EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.render("home"); // Assuming you have a home.ejs template
});

app.get("/services", (req, res) => {
  res.render("services"); // Assuming you have a services.ejs template
});

app.get("/contact", (req, res) => {
  res.render("contact"); // Assuming you have a contact.ejs template
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
