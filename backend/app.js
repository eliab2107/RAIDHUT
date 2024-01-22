import express from 'express';
import logger from 'morgan';
import postsRouter from './routes/posts.js';
import usersRouter from './routes/user.js';
import logsRouter from './routes/logs.js';
import pagesRouter from './routes/pages.js';
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { sequelize } from './DB/sequelize.js';
import session from 'express-session';
import dotenv from 'dotenv';
import createError from  'http-errors';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __path = path
const app = express();

dotenv.config();





app.set('views', __path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('combined'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", pagesRouter)
app.use('/logs', logsRouter);
app.use('/posts', postsRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Configurando DB
// Sincronizar o modelo com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });


  
app.listen(3000, () => {
  console.log("ouvindo na porta 3000")
})

export default app;
