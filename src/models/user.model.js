import Sequelize from 'sequelize';
import { sequelize } from '../database/db-connection';

import Pets from './pet.model';

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    avatar: {
        type: Sequelize.TEXT
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter first name user'
            }
        }
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter last name user'
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Please enter email user'
            },
            isEmail: true
        }
    },
    id_canton: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Please enter phone user'
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
            beforeCreate: function (user) {
                user.first_name = user.first_name.toLowerCase();
                user.last_name = user.last_name.toLowerCase();
                user.address = user.address.toLowerCase();
                user.email = user.email.toLowerCase();
                return user;
            }
        }
    }, {
    timestamps: false
})

Users.hasMany(Pets, { foreignKey: 'id_user', sourceKey: 'id' })
Pets.belongsTo(Users, { foreignKey: 'id_user', sourceKey: 'id' })

export default Users;