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
	var str = req.query.fullname;
	str = str.toLowerCase();
	var arr = str.split(' ');
	arr = arr.filter(el=>el);
	arr.forEach((e,i,a)=>{a[i]=e[0].toUpperCase()+e.slice(1)});
	if(arr.length >3 || req.query.fullname=="" || !(/^[^\d_\\\/]+$/.test(str))) res.end('Invalid fullname');
	if(arr.length == 1) res.end(arr[arr.length-1]);
	res.end([arr[arr.length-1]].concat(arr.slice(0,arr.length-1).map(el=>el.slice(0,1)+".")).join(" "))
})

app.listen(port,host,()=>{
	console.log(`Сервер запущен по адресу: http://${host}:${port}`)
})