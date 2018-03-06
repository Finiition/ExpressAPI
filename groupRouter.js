const express = require('express')
const groupRouter = express.Router()
let nextGroupId = 0

const data = {   
  groups: [
    { id: nextGroupId++, name : "Les Valdez",members :[1,4,5] },
    { id: nextGroupId++, name : "Flashers",members :[2,3,7] },
    { id: nextGroupId++, name : "Issou Gang",members :[5,6] },
    { id: nextGroupId++, name : "Pearlers",members :[3,6,7] },
    { id: nextGroupId++, name : "Cafeinz",members :[4,1,2] }
 ]
}
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


  groupRouter.get('/', (req, res) => res.json(data.groups))

  module.exports = groupRouter