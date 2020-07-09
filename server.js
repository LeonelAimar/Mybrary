if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

const app = express()

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
const fetchBooksRouter = require('./routes/fetch_books')
const fetchAuthorsRouter = require('./routes/fetch_authors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(bodyParser.urlencoded({ 
    limit: '10mb', 
    extended: false 
    })
);
app.use(expressLayouts);
app.use(methodOverride('_method'))
app.use(express.static('public'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)
app.use('/fetch_books', fetchBooksRouter)
app.use('/fetch_authors', fetchAuthorsRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server listening on port 3000')
})