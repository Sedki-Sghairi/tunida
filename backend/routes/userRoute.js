import express from 'express'
import UserModel from '../models/userModels';
import { getToken, isAuth } from '../util';

const router = express.Router();

 
router.post('/signin', async (req, res) =>{
    const signinUser = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if(signinUser){
      res.send({
          _id: signinUser.id,
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
        name: 'ida',
        password: '123',
        isAdmin: true,
        email: 'da@g.c'
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
           _id:newUserRegister.id,
           name:newUserRegister.name,
           email:newUserRegister.email,
           isAdmin:newUserRegister.isAdmin,
           token: getToken(newUserRegister)
       })
    } catch (error) {
        res.send({msg: error.message })
    }
})

router.put('/:id', isAuth, async (req, res) => {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: getToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  });
export default router