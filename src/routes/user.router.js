import { Router } from 'express';
const router = Router();

import {
    createUser,
    getUsers,
    getOneUser,
    deleteUser,
    updateUser,
    createAccount,
    Login
} from '../controllers/user.controller';

router.post('/', createUser);

router.get('/', getUsers);

router.get('/:id', getOneUser);

router.delete('/:id', deleteUser);

router.put('/:_id', updateUser)

router.post('/signup', createAccount)

router.post('/signin', Login)


export default router;