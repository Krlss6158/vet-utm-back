import { Router } from 'express';
const router = Router();

import {
    createSpecie,
    getSpecies,
    getOneSpecie,
    updateSpecie,
    deletedSpecie
} from '../controllers/specie.controller';

router.get('/', getSpecies);

router.get('/:id', getOneSpecie);

router.post('/', createSpecie);

router.put('/:id', updateSpecie);

router.delete('/:id', deletedSpecie);

export default router;