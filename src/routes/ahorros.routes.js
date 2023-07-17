import { Router } from 'express'
const router = Router()

//db connect
import { connect } from '../database'


router.get('/getAllAhorros', async (req, res) => {
    const db = await connect()
    if (1 < 2/*userisloged*/) {
        let result = await db.collection('ahorros').find({author:req.query.author}).toArray()
        res.send(result)
    }

})

router.get('/getMetaById', async (req, res) => {
    const db = await connect()
    if (1 < 2/*userisloged*/) {
        console.log(req.query.meta)
        let result = await db.collection('ahorros').findOne({id:req.query.meta})
        res.send(result)
    }else{
        res.send(401)
    }

})

router.post('/postAhorros', async (req, res) => {
    const db = await connect()
    if (req.body.ahorro) {
        await db.collection('ahorros').insertOne(req.body.ahorro);
        res.send('ahorro save')
    } else {
        res.send(401)
    }


})

router.post('/postDineroAhorro', async (req,res)=>{
    const db = await connect()
    if(req.body.monto && req.body.ahorroId){
        console.log(req.body)
        let result = await db.collection('ahorros').findOne({ 'id': req.body.ahorroId })
        console.log(result)
        result.ahorrado = parseInt(req.body.monto)

        await db
        .collection('ahorros')
        .update({'id':req.body.ahorroId}, result);
    }else{
        res.send(401)
    }
})

router.put('/deleteAhorro', async (req, res)=>{
    const db = await connect()
    
    if(req.body.ahorroId){
        await db.collection('ahorros').deleteOne({ id: req.body.ahorroId })
       
        
    }else{
        res.sendStatus(401)
    }
})

export default router