import Sequelize from 'sequelize';
import { sequelize } from '../database/db-connection';

import Users from './user.model';

const Cantons = sequelize.define('cantons', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    id_province: {
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
            beforeCreate: function (city) {
                city.name = city.name.toLowerCase();
                return city;
            }
        }
    }, {
    timestamps: false
})

Cantons.hasMany(Users, { foreignKey: 'id_canton', sourceKey: 'id' })
Users.belongsTo(Cantons, { foreignKey: 'id_canton', sourceKey: 'id' })

export default Cantons;