const { Router } = require('express');
const router = Router();

const commentController = require('../controllers/CommentController');
const commentValidation = require('../validation/CommentValidation');
const adminMiddleware = require('../middlewares/adminMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.get(
  '/',
  commentValidation.getAll,
  validationMiddleware,
  commentController.getAll
);

router.get(
  '/:id',
  commentValidation.getById,
  validationMiddleware,
  commentController.getById
);

router.post(
  '/',
  adminMiddleware,
  commentValidation.insertMany,
  validationMiddleware,
  commentController.insertMany
);

router.patch(
  '/',
  adminMiddleware,
  commentValidation.updateMany,
  validationMiddleware,
  commentController.updateMany
);

router.delete(
  '/',
  adminMiddleware,
  commentValidation.deleteMany,
  validationMiddleware,
  commentController.deleteMany
);

module.exports = router;
