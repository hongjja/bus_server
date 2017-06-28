var express = require('express');
var router = express.Router();

router.get('/weekday', function(req, res, next) {
    var Crawler = require("crawler");
    var url = require('url');

    var c = new Crawler({
        maxConnections : 1,
        // This will be called for each crawled page
        callback : function (error, res1, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res1.$;
                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server
                
                var weekdayHTML = $("#tr_box12_1").html();

                var weekday = weekdayHTML.split("------>")[1]; // 방학중
                //var weekday = weekdayHTML.split("------>")[2]; // 학기중

                var length = weekday.split("</tr>").length;

                var returnV = [];
                for(var i = 0; i<length-2; i++){
                    returnV[i] = weekday.split("</tr>")[i+2]+"</tr>" // 위에 쓸데없는 거 빼고 날짜랑 데이터만!
                }

                returnV = returnV.join("");
                returnV = '<table width="100%" cellspacing="0" cellpadding="0">'+ returnV;

                res.send(returnV);


            }
            done();
        }
    });

    // Queue just one URL, with default callback
    c.queue({uri:'http://hisnet.handong.edu/login/login.php', forceUTF8:true});
});

router.get('/weekend', function(req, res, next) {
    var Crawler = require("crawler");
    var url = require('url');

    var c = new Crawler({
        maxConnections : 1,
        // This will be called for each crawled page
        callback : function (error, res1, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res1.$;
                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server
                var weekendHTML = $("#tr_box12_2").html();

                var weekend = weekendHTML.split("------>")[1]; // 방학중
                //var weekend = weekendHTML.split("------>")[2]; // 학기중

                var length = weekend.split("</tr>").length;

                var returnV = [];
                for(var i = 0; i<length-2; i++){
                    returnV[i] = weekend.split("</tr>")[i+2]+"</tr>" // 위에 쓸데없는 거 빼고 날짜랑 데이터만!
                }

                returnV = returnV.join("");
                returnV = '<table width="100%" cellspacing="0" cellpadding="0">'+returnV;

                res.send(returnV);                                
            }
            done();
        }
    });

    // Queue just one URL, with default callback
    c.queue({uri:'http://hisnet.handong.edu/login/login.php', forceUTF8:true});
});

router.get('/heunghae', function(req, res, next) {
    var Crawler = require("crawler");
    var url = require('url');

    var c = new Crawler({
        maxConnections : 1,
        // This will be called for each crawled page
        callback : function (error, res1, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res1.$;
                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server
                var heunghaeHTML = $("#tr_box12_3").html();
                var heunghae = heunghaeHTML.split("------>")[3];

                var length = heunghae.split("</tr").length;

                var returnV = [];
                for(var i = 0; i<length-2; i++){
                    returnV[i] = heunghae.split("</tr>")[i+2]+"</tr>" // 위에 쓸데없는 거 빼고 날짜랑 데이터만!
                }
                returnV = returnV.join("");

                returnV = '<table width="100%" cellspacing="0" cellpadding="0">' + returnV; // 이거 없으면 테이블이 망가짐ㅠ

                res.send(returnV);

                // 지금 string이니까 html로 다시 바꿔서 res해주기

            }
            done();
        }
    });

    // Queue just one URL, with default callback
    c.queue({uri:'http://hisnet.handong.edu/login/login.php', forceUTF8:true});
});



module.exports = router;

// 시간표 탭 부분 사용