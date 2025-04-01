const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()
const port = 3000

app.use(express.json())

app.use(routes)

app.use(cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
    }
));



app.listen(port, () => { 
    console.log(`Server is listening on port ${port}`) 
})