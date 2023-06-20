require("dotenv").config();
const { Sequelize } = require('sequelize');
const defineActivityModel = require('../src/models/Activity');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

// Configuración de la base de datos de prueba
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: false,
  native: false,
});

// Definir el modelo Activity
defineActivityModel(sequelize);

// Prueba del modelo Activity
describe('Activity Model', () => {
  let Activity;

  beforeAll(async () => {
    await sequelize.sync(); // Crear las tablas en la base de datos de prueba
    Activity = sequelize.models.Activity;
  });

  afterEach(async () => {
    await Activity.destroy({ where: {} }); // Eliminar todos los registros después de cada prueba
  });

  it('should create an activity', async () => {
    const activity = await Activity.create({
      name: 'Hiking',
      difficulty: 'Moderate',
      season: 'Summer',
      duration: '2 hours',
    });

    expect(activity.name).toBe('Hiking');
    expect(activity.difficulty).toBe('Moderate');
    expect(activity.season).toBe('Summer');
    expect(activity.duration).toBe('2 hours');
  });

  it('should not allow null values for required fields', async () => {
    expect.assertions(1);

    try {
      await Activity.create({
        name: null,
        difficulty: 'Easy',
        season: 'Spring',
        duration: '1 hour',
      });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

});
