import Pets from '../models/pet.model';
import Users from '../models/user.model';
import Cantons from '../models/canton.model';
import Provinces from '../models/province.model';
import Imagenes from '../models/imagenes.model';

import { createIdPet, uploadFileServer, deleteFileServer, numberRandom, longNumberRandom } from '../utils/utils';
import { deleteFile, generatePublicUrl, uploadFile as uploadFileGoogle } from './googleDriver';
import { FindOneUser, CreateOneUser, FindOnePet, CreateOnePet } from '../utils/http-utlis';
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
                },
                {
                    model: Imagenes
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

export const unknownCreateLostPet = async (req, res) => {
    const { images } = req.body;
    console.log(images);
    var id;
    try {

        do {
            id = longNumberRandom();
        } while (await FindOnePet({ id }));

        console.log(id);
        const newpet = await Pets.create({ id, name: 'desconocido', lost: true }, { fields: ['id', 'name', 'lost'] });
        console.log(newpet);
        if (newpet) {
            images.forEach(async e => {
                //Create images in server
                uploadFileServer(e.name, e.base64);
                //Upload image server in google drive
                const resUG = await uploadFileGoogle(e.name);
                const resURLG = await generatePublicUrl(resUG.id);
                //delete image in server
                deleteFileServer(e.name);
                Imagenes.create({ name: resUG.name, url: resURLG, id_pet: id }, { fields: ['name', 'url', 'id_pet'] })
                //http://drive.google.com/uc?export=view&id=
                console.log(resURLG);
            });
            return res.status(200).json({ message: 'lost pet unknown created!' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' })
    }

}


export const createLostPet = async (req, res) => {

    const { user, pet, images } = req.body;
    /* const { id_user, first_name, last_name, email, id_canton, address, phone } = user;
    const { id_pet, name, birth, description, sex, castrated, specie, race } = pet; */

    try {
        var _user, _pet, id_pet, newID;

        _user = user.user_id && await FindOneUser({ id: user.user_id });
        if (_user === null) {
            const _email = user.email && await FindOneUser({ email: user.email });
            if (_email) {
                return res.status(500).json({ message: 'El correo ya existe!' });
            }
            const _phone = user.phone && await FindOneUser({ phone: user.phone });
            if (_phone) {
                return res.status(500).json({ message: 'El telefono ya existe!' });
            }
            const newUser = await CreateOneUser(user);
        } else return res.status(500).json({ message: 'El usuario ya existe!' });
        _pet = pet.pet_id && await FindOnePet({ id: user.pet_id });
        if (_pet === null) {

            var generateID = createIdPet(pet.sex, birth, pet.castrated, pet.race, pet.specie);
            do {
                newID = `${generateID}${numberRandom()}`
            } while (FindOnePet({ id: newID }));
            const newPet = await CreateOnePet(pet);
        }

        /* //Create images in server
        uploadFileServer(images[0].name, images[0].base64);
        //Upload image server in google drive
        const resUG = await uploadFileGoogle(images[0].name);
        const resURLG = await generatePublicUrl(resUG.id);
        //delete image in server
        deleteFileServer(images[0].name);
         
        //http://drive.google.com/uc?export=view&id=
        console.log(resURLG); */


        res.status(201).json({
            message: 'Report created'
        })

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}