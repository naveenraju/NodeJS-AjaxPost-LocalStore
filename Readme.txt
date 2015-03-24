
Step1:   npm update -g express-genrator


Step2:    express Example2

Step3:    package.json (add mongodb dependencys)


  "dependencies": {
    "mongodb": "1.4",
    "monk": "*",
    "mongoskin":"*"
  }
}

Step4: cd Example2

Step5: npm install


Step6:mkdir data




step7:     >mongod --dbpath C:\Users\knaveenr\Desktop\NodeJs\ExpressProjects\Example1\data


step8:   app.js    (Create Mango Db Connection)

		
	var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/nodetest2", {native_parser:true});




Step9:    app.js   (Make our Db acessable to App)


//make our db acessable
app.use(function(req,res,next){
    req.db = db;
console.log("----------------------------Check It Here----------------------");
console.log(req.db);

    next();
});



----------------------------------Getting id from mongo and store on browser localstore-------------------------

Step10: routes/users/     replace get request to

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


Step11: index.html

<html>
<head>
<script src="../javascripts/jquary.js "></script>
<script>
	function AjaxCall(){
		var username=$(".username").val();
		var mail=$(".email").val();
$.ajax({
     url: '../users/ajaxadd',
      type: 'POST',
      data:{
      	"username":username,
      	"email":mail
      },
      error: function() {
         alert("error");
      },
      success: function(data) {
        alert("Success");
       console.log(data.msg[0]._id);
localStorage.setItem("lastname",data.msg[0]._id);
    // Retrieve
   alert(localStorage.getItem("lastname"));
      },
   });
	} 
</script>
</head>
<body>
<input type="text" name="username" class="username"  />
<input type="text" name="email" class="email"  />
<input type="button" name="" value="Click Me" onclick="AjaxCall()" />
</body>
</html>




