const router = require("express").Router();
const Product = require("../models/Product");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/:q", async (req, res) => {

  try {
    const products = await Product.find({
      ProductName: req.params.q,
    });
  
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
 
  try {
    const products = await Product.find({});
 
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(err);
  }
});
router.put("/", async (req, res) => {
  try {
    const product = await Product.findById(req.body.pid);
    const editedProduct = {
      SCU: req.body.SCU,
      Quantity: req.body.Quantity,
      ProductName: req.body.ProdName,
      Image: req.body.Image,
      Desc: req.body.Desc,
      IsFavourite: req.body.IsFavourite,
    };

    await product.updateOne({ $set: editedProduct });
    res.status(200).json("the product has been updated");
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
   
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.status(200).json("the product has been deleted");
    } else {
      res.status(203).json("operation unsuccssesfull");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
