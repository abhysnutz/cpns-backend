import City from "../models/City.mjs";
import Province from "../models/Province.mjs";
import User from "../models/User.mjs";
import UserDetail from "../models/UserDetail.mjs";

User.hasOne(UserDetail, {
    as : 'profile',
    foreignKey : 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
},);

UserDetail.belongsTo(User);
UserDetail.belongsTo(City)
UserDetail.belongsTo(Province)


Province.hasMany(City,{
    as : 'city',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Province.hasOne(UserDetail, {
    as : 'province',
    foreignKey : 'provinceId'
})

City.belongsTo(Province);
City.hasOne(UserDetail, {
    as : 'city',
    foreignKey : 'cityId'
})
