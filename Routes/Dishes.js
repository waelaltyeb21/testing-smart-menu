const express = require("express");
const DishesController = require("../Controllers/DishesController");
const DishesRoute = express.Router();

DishesRoute.get("/all_dishes", DishesController.GetDishes);
DishesRoute.get(
  "/category/:resturant/:category",
  DishesController.GetDishesByCategory
);
DishesRoute.get(
  "/resturants/:resturant/tables/:table",
  DishesController.GetResturantDishes
);
module.exports = DishesRoute;
