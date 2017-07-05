'use strict'

function pruebas(req, res){
  res.status('200').send({
    messagge: 'Probando acción del controlador de usuarios'
  });
}

module.exports = {
  pruebas
};
