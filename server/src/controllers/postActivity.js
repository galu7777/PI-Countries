const { Activity } = require('../db');

const postActivity = async(req, res) => {
    const { CountryId, name, difficulty, season, duration } = req.body;
    try {
        if( difficulty < 1 || difficulty > 5  ) {
            throw new Error('the difficulty has to have a rank between 1 to 5')
        };

        const newActivity = {
            name, difficulty, season, duration
        };

        const createActivity = await Activity.create(newActivity);
        await createActivity.addCountries(CountryId);

        const activities = await Activity.findAll()
        return res.status(200).json(activities);
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
};

module.exports = {
    postActivity
};
