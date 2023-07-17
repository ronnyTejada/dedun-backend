import MongoClient from 'mongodb'

export async function connect() {
    try {
        const client = await MongoClient.connect('mongodb+srv://rjt:Hola123-@cluster0.ir5xivc.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        const db = client.db('db-dedun');
        console.log('DB IS CONNECTED')
        return db;
    } catch (e) {
        console.log(e)
    }

}

