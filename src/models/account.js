import Sequelize from 'sequelize';
import { sequelize } from '../database/db-connection';


const Accounts = sequelize.define('accounts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
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
                user.email = user.email.toLowerCase();
                user.role = `${user.role}`.toLowerCase();
                return user;
            }
        }
    }, {
    timestamps: false
})

export default Accounts;