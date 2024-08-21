const { default: mongoose } = require("mongoose");
const DishModel = require("../Models/DishModel");

const DishesController = {
  GetDishes: async (req, res) => {
    const dishes = await DishModel.find();
    if (dishes.length != 0) return res.status(200).json(dishes);
    return res.status(200).json({ msg: "No dishes" });
  },
  GetResturantDishes: async (req, res) => {
    const { resturant, table } = req.params;
    res
      .status(200)
      .json({ msg: "This Is Our Menu", data: { resturant, table } });
  },
  GetDishesByCategory: async (req, res) => {
    const { resturant, category } = req.params;
    console.log(resturant, category);
    // console.log(new Date().toLocaleString().split(","));

    const dishes = await DishModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $match: {
          "categoryDetails._id": new mongoose.Types.ObjectId(category),
          "categoryDetails.resturant": new mongoose.Types.ObjectId(resturant),
        },
      },
      {
        $addFields: {
          total: { $multiply: ["$price", 2] },
        },
      },
      // {
      //   $limit: 3,
      // },
      {
        $sort: { total: 1 },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          total: 1,
          category: 1,
          categoryDetails: {
            name: 1,
            resturant: 1,
            createdAt: 1,
            active: 1,
          },
        },
      },
      // {
      //   $out: "data"
      // }
    ]);

    // const dishes = await DishModel.find({ category: category }).populate(
    //   "category"
    // );
    return res.status(200).json(dishes);
  },
  CreateNewDish: async (req, res) => {
    const { name, price, category, active } = req.body;
    // ---------------------------------------------------------
    const dishes = await DishModel.find({ name: name });
    if (dishes.length != 0) {
      return res.status(400).json({ msg: "This Dish Is Already Exist!" });
    }
    const newDish = await DishModel.create({ name, category, price, active });
    newDish
      .save()
      .then((data) =>
        res.status(201).json({ msg: "New Dish Has Been Created!", data: data })
      )
      .catch((err) =>
        res.status(500).json({ msg: "Internal Server Error", error: err })
      );
    // ---------------------------------------------------------
  },
};
module.exports = DishesController;
