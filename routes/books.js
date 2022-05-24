const express = require('express')
const fs = require('fs')
const router = express.Router()
const multer = require('multer')
const path = require('path')
// const req = require('express/lib/request')
const Books = require('../models/book')
const Authors = require('../models/author')
const uploadPath = path.join('public',Books.coverImagePath)
const imageMimeTypes = ['image/jpeg','image/png','image/gif']
//body parser
// const bodyParser = require('body-parser')
//already done in server.js file
const upload = multer({
   dest : uploadPath,
   fileFilter:(req,file,callback)=>
   {
       callback(null, imageMimeTypes.includes(file.mimetype))
   }
})

router.get('/',(req,res)=>
{
    res.render('books/mybooks')
})

router.get('/addBooks',async(req,res)=>
{
   renderNewPage(res,new Books())
})

router.post('/',upload.single('cover'),async(req,res)=>
{
    const filename = req.file!=null ? req.file.filename : null
    const books = new Books(
        {
            tittle:req.body.tittle,
            description:req.body.description,
            publishDate: new Date(req.body.publishDate),
            pageCount : req.body.pageCount,
            author:req.body.author,
            coverImageName:filename
            
        })
        try {
            const newBook = await books.save()
            // res.redirect('books/&{newBook.id}')
            res.redirect('/books')
        } 
        catch {
            if(books.coverImageName!=null)
            {
              removeBookCover(books.coverImageName)
            }
            renderNewPage(res,books,true)
        }
})

function removeBookCover(filename)
{
    fs.unlink(path.join(uploadPath,filename),err=>
    {
        if(err) console.error(err)
    })
}

async function renderNewPage(res,book,haserror=false)
{
   try
   {
    const authors =  await Authors.find({})
    const params = { 
        authors:authors,
        books : book
    }
    if(haserror) params.errorMessage = " error creating book"
    res.render('books/addBooks', params)
   }
   catch{
       res.redirect('/books')
   }
}

 
module.exports = router