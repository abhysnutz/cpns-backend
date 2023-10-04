import User from "../../models/User.mjs"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import SendMailVerify from "../../mail/verifyMail.mjs";
import config from "../../config/app.mjs";

export const createToken = (userId,verify) => {
    let secret_key = process.env.JWT_SECRET_KEY;
    return jwt.sign({ userId,verify }, secret_key, { expiresIn: 10000 });
}

const checkMailExist = async (email) => {
    let checkmail = 0;
    checkmail = await User.findOne({ where: { email : email } });
    return !!checkmail;
}

export const create = async (req,res) => {
    const error = [];
    let isMailExist = false;
    try {
        const {name, email, password, password_confirmation, referrer} = req.body

        isMailExist = await checkMailExist(email);
        if(isMailExist) error.push('Email tersebut telah digunakan.')
        if(password.length == 0) error.push('Password harus diisi.')
        if(password.length < 7) error.push('Password minimal 7 karakter.')
        if(password != password_confirmation) error.push('Konfirmasi password tidak cocok.')

        if(error.length){
            return res.status(201).json({
                "status":201,
                "succeess":false,
                "error":error,
            });
        }

        const isNeedVerify = config.isNeedVerify == true ? 0 : 1;

        const hash = bcrypt.hashSync(password,10);
        const user = await User.create({
            name,
            email,
            password : hash,
            referrer, 
            verify: isNeedVerify
        })

        const token = createToken(user.id,user.verify);

        if(!isNeedVerify) SendMailVerify(token, user.name, user.email)

        return res.status(201).json({
            "status":201,
            "success":true,
            "message":"User has been created",
            "token":token,
            "data":{
                user:user
            },
            "error":error
        });
    } catch (err) {
        return res.status(500).json({
            "status":500,
            "success":false,
            "message":"User failed",
            "data":null,
            "error":error.push(err.message)
        })
    }
}