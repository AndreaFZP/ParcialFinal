var monoose = require('mongoose');
var Casa = require('../models/casa');
var debug = require('debug')('parcial:casa_controller');

/*Buscar casa*/
module.exports.getOne = (req, res, next) => {
    debug("Search Casa", req.params);
    Casa.findOne({
            casaname: req.params.casaname
        }, "-login_count")
        .then((foundCasa) => {
            if (foundCasa)
                return res.status(200).json(foundCasa);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}

/* Listar casas*/
module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Casa List",{size:perPage,page, sortby:sortProperty,sort});

    Casa.find({}, "-login_count")
        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort})
        .then((casas) => {
           return res.status(200).json(casas)
        }).catch(err => {
            next(err);
        })

}

/* Crear casa*/
module.exports.register = (req, res, next) => {
    debug("New Casa", {
        body: req.body
    });
    Casa.findOne({
            casaname: req.body.casaname
        }, "-login_count")
        .then((foundCasa) => {
            if (foundCasa) {
                debug("Casa duplicada");
                throw new Error(`Casa duplicada ${req.body.casaname}`);
            }
            
            else {
                let newCasa = new Casa({
                    casaname: req.body.casaname,
                    ubicacion: req.body.ubicacion,
                    dueno: req.body.dueno || "",
                    cantidad_hab: req.body.cantidad_hab || "",
                    cochera: req.body.cochera
                });
                return newCasa.save()
                 // Retornamos la promesa para poder concater una sola linea de then
            }
        }).then(casa => { 
            return res
                .header('Location', '/register/' + casa._id)
                .status(201)
                .json({
                    _id: casa._id
                });
        }).catch(err => {
            next(err);
        });
}

/* Actualizar casa*/
module.exports.update = (req, res, next) => {
    debug("Update casa", {
        casaname: req.params.casaname,
        ...req.body
    });

    let update = {
        ...req.body
    };

    Casa.findOneAndUpdate({
            casaname: req.params.casaname
        }, update, {
            new: true
        })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}

/*Eliminar casa*/
module.exports.delete = (req, res, next) => {

    debug("Delete casa", {
        casaname: req.params.casaname,
    });

    Casa.findOneAndDelete({casaname: req.params.casaname})
    .then((data) =>{
        if (data) res.status(200).json(data);
        else res.status(404).send();
    }).catch( err => {
        next(err);
    })
}

