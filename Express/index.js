var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var multer = require('multer');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var app = express();
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'LEAKWRITER',
  password : 'd6wr?qap3!a+up4Ut?AmepRuwe=rugec',
  database : 'PIRACYLEAK'
});

connection.connect();

app.set('superSecret', '/MkJ.6MaCEq$B)?!v@e]I;~=P>\()@Udg6MM&yWn!L|C,;z8T#mQ{aVaAS3(nS;');

app.use(bodyParser.urlencoded({ extended: true }));

app.route('/user')
.get(function(req, res) {
    res.send('Get a random book');
})
.post(function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var salt = bcrypt.genSaltSync(10);
    var passwordToSave = bcrypt.hashSync(password, salt)
    var sql = 'INSERT INTO USER (USERNAME, PASSWORD, SALT) VALUES(' + connection.escape(username) + ',' +  connection.escape(passwordToSave) + ','  + connection.escape(salt) + ')';
    console.log(sql);
    connection.query(sql, function(err, rows) {
        if (err) throw err;
    });
    this.getToken(username, password, res);
  })
.put(function(req, res) {
    res.send('Update the book');
});

getToken = function(username, password, res) {
    var sql = 'SELECT * FROM USER WHERE USERNAME=\'' + username + '\'';
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        if(rows[0]){
            if ( bcrypt.hashSync(password, rows[0].SALT ) === rows[0].PASSWORD ){
                var token = jwt.sign({ username: username }, app.get('superSecret'), {expiresIn: 1440});
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }else{
                res.json({
                    success: false,
                    message: 'Failed to authenticate user. Wrong password'
                });
            }
        }else{
            res.json({
                success: false,
                message: 'Failed to authenticate user. User doesn\'t exist'
            });
        }
    });
}

app.get('/piracyleak.com.html', function(req, res) {
    res.sendfile('piracyleak.com.html', {root: __dirname })
});
app.post('/authenticate', function(req, res) {
    this.getToken(req.body.username, req.body.password, res);
    // var sql = 'SELECT * FROM USER WHERE USERNAME=\'' + req.body.username + '\'';
    // connection.query(sql, function(err, rows, fields) {
    //     if (err) throw err;
    //     if(rows[0]){
    //         if ( bcrypt.hashSync(req.body.password, rows[0].SALT ) === rows[0].PASSWORD ){
    //             var token = jwt.sign({ username: req.body.username }, app.get('superSecret'), {expiresIn: 1440});
    //             res.json({
    //                 success: true,
    //                 message: 'Enjoy your token!',
    //                 token: token
    //             });
    //         }else{
    //             res.json({
    //                 success: false,
    //                 message: 'Failed to authenticate user. Wrong password'
    //             });
    //         }
    //     }else{
    //         res.json({
    //             success: false,
    //             message: 'Failed to authenticate user. User doesn\'t exist'
    //         });
    //     }
    // });
});


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
