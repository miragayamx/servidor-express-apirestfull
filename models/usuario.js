const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [ true, 'Por favor ingrese su nombre de usuario' ],
		trim: true
	},
	password: {
		type: String,
		required: [ true, 'Por favor ingrese su password' ],
		trim: true
	},
	passwordConfirm: {
		type: String,
		required: [ true, 'Por favor confirme su password' ],
		validate: {
			validator: function(el) {
				return el === this.password;
			},
			message: 'El password ingresado no coincide'
		}
	}
});

userSchema.pre('save', async function(next) {
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

userSchema.methods.correctPassword = async function(password, userPassword) {
	return await bcrypt.compare(password, userPassword);
};

const Usuario = mongoose.model('usuario', userSchema);

module.exports = Usuario;
