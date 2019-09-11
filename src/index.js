const express = require('express');
const path = require('path');
const expresHandlerbars = require('express-handlebars');
const methodOverride = require('method-override');
const expressSession = require('express-session');

// Initializations 
const app = express();
require('./database')

// Settinngs 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
    // Objeto de configuracion de handlebars
app.engine('.hbs', expresHandlerbars({
    defaultLayout: 'main',
    layoutsDir:path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middelweares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(expressSession({
    secret: 'mysecretApp',
    resave: true,
    saveUninitialized: true
}))

// G. Variables

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static files 
app.use(express.static(path.join(__dirname, 'public')))

// Server listening 
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})