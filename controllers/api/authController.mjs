import jwt from "jsonwebtoken";
import User from "../../models/User.mjs";
import bcrypt from 'bcrypt'

export const Login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({ where: { username : username } });
        const secretKey = 'abhysnutzabhyabhy'

        if(!user || !bcrypt.compareSync(password, user.password)){
            return res.status(201).json({
                "status":"201",
                "success":false,
                "message":"Username atau Password salah",
                "token":null
            })
        }

        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: 20 });

        return res.status(201).json({
            "status":"201",
            "success":true,
            "message":"Login Berhasil",
            "token":token
        }) 
    } catch (error) {
        res.status(500).json(error.message)
    }
    
}

export const Verify = (req, res) => {
    const secretKey = 'abhysnutzabhyabhy'

    jwt.verify(req.body.token, secretKey, (err, decoded) => {
        if (err) return res.status(200).json({ 'success':false,'message': 'Autentikasi tidak valid' });
        return res.status(201).json({'success':true,'message':null})
      });
}