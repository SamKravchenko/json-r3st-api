const { Router } = require('express');
const router = Router();

const albumController = require('../controllers/AlbumController');
const albumValidation = require('../validation/AlbumValidation');
const adminMiddleware = require('../middlewares/adminMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.get(
  '/',
  albumValidation.getAll,
  validationMiddleware,
  albumController.getAll
);

router.get(
  '/:id',
  albumValidation.getById,
  validationMiddleware,
  albumController.getById
);

router.get('/:id/photos', albumController.getAlbumPhotos);

router.post(
  '/',
  adminMiddleware,
  albumValidation.insertMany,
  validationMiddleware,
  albumController.insertMany
);

router.patch(
  '/',
  adminMiddleware,
  albumValidation.updateMany,
  validationMiddleware,
  albumController.updateMany
);

router.delete(
  '/',
  adminMiddleware,
  albumValidation.deleteMany,
  validationMiddleware,
  albumController.deleteMany
);

module.exports = router;
