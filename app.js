/**
 * Module dependencies.
 */

// mongoose setup
require('./mongoose-db');
require('./typeorm-db')

var st = require('st');
var crypto = require('crypto');
var express = require('express');
var http = require('http');
var path = require('path');
var ejsEngine = require('ejs-locals');
var bodyParser = require('body-parser');
var session = require('express-session')
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var optional = require('optional');
var marked = require('marked');
var fileUpload = require('express-fileupload');
var dust = require('dustjs-linkedin');
var dustHelpers = require('dustjs-helpers');
var cons = require('consolidate');
const hbs = require('hbs')

var app = express();
var routes = require('./routes');
var routesUsers = require('./routes/users.js')

// all environments
app.set('port', process.env.PORT || 3001);
app.engine('ejs', ejsEngine);
app.engine('dust', cons.dust);
app.engine('hbs', hbs.__express);
cons.dust.helpers = dustHelpers;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
  secret: 'keyboard cat',
  name: 'connect.sid',
  cookie: { path: '/' }
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

// Routes
app.use(routes.current_user);
app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginHandler);
app.get('/admin', routes.isLoggedIn, routes.admin);
app.get('/account_details', routes.isLoggedIn, routes.get_account_details);
app.post('/account_details', routes.isLoggedIn, routes.save_account_details);
app.get('/logout', routes.logout);
app.post('/create', routes.create);
app.get('/destroy/:id', routes.destroy);
app.get('/edit/:id', routes.edit);
app.post('/update/:id', routes.update);
app.post('/import', routes.import);
app.get('/about_new', routes.about_new);
app.get('/chat', routes.chat.get);
app.put('/chat', routes.chat.add);
app.delete('/chat', routes.chat.delete);
app.use('/users', routesUsers)

// Static
app.use(st({ path: './public', url: '/public' }));

// Add the option to output (sanitized!) markdown
marked.setOptions({ sanitize: true });
app.locals.marked = marked;

// development only
if (app.get('env') == 'development') {
  app.use(errorHandler());
}

var token = 'SECRET_TOKEN_f8ed84e8f41e4146403dd4a6bbcea5e418d23a9';
console.log('token: ' + token);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

app.use('/api', require('./routes/api/apikey'));
app.use('/api', require('./routes/api/audit'));
app.use('/api', require('./routes/api/backup'));
app.use('/api', require('./routes/api/billing'));
app.use('/api', require('./routes/api/cart'));
app.use('/api', require('./routes/api/catalog'));
app.use('/api', require('./routes/api/chat'));
app.use('/api', require('./routes/api/coupon'));
app.use('/api', require('./routes/api/download'));
app.use('/api', require('./routes/api/export'));
app.use('/api', require('./routes/api/feature'));
app.use('/api', require('./routes/api/import'));
app.use('/api', require('./routes/api/inventory'));
app.use('/api', require('./routes/api/invoice'));
app.use('/api', require('./routes/api/metrics'));
app.use('/api', require('./routes/api/notification'));
app.use('/api', require('./routes/api/oauth'));
app.use('/api', require('./routes/api/order'));
app.use('/api', require('./routes/api/payment'));
app.use('/api', require('./routes/api/plugin'));
app.use('/api', require('./routes/api/profile'));
app.use('/api', require('./routes/api/refund'));
app.use('/api', require('./routes/api/report'));
app.use('/api', require('./routes/api/restore'));
app.use('/api', require('./routes/api/review'));
app.use('/api', require('./routes/api/search'));
app.use('/api', require('./routes/api/session'));
app.use('/api', require('./routes/api/shipment'));
app.use('/api', require('./routes/api/sso'));
app.use('/api', require('./routes/api/subscription'));
app.use('/api', require('./routes/api/supplier'));
app.use('/api', require('./routes/api/tax'));
app.use('/api', require('./routes/api/template'));
app.use('/api', require('./routes/api/tenant'));
app.use('/api', require('./routes/api/theme'));
app.use('/api', require('./routes/api/ticket'));
app.use('/api', require('./routes/api/upload'));
app.use('/api', require('./routes/api/warehouse'));
app.use('/api', require('./routes/api/webhook'));
app.use('/api', require('./routes/api/wishlist'));
