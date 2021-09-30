const {Router}=require('express')
const router=Router()
const { check } = require('express-validator');

const {
  fieldsValidation,
  validateJWT,
  isRole
}=require('../middlewares')

const {
  validateRoleDb, 
  validateUniqueEmail, 
  theIdExists
}=require('../helpers/db-validations')

const {usersGet, usersPost, usersPut, usersDelete}=require('../controllers/users')

//GET

router.get('/',usersGet )

//POST

router.post('/',[
  check('name', 'The user name is required').not().isEmpty(),
  check('password', 'The password must be 6 characters or more').isLength({min:6}),
  check('email', 'The email must be valid').isEmail(),
  check('email').custom(validateUniqueEmail),
  // check('rol', 'The rol must be valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(validateRoleDb),
  fieldsValidation //Here we get errors from express-validator if they exist
], usersPost)

//PUT

router.put('/:id',[
  check('id', 'The id is not valid').isMongoId(), 
  //Above To know if the id queried is in the MONGO format, even if it does not exist
  check('id').custom(theIdExists), //It does verify if the id exists in the DB
  fieldsValidation

],usersPut)

router.delete('/:id',[
  validateJWT,
  isRole('ADMIN_ROLE'),
  check('id', 'The id is not valid').isMongoId(),
  check('id').custom(theIdExists),
  fieldsValidation
], usersDelete)




module.exports=router