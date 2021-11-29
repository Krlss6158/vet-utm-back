import Species from '../models/specie.model';

export const createSpecie = async (req, res) => {
    const { name } = req.body;

    try {

        const newSpecie = await Species.create({ name }, { fields: ['name'] });

        if (newSpecie) {
            res.status(201).json({
                message: 'Specie created successfully',
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

export const getSpecies = async (req, res) => {
    try {
        const species = await Species.findAll();

        res.status(200).json({
            count: species.length,
            data: species
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}

export const getOneSpecie = async (req, res) => {
    const { id } = req.params;

    try {
        const specie = await Species.findOne({
            where: { id }
        });

        res.status(200).json(specie)
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}

export const updateSpecie = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {

        const updatedSpecie = await Species.update({ name }, { where: { id } })

        if (updatedSpecie[0]) {
            res.status(200).json({
                message: 'Specie updated successfully',
                data: { name }
            })
        } else {
            res.status(404).json({ message: 'Specie not found!' })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }

}

export const deletedSpecie = async (req, res) => {
    const { id } = req.params;

    try {
        const SpecieDeleted = await Species.destroy({
            where: {
                id
            }
        });

        res.status(200).json({
            message: 'Specie deleted successfully',
            count: SpecieDeleted
        })

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        })
    }
}