import { initializeDatabase } from '../config/Database/Insertion.js';
import sequelize from '../config/Database/database.js';
import User from '../models/User.js';

const seedUsers = [
  { id: 1, name: 'Javier',  email: 'javier@gmail.com'  },
  { id: 2, name: 'Reimavi', email: 'reimavi@gmail.com' },
  { id: 3, name: 'Moises',   email: 'rayder0@gmail.com'   },
];

const runSeed = async () => {
  await initializeDatabase();
  await User.bulkCreate(seedUsers, { ignoreDuplicates: true });
  console.log('Seed ejecutado: usuarios de ejemplo insertados.');
};

if (process.argv[1]?.endsWith('userSeed.js')) {
  runSeed()
    .catch((error) => {
      console.error('Error al ejecutar el seed:', error.message);
      process.exitCode = 1;
    })
    .finally(() => sequelize.close());
}

export default seedUsers;
