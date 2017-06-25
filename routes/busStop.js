var express = require('express');
var router = express.Router();

var mongo = require('mongojs');
var db = mongo('bus',['busStop'])

var options = { "sort" : ['index','asc']}; // 

/* GET home page. */
router.get('/', function(req, res, next) {
  db.busStop.find().sort({index:1},function (err,docs){ //
      if(err) res.send(err);
      res.json(docs);
  });
});

router.get('/:_id',function (req, res) {
    id = req.params._id;
    db.busStop.findOne({_id:mongo.ObjectId(id)}, function(err,doc) {
        if (err) res.send('error');
        else res.json(doc);
    })
});

router.post('/',function (req,res) {
    var Now = new Date();

    var index = req.body.index;
    var sname = req.body.sname;
    var lname = req.body.lname;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var turnFlag = req.body.turnFlag;
    var imgtype = req.body.imgtype;
    var Oexist = req.body.Oexist;
    var NOexist = req.body.NOexist;

    var update = Now.getFullYear();
    update += '.' + Now.getMonth() + 1;
    update += '.' + Now.getDate();
    update += ' ' + Now.getHours();
    update += ':' + Now.getMinutes();
    update += ':' + Now.getSeconds();

    // 지금은 일곱개얌

    db.busStop.insert(
        {
            index:index,
            sname:sname,
            lname:lname,
            latitude:latitude,
            longitude:longitude,
            turnFlag:turnFlag,
            update:update,
            imgtype:imgtype,
            Oexist:Oexist,
            NOexist:NOexist
        },
        function (err,doc) {
            if(err) res.send(err);
            res.json(doc);
        }
    )
});

router.put('/:_id',function (req,res,next) {
    var Now = new Date();

    var id = req.params._id;
    var index = req.body.index;
    var sname = req.body.sname;
    var lname = req.body.lname;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var turnFlag = req.body.turnFlag;
    var imgtype = req.body.imgtype;
    var Oexist = req.body.Oexist;
    var NOexist = req.body.NOexist;

    var update = Now.getFullYear();
    update += '.' + Now.getMonth() + 1;
    update += '.' + Now.getDate();
    update += ' ' + Now.getHours();
    update += ':' + Now.getMinutes();
    update += ':' + Now.getSeconds();

    db.busStop.update(
        {
            _id:mongo.ObjectId(id)
        },{
            $set : {
                index:index,
                sname:sname,
                lname:lname,
                latitude:latitude,
                longitude:longitude,
                turnFlag:turnFlag,
                update:update,
                imgtype:imgtype,
                Oexist:Oexist,
                NOexist:NOexist
            }             
        }, { upset:true },
        function (err,doc) {
            if(err) res.send(err);
            res.json(doc);
        }
    )
});

router.delete('/:_id',function (req,res) {
    id = req.params._id;

    db.busStop.remove(
        {
            _id:mongo.ObjectId(id)
        }, function (err,doc) {
            res.json(doc);
        }
    )
});

module.exports = router; // router로 된거 여기저기 export해주도록 도와줌!
