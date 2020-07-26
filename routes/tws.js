const express = require('express');
const router = express.Router();

const testMiddleWare = require('../middelwares/test');

router.get('/', testMiddleWare, (req, res) => {
    res.status(200).send('Get Tws2')
    // res.status(200);
})

router.get('/:twId', (req, res) => {
    twId = req.params.twId
    res.status(200).send('Get Tw ' + twId)
})

router.post('/:twId', (req, res) => {
    console.log(req.body.message);
    res.status(200).send('Post Tws2 ' + req.body.message);
})

module.exports = router;