const express = require('express');
const router = express.Router();
const Tw = require('../../models/Tw');
const testMiddleWare = require('../../middelwares/test');
const mongoose = require('mongoose');

var tws = [];

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
    if(req.body.message && req.body.message != ""){
        const tw = new Tw({
            _id: new mongoose.Types.ObjectId(),
            message: req.body.message
        })
        tw.save()
            .then(tw => {
                res.status(200).send(tw);
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
    }else{
        res.status(500).json({error: "Please put some values!"});
    }
    // res.status(200).send('Post Tws2 ' + req.body.message);
    // res.status(200).json(tws);

});

router.patch('/:twId', async(req, res, next) => {
    const postData = req.body;
    console.log(req.params.twId)
    const tw = await Tw.findByIdAndUpdate(req.params.twId, postData, { new: true });
    if(!tw){
        next(new PostNotFoundException(id));
    }else{
        return res.status(200).send(tw);
    }
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

router.delete('/', (req, res) => {
    Tw.remove({ _id: req.body.id }, (err) => {
        if (!err) {
            return res.status(200).send('deleted!');
        } else {
            return res.status(500).send('Error deleting!');
        }
    });
    // tws = tws.filter((tw) => {
    //     return tw.id != twId;
    // });
    // res.status(200).json(tws);
})

module.exports = router;