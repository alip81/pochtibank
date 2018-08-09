/*
Copyright 2017 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var express = require('express');
var formidable = require('formidable');

var app = express();

app.get('/shirts/sizesAndPrices', function(req, res) {
  var sku = req.query.sku;
  var response = {};
  response[sku] = skuToSizeAndPrice[sku];
  setTimeout(() => res.json(response), 1000); // Simulate network delay.
});

app.post('/mortgage-request.php', function(req, res) {
  // Necessary for AMP CORS security protocol.
  // @see https://github.com/ampproject/amphtml/blob/master/spec/amp-cors-requests.md
  res.setHeader('AMP-Access-Control-Allow-Source-Origin',
      'http://localhost:3000');

  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields) {
    if (fields.name &&
        fields.surname &&
        fields.birthdate &&
        fields.email &&
        fields.passportno &&
        fields.phone) {
//      res.status(200).json(fields);
      res.status(400).json({error: 'Тест.'});
    } else {
      res.status(400).json({error: 'Пожалуйста заполните все поля.'});
    }
  });
});

app.post('/process-form.php', function(req, res) {
  // Necessary for AMP CORS security protocol.
  // @see https://github.com/ampproject/amphtml/blob/master/spec/amp-cors-requests.md
  res.setHeader('AMP-Access-Control-Allow-Source-Origin',
      'http://localhost:3000');

  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields) {
    if (fields.name != 'error') {
      res.status(200).json(fields);
    } else {
      res.status(400).json({error: 'Ошибка обработки запроса.'});
    }
  });
});

app.post('/process-form-redirect.php', function(req, res) {
  // Necessary for AMP CORS security protocol.
  // @see https://github.com/ampproject/amphtml/blob/master/spec/amp-cors-requests.md
  res.setHeader('AMP-Redirect-To',
      'http://localhost:3000/templates/thankyou.html');
  res.setHeader('Access-Control-Expose-Headers',
      'AMP-Redirect-To');
  res.setHeader('AMP-Access-Control-Allow-Source-Origin',
      'http://localhost:3000');

  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields) {
    if (fields.name != 'error') {
      res.status(200).json(fields);
    } else {
      res.status(400).json({error: 'Ошибка обработки запроса.'});
    }
  });
});

app.use('/', express.static('.'));

app.listen(3000, function () {
  console.log('Server for Insurance AMP landing sample Hackathon Aug 2018  listening on port 3000!');
});
