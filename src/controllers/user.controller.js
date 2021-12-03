import Users from '../models/user.model';
import Cantons from '../models/canton.model';
import Provinces from '../models/province.model';
import Pets from '../models/pet.model';
import Account from '../models/account';
import { sendPasswordMail } from '../utils/mail';
import { encryp, decryp, generateToken } from '../utils/utils';
import { Op } from 'sequelize';

export const createUser = async (req, res) => {
    const { id,
        avatar,
        first_name,
        last_name,
        email,
        id_canton,
        address,
        phone } = req.body;

    try {

        const newUser = await Users.create({ id, first_name, avatar, last_name, email, id_canton, address, phone });
        if (newUser) {
            res.status(201).json({
                message: 'User created successfully',
                data: { newUser }
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
            where: { [Op.or]: [{ id: id }, { email: id }] },
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

        const findUser = await Users.findOne({ where: { id } });
        if (findUser) {
            const userDeleted = await Users.destroy({
                where: { id: findUser.id }
            });
            const findAccount = await Account.findOne({ where: { email: findUser.email } })
            if (findAccount) {
                const accountDeleted = await Account.destroy({ where: { email: findAccount.email } })
            }
            return res.status(200).json({
                message: 'User deleted successfully',
                count: userDeleted
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

export const updateUser = async (req, res) => {
    const { _id } = req.params;
    const {
        id,
        first_name,
        last_name,
        email,
        id_canton,
        address,
        phone,
        role,
        avatar
    } = req.body;

    try {

        const updatedUser = await Users.update({
            id,
            first_name,
            last_name,
            email,
            id_canton,
            address,
            phone,
            avatar
        }, { where: { [Op.or]: [{ id: _id }, { email: _id }] } })

        if (req.body.password) {
            const findUser = await Account.findOne({ where: { email } });
            const passed = await decryp(req.body.password, findUser.password);
            if (passed) {
                req.body.password = await encryp(req.body.password);
            } else {
                return res.status(401).json({ message: 'Contraseña incorrecta.' })
            }
        }

        const accountUser = await Account.update({ email, password: req.body.password, role }, { where: { email: _id } }, { fields: ['email', 'password', 'role'] });

        if (updatedUser[0]) {
            res.status(200).json({
                message: 'User updated successfully',
                data: {
                    id,
                    first_name,
                    last_name,
                    email,
                    id_canton,
                    address,
                    phone
                }
            })
        } else {
            res.status(404).json({ message: 'User not found!' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }

}

export const createAccount = async (req, res) => {
    const { id, email, role, first_name, last_name } = req.body;

    try {
        const findUser = await Users.findOne({ where: { email } });

        if (findUser === null) {
            const newUser = await Users.create({ id, first_name, last_name, email })
        }

        if (req.body.password) {
            req.body.password = await encryp(req.body.password);
        }

        const newAccount = await Account.create({ email, password: req.body.password, role: role ? role : 'client' }, { fields: ['email', 'password', 'role'] })

        if (newAccount) {
            res.status(200).json({
                message: 'Account created!',
                data: {
                    id,
                    email,
                    last_name,
                    first_name
                }
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }

}


export const Login = async (req, res) => {
    const { email } = req.body;
    try {
        const findUser = await Account.findOne({ where: { email } });
        if (findUser !== null) {
            if (req.body.password) {
                const passed = await decryp(req.body.password, findUser.password);
                if (passed) {
                    res.status(200).json({
                        data: findUser.email
                    })
                } else {
                    res.status(404).json({ message: 'password wrong' })
                }
            }
        } else {
            res.status(404).json({ message: 'user not found' })
        }
    } catch (error) {

    }
}