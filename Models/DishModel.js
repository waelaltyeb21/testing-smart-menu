const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  // resturant: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "resturants"
  // },
  price: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});
const DishModel = mongoose.model("dishes", DishSchema);

module.exports = DishModel;
