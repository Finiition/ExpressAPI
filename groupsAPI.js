function findGroupAndPutInRequest(req,res,next){
    const groupIndex = data.groups.findIndex(p => p.id === parseInt(req.params.groupId))
    if(groupIndex !== -1){
      req.data.groups = data.groups[groupIndex]
      req.groupIndex = groupIndex
    }
    next()
  }

  function interruptIfNotFoundPerson(req, res, next) {
    if (req.data.groups) {
      next()
    } else {
      res.status(404).json({ error: 'Group not found' })
    }
  }

  function validatePersonDataInRequestBody(req,res,next){
    const groupData = req.body
    if(groupData.name){
      next()
    }else{
      res.status(400).json({ error: 'missing groups names' })
    }
  
    if (groupData.members){
      next()
    }else{
      res.status(400).json({ error: 'missing groups members' })
    }

    if (groupData.name && groupData.members){
      next()
    }else{
      res.status(400).json({ error: 'missing groups ( no name, no member(s))' })
    }
  }
