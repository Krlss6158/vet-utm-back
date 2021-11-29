import Sequelize from 'sequelize';
import { sequelize } from '../database/db-connection';

const Imagenes = sequelize.define('images', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT
    },
    url: {
        type: Sequelize.TEXT
    },
    id_pet: {
        type: Sequelize.STRING,
    }
}, {
    timestamps: false
})

export default Imagenes;