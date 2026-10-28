import express from 'express';
import Database from 'better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const router = express.Router();
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const getDb = () => new Database(path.join(rootDir, 'data', 'oficiales.db'), { readonly: true });

router.get('/:id', (req, res) => {
  const db = getDb();
  try {
    const oficial = db.prepare('SELECT * FROM oficiales WHERE id=?').get(req.params.id);
    if (!oficial) return res.redirect('/expedientes');
    const profesional = db.prepare('SELECT * FROM datos_profesionales WHERE oficial_id=?').get(req.params.id) || {};
    const vulnerable = db.prepare('SELECT * FROM condicion_vulnerable WHERE oficial_id=?').get(req.params.id) || {};
    const medica = db.prepare('SELECT * FROM condicion_medica WHERE oficial_id=?').get(req.params.id) || {};
    const emergencia = db.prepare('SELECT * FROM contacto_emergencia WHERE oficial_id=?').get(req.params.id) || {};
    res.render('expediente-detalle-full', { title: 'Detalle de Oficial', oficial, profesional, vulnerable, medica, emergencia });
  } finally { db.close(); }
});

export default router;
