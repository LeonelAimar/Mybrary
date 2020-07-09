const express = require('express')
const router = express.Router()
const Author = require('../models/author')

router.get('/', async (req, res) => {
    let authors = await Author.find({})

    res.send(authors);
})

module.exports = router;