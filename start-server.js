const express = require('express')
const app = express()
app.use(require('body-parser').json())
app.use('/groups',require('./router/groupRouter'))
app.use('/persons',require('./router/personRouter'))

// lancement du serveur web
app.listen(3000, () => console.log('On http://localhost:3000/'))
