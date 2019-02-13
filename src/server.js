const http = require('http');
const url = require('url');
// const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

/* const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.notFound,
}; */

const onRequest = (request, response) => {
  console.log(request.url);
  const parsedUrl = url.parse(request.url);
  //const params = query.parse(parsedUrl.query);

  switch (request.method) {
    case 'GET':
      if (parsedUrl.pathname === '/') {
        htmlHandler.getIndex(request, response);
      } else if (parsedUrl.pathname === '/style.css') {
        htmlHandler.getCSS(request, response);
      } else if (parsedUrl.pathname === '/getUsers') {
        jsonHandler.success(request, response);
      } else if (parsedUrl.pathname === '/notReal') {
        jsonHandler.notFound(request, response);
      } else {
        jsonHandler.notFound(request, response);
      }

      /* if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response, params);
      } else {
        urlStruct.notFound(request, response, params);
      } */
      break;
    case 'HEAD':
      if (parsedUrl.pathname === '/getUsers') {
        jsonHandler.success(request, response);
      } else if (parsedUrl.pathname === '/notReal') {
        jsonHandler.notFound(request, response); // needs to be without response
      } else {
        // if not found send 404 without body
        jsonHandler.notFound(request, response);
      }
      break;
    default:
      // send 404 in any other case
      jsonHandler.notFound(request, response);
  }
};

// start server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
