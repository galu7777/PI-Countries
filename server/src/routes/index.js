const router = require("express").Router();
const { getCountries } = require('../controllers/getCountries');
const { getCountryById } = require("../controllers/getCountryById");
const { getCountriesByName } = require("../controllers/getCountriesByName");
const { postActivity } = require("../controllers/postActivity");
const { getActi } = require("../controllers/getActivities");

router.get('/', getCountries);

router.get('/search', (req, res) => {
    getCountriesByName(req, res)
});

router.get('/acti', (req, res) => {
    getActi(req, res)
})


router.post('/', (req, res) => {
    postActivity(req, res)
});

router.get('/:id', (req, res) => {
    getCountryById(req, res)
});


module.exports = router;
