const express = require('express');
const router = express.Router(  );

const mongoose = require( 'mongoose' )
const reviewModel = require( '../models/reviewsModel.js' )

// Displaying content in API
router.get( '/', ( req, res, next ) => {
  reviewModel.find(  ).then( ( reviews ) => {
    res.json( reviews )
  } )
} )

// Adding content to API
router.post( '/', ( req, res, next ) => {
  reviewModel.create( req.body ).then( (post) => {
    res.json(post)
  } )
} )

// Deleting content from API
router.delete( '/:id', ( req, res, next ) => {
  reviewModel.findByIdAndDelete( req.params.id, req.body ).then( ( post ) => {
    res.json( post )
  } )
} )

// Updating content in API WIP
router.post( '/update/:id', ( req, res, next ) => { 
  reviewModel.findByIdAndUpdate( req.params.id, { $set: req.body } ).then( ( post ) => { 
    res.json(post)
  } )
} )

module.exports = router;