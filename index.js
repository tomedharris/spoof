const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./bin/logger');

const app = express();

// Use handlebars as the templating engine.
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: 'resources/views/layouts',
  partialsDir: 'resources/views/partials',
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.set('port', process.env.PORT || 3000);

// Serve static assets: js, css, etc...
app.use(express.static(path.join(__dirname, 'public'), {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
}));


// Register routes.
app.use('/', require('./lib/routes'));

app.listen(app.get('port'), () => {
  logger.info('Hello express started on http://localhost:'
    + `${app.get('port')}; press Ctrl-C to terminate.`);
});

module.exports = app;
