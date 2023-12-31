// import {createTransport} from 'nodemailer'
import nodemailer from 'nodemailer'
import { transporter } from '../config/mail.mjs';
import axios from 'axios';
import Province from '../models/Province.mjs';
import City from '../models/City.mjs';

export const Mail = (req,res) => {
    const mailOptions = {
        from: 'abhy.riri.19@gmail.com',
        to: 'syafri@dv9.com',
        subject: `Verifikasi Alamat Email`,
        html: `
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';background-color:#edf2f7;margin:0;padding:0;width:100%">
                <tbody>
                    <tr>
                        <td align="center" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';margin:0;padding:0;width:100%">
                                <tbody>
                                    <tr>
                                        <td style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';padding:25px 0;text-align:center">
                                            <a href="https://ayopppk.com" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';color:#3d4852;font-size:19px;font-weight:bold;text-decoration:none;display:inline-block" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://ayopppk.com&amp;source=gmail&amp;ust=1696146995309000&amp;usg=AOvVaw1N18SaMHR1YI8wpKDELHiP">
                                            AYOPPPK
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="100%" cellpadding="0" cellspacing="0" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';background-color:#edf2f7;border-bottom:1px solid #edf2f7;border-top:1px solid #edf2f7;margin:0;padding:0;width:100%">
                                            <table class="m_5887597683018333813inner-body" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';background-color:#ffffff;border-color:#e8e5ef;border-radius:2px;border-width:1px;margin:0 auto;padding:0;width:570px">
                                                <tbody>
                                                    <tr>
                                                        <td style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';max-width:100vw;padding:32px">
                                                            <h1 style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';color:#3d4852;font-size:18px;font-weight:bold;margin-top:0;text-align:left">Hai kak Mohamad Syafri Lamato,</h1>
                                                            <p style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Silakan klik tombol berikut untuk verifikasi alamat email supaya akun kamu dapat diaktivasi dan digunakan.</p>
                                                            <table align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';margin:30px auto;padding:0;text-align:center;width:100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="center" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                                                                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                                                                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                                                                                                            <a href="https://ayopppk.com/verify-email/84074/09e4aba35694066dd2b801093d31a0dbf79ab6b5?expires=1696004074&amp;signature=ac33bb12f3799ac1d4a58e59bd48b45d64c24042ac0ea0c927e11c5d68beef5d" class="m_5887597683018333813button" rel="noopener" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';border-radius:4px;color:#fff;display:inline-block;overflow:hidden;text-decoration:none;background-color:#2d3748;border-bottom:8px solid #2d3748;border-left:18px solid #2d3748;border-right:18px solid #2d3748;border-top:8px solid #2d3748" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://ayopppk.com/verify-email/84074/09e4aba35694066dd2b801093d31a0dbf79ab6b5?expires%3D1696004074%26signature%3Dac33bb12f3799ac1d4a58e59bd48b45d64c24042ac0ea0c927e11c5d68beef5d&amp;source=gmail&amp;ust=1696146995309000&amp;usg=AOvVaw37rMO1UsmBO_Zp4sSpvBj6">Verifikasi Email</a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <p style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Abaikan email ini apabila kamu tidak merasa mendaftar di website kami. Terima kasih.</p>
                                                            <p style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Regards,<br>
                                                                AYOPPPK
                                                            </p>
                                                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';border-top:1px solid #e8e5ef;margin-top:25px;padding-top:25px">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                                                                            <p style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';line-height:1.5em;margin-top:0;text-align:left;font-size:14px">If you're having trouble clicking the "Verifikasi Email" button, copy and paste the URL below
                                                                                into your web browser: <span style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';word-break:break-all"><a href="https://ayopppk.com/verify-email/84074/09e4aba35694066dd2b801093d31a0dbf79ab6b5?expires=1696004074&amp;signature=ac33bb12f3799ac1d4a58e59bd48b45d64c24042ac0ea0c927e11c5d68beef5d" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';color:#3869d4" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://ayopppk.com/verify-email/84074/09e4aba35694066dd2b801093d31a0dbf79ab6b5?expires%3D1696004074%26signature%3Dac33bb12f3799ac1d4a58e59bd48b45d64c24042ac0ea0c927e11c5d68beef5d&amp;source=gmail&amp;ust=1696146995309000&amp;usg=AOvVaw37rMO1UsmBO_Zp4sSpvBj6">https://ayopppk.com/verify-<wbr>email/84074/<wbr>09e4aba35694066dd2b801093d31a0<wbr>dbf79ab6b5?expires=1696004074&amp;<wbr>signature=<wbr>ac33bb12f3799ac1d4a58e59bd48b4<wbr>5d64c24042ac0ea0c927e11c5d68be<wbr>ef5d</a></span>
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                                            <table class="m_5887597683018333813footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';margin:0 auto;padding:0;text-align:center;width:570px">
                                                <tbody>
                                                    <tr>
                                                        <td align="center" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';max-width:100vw;padding:32px">
                                                            <p style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';line-height:1.5em;margin-top:0;color:#b0adc5;font-size:12px;text-align:center">© 2023 AYOPPPK. All rights reserved.</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        `
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export const GetProvince = async (req, res) => {
    console.log('province');
    
    try {
        const response = await axios.get(`https://api.binderbyte.com/wilayah/provinsi`,{
            params : {
                "api_key":"720d3543b26bf0a59e2e3840615672c15f525ab160778269b78e863319358d39"
            }
        })
        let provinces = response.data.value;
        res.send(provinces)
        provinces.map(async province => {
            await Province.create({name:province.name, old:province.id})
        })
    } catch (error) {
        console.error(error.messsage);
    }

}

export const GetCity = async (req, res) => {
    const provinces = await Province.findAll({})
    provinces.map(async province => {
        await axios.get(`https://api.binderbyte.com/wilayah/kabupaten`,{
            params : {
                "api_key":"720d3543b26bf0a59e2e3840615672c15f525ab160778269b78e863319358d39",
                "id_provinsi":province.old
            }
        })
        .then(async response => {
            let cities = response.data.value
            cities.map(async city => {
                await City.create({name:city.name, provinceId:province.id})
            })
        })
        .catch(error => {
            console.error(error.message);
        })
    })

    res.send('finish')
}