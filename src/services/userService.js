// ============================================================
// SERVICE: userService.js
// Lógica de negocio relacionada con usuarios.
// Los controladores llaman a los servicios; los servicios usan los modelos.
// ============================================================

import User from '../models/User.js';

export const getAllUsers = () => User.findAll();

export const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw Object.assign(new Error('Usuario no encontrado'), { status: 404 });
  return user;
};
