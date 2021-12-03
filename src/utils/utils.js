import fs from 'fs';
import crypto from 'crypto';
import { hash, compare } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

export const createIdPet = (name, sex, birth, castrated, race, specie) => {

    /* name, sex, birth, castrated, race, specie */
    /* PRIMERA LETRA NOMBRE + SEXO + AÑO NACIMIENTO + CASTRADO + PRIMERA LETRA RAZA + PRIMERA LETRA ESPECIE + numbero random 1000 to 9999  */
    /* PM2020YBP9999  */
    castrated = (`${castrated ? true : false}`).substr(0, 1);

    return (`${getFirstChar(name)}${sex}${getFullYearBirth(birth)}${castrated}${getFirstChar(specie)}${getFirstChar(race)}`).toUpperCase();
}

export const numberRandom = () => {
    return Math.random() * (9999 - 1000) + 1000;
}

export const longNumberRandom = () => {
    return crypto.randomBytes(7).toString('hex')

}

export const getFirstChar = (name) => {
    return (`${name}`).substr(0, 1);
}

export const getFullYearBirth = (birth) => {
    return (`${birth}`).substr(0, 4)
}

export const getCurrentDate = () => {
    const d = new Date();
    const Months = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    return `${d.getFullYear()}${Months[d.getMonth()]}${("00" + d.getDate()).slice(-2)}`;
}


export const uploadFileServer = (name, imagen) => {
    try {
        fs.writeFile("src/public/upload/" + name, imagen, 'base64', e => {
            if (e) console.log(e);
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteFileServer = (name) => {
    try {
        fs.unlink("src/public/upload/" + name, e => {
            if (e) console.log(e);
        });
    } catch (error) {

    }
}

export const encryp = async (data) => {
    return await hash(data, parseInt(process.env.BCRYPT_SALT_ROUNDS));
}

export const decryp = async (body, data) => { 
    return await compare(body, data);
}

export const generateToken = async (email) => {
    return jsonwebtoken.sign({ email: email }, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 365, });
}