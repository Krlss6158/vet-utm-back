import Sequelize from 'sequelize';
import { sequelize } from '../database/db-connection';

import Imagenes from './imagenes.model';

const Pets = sequelize.define('pets', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    avatar: {
        type: Sequelize.TEXT 
    },
    lost: {
        type: Sequelize.BOOLEAN 
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter name pet'
            },
        }
    },
    birth: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    sex: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter sex pet'
            },
            isIn: {
                args: [['m', 'h', 'M', 'H']],
                msg: 'Must be m (macho), h (hembra)'
            }
        }
    },
    castrated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter castrated pet'
            }
        }
    },
    specie: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter specie pet'
            },
        }
    },
    race: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter race pet'
            },
        }
    },
    id_user: {
        type: Sequelize.STRING, 
    },
    createdAt: {
        field: 'createdat',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updatedat',
        type: Sequelize.DATE
    },
    id_pet_pather: {
        type: Sequelize.STRING,
    },
    id_pet_mother: {
        type: Sequelize.STRING,
    }
},
    {
        hooks: {
            beforeCreate: function (pet) {
                pet.description = pet.description.toLowerCase();
                pet.specie = pet.specie.toLowerCase();
                pet.name = pet.name.toLowerCase();
                pet.race = pet.race.toLowerCase();
                return pet;
            }
        }
    }, {
    timestamps: false
})

/* Pets.hasMany(Pets, { foreignKey: 'id_pet_pather', sourceKey: 'id' })
Pets.belongsTo(Pets, { foreignKey: 'id_pet_pather', sourceKey: 'id' })

Pets.hasMany(Pets, { foreignKey: 'id_pet_mother', sourceKey: 'id' })
Pets.belongsTo(Pets, { foreignKey: 'id_pet_mother', sourceKey: 'id' }) */

Pets.hasMany(Imagenes, { foreignKey: 'id_pet', sourceKey: 'id' })
Imagenes.belongsTo(Pets, { foreignKey: 'id_pet', sourceKey: 'id' })

export default Pets;