import User from "../../models/User.mjs"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import MailVerify from "../../mail/verify.mjs";

const createToken = (userId) => {
    let secret_key = process.env.JWT_SECRET_KEY;
    return jwt.sign({ userId }, secret_key, { expiresIn: 1200 });
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

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                const user = await User.create({
                    name, email, password : hash, referrer
                })

                let token = createToken(user.id);

                MailVerify(token)
                return res.status(201).json({
                    "status":201,
                    "success":true,
                    "message":"User has been created",
                    "token":token,
                    "data":{
                        user:user
                    },
                    "error":error
                })
            });
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

export const validate = async (req, res) => {
    try {
        const {name, value} = req.body
        let Exist = await checkExist(name, value);
        return res.status(201).json({
            "status":201,
            "exist":Exist ? 1 : 0,
            "error":null
        })
    } catch (error) {
        return res.status(500).json({
            "status":500,
            "exist":1,
            "error":error.message
        })
    }
}

const checkExist = async (name, value) => {
    let user = 0;
    if(name == 'username') user = await User.findOne({ where: { username : value } });
    if(name == 'email') user = await User.findOne({ where: { email : value } });
    
    return !!user; // Return true if user exists, false otherwise
};