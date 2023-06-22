const { Activity } = require('../db');

const deleteActivity = async (req, res) => {
    const { id } = req.params;
    try {
        const activity = await Activity.findByPk(id);
        if(activity) {
            await Activity.destroy({
                where: {
                    id,
                }
            });
        };
        const activities = await Activity.findAll()
        // return res.status(200).send({ message: 'the activity delete success' })
        return res.status(200).send(activities)
    } catch (error) {
        return res.status(404).send({ message: error.messsage })
    }
}

module.exports = {
    deleteActivity
}