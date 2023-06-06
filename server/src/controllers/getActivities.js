const { Activity } = require('../db');


const getActi = async (req, res) => {
    try {
        const getActivity = await Activity.findAll()
        return res.status(200).json(getActivity) 
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
}


module.exports = {
    getActi
}