// function show(res) {
// 	var html = '<html><head><title>file extention blocker</title></head><body>'
// 	+ '<h1>hi</h1>'
// 	+ '<ul>' 
// 	+ items.map(function(item) { 
// 		return '<li>' + item + '</li>' 
// 	}).join('')
// 	+ '</ul>' 
// 	+ '<form method = "post" action="/">'
// 	+ '<p><input type = "text" name = "item" /></p>'
// 	+ '<p><input type = "submit" value = "items" /></p>'
// 	+ '</form></body></html>';
// 	res.setHeader('Content-Type', 'text/html');
// 	res.setHeader('Content-Length', Buffer.byteLength(html));
// 	res.end(html);
// }

// function add(req, res) {
// 	var body = "";
// 	req.setEncoding('utf8');
// 	req.on('data', function(chunk) {
// 		body += chunk});
// 	req.on('end', function() {
// 		var obj = qs.parse(body);
// 		items.push(obj.item);
// 		show(res);
// 	});
// }

// var test = url.parse('http://13.125.223.170:8080/name=kkm&hobby=sleep&school=KW').pathname;
// test = test.slice(1, test.length);
// console.log(qs.parse(test));

// var http = require('http');

// http.createServer(function(req,res){
// 	res.writeHead(200, { 'Content-Type': 'text/plain' });
// 	res.end('Hello World!');
// }).listen(8080);

// console.log('Server started on localhost:8080; press Ctrl-C to terminate...!');

var http = require('http');
var qs = require('querystring');
var formidable = require('formidable');
var server = http.createServer(function(req, res) {
	if('/' == req.url) {
		switch(req.method) {
			case 'GET':
				show(req, res);
				break;
			case 'POST':
				addCustomExt(req, res);
				break;
			default:
				return; //badRequest(res);
		}
	}else {
		return; // notFound(res);
	}
});
server.listen(8080, ()=> {
	console.log('Server started on localhost:8080; press Ctrl-C to terminate...!');
});
function show(req, res) {
	console.log("get");
	var html = `
		<meta charset="UTF-8">
		<form method = "post" action="/" enctype="multipart/form-data">
		<div>
			<form id="form">
				<p> <label for="fix_ext">고정 확장자</label>
				<label><input type="checkbox" id="bat" name="color" value="bat"> bat</label>
				<label><input type="checkbox" id="cmd" name="color" value="cmd"> cmd</label>
				<label><input type="checkbox" id="com" name="color" value="com"> com</label>
				<label><input type="checkbox" id="cpl" name="color" value="cpl"> cpl</label>
				<label><input type="checkbox" id="exe" name="color" value="exe"> exe</label>
				<label><input type="checkbox" id="scr" name="color" value="scr"> scr</label>
				<label><input type="checkbox" id="js" name="color" value="js"> js</label>
				</p>
				<p> <label for="custom_ext">커스텀 확장자</label> 
					<input type="text" placeholder="확장자 입력"> <button type="button"> 추가 </button> <br>
					<div padding-left: 30px > </div><textarea cols="50" rows="10" ></textarea> </div>
				</p>
			</form>
		</div>
	`;
	// + '<form method = "post" action="/" enctype="multipart/form-data">' 
	// + '<p><input type = "text" name = "name"/></p>'
	// + '<p><input type = "file" name = "file"/></p>'
	// + '<p><input type = "submit" value = "upload"/></p>'
	// + '</form>';
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);
}
function addCustomExt(req, rest) {
	console.log("POST");
	
}

function upload(req, res) {
	console.log("POST");
	if(!isFormData(req)) {
		res.statusCode = 400;
		res.end('not multipart/form-data');
		return;
	}

	var form = new formidable.IncomingForm();
	form.on('field', function (field,value) {
		console.log('field ing');
		console.log(field);
		console.log(value);
	});
	form.on('file', function(name, file) {
		console.log('file ing');
		console.log(name);
		console.log(file);
	});
	form.on('end', function(){
		console.log('end ing');
		res.end('upload');
	});
	form.on('progress', function(byte_Receive, totla_byte) {
		var percent = Math.floor(byte_Receive / totla_byte * 100);
		console.log(percent);
	});
	form.parse(req);
}

function isFormData(req) {
	console.log("form");
	var type = req.header['content-type'];
	console.log(type);
	return 0 == type.indexOf('multipart/form-data');
}

