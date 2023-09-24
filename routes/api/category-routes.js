const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    // find all categories
    const categories = await Category.findAll({
      // be sure to include its associated Products
      include: [Product],
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find one category by its `id` value
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
      // be sure to include its associated Products
      include: [Product],
    });
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body)
    res.json(newCategory)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.json(updatedCategory)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(deletedCategory)
  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
