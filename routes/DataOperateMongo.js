/**
 * Created by kevin on 2016/10/17.
 */
var express = require('express');
var router = express.Router();
var getDataG = require('../models/DataFromMongo');


router.post('/queryData', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'NormalData', 'query', req.body, '', function (data) {


        res.send(data);
    })

});


router.post('/querySZData', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'WaterDetect', 'queryOne', req.body, '', function (data) {


        res.send(data);
    })

});

router.post('/querySZDataAll', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'WaterDetect', 'queryByCurtime', req.body, '', function (data) {


        res.send(data);
    })

});


router.post('/queryOneXS', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'XSRecord', 'queryOneXS', req.body, '', function (data) {


        res.send(data);
    })

});


router.post('/queryQYData', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'QYRQ', 'query', req.body, '', function (data) {


        res.send(data);
    })

});

router.post('/deleteQYByID', function (req, res) {



    getDataG.OperatToMongoDB('sbhyh', 'QYRQ', 'delete', req.body, '', function (data) {

        res.send(data);
    })

});


router.post('/queryYestodayData', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'OneDayCollection', 'query', req.body, '', function (data) {

        res.send(data);
    })

});


router.post('/insertOneDayCollectionData', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'OneDayCollection', 'insert', req.body, '', function (data) {


        res.send(data);
    })

});


router.post('/insertOneXSData', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'XSRecord', 'insert', req.body, '', function (data) {


        res.send(data);
    })

});


router.post('/insertOneWaterDetectData', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'WaterDetect', 'insert', req.body, '', function (data) {


        res.send(data);
    })

});


router.post('/insertOneQYData', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'QYRQ', 'insert', req.body, '', function (data) {


        res.send(data);
    })

});

router.post('/queryOneDayCollectionByYearAndMonth', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'OneDayCollection', 'query', req.body, '', function (data) {

        res.send(data);
    })

});

router.post('/queryOneDayCollectionBy30Nums', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'OneDayCollection', 'query', req.body, '', function (data) {

        res.send(data);
    })

});


router.post('/queryOneDayCollectionByYear', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'OneDayCollection', 'query', req.body, '', function (data) {

        res.send(data);
    })

});

router.post('/queryXSByYear', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'XSRecord', 'query', req.body, '', function (data) {

        res.send(data);
    })

});

router.post('/deleteXSByID', function (req, res) {



    getDataG.OperatToMongoDB('sbhyh', 'XSRecord', 'delete', req.body, '', function (data) {

        res.send(data);
    })

});


router.post('/deleteWaterDetectBytime', function (req, res) {



    getDataG.OperatToMongoDB('sbhyh', 'WaterDetect', 'deletes', req.body, '', function (data) {

        res.send(data);
    })

});


router.post('/queryOneDayCollectionBy30Nums', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'OneDayCollection', 'query', req.body, '', function (data) {

        res.send(data);
    })

});

router.post('/queryTJCSWDayByMonth', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'TJCSWDay', 'query', req.body, '', function (data) {

        res.send(data);
    })
});

router.post('/queryTJCSWNightByMonth', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'TJCSWNight', 'query', req.body, '', function (data) {

        res.send(data);
    })

});

router.post('/queryOneTJCDay', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'TJCSWDay', 'queryOneByJson', req.body, '', function (data) {

        res.send(data);
    })
});

router.post('/queryOneTJCSWNight', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'TJCSWNight', 'queryOneByJson', req.body, '', function (data) {

        res.send(data);
    })
});

router.post('/queryZLSBSByMonth', function (req, res) {

    getDataG.OperatToMongoDB('sbhyh', 'ZLSBSDDFOpen', 'query', req.body, '', function (data) {

        res.send(data);
    })
});

module.exports = router;