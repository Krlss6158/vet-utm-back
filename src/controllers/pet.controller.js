import Pets from '../models/pet.model';
import Users from '../models/user.model';
import Cantons from '../models/canton.model';
import Provinces from '../models/province.model';
import Imagenes from '../models/imagenes.model';

import { createIdPet } from '../utils/utils';

import { Op } from 'sequelize';

export const createPet = async (req, res) => {
    const { name, avatar, birth, description, sex, lost, castrated, specie, race, id_user, id_pet_pather, id_pet_mother } = req.body;

    try {

        const id = createIdPet(name, sex, birth, castrated, race, specie);

        const newPet = await Pets.create({ id, name, avatar, birth, description, lost, sex, castrated, specie, race, id_user, id_pet_pather, id_pet_mother });

        if (newPet) {
            res.status(201).json({
                message: 'Pet created successfully',
                data: {
                    newPet
                }
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }

}

export const getPets = async (req, res) => {

    try {
        const pets = await Pets.findAll({
            include: [
                {
                    model: Users,
                    include: {
                        model: Cantons,
                        include: {
                            model: Provinces,
                        }
                    },
                }
            ]
        });

        res.status(200).json({
            count: pets.length,
            pets
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}

export const getOnePet = async (req, res) => {
    const { id } = req.params;

    try {
        const pet = await Pets.findOne({
            where: { id },
            include: [
                {
                    model: Users,
                    include: {
                        model: Cantons,
                        include: {
                            model: Provinces,
                        }
                    }
                }
            ]
        });

        if (pet) {
            const childs = await Pets.findAll({
                where: { [Op.or]: [{ id_pet_pather: pet.id }, { id_pet_mother: pet.id }] }
            })

            pet.dataValues.childs = childs;
            res.status(200).json({ pet });
        } else {
            res.status(404).json({ message: 'Pet not found!' })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}

export const updatePet = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        birth,
        description,
        sex,
        castrated,
        specie,
        race,
        id_user,
        id_specie,
        id_pet_pather,
        id_pet_mother
    } = req.body;

    try {

        const updatedPet = await Pets.update({
            name,
            birth,
            description,
            sex,
            castrated,
            specie,
            race,
            id_user,
            id_specie,
            id_pet_pather,
            id_pet_mother
        }, { where: { id } })

        if (updatedPet[0]) {
            res.status(200).json({
                message: 'Pet updated successfully',
                data: {
                    id,
                    name,
                    birth,
                    description,
                    sex,
                    castrated,
                    specie,
                    race,
                    id_user,
                    id_specie,
                    id_pet_pather,
                    id_pet_mother
                }
            })
        } else {
            res.status(404).json({ message: 'Pet not found!' })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }

}

export const deletedPet = async (req, res) => {
    const { id } = req.params;

    try {
        const PetDeleted = await Pets.destroy({
            where: {
                id
            }
        });

        res.status(200).json({
            message: 'Pet deleted successfully',
            count: PetDeleted
        })

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}

export const getAllPetsByUser = async (req, res) => {
    const { id } = req.params;

    try {

        const user = await Users.findOne({
            where: { id },
            include: [
                {
                    model: Cantons,
                    include: { model: Provinces }
                }
            ]
        })

        if (user) {
            const pets = await Pets.findAll({
                where: { id_user: user.id },

            });
            res.status(200).json({
                user,
                count_pets: pets.length,
                pets
            })
        } else {
            res.status(404).json({ message: 'User not fount!' })
        }


    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }

}

export const getAllChildsByPet = async (req, res) => {
    const { id } = req.params;

    try {

        const pet = await Pets.findOne({
            where: { id }
        })

        if (pet) {

            const user = await Users.findOne({
                where: { id: pet.id_user },
                include: [
                    {
                        model: Cantons,
                        include: { model: Provinces }
                    }
                ]
            })

            const pets = await Pets.findAll({
                where: { [Op.or]: [{ id_pet_pather: pet.id }, { id_pet_mother: pet.id }] }
            });

            res.status(200).json({
                user,
                pet_parent: pet,
                count_childs: pets.length,
                childs: pets
            })
        } else { res.status(404).json({ message: 'Pet not found!' }) }


    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }

}


export const createLostPet = async (req, res) => {

    const {
        id_user, avatar_user, first_name, last_name, email, id_canton, address, phone,
        id_pet, avatar_pet, name, birth, description, sex, castrated, specie, race, lost, id_pet_mother, id_pet_pather,
        images
    } = req.body;


    try {
        var user;
        var pet;

        user = id_user && await Users.findOne({ where: { id: id_user } })
        if (user === null) {
            if (id_user && first_name && last_name && phone && address && id_canton && email)
                await Users.create({ id: id_user, avatar: avatar_user, first_name, last_name, email, id_canton, address, phone })
        }

        var pet_id = id_pet ? id_pet : createIdPet(name, sex, birth, castrated, race, specie);

        pet = id_pet && await Pets.findOne({ where: { id: pet_id } })

        if (pet === null) await Pets.create({ id: pet_id, avatar: avatar_pet, name, birth, description, sex, castrated, specie, race, lost, id_user, id_pet_mother, id_pet_pather })


        var imagenes; 
        
        images.forEach(async (e) => {
            imagenes = await Imagenes.create({ url: e.url, id_pet: e.id_pet }, { fields: ['url', 'id_pet'] })
        });

        res.status(200).json({ msg: 'pasaste' })
        if (imagenes) {
            res.status(200).json({
                user,
                pet,
                imagenes
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}