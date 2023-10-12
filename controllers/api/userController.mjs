import User from "../../models/User.mjs"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import SendMailVerify from "../../mail/verifyMail.mjs";
import config from "../../config/app.mjs";
import UserDetail from "../../models/UserDetail.mjs";
import Province from "../../models/Province.mjs";
import City from "../../models/City.mjs";

export const createToken = (userId,verify,session) => {
    let secret_key = process.env.JWT_SECRET_KEY;
    return jwt.sign({ userId,verify,session }, secret_key);
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

        const isNeedVerify = config.isNeedVerify === 'true' ? 0 : 1;
        
        const hash = bcrypt.hashSync(password,10);

        const user = await User.create({ name, email, password : hash, verify: isNeedVerify })
        await UserDetail.create({referrer, userId:user.id})

        const token = createToken(user.id,user.verify,'mailverify');

        await user.update({session : token})

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

export const show = async (req,res) => {
    try {
        const user_id = req.params.id
        const user = await User.findByPk(user_id,{attributes: ['name','email'],include: [{ model: UserDetail, as: 'profile', include: [{model:City, as: 'city'}] }]});

        return res.status(201).json({
            "status":201,
            "success":true,
            "data":user,
            "error":null
        })
    } catch (error) {
        console.log(error.message);
        return res.status(501).json({
            "status":501,
            "success":false,
            "data":null,
            "error":error.message
        })
    }
}

export const update = async (req,res) => {
    try {
        const user_id = req.params.id
        const {update,name, phone, birth, education, major, address, cityId, provinceId, old_password, new_password, confirm_password} = req.body

        
        if(update === 'akun'){
            const user = await User.findByPk(user_id);
            if(!name) return res.status(401).json({"status":401, "message":"Nama harus wajib diisi"})
            user.name = name;
            await user.save();
        }

        if(update === 'profil'){
            const detail = await UserDetail.findOne({where : {userId : user_id}});
            let error = [];
            console.log(provinceId);
            console.log(cityId);
            if(phone || birth || education || major || address || cityId || provinceId){
                const numeric = /^[0-9]+$/;
                if(!numeric.test(phone)) error.push("Telepon harus berupa angka")
                if(error.length) return res.status(401).json({"status":401, "message":error})

                detail.phone = phone;
                detail.birth = birth;
                detail.education = education
                detail.major = major
                detail.address = address
                detail.provinceId = provinceId
                detail.cityId = cityId
            }
            await detail.save()
        }

        if(update === 'password'){
            const user = await User.findByPk(user_id);
            let error = [];

            if(!user || !bcrypt.compareSync(old_password, user.password))error.push('Password sekarang tidak cocok.')
            if(new_password.length < 7) error.push('Password minimal 7 karakter.')
            if(new_password != confirm_password) error.push('Konfirmasi password tidak cocok.')
            if(error.length) return res.status(401).json({"status":401, "message":error})

            const hash = bcrypt.hashSync(new_password,10);
            user.password = hash;
            await user.save();
        }
        
        return res.status(201).json({
            "status":201,
            "message":`Informasi ${update} berhasil disimpan`,
            "error":null
        })
    } catch (error) {
        console.error(error.message);
        return res.status(501).json({
            "status":501,
            "data":null,
            "error":[error.message]
        })
    }
}

export const province = async (req, res) => {
    try {
        const provinces = await Province.findAll({})
        if(!provinces) return res.status(401).json({"status":401, "message":"Provinsi tidak ditemukan" })

        return res.status(201).json({
            "status":201,
            "data":provinces
        })
    } catch (error) {
        return res.status(500).json({
            "status":501,
            "error":error.message
        })
    }
}

export const city = async (req, res) => {
    const {provinceId} = req.query

    try {
        const cities = await City.findAll({where : {provinceId}})
        
        if(!cities) return res.status(401).json({"status":401, "message":"Kota tidak ditemukan" })

        return res.status(201).json({
            "status":201,
            "data":cities
        })
    } catch (error) {
        return res.status(501).json({
            "status":501,
            "error":error.message
        })
    }
}