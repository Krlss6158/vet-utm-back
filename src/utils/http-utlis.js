import Pets from '../models/pet.model';

export const petCreate = async (id, req) => {
    const { name, avatar, birth, description, sex, castrated, specie, race, id_user, id_pet_pather, id_pet_mother } = req;

    try {
        const res = await Pets.create({ id, name, avatar, birth, description, sex, castrated, specie, race, id_user, id_pet_pather, id_pet_mother });
        if (res) return res;
        return false;

    } catch (error) {
        console.log(error)
        return res;
    }
}