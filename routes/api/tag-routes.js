const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      include: [Product],
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    });
    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body)
    res.json(newTag)
  } catch(err) {
    res.status(500).json(err)
  }
});


router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await ProductTag.destroy({
      where: {
        tag_id: req.params.id,
      },
    });
    const productIDs = req.body.products;
    for (const productID of productIDs) {
      await ProductTag.create({
        product_id: productID,
        tag_id: req.params.id,
      });
    }
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(deletedTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
