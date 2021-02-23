require('@babel/polyfill')
const express = require('express')
const app = express()
import {connect} from './database'
import Routes from './routes/index.routes'
import PresupuestosRoutes from './routes/presupuestos.routes'
//settings
app.set('port', process.env.PORT || 3000)

//Middlewates
app.use(express.json())
//Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//Routes
app.use(Routes)
app.use('/api', PresupuestosRoutes)





async function main(){
    await app.listen(app.get('port'))
    await connect()
    console.log('server on port', app.get('port'))
}

main()