import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { validateRequest } from '../_middleware/validate-request';
import database, { Database } from '../_helpers/database'
import { newUser } from 'entities/User.interface';
import { User } from '../entities/User'
const router: express.Router = express.Router();

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