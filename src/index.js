require('@babel/polyfill')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./config')
import {connect} from './database'
import Routes from './routes/auth.routes'
import PresupuestosRoutes from './routes/presupuestos.routes'
import AhorrosRoutes from './routes/ahorros.routes'
import AuthRoutes from './routes/auth.routes'
 
//settings
app.set('port', process.env.PORT || 3001)

//Middlewates
app.use(express.json())
// 1
app.set('llave', config.llave);
// 2
app.use(bodyParser.urlencoded({ extended: true }));
// 3
app.use(bodyParser.json());


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
app.use('/api', AhorrosRoutes)
app.use('/api', AuthRoutes)


async function main(){
    await app.listen(app.get('port'))
    await connect()
    console.log('server on port', app.get('port'))
}

main()