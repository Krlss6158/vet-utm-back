import Users from '../models/user.model';
import Cantons from '../models/canton.model';
import Provinces from '../models/province.model';
import Pets from '../models/pet.model';

export const createUser = async (req, res) => {
    const { id,
        first_name,
        avatar,
        last_name,
        email,
        id_canton,
        address,
        phone } = req.body;

    try {
        const newUser = await Users.create({
            id,
            first_name,
            avatar,
            last_name,
            email,
            id_canton,
            address,
            phone
        });

        if (newUser) {
            res.status(201).json({
                message: 'User created successfully',
                data: {
                    id,
                    first_name,
                    last_name,
                    email,
                    id_city,
                    address,
                    phone
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

export const getUsers = async (req, res) => {
    try {

        /* getting all users */
        const users = await Users.findAll({
            include: [
                { model: Pets },
                { model: Cantons }
            ]
        });

        res.status(200).json({
            count: users.length,
            data: { users }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}

export const getOneUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Users.findOne({
            where: { id },
            include: [
                {
                    model: Cantons,
                    include: { model: Provinces }
                },
                {
                    model: Pets
                }
            ]
        });

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const userDeleted = await Users.destroy({
            where: {
                id
            }
        });

        res.status(200).json({
            message: 'User deleted successfully',
            count: userDeleted
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}

export const updateUser = async (req, res) => {
    const { _id } = req.params;
    const {
        id,
        first_name,
        last_name,
        email,
        id_city,
        address,
        phone } = req.body;

    try {
        const updatedUser = await Users.update({
            id,
            first_name,
            last_name,
            email,
            id_city,
            address,
            phone
        }, { where: { id: _id } })

        if (updatedUser[0]) {
            res.status(200).json({
                message: 'User updated successfully',
                data: {
                    id,
                    first_name,
                    last_name,
                    email,
                    id_city,
                    address,
                    phone
                }
            })
        } else {
            res.status(404).json({ message: 'User not found!' })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }

}