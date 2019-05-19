const config = require("config");
const _ = require("lodash");
const http = require("http");
const fs = require("fs");
const path = require("path");
const host = "127.0.0.1";
const port = 3000;

const p = path.join(__dirname, "index.html");
console.log(p);
// console.log(fs.existsSync(p));

const filePath = path.join(__dirname, "..", "data.txt");
console.log(fs.existsSync(filePath));
console.log(filePath);

//config;
// console.log(`app name ${config.get("name")}`);
// console.log(`mail server name ${config.get("mail.host")}`);

const server = http.createServer((req, res) => {
	let url = req.url;

	if (url === "/") {
		const text = fs.createReadStream(filePath, { encoding: "utf-8" });
		text.on("data", chunk => {
			console.log("chunk");
		});

		res.statusCode = 200;
		res.setHeader("Content-Type", "text/html");
		fs.readFile(p, (err, data) => {
			if (err) throw err;
			res.write(data);
		});
	}

	// fs.writeFile("data.json", JSON.stringify(file), err => {
	// 	if (err) throw err;
	// 	console.log("saved");
	// });
	// fs.readFile(filePath, (err, file) => {
	// 	console.log(file, "X");
	// 	let x = Buffer.from(JSON.parse(file));
	// 	console.log(x.toString());
	// });
});

server.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}`);
});
