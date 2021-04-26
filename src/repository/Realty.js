require('../../app/database.js');
const mongoose = require('mongoose');
const RealtySchema = mongoose.Schema({
    address : {
        seller : {type: String },
        address1: { type: String},
        address2: { type: String},
        zipcode : { type: String },
        city: { type: String},
        info_address: { type: String }
    },
    contact : {
        civility : {type: String, match: /[1-2]{1}/},
        firstname: { type: String, match: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁ ÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/ },
        lastname: { type: String, match: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁ ÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/ },
        email : { type: String },
        phone: { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
        mobile: { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
        info: { type: String }
    },
    type : {type: String, match: /[1-6]{1}/},
    // 1 Ancien, 2 Neuf, 3 Viager
    type_product: {type: String, match: /[1-3]{1}/},
    price : {type: Number},
    amount_commission : {type: Number},
    percentage_commission: { type: Number },
    area : {type: Number},
    room: { type: Number },
    info_realty: { type: String },
    slug: { type: String, slug: ['address.zipcode','address.city'], unique:true }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

module.exports = class Realty {
    constructor() {
        this.db = mongoose.model('Realty', RealtySchema); 
    }

    count(filter = {}) {
        return new Promise((resolve, reject) => {
            this.db.countDocuments(filter, function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    add(realtyEntity) {
        return new Promise((resolve, reject) => {
            this.db.create(realtyEntity, function (err, realty) {
                if (err) reject(err);
                resolve(realty);
            });
        });
    }

    updateById(id, realtyEntity ) {
        return new Promise((resolve, reject) => {
            this.db.updateOne({_id : id}, realtyEntity, function (err) {
                if (err) reject();
                resolve();
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
            this.db.findById(id, function (err, realty) {
                if (err || realty === null) reject();
                resolve(realty);
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