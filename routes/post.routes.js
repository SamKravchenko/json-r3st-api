const { Router } = require('express');
const router = Router();

const postController = require('../controllers/PostController');
const postValidation = require('../validation/PostValidation');
const adminMiddleware = require('../middlewares/adminMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.get(
  '/',
  postValidation.getAll,
  validationMiddleware,
  postController.getAll
);

router.get(
  '/:id',
  postValidation.getById,
  validationMiddleware,
  postController.getById
);

router.get('/:id/comments', postController.getPostComments);

router.post(
  '/',
  adminMiddleware,
  postValidation.insertMany,
  validationMiddleware,
  postController.insertMany
);

router.patch(
  '/',
  adminMiddleware,
  postValidation.updateMany,
  validationMiddleware,
  postController.updateMany
);

router.delete(
  '/',
  adminMiddleware,
  postValidation.deleteMany,
  validationMiddleware,
  postController.deleteMany
);

module.exports = router;
