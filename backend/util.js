import jwt from 'jsonwebtoken'
import config from './config'

const getToken = (user) => {
    return jwt.sign(
      {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }
    ,config.JWT_SECRET,{
        expiresIn: '2 days'
    }
  )
}
const isAuth = (req, res, next) => {
  const token = req.headers.authorization 
  if(token){
    const onlyToken = token.slice(6, token.length)
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) =>{
      if(err){
        return res.status(401).send({msg: 'Invalid Token.'})
      }
      req.user = decode
      next()
      return
    })
  }else{
    return res.status(401).send({msg:'Token not issued.'})
  }
}
const Admin = (req, res, next) =>{
  if(req.user.isAdmin){
     next()
     return
  }
  return res.status(401).send({msg: req})
}
export { getToken,  isAuth, Admin }