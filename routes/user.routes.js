const { Router } = require('express');
const router = Router();

const userController = require('../controllers/UserController');
const userValidation = require('../validation/UserValidation');
const adminMiddleware = require('../middlewares/adminMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.get(
  '/',
  userValidation.getAll,
  validationMiddleware,
  userController.getAll
);

router.get(
  '/:id',
  userValidation.getById,
  validationMiddleware,
  userController.getById
);

router.get('/:id/posts', userController.getUserPosts);

router.get('/:id/todos', userController.getUserTodos);

router.get('/:id/albums', userController.getUserAlbums);

router.post(
  '/',
  adminMiddleware,
  userValidation.insertMany,
  validationMiddleware,
  userController.insertMany
);

router.patch(
  '/',
  adminMiddleware,
  userValidation.updateMany,
  validationMiddleware,
  userController.updateMany
);

router.delete('/', adminMiddleware, userController.deleteMany);

module.exports = router;
