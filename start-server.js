const express = require('express')
const app = express()
app.use(require('body-parser').json())

let nextPersonId = 0
let nextGroupId = 0
const data = {  
  persons: [
    { id: nextPersonId++, name: 'Jacques', lastName: 'VILLALON' ,numbers:["0624572559"] },
    { id: nextPersonId++, name: 'Kevin', lastName: 'VALDEZ' ,numbers:["0673928176","0283946102"] },
    { id: nextPersonId++, name: 'Patrick ', lastName: 'JACQUES' ,numbers:["0296398217"] },
    { id: nextPersonId++, name: 'Mobley ', lastName: 'TRENTON' ,numbers:["0285639472"] },
    { id: nextPersonId++, name: 'Sachet ', lastName: 'PAUCHMON' ,numbers:["0737456472"] },
    { id: nextPersonId++, name: 'Darlene ', lastName: 'ALDERSON' ,numbers:["0792618462","0234789187"] },
    { id: nextPersonId++, name: 'Bilbo ', lastName: 'SACQUET' ,numbers:["0312345679","0123456789"] },
    { id: nextPersonId++, name: 'David ', lastName: 'DIEGO' ,numbers:["0666333786","0285639472"]}
  ] , 
  groups: [
    { id: nextGroupId++, name : "Les Valdez",members :[1,4,5] },
    { id: nextGroupId++, name : "Flashers",members :[2,3,7] },
    { id: nextGroupId++, name : "Issou Gang",members :[5,6] },
    { id: nextGroupId++, name : "Pearlers",members :[3,6,7] },
    { id: nextGroupId++, name : "Cafeinz",members :[4,1,2] }
 ]
}


// lectures
app.get('/persons', (req, res) => res.json(data.persons))
app.get('/groups', (req, res) => res.json(data.groups))




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
