var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var Crawler = require("crawler");
    var url = require('url');

	var Now = new Date();

    var c = new Crawler({
        maxConnections : 1,
        // This will be called for each crawled page
        callback : function (error, res1, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res1.$;
                var weekday = $("#tr_box12_1").html();
                var weekend = $("#tr_box12_2").html();
                var heunghae = $("#tr_box12_3").html(); // X


				if(Now.getDay() == 0 || Now.getDay() == 6 || (Now.getMonth() == 3 && Now.getDate() == 1) 
				|| (Now.getMonth() == 8 && Now.getDate() == 15) || (Now.getMonth() == 10 && Now.getDate() == 3) 
				|| (Now.getMonth() == 10 && Now.getDate() == 9) || (Now.getMonth() == 1 && Now.getDate() == 1) 
				|| (Now.getMonth() == 5 && Now.getDate() == 5) || (Now.getMonth() == 6 && Now.getDate() == 6) 
				|| (Now.getMonth() == 12 && Now.getDate() == 25) ) 
				// 0==일요일 6==토요일 // 삼일절, 광복절, 개천절, 한글날, 양력설날, 어린이날, 현충일, 크리스마스
				{
					var weekend1 = weekend.split("----->")[1]; // 방학중
					//var weekend1 = weekend.split("----->")[2]; // 학기중
					//시간표에서 table만 뜯어옴

					var weekend2 = weekend1.split("</tr>");
					var tablelength = weekend1.split("</tr>").length; // tr로 찢어서 넣은 array 개수

					returnV = {};
					for(var i = 2; i<tablelength;i++){
						returnV[i] = weekend1.split("</tr>")[i]+"</tr>"
					}
					res.json({data:returnV})
				} // 휴일 시간표 나오는 날
				else
				{
					var weekday1 = weekday.split("----->")[1]; // 방학중
					//var weekday1 = weekday.split("----->")[2]; // 학기중
					//시간표에서 table만 뜯어옴

					var weekday2 = weekday1.split("</tr>");
					var tablelength = weekday1.split("</tr>").length; // tr로 찢어서 넣은 array 개수

					returnV = {};
					for(var i = 2; i<tablelength;i++){
						returnV[i] = weekday1.split("</tr>")[i]+"</tr>"
					}
					res.json({data:returnV})
				} // 평일 시간표 나오는 날

            }
            done();
        }
    });

// Queue just one URL, with default callback
    c.queue({uri:'http://hisnet.handong.edu/login/login.php', forceUTF8:true});

});

module.exports = router;

// 메인화면 맨 아랫부분