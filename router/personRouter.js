const express = require('express')
const personRouter = express.Router()
let nextPersonId = 0
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
  ]
}

// middlewares
function findPersonAndPutInRequest(req,res,next){
    const personIndex = data.persons.findIndex(
        p => p.id === parseInt(req.params.personId))
    if(personIndex !== -1){
      req.person = data.persons[personIndex]
      req.name = data.persons[personIndex].name
      req.lastName = data.persons[personIndex].lastName
      req.numbers = data.persons[personIndex].numbers
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

personRouter.get('/', (req, res) => res.json(data.persons))
personRouter.get('/:personId', findPersonAndPutInRequest,interruptIfNotFoundPerson,
(req, res) => {
  const person = data.persons.find(
    p => p.id === parseInt(req.params.personId))
    if (person) {
      res.json(person)  
    } else {
      res.status(404).json({ error: 'Person not found' })
  }}) 

module.exports = personRouter