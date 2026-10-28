// ============================================================
// CONTROLADOR: userController.js
// Manejo de peticiones HTTP de usuarios.
// Delega la lógica de negocio al servicio correspondiente.
// ============================================================

import { getAllUsers, getUserById } from '../services/userService.js';
import { sendSuccess }              from '../utils/response.js';

export const getAll = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    sendSuccess(res, users);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    sendSuccess(res, user);
  } catch (err) {
    next(err);
  }
};
