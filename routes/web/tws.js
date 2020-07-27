const express = require('express');
const router = express.Router();
const Tw = require('../../models/Tw');

router.get('/', (req, res) => {

    const tws = [];
    const error = false;

    Tw.find()
        .lean()
        .exec()
        .then(tws => {
            console.log(tws);
            res.render('tws', {
                tws: tws,
                error: error
            });
        })
        .catch(err => {

        })
    
    

});

router.patch('/:twId', (req, res) => {
    
})


module.exports = router;