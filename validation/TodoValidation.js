const { body, query, param } = require('express-validator');

class TodoValidation {
  constructor() {
    this.getAll = [
      query('id', 'Invalid id').optional().isMongoId(),
      query('userId', 'Invalid userId').optional().isMongoId(),
    ];
    this.getById = [
      param('id', 'Todo id is required')
        .isMongoId()
        .withMessage('Invalid todo id'),
    ];
    this.insertMany = [
      body('todos', 'Todos must be an array').isArray({
        min: 1,
      }),
      body('todos.*.title', 'Title is required')
        .isString()
        .withMessage('Title must be a string')
        .isLength({ min: 2 })
        .withMessage('Title must be at least 2 chars'),
      body('todos.*.description', 'Description must be a string')
        .optional()
        .isString()
        .isLength({ min: 2 })
        .withMessage('Description must be at least 2 chars'),
      body('todos.*.completed', 'Completed must be a boolean')
        .optional()
        .isBoolean(),
      // body('userId', 'userId is required')
      //   .isMongoId()
      //   .withMessage('Invalid userId'),
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

module.exports = new TodoValidation();
