const router = require("express").Router();
const Movie = require('../models/Movie');
const uploader = require('../config/cloudinary');

router.get('/', (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('index', { movies });
    })
    .catch(err => {
      next(err);
    })
});

router.get('/movie/add', (req, res, next) => {
  res.render('movie-add');
});

router.post('/movie/add', uploader.single('poster'), (req, res, next) => {
  console.log(req.file);
  const { title, description } = req.body;
  const imgPath = req.file.path
  const imgName = req.file.originalname
  Movie.create({ title, description, imgPath, imgName })
    .then(movie => {
      console.log(movie);
      res.redirect('/')
    })
    .catch(error => {
      next(error);
    })
});


module.exports = router;
