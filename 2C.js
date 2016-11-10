import express from 'express';

const app = express();

const port = 8080;
const host = 'localhost';

app.use( (req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',(req,res)=>{
	res.end(getUser(req.query.username))
});

function getUser(str){
	if(!str) return 'Invalid username';
	var reg = /([\w\d\.\-]\/@?([\w\d\.]+))|(^(@)?([\w\d]+)$)/;
	if(reg.test(str)) return `@${(str.match(reg)[2])? str.match(reg)[2] : str.match(reg)[5]}`;
	return 'Invalid username';
};

app.listen(port,host,()=>{
	console.log(`Сервер запущен по адресу: http://${host}:${port}`);
});
