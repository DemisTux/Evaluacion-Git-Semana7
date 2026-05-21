const express = require('express');
const session = require('express-session');
const path = require('path');
const rutasUsuario = require('./routes/rutasUsuario');

const app = express();
const puerto = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secreto_evaluacion_santo_tomas',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 300000 
    }
}));

app.use('/', rutasUsuario);

app.listen(3000, () => {
    console.log('Servidor corriendo sin errores en http://localhost:3000');
});