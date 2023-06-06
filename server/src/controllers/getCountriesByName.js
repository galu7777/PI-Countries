const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

const getCountriesByName = async (req, res) => {
  const { name } = req.query;
  try {
    const minName = name.toLowerCase();
    const foundCountries = await Country.findAll({
      where: {
        name: {
            [Op .startsWith]: minName
        },
        include: Activity
      },
    });
    if (foundCountries.length === 0) {
      return res.status(404).send({ message: "No countries found" });
    }
    return res.status(200).json(foundCountries);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

module.exports = {
  getCountriesByName,
};
