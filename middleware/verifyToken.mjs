import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const bearer = req.headers.authorization;

    if(!bearer) return res.status(401).json({"status":401, "message":"unauthorized => No bearer"})

    const token  = bearer.replace('Bearer ','');
    if(!token) return res.status(401).json({"status":401, "message":"unauthorized => No token"})

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({"status":401, "message":"unauthorized => Invalid JWT"})
        
        next()
    });
}

export default verifyToken;