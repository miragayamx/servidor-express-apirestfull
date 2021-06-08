const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const handlebars = require('express-handlebars');
const productRouter = require('./routes/productRouter');
const vistaRouter = require('./routes/vistaRouter');
const loginRouter = require('./routes/loginRouter');
const infoRouter = require('./routes/infoRouter');
const randomsRouter = require('./routes/randomsRouter');
const Producto = require('./models/producto');
const Mensaje = require('./models/mensaje');
const { createUploadsFolder, createDBLiteFolder, readFile, saveFile, appendFile } = require('./utils/fileManager');
require('dotenv').config();
require('./db/mongoose');
require('./passport/passport');

const PORT = process.env.PORT || 8080;

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URL_LOCAL,
			mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
		}),
		secret: 'secreto',
		resave: true,
		saveUninitialized: true,
		rolling: true,
		cookie: { maxAge: process.env.SESSION_EXPIRATION }
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.engine(
	'hbs',
	handlebars({
		extname: 'hbs',
		defaultLayout: 'index',
		layoutsDir: path.join(__dirname, '/views/layouts'),
		partialsDir: path.join(__dirname, '/views/partials')
	})
);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', loginRouter);
app.use('/', infoRouter);
app.use('/', randomsRouter);
app.use('/api', productRouter);
app.use('/productos', vistaRouter);

const fServerOn = () => {
	//SOCKET
	io.on('connection', (socket) => {
		//TABLA EN TIEMPO REAL
		socket.on('getUpdate', async () => {
			try {
				const lista = await Producto.find();
				if (!lista.length) throw Error();
				io.emit('update', { existe: true, lista: lista });
			} catch (err) {
				io.emit('update', { existe: false, lista: lista });
			}
		});
		//CHAT
		(async () => {})();
		socket.on('getChatMessages', async () => {
			try {
				const messages = await Mensaje.find();
				if (!messages.length) throw new Error('ENOENT');
				io.emit('messages', messages);
			} catch (err) {
				if (err.message === 'ENOENT') return io.emit('chatInfo', { info: 'No se encontraron mensajes' });
				io.emit('chatInfo', { error: 'No fue posible recuperar los mensajes' });
			}
		});
		socket.on('setNewChatMessages', async (message) => {
			try {
				const data = await Mensaje.find();
				let messages = [];
				if (!!data.length) messages = data;
				const messageWithDate = {
					...message,
					date: new Date().toLocaleString('es-AR')
				};
				const newMessage = new Mensaje(messageWithDate);
				await newMessage.save();
				messages.push(messageWithDate);
				io.emit('messages', messages);
			} catch (err) {
				io.emit('chatInfo', { error: 'No fue posible recuperar los mensajes' });
			}
		});
	});

	const server = http.listen(PORT, async () => {
		try {
			console.log(`El servidor esta corriendo en el puerto: ${server.address().port}`);
			await createUploadsFolder();
			console.log(`Id del proceso: ${process.pid}`);
		} catch (err) {
			console.log(err);
		}
	});

	server.on('error', (err) => console.log(`Error de servidor: ${err}`));
};

module.exports = fServerOn;
