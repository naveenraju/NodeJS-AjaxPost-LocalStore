


----------------------------------Getting id from mongo and store on browser localstore-------------------------

Step1: routes/users/     replace get request to

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


Step2: index.html

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




