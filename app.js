var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');
// load customer routes
var customers = require('./routes/customer');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

/*MySql connection*/
var connection  = require('express-myconnection'),
    mysql = require('mysql');

    app.use(

        connection(mysql,{
            host     : 'localhost',
            user     : 'root',
            password : 'Admin123',
            database : 'test',
            debug    : false //set true if you wanna see debug logger
        },'request')
    
    );

    app.get('/',function(req,res){
        res.send('Welcome');
    });

//RESTful route
var router = express.Router();
/*------------------------------------------------------
*  This is router middleware,invoked everytime
*  we hit url /api and anything after /api
*  like /api/user , /api/user/7
*  we can use this for doing validation,authetication
*  for every route started with /api
--------------------------------------------------------*/
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

var curut = router.route('/user');
var cust = router.route('/cust');

cust.get(customers.list);

curut.get(function(req,res,next){
    res.send('user get function');
});

curut.post(function(req,res,next){
    res.send('user post function');
});


//now we need to apply our router here
app.use('/api', router);

//show the CRUD interface | GET


//start Server
var server = app.listen(3000,function(){
   console.log("Listening to port %s",server.address().port);
});