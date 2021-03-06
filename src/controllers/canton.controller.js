import Cantons from '../models/canton.model';
import Provinces from '../models/province.model';

export const createCanton = async (req, res) => {
    const { name, id_province } = req.body;

    try {

        const newCanton = await Cantons.create({
            name,
            id_province
        }, { fields: ['name', 'id_province'] });

        if (newCanton) {
            res.status(201).json({
                message: 'Canton created successfully',
                data: { name }
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }

}

export const getCantons = async (req, res) => {
    try {
        const cantons = await Cantons.findAll({
            include: [
                { model: Provinces }
            ]
        });

        res.status(200).json({
            count: cantons.length,
            data: cantons
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}

export const getOneCanton = async (req, res) => {
    const { id } = req.params;

    try {
        const canton = await Cantons.findOne({
            where: { id },
            include: [
                { model: Provinces }
            ]
        });

        res.status(200).json(canton)
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}

export const updateCanton = async (req, res) => {
    const { id } = req.params;
    const { name, id_province } = req.body;

    try {

        const updatedCanton = await Cantons.update({ name, id_province }, { where: { id } })

        if (updatedCanton[0]) {
            res.status(200).json({
                message: 'Canton updated successfully',
                data: { name, id_province }
            })
        } else {
            res.status(404).json({ message: 'Canton not found!' })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }

}

export const deletedCanton = async (req, res) => {
    const { id } = req.params;

    try {
        const CantonDeleted = await Cantons.destroy({
            where: {
                id
            }
        });

        res.status(200).json({
            message: 'Canton deleted successfully',
            count: CantonDeleted
        })

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}