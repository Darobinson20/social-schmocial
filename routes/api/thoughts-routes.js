const router = require('express').Router();
const {
  updateThought,
  removeThought,
  getThoughtById,
  removeReaction,
  getAllThoughts,
} = require('../../controllers/thoughts-controller');

// /api/comments/thoughts
router.route('/').get(getAllThoughts).post(updateThought);

router
  .route('/:thoughtId')
  .put(updateThought)
  .get(getThoughtById)
  .delete(removeThought);


router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;