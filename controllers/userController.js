import { check, validationResult } from 'express-validator'
import User from '../models/User.js'

const loginForm = (req, res) => {
    res.render('auth/login', { page: 'Login' })
}

const registerForm = (req, res) => {
    res.render('auth/register', { page: 'Create account' })
}

const register = async(req, res) => {
    const { name, email, pwd, repeatPwd } = req.body

    // Validation
    await check('name').notEmpty().withMessage('Name is obligatory').run(req)
    await check('email').isEmail().withMessage('Not an email').run(req)
    await check('password').isLength({ min: 3 }).withMessage('Password should be at least 3 characters').run(req)
    await check('repeatPwd').equals('password').withMessage('Passwords not equals').run(req)

    let result = validationResult(req)

    // Validate resValidation is empty
    if (!result.isEmpty()) {
        // Errores
        return res.render('auth/register', { 
            page: 'Create account', 
            errors: result.array(),
            user: { name, email, pwd, repeatPwd }
        })
    }

    const user = await User.create({name, email, password: pwd})
    res.json(user)

}

const forgotPwdForm = (req, res) => {
    res.render('auth/forgotPwd', { page: 'Forgot Password' })
}

export {
    loginForm,
    registerForm,
    forgotPwdForm,
    register
}