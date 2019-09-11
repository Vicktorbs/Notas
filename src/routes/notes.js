// Enrutador 
const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.send('DB notes')
})

module.exports = router;