import { Router } from 'express';
const router = Router();

import {
    createRace,
    getRaces,
    getOneRace,
    updateRace,
    deletedRace
} from '../controllers/race.controller';

router.get('/', getRaces);

router.get('/:id', getOneRace);

router.post('/', createRace);

router.put('/:id', updateRace);

router.delete('/:id', deletedRace);

export default router;