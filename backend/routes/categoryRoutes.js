const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const Product = require('../models/productModel')
const {
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
  createCategory,
  getUserStatusByCategoryId
} = require('../controllers/categoryController')
const { protect, admin } = require('../middleware/authMiddleware')


// @desc  Fetch all categories
// @route  GET /api/categories
// @access  Public
router.route('/').get(getCategories).post(protect, admin, createCategory)

// @desc  Fetch products based on category
// @route  GET /api/categories/:category
// @access  Public
router.get(
  '/:category',
  asyncHandler(async (req, res) => {
    const categorywiseProducts = await Product.find({
      category: req.params.category,
    })
    // const categorywiseProducts = products.filter((p) => p.category === req.params.category)
    if (categorywiseProducts) {
      res.json(categorywiseProducts)
    } else {
      res.status(404)
      throw new Error('Products not found')
    }
  }),
)


router
  .route('/:id')
  .get(getCategoryById)
  .delete(protect, admin, deleteCategory)
  .put(protect, updateCategory)
// router.route('/category').get(getCategoryById).put(protect, admin, updateCategory)
// router.route('/category').get(getCategoryById).delete(protect, admin, deleteCategory)




// // router.get(
// //   '/',
// //   asyncHandler(async (req, res) => {
// //     const categories = await Category.find({})
// //     res.json(categories)
// //   }),
// // )



module.exports = router
