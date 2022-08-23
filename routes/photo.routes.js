const { Router } = require('express');
const router = Router();

const photoController = require('../controllers/PhotoController');
const photoValidation = require('../validation/PhotoValidation');
const adminMiddleware = require('../middlewares/adminMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.get(
  '/',
  photoValidation.getAll,
  validationMiddleware,
  photoController.getAll
);

router.get(
  '/:id',
  photoValidation.getById,
  validationMiddleware,
  photoController.getById
);

router.post(
  '/',
  adminMiddleware,
  photoValidation.insertMany,
  validationMiddleware,
  photoController.insertMany
);

router.patch(
  '/',
  adminMiddleware,
  photoValidation.updateMany,
  validationMiddleware,
  photoController.updateMany
);

router.delete(
  '/',
  adminMiddleware,
  photoValidation.deleteMany,
  validationMiddleware,
  photoController.deleteMany
);

module.exports = router;
