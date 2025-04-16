const db = require('../config/db');

const Team=db.model("Team", {
    name: String,
    principal: String,
    championships: Number,
})

module.exports = Team;