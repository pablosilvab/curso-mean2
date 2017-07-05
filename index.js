<<<<<<< HEAD
'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port =  process.env.PORT || 3977;


mongoose.connect('mongodb://localhost:27017/curso_mean2', (err,res) =>{
  if (err){
    throw err;
  } else {
    console.log("La conexión a la base de datos está funcionando correctamente.");
    app.listen(port, function(){
      console.log("Servidor del API Rest de música escuchando en http://localhost:"+port);
    });
  }
});
=======
'use strict'
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/curso_mean2', (err,res) =>{
  if (err){
    throw err;
  } else {
    console.log("La conexión a la base de datos está funcionando correctamente.");
  }
});
>>>>>>> 173d4bc759280fed0e4d14a8d84e49a39d236cc8
