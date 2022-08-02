const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser
} = require('../../controllers/user-controller');


router
  .route('/')
  .get()
  .post();


router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  router
  .route('/:id')
  .put(updateUser)
  .delete(deleteUser);

  router
  .route('/')
  .get(getAllUsers)
  .post(createUser);


module.exports = router;
