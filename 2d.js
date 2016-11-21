import express from 'express';
import col from 'color-convert';

const app = express();

const port = 8080;
const host = 'localhost';
const err = 'Invalid color';

app.use( (req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Accept-Encoding','gzip, deflate, sdch, br');
  next();
});

app.get('/',(req,res)=>{
	var color = (req.query.color+"" || "").trim().replace(/ |%20/g,"");
	res.send(color? converColor(color) : err);
});

function converColor(color){
	if(color.length<3) return err;
	var mhex = /^#?([\dA-Da-f])([\dA-Da-f])([\dA-Da-f])$/;
	var hex = /^#?([\dA-Fa-f]{6})$/;
	var css = /#(?:[a-f\d]{3}){1,2}\b|rgb\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){2}\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)|\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%(?:\s*,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%){2})\s*\)|hsl\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2}\)|(?:rgba\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){3}|(?:\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*,){3})|hsla\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2},)\s*0*(?:1|0(?:\.\d+)?)\s*\)/;
	if(hex.test(color)) return '#'+(color.match(hex)[1]).toLowerCase();
	if(mhex.test(color)) return '#'+color.replace(mhex,'$1$1$2$2$3$3').toLowerCase();
	if(css.test(color)){
		if(/^rgb/.test(color)) return '#'+col.rgb.hex(...color.slice(4,-1).split(',').map(num=>+num.trim())).toLowerCase();
		if(/^hsl/.test(color)) return "#"+col.hsl.hex(...color.replace(/\%/g,"").slice(4,-1).split(',').map(n=>+n.trim())).toLowerCase();
	};
	return err;
};

app.listen(port,host,()=>{
	console.log(`Сервер запущен по адресу: http://${host}:${port}`);
});