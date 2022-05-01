// webby.js

const net = require("net");

// an object that contains mappings from status codes to descriptions
const HTTP_STATUS_CODES = {
    200: "OK",
    404: "NOT FOUND",
    500: "SERVER ERROR",
};

// an object that contains mappings from extension to MIME type
const MIME_TYPES = {
    // use function ??????
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    html: "text/html",
    css: "text/css",
    txt: "text/txt",
};

function getExtension(fileName) {
    if (fileName.includes(".")) {
        const ext = fileName.split(".").pop().toLowerCase();

        return ext;
    } else {
        return "";
    }
}

const ext1 = getExtension("foo.jpg"); // ext1 --> jpg
const ext2 = getExtension("FOO.JPG"); // ext2 --> jpg
const ext3 = getExtension("foo.bar.jpg"); // ext3 --> jpg
const ext4 = getExtension("foo"); // ext4 --> '' (empty string)
// console.log(ext1, ext2, ext3, ext4);

function getMIMEType(fileName) {
    const extMIME = getExtension(fileName);

    if (extMIME !== "") {
        if (MIME_TYPES.hasOwnProperty(extMIME)) {
            return MIME_TYPES[extMIME];
        }
    } else {
        console.log(`NO MIME Type for name ${fileName}`);

        return "";
    }
}

const t1 = getMIMEType("foo.jpeg"); // t1 --> img/jpeg
const t2 = getMIMEType("foo"); // t2 --> '' (empty string)
// console.log(t1, t2);

//  The Request object represents an http request.
class Request {
    // creates a new request object based on the string passed in.
    constructor(httpRequest) {
        const [method, path, ...other] = httpRequest.split(" ");
        this.method = method;
        this.path = path;

        // console.log(this.method, this.path);
    }
}

let s = "";
s += "GET /foo/bar/bax.html HTTP/1.1\r\n"; // request line
s += "Host: localhost:3000\r\n"; // headers
s += "\r\n\r\n"; // empty line to mark the boundary between the header and body

// const req = new Request(s);

class Response {
    constructor(sock, statusCode = 200) {
        this.sock = sock;
        this.statusCode = statusCode;
        this.headers = {};
    }

    set(name, val) {
        this.headers[name] = val;
    }

    send(body) {
        let s = `HTTP/1.1 ${this.statusCode} ${
            codeDescription[this.statusCode]
        }\r\n`;
        const arrOfHeaderParts = Object.entries(this.headers);
        const headersArr = arrOfHeaderParts.map(function (parts) {
            const [name, val] = parts;
            return `${name}: ${val}`;
        });

        const headers = headersArr.join("\r\n");

        s += headers;
        s += "\r\n\r\n";
        s += body;
        this.sock.write(s);
        this.sock.end();
    }
}

// a class that represents a web application;
// takes incoming requests and determines what to do based on existing middlesware, path, method, etc. …
class App {
    constructor() {
        // this.server = net.createServer(this.handleConnection.bind(this));
        this.server = net.createServer((sock) => {
            this.handleConnection(sock);
        });
        this.routes = {};
        this.middleware = null;
    }

    normalizePath(path) {
        // find first '/'
        // capture until non-alphabet appears
        // lowercase
        // return String
        let normalize = "";
        const startIndex = 0;
        const endIndex = 0;
        let counter = 0;

        for (const c of path) {
            // special char
            if (c.toLowerCase() == c.toUpperCase()) {
                if (c == "/" && counter == 0) {
                    normalize += c;
                    counter++;
                } else {
                    break;
                }
            }

            // alphabet
            else {
                if (counter != 0) {
                    normalize += c;
                }
            }
        }

        // console.log(normalize.toLocaleLowerCase());

        return normalize.toLowerCase();
    }

    createRouteKey(method, path) {
        const tempStr = [];

        if (method.toUpperCase() === "GET" || method.toUpperCase() === "POST") {
            tempStr.push(method.toUpperCase());
        } else {
            console.log("Invalid Request Metod");

            return;
        }

        // const normalPath = (path) => {
        //     return this.normalPath(this.path);
        // };

        const normalPath = this.normalizePath(path);

        if (normalPath != "") {
            // console.log(normalPath);

            tempStr.push(normalPath);
        } else {
            console.log("Invalid Path");

            return;
        }

        const routeKey = tempStr.join(" ");

        console.log(routeKey);
        return routeKey;
    }

    //TODO
    get(path, cb) {
        const pathKey = this.normalizePath(path);

        if (pathKey != -1) {
            this.routes[pathKey] = cb;
        }
    }

    use(cb) {
        if (this.middleware !== null) {
            cb;
        }
    }

    listen(port, host) {
        this.server.listen({
            port: port,
            host: host,
        });

        // this.server.listen(port, host);

        console.log(`server started on ${port}: ${host}`);
    }

    handleConnection(sock) {
        console.log("connected");

        // sock.on("data", (data) => {
        //     this.handleReqeust(sock, data);
        // });

        sock.on("data", this.handleRequest.bind(data));
    }

    handleRequest(sock, binaryData) {
        const req = new Request(binaryData + ""); // extract path & method
        const res = new Response(sock);

        if (this.middleware !== null) {
            this.use(req, res, processRoutes);
        }

        if (this.routes.hasOwnProperty(req.path)) {
            this.routes[req.path](req, res);
        } else {
            res.statusCode = 404;
            res.set("Content-Type", "text/plain");
            res.send("did not find ur page!!!!");
        }
        sock.end();
    }
}

const app = new App();

let p;
p = app.normalizePath("/FOO");
p = app.normalizePath("/foo#bar");
p = app.normalizePath("/foo?bar=baz");
p = app.normalizePath("/foo/");
p = app.normalizePath("/foo/?bar=baz");
p = app.normalizePath("/foo/#bar");

const k = app.createRouteKey("get", "/FOO/?bar=baz"); // p is GET /foo

app.get("/hello", function (req, res) {
    res.send("HELLO WORLD");
});

module.exports = {
    HTTP_STATUS_CODES: HTTP_STATUS_CODES,
    MIME_TYPES: MIME_TYPES,
    getExtension: getExtension,
    getMIMEType: getMIMEType,
    Request: Request,
};
