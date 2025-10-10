const { Disciplina } = require("../models");

exports.obtenerDisciplinas = async (req, res) => {
    try {
        const disciplinas = await Disciplina.findAll();
        res.json(disciplinas);
    } catch (error){
        console.error("Error al obtener las disciplinas:", error);
        res.status(500).json({ error: "Error al obtener las disciplinas" });
    }
};