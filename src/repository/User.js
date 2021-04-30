require('../../app/database.js');
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    email : {  type: String },
    password : { type: String },
    civility : {type: String, match: /[1-2]{1}/},
    firstname: { type: String, match: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁ ÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/ },
    lastname: { type: String, match: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁ ÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/ },
    phone: { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
    role: { type: String },
    date: { type: Date, default: Date.now },
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = class User {
    constructor() {
        this.db = mongoose.model('User', UserSchema); 
    }

    count(filter = {}) {
        return new Promise((resolve, reject) => {
            this.db.countDocuments(filter, function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    add(userEntity) {
        return new Promise((resolve, reject) => {
            this.db.create(userEntity, function (err, user) {
                if (err) reject(err);
                resolve(user);
            });
        });
    }

    updateById(id, userEntity ) {
        return new Promise((resolve, reject) => {
            this.db.updateOne({_id : id}, userEntity, function (err) {
                if (err) reject();
                resolve();
            });
        });
    }

    emailExists(email) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ email }, (err, user) => {
                // si pas d'erreur, email trouvé
                if (!err && user !== null) {
                   resolve(true);
                }  
                resolve(false);
            });
        });
    }

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ email }, (err, user) => {
                // si pas d'erreur, email trouvé
                if (!err && user !== null) {
                   resolve(user);
                }  
                reject(false);
            });
        });
    }

    find(filter = {}, limit = null, skip = null) {
        return new Promise((resolve, reject) => {
            this.db.find(filter).limit(limit).skip(skip).exec(function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
        });
    }
    
    findById(id) {
        return new Promise((resolve, reject) => {
            this.db.findById(id, function (err, user) {
                if (err || user === null) reject();
                resolve(user);
            });
        });
    }

    delete(filter = {}) {
        return new Promise((resolve, reject) => {
            this.db.deleteOne(filter, function (err) {
                console.log(err);
                if (err) reject(err);
                resolve();
            });
        });
    }
} 