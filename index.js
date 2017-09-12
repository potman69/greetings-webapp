const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const SubjectRoutes = require('./subjects');
const Models = require('./models');
const models = Models('mongodb://localhost/tutors');

const subjectRoutes = SubjectRoutes(models);
const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/home', function(req, res){
    res.send('Names Greeted');
});

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));
app.use(flash());

app.get('/subjects', subjectRoutes.index);
app.get('/subjects/add', subjectRoutes.addScreen);
app.post('/subjects/add', subjectRoutes.add);



const port = 3000;

app.listen(port, function(){
    console.log('Web app started on port : ' + port);
});
