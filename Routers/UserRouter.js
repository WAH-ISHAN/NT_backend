import express from 'express';
import { LoginUser, SaveUser } from '../Controles/UserControl';



const UserRouter = express.Router();


UserRouter.post('/SaveUser',SaveUser)
UserRouter.post('/LoginUser',LoginUser)

export default UserRouter;