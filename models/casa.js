const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CasaSchema = Schema({
    casaname: {
        type: String,
        required: true,
    },

    ubicacion: {
        type: String,
    },
    dueno: String,
    cantidad_hab: Number,
    cochera: {
        type: Boolean,
    },
    login_count: Number
}, {
    timestamps: true
});

module.exports = mongoose.model("Casa", CasaSchema);