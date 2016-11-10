import express from 'express';

const app = express();

const port = 8080;
const host = 'localhost';
var reg1 = /^(https?:)?(\/\/)?[\d\w\-\.]+\.?([\w]{2,4})?(\:[\d]+)?\/@?([\d\w\.]+)/i;
var reg2 = /^[\w\d\.]+$/i;
var reg3 = /^@[\w\d\.]+$/;

app.use( (req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',(req,res)=>{
	var str = req.query.username;
	if(reg1.test(str)) res.end(`@${str.match(reg1)[5]}`)
	if(reg2.test(str)) res.end(`@${str}`)
	if(reg3.test(str)) res.end(`${str}`)
	res.end('Invalid username')
});

app.listen(port,host,()=>{
	console.log(`Сервер запущен по адресу: http://${host}:${port}`)
})
