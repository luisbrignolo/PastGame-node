var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var contactosModel = require('../models/contactosModel');


/* GET contacto page. */
router.get('/', function(req, res, next) {
  res.render('contacto', {
    isContacto:true
  });
});

router.post('/', async(req, res, next) => {
  var nombre = req.body.nombre;
  var email = req.body.email;
  var mensaje = req.body.comentario;

  try {
    if(req.body.nombre != "" && req.body.email != "" && req.body.comentario != "") {
      await contactosModel.insertContactos(req.body);
    }else{
      res.render('contacto',{
      error:true,
      message2 : 'Debe completar todos los campos!'
      })
    }
  }catch(error){
    console.log(error);
    res.render('contacto',{
      error:true,
      message2 : 'Error al enviar la información'
    })
  }

  var obj = {
    to:'luisbrignolo5@gmail.com',
    subjet:'Contacto desde PastGames.com',
    html: nombre + " se contactó a través de PastGames y escribió el siguiente mensaje: " + mensaje +", su e-mail es: " + email
  }

  var transporter= nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    auth:{
      user:process.env.SMTP_USER,
      pass:process.env.SMTP_PASS
    }
  })
  var info = await transporter.sendMail(obj);

  res.render('contacto', {
    message: "Mensaje enviado correctamente",
    isContacto:true
  });
});

module.exports = router;