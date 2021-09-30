const usersMiddlewares=require('../middlewares/users')
const JWTMiddlewares=require('../middlewares/validateJWT')
const roleMiddlewares=require('../middlewares/verifyRole')


module.exports={
  ...usersMiddlewares,
  ...JWTMiddlewares,
  ...roleMiddlewares
}