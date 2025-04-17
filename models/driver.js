const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Driver = db.model("Driver", {
    name: String,
    role: String,
    wins: Number,
    _assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }
})

module.exports = Driver;