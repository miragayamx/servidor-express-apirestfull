const path = require('path');
const compression = require('compression');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const logger = require('./winstonConfig');
const handlebars = require('express-handlebars');
const productRouter = require('./routes/productRouter');
const vistaRouter = require('./routes/vistaRouter');
const loginRouter = require('./routes/loginRouter');
const Mensaje = require('./models/mensaje');
const { createUploadsFolder, createDBLiteFolder, readFile, saveFile, appendFile } = require('./utils/fileManager');
const sendSMS = require('./services/twilio');
const env = require('./config');
require('./db/mongoose');
require('./passport/passport');

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: env.MONGODB_URL,
			mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
		}),
		secret: 'secreto',
		resave: true,
		saveUninitialized: true,
		rolling: true,
		cookie: { maxAge: env.SESSION_EXPIRATION }
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
app.use(express.static('public'));
app.use(compression());

app.use('/', loginRouter);
app.use('/', vistaRouter);
app.use('/api', productRouter);

const PORT = env.PORT || 8080;

//SOCKET
io.on('connection', (socket) => {
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
			if (message.message.includes('administrador'))
				sendSMS({ message: `email: ${message.email} mensaje: ${message.message}`, phone: '+541151111242' });
			io.emit('messages', messages);
		} catch (err) {
			io.emit('chatInfo', { error: 'No fue posible recuperar los mensajes' });
		}
	});
});

const server = http.listen(PORT, async () => {
	try {
		logger.info(`El servidor esta corriendo en el puerto: ${server.address().port}`);
		await createUploadsFolder();
		logger.info(`Id del proceso: ${process.pid}`);
	} catch (err) {
		logger.info(err);
		logger.error(err);
	}
});

server.on('error', (err) => {
	logger.info(`Error de servidor: ${err}`);
	logger.error(`Error de servidor: ${err}`);
});
