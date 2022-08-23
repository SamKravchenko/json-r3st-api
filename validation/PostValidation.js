const { body, query, param } = require('express-validator');

class PostValidation {
  constructor() {
    this.getAll = [
      query('id', 'Invalid id').optional().isMongoId(),
      query('userId', 'Invalid userId').optional().isMongoId(),
    ];
    this.getById = [
      param('id', 'Post id is required')
        .isMongoId()
        .withMessage('Invalid post id'),
    ];
    this.insertMany = [
      body('posts', 'Posts must be an array').isArray({
        min: 1,
      }),
      body('posts.*.title', 'Title is required')
        .isString()
        .withMessage('Title must be a string')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 chars'),
      body('posts.*.text', 'Text is required')
        .isString()
        .withMessage('Text must be a string')
        .isLength({ min: 10 })
        .withMessage('Text must be at least 10 chars'),
      body('userId', 'userId is required')
        .isMongoId()
        .withMessage('Invalid userId'),
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
      body('userId', 'Invalid userId').optional().isMongoId(),
    ];
  }
}

module.exports = new PostValidation();
