const express = require('express');
const hbs = require('hbs');
const path = require('path');
const body = require('body-parser');
const app = express();


require('../helpers');


const directoriopartials = path.join(__dirname,'../../partials');
const dirNode_modules = path.join(__dirname , '../../node_modules')

app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));

app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));


hbs.registerPartials(directoriopartials);
app.set('view engine', 'hbs');
app.use(body.urlencoded({extended:false}));


app.get('/', function(req, res) {
  res.render('index', { title: 'Entrega 2',archivo:'index', descripcion: 'Bienvenido a inicio'
  +'<br><br>'+ 'Entregable semana 2: Manejo de archivos'});
});

app.get('/crear_curso', function(req, res) {
  res.render('crear_curso', { title: 'Crear curso',accion:'crear_curso',archivo:'crear_curso', descripcion: 'Aqui puede crear un curso' });
});

app.get('/ver_cursos', function(req, res) {
  res.render('ver_cursos', { title: 'Ver cursos',accion:'ver_cursos',archivo:'ver_cursos', descripcion: 'Aqui puede ver los cursos disponibles' });
});

app.get('/inscribir', function(req, res) {
  res.render('inscribir', { title: 'Inscribirse',archivo:'inscribir', descripcion: 'Aqui puede inscribirse'});
});

app.post('/guardare', function(req, res){

  res.render('guardare',{id:parseInt(req.body.di),
            nombreE: req.body.nombre,
            curso: req.body.curso,
            telefono: req.body.telefono,
            correo: req.body.correo});
});

app.get('/ver_inscritos', function(req, res) {
  res.render('ver_inscritos', { title: 'Inscritos',accion:'ver_inscritos',archivo:'ver_inscritos', descripcion: 'Aqui puede ver los inscritos' });
});

app.get('/detalles', function(req, res) {
  res.render('detalles', { title: 'Detalles curso', accion:'detalles', archivo:'ver_cursos', id: parseInt(req.query.id)});
});

app.get('/eliminar', function(req, res){
  console.log(req.query);
  res.render('eliminar', {title: 'Eliminar', id: parseInt(req.query.id),
                          nombre_curso: req.query.nombre_curso})
});

app.post('/crear', function(req, res){
  res.render('acciones', {accion:'crear', id:req.body.id,
                                          nombre_curso:req.body.nombre_curso,
                                          modalidad:req.body.modalidad,
                                          valor:req.body.valor,
                                          duracion: req.body.duracion,
                                          descripcion: req.body.desp})
});

app.get('*', function(req, res) {
  res.render('error', { title: 'Error pagina no encontrada', descripcion: 'Pagina de error' });
});

module.exports = app
