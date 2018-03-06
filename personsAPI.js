function findPersonAndPutInRequest(req,res,next){
    const personIndex = data.persons.findIndex(p => p.id === parseInt(req.params.personId))
    if(personIndex !== -1){
      req.data.persons = data.persons[personIndex]
      req.personIndex = personIndex
    }
    next()
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
