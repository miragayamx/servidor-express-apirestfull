const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://6gbGGDEVnKim6bCp:6gbGGDEVnKim6bCp@cluster0.p4bd1.mongodb.net/ecommerce?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});