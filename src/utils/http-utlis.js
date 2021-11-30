import Pets from '../models/pet.model';
import Users from '../models/user.model';

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


export const FindOneUser = async (filter) => {
    try {
        const res = await Users.findOne({ where: filter })
        if (res) return true;
        return false;
    } catch (error) {
        console.log(error);
    }
}

export const CreateOneUser = async (data) => {
    const { user_id, avatar, first_name, last_name, email, id_canton, address, phone } = data;

    try {
        const res = await Users.create({ id: user_id, avatar, first_name, last_name, email, id_canton, address, phone });
        if (res) return true;
        return false;
    } catch (error) {
        console.log(error);
    }
}


export const FindOnePet = async (filter) => {
    try {
        const res = await Pets.findOne({ where: filter })
        if (res) return true;
        return false;
    } catch (error) {
        console.log(error);
    }
}


export const CreateOnePet = async (data) => {
    const { pet_id, avatar, name, birth, description, sex, castrated, specie, race, lost, id_user } = data;
    
}