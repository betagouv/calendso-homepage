require('dotenv').config()
const express = require('express')
const path = require('path')

const appName = `Calendso`
const appDescription = "Calendso de l'incubateur beta.gouv.fr"
const appUrl = process.env.APP_URL
const appRepo = 'https://github.com/betagouv/calendso-homepage'
const port = process.env.APP_PORT || process.env.PORT || 8080

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/static', express.static('static'))
// Hack for importing css from npm package
app.use('/~', express.static(path.join(__dirname, 'node_modules')))
// Populate some variables for all views
app.use(function(req, res, next){
  res.locals.appName = appName
  res.locals.appDescription = appDescription
  res.locals.appRepo = appRepo
  res.locals.appUrl = appUrl
  res.locals.page = req.url
  next()
})

app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/mentions-legales', (req, res) => {
  res.render('legalNotice', {
    pageTitle: "Mentions légales",
    contactEmail: 'mon-produit@beta.gouv.fr',
  })
})

module.exports = app.listen(port, () => {
  console.log(`${appName} listening at http://localhost:${port}`)
})