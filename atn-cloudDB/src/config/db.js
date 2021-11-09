const db = require('pg').Pool
module.exports = new db({
    user:"sgflvfpgcsnemj",
    host:"ec2-35-169-49-157.compute-1.amazonaws.com",
    database:"d23issd70h29cj",
    password:"059321f5e9efb2fa647a6f95fd549cdcf2b9a433335f18736ad13edf28eb32ad",
    port:"5432",
    ssl: {
        rejectUnauthorized: false,
    }
})
