'use strict'

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'iot',  // HUOM! Älä käytä root:n tunnusta tuotantokoneella!!!!
  password : 'password',
  database : 'liikennevalot'
});

module.exports = 
{

    valot: function(req, res){

        var kysely = "SELECT * FROM valot WHERE id = 1";
        //console.log(req.params);

        connection.query(kysely, (virhe, tulokset, kentat) => {
            if (!virhe) {
                res.send(tulokset)
            } else {
                res.send({"status" : 500, "virhe" : virhe, "response" : null});
            }

        });
    },

    ilma: function(req, res){

        var kysely = "SELECT * FROM ilma";
        //console.log(req.params);


        connection.query(kysely, (virhe, tulokset, kentat) => {
            if (!virhe) {
                res.send(tulokset)
            } else {
                res.send({"status" : 500, "virhe" : virhe, "response" : null});
            }

        });
    },

}
