import dotenv from 'dotenv';
dotenv.config()

export default {
    isNeedVerify : process.env.APP_ISNEEDVERIFY ? process.env.APP_ISNEEDVERIFY : true,
    port : process.env.NODE_ENV === 'production' ? process.env.APP_PORT_LIVE : process.env.APP_PORT_DEV
}