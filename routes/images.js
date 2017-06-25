var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET users listing. */
router.get('/:imageName', function(req, res, next) {
    var imageName = req.params.imageName;
    var data = fs.readFile('public/images/'+imageName, function(error, data) {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(data);

    })
});

module.exports = router;
