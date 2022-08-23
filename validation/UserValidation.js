const { body, query, param } = require('express-validator');

class UserValidation {
  constructor() {
    this.getAll = [query('id', 'Invalid id').optional().isMongoId()];
    this.getById = [
      param('id', 'User id is required')
        .isMongoId()
        .withMessage('Invalid user id'),
    ];
    this.insertMany = [
      body().isArray().withMessage('Request body must be an array'),
      body(
        ['*.userName', '*.firstName', '*.lastName'],
        'Value must be a string'
      )
        .optional()
        .isString()
        .isLength({ min: 3 })
        .withMessage('Value must be at least 3 chars'),
      body('*.email', 'Email is required').isEmail(),
      body('*.address', 'Address must be a plain object')
        .optional()
        .isObject()
        .custom((value) => {
          const addressKeys = Object.keys(value);
          if (!addressKeys.length) {
            throw new Error('Address must not be empty');
          }
          const validFields = ['country', 'city', 'street', 'suite', 'zipcode'];
          addressKeys.forEach((field) => {
            if (!validFields.includes(field)) {
              throw new Error(
                `${field} is not valid field for address object. Expected 'country', 'city', 'street', 'suite' or 'zipcode'`
              );
            }
          });
          return true;
        }),
      body(
        [
          '*.address.country',
          '*.address.city',
          '*.address.street',
          '*.address.suite',
        ],
        'Value must be a string'
      )
        .optional()
        .isString()
        .notEmpty()
        .withMessage('Value must not be empty'),
      body('*.address.zipcode', 'Incorrect zipcode')
        .optional()
        .isPostalCode('any'),
      body('*.phone', 'Incorrect phone number').optional().isMobilePhone('any'),
      body('*.avatarUrl', 'Incorrect avatar url').optional().isURL(),
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
  }
}

module.exports = new UserValidation();
