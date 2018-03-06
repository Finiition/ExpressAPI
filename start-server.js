const express = require('express')
const app = express()
app.use(require('body-parser').json())
app.use('/groups',require('./groupRouter'))
app.use('/persons',require('./personRouter'))

// lectures


// app.get('/cars/by-brand', (req, res) => {
//   const brand = req.query.brand
//   if (brand) {
//     res.json(cars.filter(c => c.brand === brand))
//   } else {
//     res.status(400).json({ error: 'missing brand criteria' })
//   }
// })

// app.get('/cars/:carId', findCarAndPutInRequest, interruptIfNotFound,
//   (req, res) => res.json(req.car)
// )

// // création
// app.post('/cars', validateCarDataInRequestBody,
//  (req, res) => {
//   const carData = req.body
//   if (carData.brand && carData.model) {
//     const car = Object.assign({ id: nextCarId }, carData)
//     nextCarId++
//     cars.push(car)
//     res.status(201).json(car)
//   } else {
//     res.status(400).json({ error: 'Invalid car' })
//   }
// })

// // modifications
// app.put('/cars/:carId',
// findCarAndPutInRequest,
// interruptIfNotFound,
// validateCarDataInRequestBody,
// (req, res) => {
//   const car = cars.find(c => c.id === parseInt(req.params.carId))
//   if (car) {
//     const carData = req.body
//     if (carData.brand && carData.model) {
//       Object.assign(car, carData)
//       res.status(200).json(car)
//     } else {
//       res.status(400).json({ error: 'Invalid car' })
//     }
//   } else {
//     res.status(404).json({ error: 'Car not found' })
//   }
// })

// app.patch('/cars/:carId',
// findCarAndPutInRequest,interruptIfNotFound,
//  (req, res) => {
//   const car = cars.find(c => c.id === parseInt(req.params.carId))
//   if (car) {
//     const carData = req.body
//     Object.assign(car, carData)
//     res.status(200).json(car)
//   } else {
//     res.status(404).json({ error: 'Car not found' })
//   }
// })

// // suppression
// app.delete('/cars/:carId', findCarAndPutInRequest, (req, res) => {
//   if (req.car) {
//     cars.splice(req.carIndex, 1)
//   }
//   // idempotence
//   res.status(204).end()
// })

// lancement du serveur web
app.listen(3000, () => console.log('On http://localhost:3000/'))
