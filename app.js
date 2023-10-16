const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;

// Use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// Set Handlebars Middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// create call_api function
function call_api(finishedAPI, ticker) {
    request(`https://api.iex.cloud/stable/stock/${ticker}/quote?token=pk_48a58fd0bd0e4c25aa30bfe2b47e8e20`, { json: true }, (err, res, body) => {
        if (err) {
            return console.log(err);
        } else if (res.statusCode === 200) {
            finishedAPI(body);
        };
    });
};

// Set Handlebar app GET route
app.get('/', (req, res) => {
    //callback function to allow api call to finish
    call_api(function(doneAPI) {
            res.render('stock-track', {
            stock: doneAPI
        });
    });
});

// Set Handlebar app POST route
app.post('/', (req, res) => {
    //callback function to allow api call to finish
    call_api(function(doneAPI) {
            res.render('stock-track', {
            stock: doneAPI,
        });
    }, req.body.stock_ticker);
});

// create homepage route
app.get('/', function (req, res){
        res.render('index.html');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));




