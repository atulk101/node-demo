const express = require('express');
const hbs = require('hbs');
var app = express();
var fs = require('fs');
app.set('view engine','hbs');
const port = process.env.PORT || 3000;
app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now} ${req.method} ${req.url}`;
	fs.appendFile('server.log',log+'\n',(err)=>{
		console.log(err);
	});
	next();	
});

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('currentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.use((req,res,next)=>{
	//res.render('maintenance.hbs');
	next();
});

app.use(express.static(__dirname+'/public'));

app.get('/home',(req,res)=>{
	res.render('home.hbs',{homeTitle:'Node Js Home '});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{introduction:'Introduction to Node.js'});
});
app.get('/',(req,res)=>{
	res.send({
		name:'atul k',
		Skills: 'Full Stack Developer'
	});
});
app.listen(port,()=>{
	console.log('Server is up on port '+port);
});