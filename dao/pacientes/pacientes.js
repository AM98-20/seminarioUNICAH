const getdb = require('../db');

class Pacientes {
    constructor() {
        getdb();
        if (process.env.MIGRATE === 'true') {
            const createStatement = 'CREATE TABLE IF NOT EXISTS pacientes (id INT INTEGER PRIMARY KEY AUTOINCREMENT, dni TEXT, nombre TEXT, apellido TEXT, email TEXT, telefono TEXT)';
            db.run(createStatement);
        }
    }

    new(nombre, apellido, dni, telefono, email) {
        return new Promise((accept, reject) => {
            db.run(
                'INSERT INTO pacientes (dni, nombre, apellido, email, telefono) VALUES(?, ?, ?, ?, ?)',
                [dni, nombre, apellido, email, telefono],
                (err, rslt) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    accept(rslt);
                }
            );
        });
    }
}

module.exports = Pacientes;