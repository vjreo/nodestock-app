const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const path = require('path');

const PORT = process.env.PORT || 4000;

// Set Handlebars Middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Set Handlebar Routes
app.get('/', (req, res) => {
    res.render('home');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));




