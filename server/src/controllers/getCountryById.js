const { Country, Activity } = require('../db');

const getCountryById = async (req, res) => {
    const { id } = req.params;

    try {
        const ID = id.toUpperCase();
        if(ID.length < 4) {
            const data = await Country.findOne({
                where: {
                    id: ID
                },
                include: Activity
            })
            const result = [data]
            return res.status(200).json(result)
        } else { 
            return res.status(404).send({ message: 'El id tiene que tener minimo y maximo de 3 caracteres' });
         }
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
}


module.exports = {
    getCountryById
}