require('dotenv').config();
const axios = require('axios');
const { URL } = process.env;
const { Country, Activity } = require('../db');

const getCountries = async (req, response) => {
    try {
        const country = await Country.findAll({ include: Activity })
        if(country.length === 0) {
            const res = await axios(URL);
            const data = res.data;
            const countries = data.map((country) => {
                
                const continent = country.continents[0].toLowerCase();
                const name = country.name.common.toLowerCase();
                let id = '';  
                let capital = 'sin informacion';
                
                if (country.cca3.length > 0) {
                    id = country.cca3;
                } else id = Math.random().toString(36).substring(2, 5).toUpperCase(); 
                                
                if (Array.isArray(country.capital) && country.capital.length > 0) {
                    capital = country.capital[0].toLowerCase();
                }
                
                return {
                    id,
                    name,
                    image_flag: country.flags.svg,
                    continent,
                    capital,
                    population: country.population
                }
            })
            // console.log(countries)
            const createCountries = await Country.bulkCreate(countries);
            return response.status(202).json(createCountries);
        }
        return response.status(200).json(country)

    } catch (error) {
        response.status = 404
        return response.send({ message: error.message })
    }
};

module.exports = {
    getCountries
};