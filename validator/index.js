const { check , validationResult } = require('express-validator');

exports.userSignupValidator = (req, res, next) => {
    check('name', 'Name is required').notEmpty().run(req);
    check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        })
        .run(req);
    check('password', 'Password is required').notEmpty().run(req);
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number')
        .run(req);
    const errors = validationResult(req);
    if (errors) {
        const firstError = errors.mapped(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};
