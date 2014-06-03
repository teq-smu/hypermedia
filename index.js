var express   = require('express');
var Datastore = require('nedb');

// ------------------------------------------------------------------------------------------------

var app = express();

app.use(express.bodyParser());

//app.use(express.json());
//app.use(express.urlencoded());

// ------------------------------------------------------------------------------------------------

var db    = {};
db.movies = new Datastore({ filename: 'db/movies', autoload: true });

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------

app
.get('/', function(req, res) {
	res.send("The API is working.");
})
.post('/rpc', function(req, res) {
	var body = req.body;
	switch (body.action) {
		case 'getMovies':
			res.send("Requested API getMovie");
			break;
	}
})
.listen(3000);