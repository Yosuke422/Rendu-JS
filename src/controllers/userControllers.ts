import { Elysia} from 'elysia'
import User, { IAuthentication } from '../models/users'
import jwt from 'jsonwebtoken'
import { authentication } from '../middleware/auth';

const JWT_SECRET = 'secret'

export const userController = (app: Elysia) =>
  app
    .post('/register', async (handler) => {
      try {
        const { email, password } = handler.body as Partial<IAuthentication>;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          handler.set.status = 422;
          return {
            message: 'User already exists!',
            status: 422,
          };
        }

        const newUser = new User({ email, password });
        await newUser.save();

        handler.set.status = 201;
        return { message: 'Registration successful!', status: 201 };
      } catch (e: any) {
        handler.set.status = 500;
        return {
          message: 'Unable to register user!',
          status: 500,
        };
      }
    })

    .post('/login', async (handler) => {
      try {
        const { email, password } = handler.body as Partial<IAuthentication>;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
          handler.set.status = 404;
          return {
            message: 'User not found!',
            status: 404,
          };
        }

        // Check if the password is correct
        if (user.password !== password) {
          handler.set.status = 401;
          return {
            message: 'Authentication failed. Incorrect password!',
            status: 401,
          };
        }

        // Generate a JWT token for the user
        const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET);

        handler.set.status = 200;
        return {
          message: 'Login successful!',
          status: 200,
          accessToken,
        };
      } catch (e: any) {
        handler.set.status = 500;
        return {
          message: 'Unable to log in!',
          status: 500,
        };
      }
    })
    
    
