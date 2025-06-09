const express=require('express');
const router=express.Router();
 const authMiddleware=require('../middleware/authMiddleware');
const taskController=require('../controllers/taskController');
router.post('/',authMiddleware,taskController.createTask);
router.get('/',authMiddleware,taskController.getTask);
router.delete('/:id',authMiddleware,taskController.deleteTask);
router.put('/:id',authMiddleware,taskController.UpdateTask);
module.exports=router;