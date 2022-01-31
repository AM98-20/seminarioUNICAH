const express = require('express');
const router = express.Router();

const Expedientes = new require('../../../../dao/expedientes/expedientes.model');
const expedienteModel = new Expedientes();

router.get('/', (req, res) => {
    res.status(200).json({ endpoint: 'Expedientes' });
});//GET /

router.get('/all', async(req, res) => {
    try {
        const rows = await expedienteModel.getAll();
        res.status(200).json({ status: 'ok', pacientes: rows });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});
// /byid/1;
router.get('/byid/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const row = await expedienteModel.getById(parseInt(id));
        res.status(200).json({ status: 'ok', paciente: row });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});
//ya
router.post('/new', async( req, res) => {
    const {identidad, fecha, descripcion, observacion, registros, actualizacion} = req.body;
    res.status(200).json(
        {
            status:'ok',
            recieved: {
                identidad,
                fecha,
                descripcion,
                observacion,
                registros,
                actualizacion
            }
        });
});//POST /new

router.put('/update/:id', async(req, res) => {
    try {
        const { nombres, apellidos, identidad, email, telefono } = req.body;
        const { id } = req.params;
        const result = await expedienteModel.updateOne(id, nombre, apellidos, identidad, telefono, email);
        res.status(200).json({ status: 'ok', result });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});

router.put('/delete/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const result = await expedienteModel.deleteOne(id);
        res.status(200).json({ status: 'ok', result });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});

module.exports = router;