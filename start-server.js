const express = require('express')
const app = express()
app.use(require('body-parser').json())

let nextPersonId = 0
const persons = [
  { id: nextPersonId++, name: 'Jacques', lastName: 'VILLALON' },
  { id: nextPersonId++, name: 'Kevin', lastName: 'VALDEZ' },
  { id: nextPersonId++, name: 'Patrick ', lastName: 'JACQUES' },
  { id: nextPersonId++, name: 'Mobley ', lastName: 'TRENTON' },
  { id: nextPersonId++, name: 'Sachet ', lastName: 'PAUCHMON' },
  { id: nextPersonId++, name: 'Darlene ', lastName: 'ALDERSON' },
  { id: nextPersonId++, name: 'Bilbo ', lastName: 'SACQUET' },
  { id: nextPersonId++, name: 'David ', lastName: 'DIEGO' },
]


function findPersonAndPutInRequest(req,res,next){
  const personIndex = persons.findIndex(p => p.id === parseInt(req.params.personId))

}
// middlewares
function findCarAndPutInRequest(req, res, next) {
  const carIndex = cars.findIndex(
    c => c.id === parseInt(req.params.carId))
  if (carIndex !== -1) {
    req.car = cars[carIndex]
    req.carIndex = carIndex
  }
  next()
}

function interruptIfNotFound(req, res, next) {
  if (req.car) {
    next()
  } else {
    res.status(404).json({ error: 'Car not found' })
  }
}

function validateCarDataInRequestBody(req, res, next) {
  const carData = req.body
  const carsDatas;
  if(carData.model){
      next()
      req.carData
    }else{
      res.status(400).json({ error: 'missing car model' })
    }if(carData.model){
      next()
  }else{
    res.status(400).json({ error: 'missing car brand' })
  }

  if(carData.model && carData.brand){
    next()
  }else{
    res.status(400).json({ error: 'missing car brand & model' })
  }
}

// lectures
app.get('/cars', (req, res) => res.json(cars))

app.get('/cars/by-brand', (req, res) => {
  const brand = req.query.brand
  if (brand) {
    res.json(cars.filter(c => c.brand === brand))
  } else {
    res.status(400).json({ error: 'missing brand criteria' })
  }
})

app.get('/cars/:carId', findCarAndPutInRequest, interruptIfNotFound,
  (req, res) => res.json(req.car)
)

// création
app.post('/cars', validateCarDataInRequestBody,
 (req, res) => {
  const carData = req.body
  if (carData.brand && carData.model) {
    const car = Object.assign({ id: nextCarId }, carData)
    nextCarId++
    cars.push(car)
    res.status(201).json(car)
  } else {
    res.status(400).json({ error: 'Invalid car' })
  }
})

// modifications
app.put('/cars/:carId',
findCarAndPutInRequest,
interruptIfNotFound,
validateCarDataInRequestBody,
(req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.carId))
  if (car) {
    const carData = req.body
    if (carData.brand && carData.model) {
      Object.assign(car, carData)
      res.status(200).json(car)
    } else {
      res.status(400).json({ error: 'Invalid car' })
    }
  } else {
    res.status(404).json({ error: 'Car not found' })
  }
})

app.patch('/cars/:carId',
findCarAndPutInRequest,interruptIfNotFound,
 (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.carId))
  if (car) {
    const carData = req.body
    Object.assign(car, carData)
    res.status(200).json(car)
  } else {
    res.status(404).json({ error: 'Car not found' })
  }
})

// suppression
app.delete('/cars/:carId', findCarAndPutInRequest, (req, res) => {
  if (req.car) {
    cars.splice(req.carIndex, 1)
  }
  // idempotence
  res.status(204).end()
})

// lancement du serveur web
app.listen(3000, () => console.log('On http://localhost:3000/'))
