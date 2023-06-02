const router = require("express").Router();
const {
  addReview,
  updateReview,
  removeReview,
  getReviewsByMovie,
} = require("../controllers/review");
const { isAuth } = require("../middlewares/auth");
const { validateRatings, validate } = require("../middlewares/validator");

router.post("/add/:movieId", isAuth, validateRatings, validate, addReview);
router.patch("/:reviewId", isAuth, validateRatings, validate, updateReview);
router.delete("/:reviewId", isAuth, removeReview);
router.get("/get-reviews-by-movie/:movieId", getReviewsByMovie);

module.exports = router;
