import express from 'express';
import fetch from 'isomorphic-fetch';

const app = express();

const port = 8080;
const host = 'localhost';
let pc;

fetch('https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json').then(res=>res.json()).then(json=>pc=json)

app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:par0?/:par1?/:par2?/:par3?/:par4?',(req,res) => {
	if(!req.params.par0) res.json(pc)
	if(req.params.par0 == 'volumes') res.send(volumes(pc.hdd))
	var paramsArr = Object.keys(req.params).filter(el=>!!req.params[el]).map(el=>req.params[el].toLowerCase().trim());
	res.json(getByParams(pc,paramsArr,res));
});

app.listen(port,host,() => {
	console.log(`Сервер запущен по адресу: http://${host}:${port}`);
});

function volumes(arr){
	var out = arr.reduce((rez,{volume,size})=>
		(rez[volume] = !rez[volume]? size : rez[volume]+size , rez )
	,{});
	Object.keys(out).forEach(el=>out[el]+='B')
	return out
}

function getByParams(obj,params,res){
	var out = obj[params[0]];
	if(typeof out == 'undefined') return res.status(404).send('Not Found')
	for(var i = 1 ; i< params.length ; i++){
		if(out.__proto__[params[i]] != undefined) res.status(404).send('Not Found')
		out = out[params[i]]
		if(typeof out == 'undefined') return res.status(404).send('Not Found')
	}
	return out
}
