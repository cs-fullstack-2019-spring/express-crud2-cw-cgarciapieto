var express = require('express');
var router = express.Router();
var PostCollection = require('../models/PostSchema');

/* GET home page. */
router.get('/', function(req, res, next) {

  // finds and puts the collection in a context to be rendered on th index page
  PostCollection.find({}, (errors, results)=>
  {
    if (errors) res.send(errors);
    else {
      context ={
        title: "Carlos's Post",
        allPosts: results,
      };
      res.render('index', context);
    }

        });

});

//creates a Post using the postCollectioon schema/model
router.get('/create', (req, res) => res.render('createPost'));

router.get('/savePost', (req, res)=>{
  PostCollection.create(
      {userId: req.query.userId,
        id: req.query.id,
        title: req.query.title,
      body: req.query.body}, (errors)=>{
        if (errors) res.send(errors);
        else res.redirect("/");
      })
});


//deltes the post by post ID then redirects to index page

router.get('/deletePost', (req,res)=>{
  PostCollection.deleteOne({id:req.query.id},
      (error)=>{
        if(error) res.send(error);
        else res.redirect("/");
      })
});


//allows the collection to be search by ID, renders th index page
router.get('/find', (req,res)=>res.render('find'));

router.get('/findPost', (req,res)=>{
  PostCollection.find({id:req.query.id},
      (error, results)=>{
        if(error) res.send(error);
        else {
          context = {
            title: "Carlos's Posts",
            allPosts: results,
          };
          res.render('index', context);
        }
      })
});

//updates one post using the post id, allows the title and body to be updated
router.get('/update/:userid/:id/:title/:body/', (req,res)=>{
  UKCrimeCollection.updateOne(
      {"userid": req.params.userid},
      {
        "id": {
          "title": req.params.title,
          "body": req.params.body,
        }
      }, (errors, results)=>{
        if (errors) res.send(errors);
        else res.send(results);
      })
} );


module.exports = router;

