const { expressjwt } = require("express-jwt")
const { token } = require("morgan")


const isAuthenticated = expressjwt ({
    secret: process.env.TOKEN_SECRET, 
    algorithms:["HS256"],
    requestProperty: "payload",
    getToken: (req) => {

       if(req.headers === undefined || req.headers.authorization === undefined) {
       // console.log("no tenemos token")
        return null
       }

       const tokenArr = req.headers.authorization.split(" ")
       const tokenType = tokenArr[0]
       const theToken = tokenArr[1]

       if(tokenType !== "Bearer") {
       // console.log("el token no es valido")
        return null
       }

       return theToken

    }

    

})

module.exports = isAuthenticated


