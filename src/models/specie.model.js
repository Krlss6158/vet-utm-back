import Sequelize from 'sequelize';
import { sequelize } from '../database/db-connection';

import Races from './race.model';
import Pets from './pet.model';

const Species = sequelize.define('species', {
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
            beforeCreate: function (specie) {
                specie.name = specie.name.toLowerCase();
                return specie;
            }
        }
    }, {
    timestamps: false
})

Species.hasMany(Races, { foreignKey: 'id_specie', sourceKey: 'id' })
Races.belongsTo(Species, { foreignKey: 'id_specie', sourceKey: 'id' })

Species.hasMany(Pets, { foreignKey: 'id_specie', sourceKey: 'id' })
Pets.belongsTo(Species, { foreignKey: 'id_specie', sourceKey: 'id' })

export default Species;