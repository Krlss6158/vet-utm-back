import { Router } from 'express';
const router = Router();

import {
    getPets,
    createPet,
    getOnePet,
    updatePet,
    deletedPet,
    getAllPetsByUser,
    getAllChildsByPet,
    createLostPet
} from '../controllers/pet.controller';


router.get('/', getPets);

router.get('/:id', getOnePet);

router.post('/', createPet);

router.put('/:id', updatePet);

router.delete('/', deletedPet);

router.get('/user/:id', getAllPetsByUser);

router.post('/createLostPet', createLostPet);

/* router.get('/childs/:id', getAllChildsByPet); */


export default router;