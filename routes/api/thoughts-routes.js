const router = require('express').Router();
const {
  updateThought,
  removeThought,
  removeThought,
  getThoughtById,
  removeReaction,
  getAllThoughts,
} = require('../../controllers/thoughts-controller');

// /api/comments/thoughts
router.route('/').get(getAllThoughts).post(updateThought);

// /api/comments/<pizzaId>/<commentId>
router
  .route('/:thoughtId')
  .put(updateThought)
  .get(getThoughtById)
  .delete(removeThought);

// /api/comments/<pizzaId>/<commentId>/<replyId>
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;