import { Router } from 'express'
const router = Router()

//db connect
import { connect } from '../database'


router.get('/get', async (req, res) => {
    const db = await connect()
    if (1 < 2/*userisloged*/) {
        let result = await db.collection('presupuestos').find({}).toArray()
        res.send(result)
    }

})

router.post('/postPresupuesto', async (req, res) => {
    const db = await connect()
    if (req.body.presupuesto) {
        await db.collection('presupuestos').insertOne(req.body.presupuesto);
        res.send('presupuesto save')
    } else {
        res.send(401)
    }


})

router.post('/postEgresoToPresupuesto', async (req, res) => {
    const db = await connect()
    if (req.body.egreso) {
        let result = await db.collection('presupuestos').findOne({ id: req.body.presupuestoId })
        let aux=result.children.filter(child=> child.id === req.body.egreso.id)
        if(aux.length === 0){
            result.children.push(req.body.egreso)
            await db
                .collection('presupuestos')
                .update({'id':req.body.presupuestoId}, result);
        } 
    }else{
        res.send(401)
    }
})

router.post('/updateEgreso', async (req, res) => {
    const db = await connect()
    if (req.body.egresoUpdated) {
        let result = await db.collection('presupuestos').findOne({ id: req.body.presupuestoId })
    
        result.children.map(child=>{
            if(child.id === req.body.egresoUpdated.id){
                child.children = req.body.egresoUpdated.children
                child.restante = req.body.egresoUpdated.restante
            }
        })
        await db
            .collection('presupuestos')
            .update({'id':req.body.presupuestoId}, result);
    
    }else{
        res.send(401)
    }
})

router.put('/editEgreso', async (req, res) => {
    const db = await connect()
    if (req.body.egresoEdited) {
        let result = await db.collection('presupuestos').findOne({ id: req.body.presupuestoId })
        
        result.children.map(child=>{
            
            if(child.id === req.body.egresoEdited.id){
                child.monto = req.body.egresoEdited.monto
                child.name = req.body.egresoEdited.name
                child.restante = req.body.egresoEdited.restante
            }
        })
        await db
            .collection('presupuestos')
            .update({'id':req.body.presupuestoId}, result);
    
    }else{
        res.send(401)
    }
})

router.put('/deleteEgreso', async (req, res)=>{
    const db = await connect()
    console.log(req.body)
    if(req.body.egresoId){
        let result = await db.collection('presupuestos').findOne({ id: req.body.presupuestoId })
        console.log(result)
        result.children = result.children.filter(child=>child.id !== req.body.egresoId)
        await db
        .collection('presupuestos')
        .update({'id':req.body.presupuestoId}, result);
    }else{
        res.sendStatus(401)
    }
})




export default router