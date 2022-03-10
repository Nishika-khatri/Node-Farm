const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const replaceTemplate = require('./starter/modules/replaceTemplate');
const port = 3000;

const data = fs.readFileSync(
  `${__dirname}/starter/dev-data/data.json`,
  'utf-8'
);
const tempoverview = fs.readFileSync(
  `${__dirname}/starter/templates/template-overview.html`,
  'utf-8'
);
const tempproduct = fs.readFileSync(
  `${__dirname}/starter/templates/template-product.html`,
  'utf-8'
);
const tempcard = fs.readFileSync(
  `${__dirname}/starter/templates/template-card.html`,
  'utf-8'
);
const productdata = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // console.log(query);

  //Overview Page
  if (pathname == '/' || pathname == '/overview') {
    res.writeHead(200, {
      'content-type': 'text/html',
    });

    const cardsHTML = productdata
      .map((element) => replaceTemplate(tempcard, element))
      .join('');
    const output = tempoverview.replace(/{%PRODUCT_CARD%}/g, cardsHTML);
    // console.log(cardsHTML);
    res.end(output);
  }

  //Product Page
  else if (pathname == '/product') {
    const product = productdata[query.id];
    const output = replaceTemplate(tempproduct, product);
    res.end(output);
  }

  //API Page
  else if (pathname == '/API') {
    res.writeHead(200, {
      'content-type': 'application/json',
    });
    res.end(data);
  }
  //Other Page
  else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-own-header': 'Hello-world',
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Listening to the request at ${port}`);
});
