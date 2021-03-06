const express = require('express')
const personRouter = express.Router()
let nextPersonId = 0
const persons = [
    { id: nextPersonId++, name: 'Jacques',  lastName: 'VILLALON' ,    numbers:["0624572559"] },
    { id: nextPersonId++, name: 'Kevin',    lastName: 'VALDEZ' ,      numbers:["0673928176","0283946102"] },
    { id: nextPersonId++, name: 'Patrick ', lastName: 'JACQUES' ,     numbers:["0296398217"] },
    { id: nextPersonId++, name: 'Mobley ',  lastName: 'TRENTON' ,     numbers:["0285639472"] },
    { id: nextPersonId++, name: 'Sachet ',  lastName: 'PAUCHMON' ,    numbers:["0737456472"] },
    { id: nextPersonId++, name: 'Darlene ', lastName: 'ALDERSON' ,    numbers:["0792618462","0234789187"] },
    { id: nextPersonId++, name: 'Bilbo ',   lastName: 'SACQUET' ,     numbers:["0312345679","0123456789"] },
    { id: nextPersonId++, name: 'David ',   lastName: 'DIEGO' ,       numbers:["0666333786","0285639472"]}
]

// middlewares
function findPersonAndPutInRequest(req,res,next){
    const personIndex = persons.findIndex(
        p => p.id === parseInt(req.params.personId))
    if(personIndex !== -1){
      req.person = persons[personIndex]
      req.name = persons[personIndex].name
      req.lastName = persons[personIndex].lastName
      req.numbers = persons[personIndex].numbers
      req.personIndex = personIndex
  }
  next()
}

function interruptIfNotFoundPerson(req, res, next) {
    if (req.person) {
      next()
    } else {
      res.status(404).json({ error: 'Person not found' })
    }
}
function deletePerson(personId){
  const personIndex = persons.findIndex(p => p.id === parseInt(personId))
  console.log("Suppresion d'une personne à l'index",personIndex);
  if (personIndex >= 0) {
    persons.splice(personIndex, 1)
  }
}
function validatePersonDataInRequestBody(req,res,next){
    const personData = req.body
    if(personData.name){
      next()
    }else{
      res.status(400).json({ error: 'missing persons name' })
    }

    if (personData.lastName){
      next()
    }else{
      res.status(400).json({ error: 'missing persons last name' })
    }

    if (personData.numbers){
      next()
    }else{
      res.status(400).json({ error: 'missing persons number(s)' })
    }

    if (personData.name && personData.lastName && personData.numbers){
      next()
    }else{
      res.status(400).json({ error: 'missing person ( no name, no last name, no number(s)' })
    }
}

// lectures

personRouter.get('/', (req, res) => res.json(persons))
personRouter.get('/:personId', findPersonAndPutInRequest,interruptIfNotFoundPerson,
  (req, res) => {
  const person = persons.find(
    p => p.id === parseInt(req.params.personId))
    if (person) {
      res.json(person)
    } else {
      res.status(404).json({ error: 'Person not found' })
}})

  //Suppression d'un groupe
  /**
    * Example : localhost:3000/persons/1
    */
  personRouter.delete('/:personId',findPersonAndPutInRequest, (req, res) => {
    console.log(req.params.personId);
    const person = persons.find(
      p => p.id === parseInt(req.params.personId))
      if (person) {
        deletePerson(req.params.personId)
        res.redirect('/persons', 302)
      } else {
        res.status(404).json({ error: 'Group not found' })
    }
  })

/**
 * Example : localhost:3000/persons?name=test&lastName=test&numbers=[0792618465]
 */
personRouter.post('/' , (req, res) => {
    const personData = req.query
    if (personData.name && personData.lastName && personData.numbers) {
      const person = Object.assign({ id: nextPersonId }, personData)
      nextPersonId++
      persons.push(person)
      res.status(201).json(person)
    } else {
      res.status(400).json({ error: '400 : Invalid person'})
    }
})

/**
 * Example : localhost:3000/persons/1?name=test&lastName=test&numbers=[1234567]
 */
personRouter.put('/:personId', (req, res) => {
  const person = persons.find(c => c.id === parseInt(req.params.personId))
  if (person) {
    const personData = req.query
    if (personData.name && personData.lastName) {
      Object.assign(person, personData)
      res.status(200).json(person)
    } else {
      res.status(400).json({ error: 'Invalid person' })
    }
  } else {
    res.status(404).json({ error: 'person not found' })
  }
})

/**
 * Example : localhost:3000/persons/1/addNumber?numbers=155555555
 */
personRouter.patch('/:personId/addNumber', (req, res) => {
  const person = persons.find(c => c.id === parseInt(req.params.personId))
  if (person) {
    const personData = req.query
    Object.assign(person, personData)
    res.status(200).json(person)
  } else {
    res.status(404).json({ error: 'person not found' })
  }
})


module.exports = personRouter