import Races from '../models/race.model';

export const createRace = async (req, res) => {
    const { name, id_specie } = req.body;

    try {

        const newRace = await Races.create({
            name,
            id_specie
        }, { fields: ['name', 'id_specie'] });

        if (newRace) {
            res.status(201).json({
                message: 'Race created successfully',
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

export const getRaces = async (req, res) => {
    try {
        const races = await Races.findAll();

        res.status(200).json({
            count: races.length,
            data: races
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}

export const getOneRace = async (req, res) => {
    const { id } = req.params;

    try {
        const race = await Races.findOne({
            where: { id }
        });

        res.status(200).json(race)
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}

export const updateRace = async (req, res) => {
    const { id } = req.params;
    const { name, id_specie } = req.body;

    try {

        const updatedRace = await Races.update({ name, id_specie }, { where: { id } })

        if (updatedRace[0]) {
            res.status(200).json({
                message: 'Race updated successfully',
                data: { name, id_specie }
            })
        } else {
            res.status(404).json({ message: 'Race not found!' })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }

}

export const deletedRace = async (req, res) => {
    const { id } = req.params;

    try {
        const RaceDeleted = await Races.destroy({
            where: {
                id
            }
        });

        res.status(200).json({
            message: 'Race deleted successfully',
            count: RaceDeleted
        })

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}