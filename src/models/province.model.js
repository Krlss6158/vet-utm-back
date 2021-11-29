import Sequelize from 'sequelize';
import { sequelize } from '../database/db-connection';

import Cantons from './canton.model';

const Provinces = sequelize.define('provinces', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
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
            beforeCreate: function (province) {
                province.name = province.name.toLowerCase();
                return province;
            }
        }
    }
    , {
        timestamps: false
    })

Provinces.hasMany(Cantons, { foreignKey: 'id_province', sourceKey: 'id' })
Cantons.belongsTo(Provinces, { foreignKey: 'id_province', sourceKey: 'id' })

export default Provinces;