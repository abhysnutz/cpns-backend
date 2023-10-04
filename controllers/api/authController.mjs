import jwt from "jsonwebtoken";
import User from "../../models/User.mjs";
import bcrypt from 'bcrypt'
import { createToken } from "./userController.mjs";
import SendMailVerify from "../../mail/verifyMail.mjs";
import SendMailReset from "../../mail/resetPassword.mjs";
import { Op } from "sequelize";

export const Login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({ where: { email : email } });
        const secretKey = process.env.JWT_SECRET_KEY

        if(!user || !bcrypt.compareSync(password, user.password)){
            return res.status(201).json({
                "status":"201",
                "token":null,
                "error":['Kredensial tersebut tidak cocok dengan data kami.']
            })
        }

        const token = jwt.sign({ userId: user.id, verify:user.verify }, secretKey, { expiresIn: 300 });

        return res.status(201).json({
            "status":"201",
            "token":token,
            "message":null
        }) 
    } catch (error) {
        res.status(500).json({"error":[error.message]})
    }
    
}

export const Verify = (req, res) => {
    const secretKey = process.env.JWT_SECRET_KEY

    jwt.verify(req.body.token, secretKey, async (err, decoded) => {
        if (err) return res.status(200).json({ 'success':false,'message': 'Autentikasi tidak valid' });

        const user = await User.findByPk(decoded.userId);

        return res.status(201).json({'success':true,'message':null,"verify":user.verify})
    });
}

export const MailVerify = async (req, res) => {
    let token = req.body.token;
    let secretKey = process.env.JWT_SECRET_KEY
    try {
        const decoded = jwt.verify(token,secretKey)
        const user = await User.findByPk(decoded.userId);

        if(!user) return res.status(404).json({"message":"Pengguna tidak ditemukan."})
        if(user.verify) return res.status(400).json({"message":"Pengguna telah di verifikasi sebelumnya."})
        
        await user.update({ verify: true })

        const newtoken = jwt.sign({ userId: user.id, verify:user.verify }, secretKey, { expiresIn: 300 });

        return res.status(201).json({
            "message":"verifikasi telah berhasil",
            "token":newtoken
        })   
    } catch (error) {
        return res.status(500).json({"error":error.message})
    }
}

export const ResendToken = async (req, res) => {
    const user = await User.findByPk(req.body.id);

    try {
        let token = createToken(user.id,user.verify);
        SendMailVerify(token, user.name, user.email)
        
        return res.status(201).json({"message":"Email verifikasi berhasil dikirim. Silakan periksa kotak masuk atau spam."})
    } catch (error) {
        return res.status(500).json({"message":"Email verifikasi gagal dikirim","error":error.message})
    }
}

function checkTokenExpired(tokenExpiry) {
    const currentTime = new Date().getTime() / 1000;
    return (tokenExpiry - currentTime - 3480);
}

export const ForgotPassword = async (req,res) => {
    const email = req.body.email
    try {
        const user = await User.findOne({where : {email : email}})
        if(!user) return res.status(201).json({"error":['Kami tidak menemukan akun dengan alamat email tersebut']});

        if(user.reset){
            let decoded = jwt.decode(user.reset);
            if(checkTokenExpired(decoded.exp) > 0) return res.status(201).json({"error":[`Mohon coba lagi dalam ${Math.ceil(checkTokenExpired(decoded.exp))} detik`]});
        }
        
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: 3600 });
        await user.update({reset:token});

        const signature = user.reset.split('.')[2];
        SendMailReset(signature, user.name, user.email)

        return res.status(201).json({
            "error":[]
        })
    } catch (err) {
        return res.status(500).json({
            "error":[err.message]
        })
    }
}

export const GetResetPassword = async (req,res) => {
    try {
        const signature = req.query.signature
        const user = await User.findOne({where: {reset :{[Op.like]: `%${signature}`}}})
        if(!user) return res.status(201).json({"error":['Link tidak valid']})

        let decoded = jwt.decode(user.reset);
        if(checkTokenExpired(decoded.exp) < 0) return res.status(201).json({"error":[`Link kadaluarsa, harap mengirim email kembali melalui halaman lupa password.`]});
        
        return res.status(201).json({"email":user.email})
        
    } catch (error) {
        return res.status(500).json({"error":error.message})
    }
}

export const SetResetPassword = async (req,res) => {
    const {email, password, password_confirmation} = req.body;
    
    const user = await User.findOne({where: {email : email}});

    if(!user) return res.status(201).json({"error":"Pengguna dengan email ini tidak ditemukan"})

    if(password.length < 7) return res.status(201).json({"error":"Password minimal 7 karakter"})

    if(password != password_confirmation) return res.status(201).json({"error":"Password konfirmasi tidak cocok"})

    const hash = bcrypt.hashSync(password,10);
    user.update({password:hash, reset:null})
    return res.status(201).json({"error":null})
}