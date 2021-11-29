import Sequelize from 'sequelize';
import { sequelize } from '../database/db-connection';

const Races = sequelize.define('races', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Please enter name province'
            }
        }
    },
    id_specie: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    createdAt: {
        field: 'createdat',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updatedat',
        type: Sequelize.DATE
    }
},
    {
        hooks: {
            beforeCreate: function (race) {
                race.name = race.name.toLowerCase();
                return race;
            }
        }
    }, {
    timestamps: false
})

export default Races;