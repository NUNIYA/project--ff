const { body } = require('express-validator');

exports.memberValidationRules = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('age').isInt({ min: 16 }).withMessage('Age must be at least 16'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('campus').isIn(['4kilo', '6kilo']).withMessage('Invalid campus selection'),
  body('isStudent').isBoolean().withMessage('Student status must be specified'),
  body('selectedPackage').notEmpty().withMessage('Package selection is required')
];

exports.trainerValidationRules = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('preferredCampus').isIn(['4kilo', '6kilo']).withMessage('Invalid campus selection'),
  body('applicationLetter').notEmpty().withMessage('Application letter is required')
];