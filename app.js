const {argv} = process;
const fs = require('fs');
const http = require('http');

const mime_map = {
	json: 'application/json',
	js:   'application/javascript',
	html: 'text/html',
	txt:  'text/plain',
	gif:  'image/gif',
	png:  'image/png',
	jpg:  'image/jpeg',
	jpeg: 'image/jpeg',
	css:  'text/css',
	htm:  'text/html'
};

const getType = path => {
	let i = path.lastIndexOf('.');
	path = path.substr(i + 1);
	return mime_map[path] || 'application/octet-stream';
};

const port = argv[2] || 80;
const app = http.createServer((req, res) => {

	let path = '.' + req.url;

	try {
		let file = fs.readFileSync(path);
		let type = getType(path);
		res.writeHead(200, {
			'Content-Type': type
		});
		res.end(file);
	} catch(e) {
		res.statusCode = 404;
		res.end();
	}

});

console.log('Trying to listen at port ' + port);
app.listen(port, () => {
	console.log('Listening to port ' + port);
});