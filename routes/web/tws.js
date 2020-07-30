const express = require('express');
const router = express.Router();
const Tw = require('../../models/Tw');
const mongoose = require('mongoose');

var list = (req, res, msg = '') => {
    var error = false;

    Tw.find()
        .sort({createdAt:-1})
        .lean()
        .exec()
        .then(tws => {
            res.render('tws/tws', {
                tws: tws,
                error: error,
                msg: msg,
            });
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
}

router.get('/', (req, res) => {

    list(req, res)

});

router.get('/show/:twId', (req, res) => {
    Tw.findOne({_id: req.params.twId})
        .lean()
        .exec()
        .then(tw => {
            res.render('tws/show', {
                tw: tw
            });
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
});


router.post('/', (req, res) => {
    if (req.body.message && req.body.message != "") {
        const tw = new Tw({
            _id: new mongoose.Types.ObjectId(),
            message: req.body.message
        })

        tw.save()
            .then(tw => {
                res.redirect('/tws/success/Tw well updated');
            })
            .catch(err => {
                res.status(500).json({error: err});    
            })
    } else {
        res.redirect('/tws/danger/Please put some value');
    }
})

router.post('/update/:twId', (req, res) => {
    twId = req.params.twId;
    message = req.body.message;

    if (req.body.message && req.body.message != "") {
        Tw.update({ _id: twId }, {
                $set: {
                    message: req.body.message,
                }
            })
            .exec()
            .then(tw => {
                res.redirect('/tws/success/Tw well updated');
            })
            .catch(err => {
                res.redirect('/tws/danger/'+err);
            });
    } else {
        res.redirect('/tws/danger/Please put some value');
    }
})

router.get('/delete/:twId', (req, res) => {
    twId = req.params.twId;

    Tw.remove({ _id: twId }, (err) => {
        if (!err) {
            res.redirect('/tws/success/Tw well deleted!');
        } else {
            error = err;
            console.error(error);
        }
    });
    
});

router.get('/:type/:msg', (req, res) => {
    var msg = {
        type: req.params.type,
        msg: req.params.msg
    }
    list(req, res, msg)
});

router.get('/edit/:twId', (req, res) => {
    Tw.findOne({_id: req.params.twId})
        .lean()
        .exec()
        .then(tw => {
            res.render('tws/edit', {
                tw: tw
            });
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
});




module.exports = router;