import User from "../../models/User.mjs"

export const create = async (req,res) => {
    try {
        const {username, email, password} = req.body

        const user = await User.create({
            username, email, password
        })

        return res.status(201).json({
            "status":201,
            "success":true,
            "message":"User has been created",
            "data":{
                user:user
            },
            "error":null

        })
    } catch (error) {
        return res.status(500).json({
            "status":500,
            "success":false,
            "message":"User failed",
            "data":null,
            "error":error.message
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