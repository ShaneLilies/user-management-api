import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { validateRequest } from '../_middleware/validate-request';
import database, { Database } from '../_helpers/database'
import { newUser } from 'entities/User.interface';
import { User } from '../entities/User'
const router: express.Router = express.Router();

//POST request
router.post("/", createSchema, async (req : Request, res : Response, next : NextFunction) => {
  const user : newUser = req.body;
  if(await database.User.findOne({where: {username: user.username}})){
      res.json({message: `Username "${user.username}" is already taken`});
      return;
  }

  const newUser = database.User.create(user);

  await newUser.save();

  res.json({message: "User added successfully!"})
})

//PUT request
router.put("/:id", updateSchema, async  (req : Request, res : Response, next : NextFunction) =>{
  const { id } = req.params;
  const updatedUser = req.body;
  const user = await database.User.findOneBy({id: +id});
  if(!user){
     res.json({message: "User not found!"});
     return;
  }
  if( updatedUser.username !== user.username && await database.User.findOne({where: {username: updatedUser.username}})){
      res.json({message: `Username "${updatedUser.username}" is already taken`});
      return;
  }
  Object.assign(user,updatedUser);
  await user.save();
  res.json({message: "User updated successfully!"})
})

//Delete user
router.delete('/:id', async  (req : Request, res : Response, next : NextFunction) =>{
  const { id } = req.params;
  const user = await database.User.findOneBy({id: +id});
  if(!user){
      res.json({message: "User not found!"});
      return;
   }
  await user.remove()
  res.json({message: "User deleted successfully!"})
})

//GET all Users
router.get("/", async (req : Request, res : Response, next : NextFunction) => {
  res.json({users: await database.User.find()});
})

//Get one User
router.get("/:id", async (req : Request, res : Response, next : NextFunction) =>{
  const { id } = req.params;
  res.json({user: await database.User.findOneBy({id: +id})})
})

function createSchema(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        username: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      firstname: Joi.string().empty(''),
      lastname: Joi.string().empty(''),
      username: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
  }

export default router;