

// middlewares
function findPersonAndPutInRequest(req,res,next){
    const personIndex = data.persons.findIndex(
        p => p.id === parseInt(req.params.personId))
    if(personIndex !== -1){
      req.data.persons = data.persons[personIndex]
      req.personIndex = personIndex
    }
    next()
  }


function interruptIfNotFoundPerson(req, res, next) {
    if (req.data.persons) {
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

app.get('/persons', (req, res) => res.json(data.persons))