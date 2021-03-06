const express = require('express')
const bodyParser = require('body-parser')
const {
    initProductRoutes,
    initCartRoutes,
    initOrderRoutes
} = require("./routes")

const app = express()
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

initProductRoutes(app)
initCartRoutes(app)
initOrderRoutes(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
