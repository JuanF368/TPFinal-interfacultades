const db = require('../db');
const jwt = require('jsonwebtoken');
module.exports.login = (req, res) =>{ 

    const {usmail, uspass} = req.body; 
    const consulta = 'SELECT * FROM  usuario WHERE usmail = ? AND uspass = ?'; 
    try {
        db.query(consulta, [usmail, uspass], (err, result)=>{
            if(err){
                res.send(err);
            }
            if (result.length > 0){
                const token = jwt.sign({usmail}, "Stack", {
                    expiresIn:'15m'
                }) 
                console.log(result); 
                res.send({token});
            } else {
                console.log('wrong user');
                res.send({message: 'wrong user'});
            }
        })
    } catch(e){

    }
}
