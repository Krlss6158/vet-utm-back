export const createIdPet = (name, sex, birth, castrated, race, specie) => {
    /* name, sex, birth, castrated, race, specie */
    /* PRIMERA LETRA NOMBRE + AÑO + MES + DIA + SEXO + AÑO NACIMIENTO + CASTRADO + PRIMERA LETRA RAZA + PRIMERA LETRA ESPECIE  */
    /* P2021M21M2020YBP  */
    castrated = (`${castrated ? true : false}`).substr(0, 1);

    return (`${getFirstChar(name)}${getCurrentDate()}${sex}${getFullYearBirth(birth)}${castrated}${getFirstChar(specie)}${getFirstChar(race)}`).toUpperCase();

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