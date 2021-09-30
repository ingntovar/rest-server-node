const {Router}=require('express')
const router=Router()
const { check } = require('express-validator')

const {fieldsValidation}=require('../middlewares/users')
const {authLogin}=require('../controllers/auth')

router.post('/login',[
  check('email', 'The email must be valid').isEmail(),
  check('password', 'The password is required').not().isEmpty(),
  fieldsValidation

], authLogin)

module.exports= router
