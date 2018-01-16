//GET
exports.list = function(req, res){
    //res.send('get function for all list');
    console.log('Get User Function from customer file starts');
    req.getConnection(function(err, conn){
        if(err) return next ('Cannot Connect');

        var query = conn.query('SELECT * FROM t_user', function(err,rows){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            res.send(rows);
        });
    });
};

//POST
exports.post = function(req, res){
    res.send('post function');
};

//PUT
exports.put = function(req, res){
    res.send('put function');
};

//delete
exports.delete_customer = function(req, res){
    res.send('delete customer function');
};