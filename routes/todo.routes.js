const { Router } = require('express');
const router = Router();

const todoController = require('../controllers/TodoController');
const todoValidation = require('../validation/TodoValidation');
const adminMiddleware = require('../middlewares/adminMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.get(
  '/',
  todoValidation.getAll,
  validationMiddleware,
  todoController.getAll
);

router.get(
  '/:id',
  todoValidation.getById,
  validationMiddleware,
  todoController.getById
);

router.post(
  '/',
  adminMiddleware,
  todoValidation.insertMany,
  validationMiddleware,
  todoController.insertMany
);

router.patch(
  '/',
  adminMiddleware,
  todoValidation.updateMany,
  validationMiddleware,
  todoController.updateMany
);

router.delete(
  '/',
  adminMiddleware,
  todoValidation.deleteMany,
  validationMiddleware,
  todoController.deleteMany
);

module.exports = router;
