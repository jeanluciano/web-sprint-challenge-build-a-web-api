// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Action = require('./actions-model')
const {
    validateActionId,
    validateAction,
} = require("../middleware/middleware");

router.get('/', async (req, res) => {
    try {
        const actions = await Action.get();
        res.status(200).json(actions);
    } catch (e) {
        res.status(500).json({
            message: "The posts information could not be retrieved",
        });
    }
})

router.get(':id', validateActionId ,async (req, res)=>{
    const { id } = req.params;
    const action = await Action.findById(id);
    res.status(200).json(action);
})

router.post('/', validateAction ,async (req, res) => {
    
    const newAction = await Action.insert(req.body);
    res.status(201).json(newAction);
})

router.put('/:id', validateActionId, validateAction ,async (req , res) =>{
    const update = req.body;
    const { id } = req.params;
    const actionUpdated = await Action.update(id, update);
    actionUpdated
        ? res.status(200).json({ ...update, id })
        : res.status(500).json({
              message: "The post information could not be modified",
          });
})

router.delete('/:id', validateActionId ,async (req, res)=>{
    const { id } = req.params;
    const postDeleted = await Action.delete(id);
    postDeleted
        ? res.status(200)
        : res.status(500).json({ message: "The post could not be removed" });
})

module.exports = router;