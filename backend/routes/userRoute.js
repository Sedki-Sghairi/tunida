import express from 'express'
import UserModel from '../models/userModels';

import { getToken } from '../util';

const router = express.Router();

 
router.post('/signin', async (req, res) =>{
    const signinUser = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if(signinUser){
      res.send({
          _id: signinUser._id,
          name: signinUser.name,
          email: signinUser.email,
          isAdmin: signinUser.isAdmin, 
          token: getToken(signinUser)
      })
    }else{
        res.status(401).send({msg: 'User email or password not found.'})
    }
})

router.get('/createadmin', async(req, res) => {
 try {
    const user = new UserModel({
        name: 'houssem',
        password: '1234',
        isAdmin: true,
        email: 'ha@g.m'
    })
    const newUser = await user.save()
    res.send(newUser)
 } catch (error) {
     res.send({msg: error.message })
 }
})

router.post('/register', async(req, res) => {
    try {
       const userRegister = new UserModel({
           name: req.body.name,
           password: req.body.password,
           email: req.body.email
       })
       const newUserRegister = await userRegister.save()
       res.send({
           _id:newUserRegister._id,
           name:newUserRegister.name,
           email:newUserRegister.email,
           isAdmin:newUserRegister.isAdmin,
           token: getToken(newUserRegister)
       })
    } catch (error) {
        res.send({msg: error.message })
    }
})
export default router