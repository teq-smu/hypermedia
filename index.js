var express   = require('express');
var datastore = require('nedb');

// ------------------------------------------------------------------------------------------------

var app = express();
app.use(express.bodyParser());

//app.use(express.json());
//app.use(express.urlencoded());

// ------------------------------------------------------------------------------------------------

var db = {};
db.movies = new datastore({ filename: 'db/movies', autoload: true });

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------

app.get('/', function (req, res) {
    res.send("The API is working.");
})
.post('/rpc', function (req, res) {
    var body = req.body;

    res.set('Content-type', 'application/json');
    var respond = function(error, results) {
        if (error) {
            res.send(JSON.stringify(error));
        } else {
            res.send(JSON.stringify(results));
        }
    };

    switch (body.action) {
        case 'getMovies':
            db.movies.find({}, respond);
            break;
        case 'addMovie':
            db.movies.insert({ title: body.title }, respond);
            break;
        case 'rateMovie':
            db.movies.update({ title: body.title }, { $set: { rating: body.rating } }, function(error, num) {
                respond(error, { success: num + " record" + ((num > 1) ? "s" : "") + " updated" });
            });
            break;
        default:
            respond("RPC No action given");
    }
})
.listen(3000);