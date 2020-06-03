// Importamos las dependencias
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
// Creamos una constante para el valor del puerto
const PUERTO = process.env.Port || 3000;

//Emplear las rutas
let pintoresRouter = require('./routes/pintor');

// Sitio web y HBS
const app = express();
app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

// Vamos a decirle a express la ruta a emplear
app.use('/', pintoresRouter);

/*La conexión con MongoDB*/
mongoose.Promise = global.Promise;
const cadena = 'mongodb+srv://admin:admin@irigoyenjulian-05si4.mongodb.net/pintores?retryWrites=true&w=majority';
mongoose.connect(cadena,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>{
        console.log('Conexión con Mongo exitosa');
    })
    .catch(err=> console.log(err));

/*Arrancar el sevidor web*/
app.listen(PUERTO, ()=>{
    console.log('Escuchando el puerto...')
});
