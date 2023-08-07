require("dotenv").config();
const { Sequelize } = require('sequelize');
const defineCountryModel = require('../src/models/Country');
const {
    DB_USER, DB_PASSWORD, DB_HOST,
  } = process.env;

// Configuración de la base de datos de prueba
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: false,
  native: false,
});

// Definir el modelo Country
defineCountryModel(sequelize);

// Prueba del modelo Country
describe('Country Model', () => {
  let Country;

  beforeAll(async () => {
    await sequelize.sync(); // Crear las tablas en la base de datos de prueba
    Country = sequelize.models.Country;
  });

  afterEach(async () => {
    await Country.destroy({ where: {} }); // Eliminar todos los registros después de cada prueba
  });

  it('should create a country', async () => {
    const country = await Country.create({
      id: 'USA',
      name: 'United States',
      image_flag: 'usa-flag.jpg',
      continent: 'North America',
      capital: 'Washington, D.C.',
      subregion: 'Northern America',
      area: 9629091,
      population: '331449281',
    });

    expect(country.id).toBe('USA');
    expect(country.name).toBe('United States');
    expect(country.image_flag).toBe('usa-flag.jpg');
    expect(country.continent).toBe('North America');
    expect(country.capital).toBe('Washington, D.C.');
    expect(country.subregion).toBe('Northern America');
    expect(country.area).toBe(9629091);
    expect(country.population).toBe('331449281');
  });

 
});
