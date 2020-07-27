const express = require('express');
const router = express.Router();

const testMiddleWare = require('../../middelwares/test');

var tws = [{id: 0, message: 'Test 1'},
             {id: 12, message: 'Test 2'},
             {id: 2, message: 'Test 3'}
];

router.get('/', testMiddleWare, (req, res) => {
    res.status(200).json(tws);
});

router.get('/:twId', (req, res) => {
    twId = req.params.twId;
    tw = tws.filter((tw) => {
        return tw.id == twId;
    });
    res.status(200).json(tw);

});

router.post('/', (req, res) => {
    console.log(req.body.message);
    tws.push({
        id: 7,
        message: req.body.message
    })
    // res.status(200).send('Post Tws2 ' + req.body.message);
    res.status(200).json(tws);

});

router.patch('/:twId', (req, res) => {
    twId = req.params.twId;
    message = req.body.message;

    tws = tws.filter((tw) => {
        if(tw.id == twId){
            // console.log(twId);
            tw.message = message
        }
        return tws;
    });

    res.status(200).json(tws);
});

router.delete('/:twId', (req, res) => {
    twId = req.params.twId;
    tws = tws.filter((tw) => {
        return tw.id != twId;
    });
    res.status(200).json(tws);
})

module.exports = router;