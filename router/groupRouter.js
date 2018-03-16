const express = require('express')
const groupRouter = express.Router()
let nextGroupId = 0

const groups = [
    { id: nextGroupId++, name : "Les Valdez",members :[1,4,5] },
    { id: nextGroupId++, name : "Flashers",members :[2,3,7] },
    { id: nextGroupId++, name : "Issou Gang",members :[5,6] },
    { id: nextGroupId++, name : "Pearlers",members :[3,6,7] },
    { id: nextGroupId++, name : "Cafeinz",members :[4,1,2] }
]
function findGroupAndPutInRequest(req,res,next){
    const groupIndex = groups.findIndex(p => p.id === parseInt(req.params.groupId))
    if(groupIndex !== -1){
      req.group = groups[groupIndex]
      req.name = groups[groupIndex].name
      req.members = groups[groupIndex].members
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
    const groupData = req.query
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

function findGroupAndDeleteInRequest(){

}
  // Get tous les groupes
  groupRouter.get('/',findGroupAndPutInRequest, (req, res) => res.json(groups))
  // Get le groupe possedant l'id passé en paramètre (s'il existe)
  groupRouter.get('/:groupId', findGroupAndPutInRequest,
    (req, res) => {
    const group = groups.find(
      g => g.id === parseInt(req.params.groupId))
      if (group) {
        res.json(group)
      } else {
        res.status(404).json({ error: 'Group not found' })
  }})

  //Suppression d'un groupe
  groupRouter.delete('/', (req, res) => {
    console.log(req.query);
    /*const group = groups.find(
      g => g.id === parseInt(req.params.groupId))
      if (group) {
        res.json(group)
      } else {
        res.status(404).json({ error: 'Group not found' })
  }*/})

  /**
 * Example : localhost:3000/groups?name=test&members=[1,2,3]
 */
  groupRouter.post('/ajout' , (req, res) => {
    const groupData = req.query
    console.log(groupData.members)
    if (groupData.name && groupData.members) {
      const group = Object.assign({ id: nextGroupId }, groupData)
      nextGroupId++
      groups.push(group)
      res.status(201).json(group)
    } else {
      res.status(400).json({ error: '400 : Invalid group'})
    }
  })

/**
 * Example : localhost:3000/groups/1?name=test
 */
groupRouter.put('/:groupId', (req, res) => {
  const group = groups.find(c => c.id === parseInt(req.params.groupId))
  if (group) {
    const groupData = req.query
    if (groupData.name) {
      Object.assign(group, groupData)
      res.status(200).json(group)
    } else {
      res.status(400).json({ error: 'Invalid group' })
    }
  } else {
    res.status(404).json({ error: 'group not found' })
  }
})

 module.exports = groupRouter