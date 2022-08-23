const { body, query, param } = require('express-validator');

class PhotoValidation {
  constructor() {
    this.getAll = [
      query('id', 'Invalid id').optional().isMongoId(),
      query('albumId', 'Invalid albumId').optional().isMongoId(),
    ];
    this.getById = [
      param('id', 'Photo id is required')
        .isMongoId()
        .withMessage('Invalid photo id'),
    ];
    this.insertMany = [
      body('photos', 'Posts must be an array').isArray({
        min: 1,
      }),
      body('photos.*.url', 'Photo Url is required')
        .isURL()
        .withMessage('Invalid photo url'),
      body('photos.*.alt', 'Alt must be a string')
        .optional()
        .isString()
        .isLength({ min: 3 })
        .withMessage('Text must be at least 3 chars'),
      body('albumId', 'albumId is required')
        .isMongoId()
        .withMessage('Invalid albumId'),
    ];
    this.updateMany = [
      body('search', 'Search object is required').isObject(),
      body('update', 'Update object is required')
        .isObject()
        .custom((value) => {
          const updateKeys = Object.keys(value);
          if (!updateKeys.length) {
            throw new Error('Update object must not be empty');
          }
          return true;
        }),
    ];
    this.deleteMany = [
      body('_id', 'Invalid id').optional().isMongoId(),
      body('albumId', 'Invalid albumId').optional().isMongoId(),
    ];
  }
}

module.exports = new PhotoValidation();
