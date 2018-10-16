const express = require('express');
const request = require('request');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
let exphbs = require('express-handlebars');

const stores = require('./controllers/stores.js')

const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/influencer-store', { useNewUrlParser: true });

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

stores(app);
