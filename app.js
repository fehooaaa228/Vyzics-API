const express = require('express')
const routes = require('./routes')
require('dotenv').config()

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "*"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
});

app.use(routes)

app.listen(process.env.PORT, () => { 
    console.log(`Server is listening on port ${process.env.PORT}`) 
})