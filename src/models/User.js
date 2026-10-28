import { DataTypes } from 'sequelize';
import sequelize from '../config/Database/database.js';

const User = sequelize.define('User', {
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(150),
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true,
		},
	},
}, {
	tableName: 'users',
	timestamps: true,
});

export default User;
