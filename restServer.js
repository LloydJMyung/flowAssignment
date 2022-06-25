const http = require('http');
const fs = require('fs').promises;

const checks = {};

http.createServer(async (req, res) => {
	try {
		console.log(req.method, req.url);
		if(req.method == 'GET') {
			if(req.url == '/') {
				const data = await fs.readFile('./index.html');
				res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
				res.end(data);
			} 
			else if(req.url == '/checks') {
				res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
				res.end(JSON.stringify(checks));
			}
			try {
				const data = await fs.readFile(`.${req.url}`);
				return res.end(data);
			} catch(err) {
				
			}
		} else if(req.method === 'POST') {
			if(req.url === '/checks') {
				let body = '';
				req.on('data', (data) => {
					body += data;
				});
				return req.on('end', () => {
					const { val } = JSON.parse(body);
					const id = Date.now();
					checks[id] = val;
					res.writeHead(201);
					res.end('등록 성공');
				})
			}
		} else if( req.method === 'PUT') {
			if(req.url.startsWith('/checks/')) {
				const key = req.url.split('/')[2];
				let body = '';
				req.on('data', (data)=> {
					body += data;
				});
				return req.on('end', () => {
					console.log('PUT 본문(body): ', body);
					checks[key] = JSON.parse(body).val;
					return res.end(JSON.stringify(checks));
				});
			}
		}
		// res.writeHead(404);
		// return res.end('NOT FOUND');
	} catch (err) {
		console.error(err);
		res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8'});
		res.end(err.message);
	}
})
.listen(8081, () => {
	console.log('8081번 포트에서 서버 대기 중입니다!');
});