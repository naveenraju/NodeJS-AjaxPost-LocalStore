var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/ajaxadd', function(req, res) {
    var db = req.db;
var username=req.body.username;
var email=req.body.email;
console.log(username);
console.log(email);
 db.collection('usersCollection').insert({"username":username,"email":email,"user_id":""}, function(err, result){
        res.send(
            (err === null) ? { msg: result } : { msg: err }
        );
    });
});

module.exports = router;
