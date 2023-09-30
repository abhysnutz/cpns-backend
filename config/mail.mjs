import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host:"smtp-relay.brevo.com",
    port:587,
    auth:{
        user:"abhy.riri.1@gmail.com",
        pass:"kKAzTDLS3atXrQhU"
    }
})