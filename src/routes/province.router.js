import { Router } from 'express';
const router = Router();

import {
    createProvince,
    getProvinces,
    getOneProvince,
    updateProvince,
    deletedProvince
} from '../controllers/province.controller';


router.get('/', getProvinces);

router.get('/:id', getOneProvince);

router.post('/', createProvince);

router.put('/:id', updateProvince);

router.delete('/:id', deletedProvince);

export default router;