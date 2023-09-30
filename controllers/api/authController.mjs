import jwt from "jsonwebtoken";
import User from "../../models/User.mjs";
import bcrypt from 'bcrypt'
import { response } from "express";

export const Login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({ where: { email : email } });
        const secretKey = process.env.JWT_SECRET_KEY

        if(!user || !bcrypt.compareSync(password, user.password)){
            return res.status(201).json({
                "status":"201",
                "token":null,
                "message":'Kredensial tersebut tidak cocok dengan data kami.'
            })
        }

        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: 20 });

        return res.status(201).json({
            "status":"201",
            "token":token,
            "message":null
        }) 
    } catch (error) {
        res.status(500).json(error.message)
    }
    
}

export const Verify = (req, res) => {
    const secretKey = process.env.JWT_SECRET_KEY

    jwt.verify(req.body.token, secretKey, (err, decoded) => {
        if (err) return res.status(200).json({ 'success':false,'message': 'Autentikasi tidak valid' });
        return res.status(201).json({'success':true,'message':null})
      });
}

export const MailVerify = async (req, res) => {
    let token = req.body.token;

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user = await User.findByPk(decoded.userId);

        if(!user) return res.status(404).json({"message":"Pengguna tidak ditemukan."})
        if(user.verify) return res.status(400).json({"message":"Pengguna telah di verifikasi sebelumnya."})
        
        await user.update({ verify: true })

        return res.status(201).json({
            "message":"verifikasi telah berhasil",
        })   
    } catch (error) {
        return res.status(500).json({"error":error.message})
    }
    
}