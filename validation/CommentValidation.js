const { body, query, param } = require('express-validator');

class CommentValidation {
  constructor() {
    this.getAll = [
      query('id', 'Invalid id').optional().isMongoId(),
      query('postId', 'Invalid postId').optional().isMongoId(),
    ];
    this.getById = [
      param('id', 'Comment id is required')
        .isMongoId()
        .withMessage('Invalid comment id'),
    ];
    this.insertMany = [
      body('comments', 'Comments must be an array').isArray({
        min: 1,
      }),
      body('comments.*.text', 'Text is required')
        .isString()
        .withMessage('Text must be a string')
        .isLength({ min: 3 })
        .withMessage('Text must be at least 3 chars'),
      body('comments.*.email', 'Email is required')
        .isEmail()
        .withMessage('Invalid email address'),
      body('postId', 'postId is required')
        .isMongoId()
        .withMessage('Invalid postId'),
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
      body('postId', 'Invalid postId').optional().isMongoId(),
    ];
  }
}

module.exports = new CommentValidation();
