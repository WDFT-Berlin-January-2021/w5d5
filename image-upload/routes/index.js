const router = require("express").Router();
const Movie = require('../models/Movie');
const { uploader, cloudinary } = require('../config/cloudinary');

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

router.post('/movie/add', uploader.single('photo'), (req, res, next) => {
  console.log(req.file);
  const { title, description } = req.body;
  const imgPath = req.file.path
  const imgName = req.file.originalname
  const publicId = req.file.filename
  Movie.create({ title, description, imgPath, imgName, publicId })
    .then(movie => {
      console.log(movie);
      res.redirect('/')
    })
    .catch(error => {
      next(error);
    })
});

router.get('/movie/delete/:id', (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(movie => {
      // check if the deleted movie had an image
      if (movie.imgPath) {
        // we want to delete the image on cloudinary
        cloudinary.uploader.destroy(movie.publicId);
      }
      res.redirect('/')
    })
    .catch(err => {
      next(err)
    })
});


module.exports = router;
