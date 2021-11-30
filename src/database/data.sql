/* psql -U postgres */

DROP DATABASE IF EXISTS vet_utm;

CREATE DATABASE vet_utm;

\l

\c vet_utm;

CREATE TABLE provinces (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    createdAt DATE,
    updatedAt DATE
);

CREATE TABLE cantons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    id_province INTEGER NOT NULL,
    createdAt DATE,
    updatedAt DATE,
    FOREIGN KEY (id_province) REFERENCES provinces(id)
);

CREATE TABLE users (
    id VARCHAR(13) PRIMARY KEY,
    avatar TEXT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    id_canton INTEGER NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(12) UNIQUE,
    createdAt DATE,
    updatedAt DATE,
    FOREIGN KEY (id_canton) REFERENCES cantons (id)
);

CREATE TYPE sex_type AS ENUM ('m', 'h', 'M', 'H');

CREATE TABLE pets (
    id CHAR(14) PRIMARY KEY,
    avatar TEXT,
    name VARCHAR(255) NOT NULL,
    birth DATE,
    description TEXT,
    sex sex_type,
    castrated BOOLEAN,
    specie TEXT,
    race TEXT,
    lost BOOLEAN,
    createdAt DATE,
    updatedAt DATE,
    id_user VARCHAR(13),
    id_pet_pather CHAR(14) DEFAULT NULL,
    id_pet_mother CHAR(14) DEFAULT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_pet_pather) REFERENCES pets(id),
    FOREIGN KEY (id_pet_mother) REFERENCES pets(id)
);


CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    name TEXT,
    url TEXT, 
    id_pet CHAR(14), 
    FOREIGN KEY (id_pet) REFERENCES pets(id)
);


/* provinces data */
INSERT INTO provinces(name) VALUES ('Azuay');
INSERT INTO provinces(name) VALUES ('Bolivar');
INSERT INTO provinces(name) VALUES ('Cañar');
INSERT INTO provinces(name) VALUES ('Carchi');
INSERT INTO provinces(name) VALUES ('Chimborazo');
INSERT INTO provinces(name) VALUES ('Cotopaxi');
INSERT INTO provinces(name) VALUES ('El Oro');
INSERT INTO provinces(name) VALUES ('Esmeraldas');
INSERT INTO provinces(name) VALUES ('Galapagos');
INSERT INTO provinces(name) VALUES ('Guayas');
INSERT INTO provinces(name) VALUES ('Imbabura');
INSERT INTO provinces(name) VALUES ('Loja');
INSERT INTO provinces(name) VALUES ('Los Rios');
INSERT INTO provinces(name) VALUES ('Manabi');
INSERT INTO provinces(name) VALUES ('Morona Santiago');
INSERT INTO provinces(name) VALUES ('Napo');
INSERT INTO provinces(name) VALUES ('Orellana');
INSERT INTO provinces(name) VALUES ('Pastaza');
INSERT INTO provinces(name) VALUES ('Pichincha');
INSERT INTO provinces(name) VALUES ('Santa Elena');
INSERT INTO provinces(name) VALUES ('Santo Domingo de los Tsachilas');
INSERT INTO provinces(name) VALUES ('Sucumbios');
INSERT INTO provinces(name) VALUES ('Tungurahua');
INSERT INTO provinces(name) VALUES ('Zamora Chinchipe');

/* citys data */
INSERT INTO cantons (name, id_province) VALUES('San Lorenzo',8);
INSERT INTO cantons (name, id_province) VALUES('Eloy Alfaro',8);
INSERT INTO cantons (name, id_province) VALUES('Rioverde',8);
INSERT INTO cantons (name, id_province) VALUES('Esmeraldas',8);
INSERT INTO cantons (name, id_province) VALUES('Muisne',8);
INSERT INTO cantons (name, id_province) VALUES('Atacames',8);
INSERT INTO cantons (name, id_province) VALUES('Quininde',8);
INSERT INTO cantons (name, id_province) VALUES('Tulcan',4);
INSERT INTO cantons (name, id_province) VALUES('Mira',4);
INSERT INTO cantons (name, id_province) VALUES('Espejo',4);
INSERT INTO cantons (name, id_province) VALUES('Montufar',4);
INSERT INTO cantons (name, id_province) VALUES('San Pedro de Huaca',4);
INSERT INTO cantons (name, id_province) VALUES('Bolivar (Carchi)',4);
INSERT INTO cantons (name, id_province) VALUES('Ibarra',11);
INSERT INTO cantons (name, id_province) VALUES('San Miguel de Urcuqui',11);
INSERT INTO cantons (name, id_province) VALUES('Cotacachi',11);
INSERT INTO cantons (name, id_province) VALUES('Antonio Ante',11);
INSERT INTO cantons (name, id_province) VALUES('Otavalo',11);
INSERT INTO cantons (name, id_province) VALUES('Pimampiro',11);
INSERT INTO cantons (name, id_province) VALUES('Sucumbios',22);
INSERT INTO cantons (name, id_province) VALUES('Gonzalo Pizarro',22);
INSERT INTO cantons (name, id_province) VALUES('Cascales',22);
INSERT INTO cantons (name, id_province) VALUES('Lago Agrio',22);
INSERT INTO cantons (name, id_province) VALUES('Putumayo',22);
INSERT INTO cantons (name, id_province) VALUES('Cuyabeno',22);
INSERT INTO cantons (name, id_province) VALUES('Shushufindi',22);
INSERT INTO cantons (name, id_province) VALUES('Pedernales',14);
INSERT INTO cantons (name, id_province) VALUES('Chone',14);
INSERT INTO cantons (name, id_province) VALUES('Flavio Alfaro',14);
INSERT INTO cantons (name, id_province) VALUES('El Carmen',14);
INSERT INTO cantons (name, id_province) VALUES('Jama',14);
INSERT INTO cantons (name, id_province) VALUES('San Vicente',14);
INSERT INTO cantons (name, id_province) VALUES('Sucre',14);
INSERT INTO cantons (name, id_province) VALUES('Tosagua',14);
INSERT INTO cantons (name, id_province) VALUES('Rocafuerte',14);
INSERT INTO cantons (name, id_province) VALUES('Junin',14);
INSERT INTO cantons (name, id_province) VALUES('Bolivar (Manabi)',14);
INSERT INTO cantons (name, id_province) VALUES('Pichincha',14);
INSERT INTO cantons (name, id_province) VALUES('Portoviejo',14);
INSERT INTO cantons (name, id_province) VALUES('Jaramijo',14);
INSERT INTO cantons (name, id_province) VALUES('Manta',14);
INSERT INTO cantons (name, id_province) VALUES('Montecristi',14);
INSERT INTO cantons (name, id_province) VALUES('Santa Ana',14);
INSERT INTO cantons (name, id_province) VALUES('Jipijapa',14);
INSERT INTO cantons (name, id_province) VALUES('Veinticuatro de Mayo',14);
INSERT INTO cantons (name, id_province) VALUES('Olmedo (Manabi)',14);
INSERT INTO cantons (name, id_province) VALUES('Puerto Lopez',14);
INSERT INTO cantons (name, id_province) VALUES('Pajan',14);
INSERT INTO cantons (name, id_province) VALUES('La Concordia',21);
INSERT INTO cantons (name, id_province) VALUES('Santo Domingo',21);
INSERT INTO cantons (name, id_province) VALUES('Puerto Quito',19);
INSERT INTO cantons (name, id_province) VALUES('Pedro Vicente Maldonado',19);
INSERT INTO cantons (name, id_province) VALUES('San Miguel de Los Bancos',19);
INSERT INTO cantons (name, id_province) VALUES('Distrito Metropolitano de Quito',19);
INSERT INTO cantons (name, id_province) VALUES('Pedro Moncayo',19);
INSERT INTO cantons (name, id_province) VALUES('Cayambe',19);
INSERT INTO cantons (name, id_province) VALUES('Rumiñahui',19);
INSERT INTO cantons (name, id_province) VALUES('Mejia',19);
INSERT INTO cantons (name, id_province) VALUES('El Chaco',16);
INSERT INTO cantons (name, id_province) VALUES('Quijos',16);
INSERT INTO cantons (name, id_province) VALUES('Archidona',16);
INSERT INTO cantons (name, id_province) VALUES('Tena',16);
INSERT INTO cantons (name, id_province) VALUES('Carlos Julio Arosemena Tola',16);
INSERT INTO cantons (name, id_province) VALUES('Loreto',17);
INSERT INTO cantons (name, id_province) VALUES('Francisco de Orellana',17);
INSERT INTO cantons (name, id_province) VALUES('La Joya de los Sachas',17);
INSERT INTO cantons (name, id_province) VALUES('Aguarico',17); 
INSERT INTO cantons (name, id_province) VALUES('Mera',18);
INSERT INTO cantons (name, id_province) VALUES('Santa Clara',18);
INSERT INTO cantons (name, id_province) VALUES('Arajuno',18);
INSERT INTO cantons (name, id_province) VALUES('Pastaza',18);
INSERT INTO cantons (name, id_province) VALUES('Buena Fe',13);
INSERT INTO cantons (name, id_province) VALUES('Valencia',13);
INSERT INTO cantons (name, id_province) VALUES('Quevedo',13);
INSERT INTO cantons (name, id_province) VALUES('Quinsaloma',13);
INSERT INTO cantons (name, id_province) VALUES('Palenque',13);
INSERT INTO cantons (name, id_province) VALUES('Mocache',13);
INSERT INTO cantons (name, id_province) VALUES('Ventanas',13);
INSERT INTO cantons (name, id_province) VALUES('Vinces',13);
INSERT INTO cantons (name, id_province) VALUES('Baba',13);
INSERT INTO cantons (name, id_province) VALUES('Puebloviejo',13);
INSERT INTO cantons (name, id_province) VALUES('Urdaneta',13);
INSERT INTO cantons (name, id_province) VALUES('Babahoyo',13);
INSERT INTO cantons (name, id_province) VALUES('Montalvo',6);
INSERT INTO cantons (name, id_province) VALUES('Sigchos',6);
INSERT INTO cantons (name, id_province) VALUES('La Mana',6);
INSERT INTO cantons (name, id_province) VALUES('Latacunga',6);
INSERT INTO cantons (name, id_province) VALUES('Saquisili',6);
INSERT INTO cantons (name, id_province) VALUES('Pujili',6);
INSERT INTO cantons (name, id_province) VALUES('Pangua',6);
INSERT INTO cantons (name, id_province) VALUES('Salcedo',2);
INSERT INTO cantons (name, id_province) VALUES('Guaranda',2);
INSERT INTO cantons (name, id_province) VALUES('Las Naves',2);
INSERT INTO cantons (name, id_province) VALUES('Echeandia',2);
INSERT INTO cantons (name, id_province) VALUES('Caluma',2);
INSERT INTO cantons (name, id_province) VALUES('Chimbo',2);
INSERT INTO cantons (name, id_province) VALUES('San Miguel',2);
INSERT INTO cantons (name, id_province) VALUES('Chillanes',23);
INSERT INTO cantons (name, id_province) VALUES('Ambato',23);
INSERT INTO cantons (name, id_province) VALUES('Pillaro',23);
INSERT INTO cantons (name, id_province) VALUES('Patate',23);
INSERT INTO cantons (name, id_province) VALUES('Baños',23);
INSERT INTO cantons (name, id_province) VALUES('Pelileo',23);
INSERT INTO cantons (name, id_province) VALUES('Cevallos',23);
INSERT INTO cantons (name, id_province) VALUES('Tisaleo',23);
INSERT INTO cantons (name, id_province) VALUES('Mocha',23);
INSERT INTO cantons (name, id_province) VALUES('Quero',5);
INSERT INTO cantons (name, id_province) VALUES('Guano',5);
INSERT INTO cantons (name, id_province) VALUES('Penipe',5);
INSERT INTO cantons (name, id_province) VALUES('Riobamba',5);
INSERT INTO cantons (name, id_province) VALUES('Colta',5);
INSERT INTO cantons (name, id_province) VALUES('Chambo',5);
INSERT INTO cantons (name, id_province) VALUES('Pallatanga',5);
INSERT INTO cantons (name, id_province) VALUES('Guamote',5);
INSERT INTO cantons (name, id_province) VALUES('Alausi',5);
INSERT INTO cantons (name, id_province) VALUES('Cumanda',5);
INSERT INTO cantons (name, id_province) VALUES('Chunchi',15);
INSERT INTO cantons (name, id_province) VALUES('Palora',15);
INSERT INTO cantons (name, id_province) VALUES('Pablo Sexto',15);
INSERT INTO cantons (name, id_province) VALUES('Huamboya',15);
INSERT INTO cantons (name, id_province) VALUES('Morona',15);
INSERT INTO cantons (name, id_province) VALUES('Taisha',15);
INSERT INTO cantons (name, id_province) VALUES('Sucua',15);
INSERT INTO cantons (name, id_province) VALUES('Santiago',15);
INSERT INTO cantons (name, id_province) VALUES('Logroño',15);
INSERT INTO cantons (name, id_province) VALUES('Tiwintza',15);
INSERT INTO cantons (name, id_province) VALUES('Limon Indanza',15);
INSERT INTO cantons (name, id_province) VALUES('San Juan Bosco',15);
INSERT INTO cantons (name, id_province) VALUES('Gualaquiza',10);
INSERT INTO cantons (name, id_province) VALUES('El Empalme',10);
INSERT INTO cantons (name, id_province) VALUES('Balzar',10);
INSERT INTO cantons (name, id_province) VALUES('Colimes',10);
INSERT INTO cantons (name, id_province) VALUES('Palestina',10);
INSERT INTO cantons (name, id_province) VALUES('Santa Lucia',10);
INSERT INTO cantons (name, id_province) VALUES('Pedro Carbo',10);
INSERT INTO cantons (name, id_province) VALUES('Isidro Ayora',10);
INSERT INTO cantons (name, id_province) VALUES('Lomas de Sargentillo',10);
INSERT INTO cantons (name, id_province) VALUES('Nobol',10);
INSERT INTO cantons (name, id_province) VALUES('Daule',10);
INSERT INTO cantons (name, id_province) VALUES('Salitre',10);
INSERT INTO cantons (name, id_province) VALUES('Samborondon',10);
INSERT INTO cantons (name, id_province) VALUES('Yaguachi',10);
INSERT INTO cantons (name, id_province) VALUES('Alfredo Baquerizo Moreno',10);
INSERT INTO cantons (name, id_province) VALUES('Milagro',10);
INSERT INTO cantons (name, id_province) VALUES('Simon Bolivar',10);
INSERT INTO cantons (name, id_province) VALUES('Naranjito',10);
INSERT INTO cantons (name, id_province) VALUES('General Antonio Elizalde',10);
INSERT INTO cantons (name, id_province) VALUES('Coronel Marcelino Maridueña',10);
INSERT INTO cantons (name, id_province) VALUES('El Triunfo',10);
INSERT INTO cantons (name, id_province) VALUES('Duran',10);
INSERT INTO cantons (name, id_province) VALUES('Guayaquil',10);
INSERT INTO cantons (name, id_province) VALUES('Playas',10);
INSERT INTO cantons (name, id_province) VALUES('Naranjal',10);
INSERT INTO cantons (name, id_province) VALUES('Balao',20);
INSERT INTO cantons (name, id_province) VALUES('Santa Elena',20);
INSERT INTO cantons (name, id_province) VALUES('La Libertad',20);
INSERT INTO cantons (name, id_province) VALUES('Salinas',3);
INSERT INTO cantons (name, id_province) VALUES('La Troncal',3);
INSERT INTO cantons (name, id_province) VALUES('Cañar',3);
INSERT INTO cantons (name, id_province) VALUES('Suscal',3);
INSERT INTO cantons (name, id_province) VALUES('El Tambo',3);
INSERT INTO cantons (name, id_province) VALUES('Azogues',3);
INSERT INTO cantons (name, id_province) VALUES('Biblian',3);
INSERT INTO cantons (name, id_province) VALUES('Deleg',1);
INSERT INTO cantons (name, id_province) VALUES('Sevilla de Oro',1);
INSERT INTO cantons (name, id_province) VALUES('Paute',1);
INSERT INTO cantons (name, id_province) VALUES('Guachapala',1);
INSERT INTO cantons (name, id_province) VALUES('El Pan',1);
INSERT INTO cantons (name, id_province) VALUES('Gualaceo',1);
INSERT INTO cantons (name, id_province) VALUES('Chordeleg',1);
INSERT INTO cantons (name, id_province) VALUES('Sigsig',1);
INSERT INTO cantons (name, id_province) VALUES('Cuenca',1);
INSERT INTO cantons (name, id_province) VALUES('Santa Isabel',1);
INSERT INTO cantons (name, id_province) VALUES('Pucara',1);
INSERT INTO cantons (name, id_province) VALUES('Camilo Ponce Enriquez',1);
INSERT INTO cantons (name, id_province) VALUES('San Fernando',1);
INSERT INTO cantons (name, id_province) VALUES('Giron',1);
INSERT INTO cantons (name, id_province) VALUES('Nabon',1);
INSERT INTO cantons (name, id_province) VALUES('Oña',7);
INSERT INTO cantons (name, id_province) VALUES('El Guabo',7);
INSERT INTO cantons (name, id_province) VALUES('Machala',7);
INSERT INTO cantons (name, id_province) VALUES('Pasaje',7);
INSERT INTO cantons (name, id_province) VALUES('Chilla',7);
INSERT INTO cantons (name, id_province) VALUES('Zaruma',7);
INSERT INTO cantons (name, id_province) VALUES('Santa Rosa',7);
INSERT INTO cantons (name, id_province) VALUES('Atahualpa',7);
INSERT INTO cantons (name, id_province) VALUES('Arenillas',7);
INSERT INTO cantons (name, id_province) VALUES('Huaquillas',7);
INSERT INTO cantons (name, id_province) VALUES('Las Lajas',7);
INSERT INTO cantons (name, id_province) VALUES('Marcabeli',7);
INSERT INTO cantons (name, id_province) VALUES('Balsas',7);
INSERT INTO cantons (name, id_province) VALUES('Piñas',7);
INSERT INTO cantons (name, id_province) VALUES('Portovelo',12);
INSERT INTO cantons (name, id_province) VALUES('Saraguro',12);
INSERT INTO cantons (name, id_province) VALUES('Loja',12);
INSERT INTO cantons (name, id_province) VALUES('Chaguarpamba',12);
INSERT INTO cantons (name, id_province) VALUES('Olmedo (Loja)',12);
INSERT INTO cantons (name, id_province) VALUES('Catamayo',12);
INSERT INTO cantons (name, id_province) VALUES('Paltas',12);
INSERT INTO cantons (name, id_province) VALUES('Puyango',12);
INSERT INTO cantons (name, id_province) VALUES('Pindal',12);
INSERT INTO cantons (name, id_province) VALUES('Celica',12);
INSERT INTO cantons (name, id_province) VALUES('Zapotillo',12);
INSERT INTO cantons (name, id_province) VALUES('Macara',12);
INSERT INTO cantons (name, id_province) VALUES('Sozoranga',12);
INSERT INTO cantons (name, id_province) VALUES('Calvas',12);
INSERT INTO cantons (name, id_province) VALUES('Gonzanama',12);
INSERT INTO cantons (name, id_province) VALUES('Quilanga',12);
INSERT INTO cantons (name, id_province) VALUES('Espindola',24);
INSERT INTO cantons (name, id_province) VALUES('Yacuambi',24);
INSERT INTO cantons (name, id_province) VALUES('Yantzaza',24);
INSERT INTO cantons (name, id_province) VALUES('El Pangui',24);
INSERT INTO cantons (name, id_province) VALUES('Zamora',24);
INSERT INTO cantons (name, id_province) VALUES('Centinela del Condor',24);
INSERT INTO cantons (name, id_province) VALUES('Paquisha',24);
INSERT INTO cantons (name, id_province) VALUES('Nangaritza',24);
INSERT INTO cantons (name, id_province) VALUES('Palanda',24);
INSERT INTO cantons (name, id_province) VALUES('Chinchipe',9);
INSERT INTO cantons (name, id_province) VALUES('Isabela',9);
INSERT INTO cantons (name, id_province) VALUES('San Cristobal',9);


INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('2017709598', 'Nickola', 'Crankhorn', 'ncrankhorn0@google.pl', 15, '68015 Fremont Way', '3425724063');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('7234985080', 'Scot', 'Revie', 'srevie1@last.fm', 20, '2 Ruskin Parkway', '8169756453');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('2056938220', 'Rafaelia', 'Flaxman', 'rflaxman2@uol.com.br', 15, '70 Gulseth Way', '2302075744');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('2521160856', 'Bern', 'Samper', 'bsamper3@utexas.edu', 15, '495 Northland Trail', '4192496577');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('3959528966', 'Franni', 'O'' Mara', 'fomara4@washingtonpost.com', 20, '903 Corry Circle', '3721204604');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('2684103762', 'Trudy', 'Kopje', 'tkopje5@china.com.cn', 15, '8 Cottonwood Junction', '9951121268');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('9351138337', 'Godfree', 'Zorzutti', 'gzorzutti6@shinystat.com', 15, '5100 Larry Parkway', '9258951057');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('8295119000', 'Hillie', 'Tappington', 'htappington7@disqus.com', 15, '1212 Dorton Point', '4221016697');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('9437736340', 'Harmonia', 'Christoforou', 'hchristoforou8@themeforest.net', 20, '9 Debra Way', '5515425646');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('7176968224', 'Lane', 'Martinot', 'lmartinot9@skype.com', 20, '03082 Northridge Plaza', '4304034306');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('2221436625', 'Payton', 'Klimaszewski', 'pklimaszewskia@infoseek.co.jp', 20, '330 Johnson Hill', '7808086091');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('7364204630', 'Joelie', 'Hindhaugh', 'jhindhaughb@diigo.com', 15, '888 Veith Place', '3478060118');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('7608398940', 'Bellanca', 'Pollastro', 'bpollastroc@craigslist.org', 20, '52 Kropf Park', '7207589682');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('7045716317', 'Deloria', 'Chapiro', 'dchapirod@gnu.org', 20, '18 Leroy Trail', '3245076617');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('9928042956', 'Ozzy', 'Stoyle', 'ostoylee@ucoz.com', 15, '963 Vidon Alley', '2992491814');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('4316432556', 'Pernell', 'Westmarland', 'pwestmarlandf@simplemachines.org', 20, '5 Mayer Plaza', '9387901310');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('2917423544', 'Melantha', 'Mabon', 'mmabong@google.com.br', 20, '67159 Dixon Road', '5673374336');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('3101495228', 'Darlene', 'Saltman', 'dsaltmanh@timesonline.co.uk', 15, '3898 Main Way', '9008044276');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('6004171425', 'Raina', 'Croshaw', 'rcroshawi@flavors.me', 20, '0334 Portage Avenue', '4641855033');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('4421825728', 'Kary', 'Philcott', 'kphilcottj@trellian.com', 15, '20644 Meadow Valley Crossing', '7745225766');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('4065350760', 'Marmaduke', 'Goublier', 'mgoublierk@wordpress.org', 20, '05242 Hayes Lane', '1843995507');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('6853408972', 'Ruggiero', 'Melbury', 'rmelburyl@google.com.au', 20, '75445 Duke Court', '2552960237');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('6177124244', 'Suzy', 'Ximenez', 'sximenezm@example.com', 15, '46 Briar Crest Place', '5031503266');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('2397423397', 'Jareb', 'Ragbourne', 'jragbournen@wisc.edu', 20, '1 Colorado Plaza', '8761777065');
INSERT INTO users (id, first_name, last_name, email, id_canton, address, phone) VALUES ('7477288245', 'Dayna', 'Clapshaw', 'dclapshawo@ebay.co.uk', 15, '16588 Sommers Drive', '7487935737');







/* PRIMERA LETRA NOMBRE + AÑO + MES + DIA + SEXO + AÑO NACIMIENTO + CASTRADO + PRIMERA LETRA RAZA + PRIMERA LETRA ESPECIE  */
/* P2021M21M2020YBP  */



