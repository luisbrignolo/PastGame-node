var express = require('express');
var router = express.Router();
var contactosModel = require('../../models/contactosModel');

/* GET adminContactos page. */
router.get('/', async function(req, res, next) {
    var contactos 
    if(req.query.q === undefined){
      contactos = await contactosModel.getContactos();
    }else{
      contactos = await contactosModel.buscarContactos(req.query.q);
    }
    res.render('admin/contactos', {
      layout:'admin/layout',
      usuario:req.session.nombre,
      contactos,
      is_search: req.query.q !== undefined,
      q:req.query.q
  });
});

router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await contactosModel.deleteContactosById(id);
  res.redirect('/admin/contactos');
});


router.get('/modificar/:id', async (req, res, next) =>{
  var id = req.params.id;
  var contactos = await contactosModel.getContactosById(id);
  res.render('admin/modificar',{
      layout:'admin/layout',
      contactos
  });
});

//para actualizar los datos de la modificacion

router.post('/modificar', async (req,res,next) =>{
  try{
      var obj={
          nombre:req.body.nombre,
          comentario:req.body.comentario
      }
      //console.log(obj)
      await contactosModel.modificarContactoById(obj, req.body.id);
      res.redirect('/admin/contactos');
      }catch(error){
          console.log(error)
          res.render('/admin/modificar',{
              layout:'admin/layout',
              error: true, 
              message: 'No se modifico el contacto'
          })
      }
});


module.exports = router;