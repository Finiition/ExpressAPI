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
      req.group = data.groups[groupIndex]
      req.name = data.groups[groupIndex].name
      req.members = data.groups[groupIndex].members
      req.groupIndex = groupIndex
    }
    next()
  }

  

/**
 * Regarde si le groupe passé en paramètre de la requête existe, si non retourne une erreur.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function interruptIfNotFoundGroup(req, res, next) {
    if (req.group) {
      next()
    } else {
      res.status(404).json({ error: 'Group not found' })
    }
  }

function validateGroupDataInRequestBody(req,res,next){
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


  // Get tous les groupes
  groupRouter.get('/',findGroupAndPutInRequest, (req, res) => res.json(data.groups))
  // Get le groupe possedant l'id passé en paramètre (s'il existe)
  groupRouter.get('/:groupId', findGroupAndPutInRequest,
  (req, res) => {
    const group = data.groups.find(
      g => g.id === parseInt(req.params.groupId))
      if (group) {
        res.json(group)  
      } else {
        res.status(404).json({ error: 'Group not found' }) 
    }}) 
 module.exports = groupRouter