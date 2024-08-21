const express = require("express");
const app = express();
const cors = require("cors");
// -------------------------------------------------
// Allow Crentenatial
app.use(
  cors({
    origin: ["http://localhost:5173", "https://testing-smart-menu.web.app"],
  })
);
// -------------------------------------------------
// Routes
const DishesRoute = require("../Routes/Dishes");
// Middelwares
app.use(express.json()); // Parse JSON Data
app.use("/dishes", DishesRoute);

// Server
const PORT = 8080;
app.listen(PORT, () => console.log(`Server Is Running On Port ${PORT}`));
