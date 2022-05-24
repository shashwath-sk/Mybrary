const mongoose = require('mongoose')

const coverImagePath = 'upload/bookCovers'

 const BookSchema = new mongoose.Schema(
     {
         tittle:{
            type:String,
            required:true
         },
         description:{
            type:String,
            // required:true
         },
         publishedDate:{
            type:Date,
            required:true
         },
         pageCount:{
            type:Number,
            required:true
         },
         createdDate:{
            type:Date,
            required:true,
            default:Date.now
         },
        //  coverImage:{
        //     type:Buffer,
        //     // required:true
        //  },
         coverImageName: {
            type: String,
            required: true
          },
         author:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref : 'Authors'
         }
         
     }
 )

 module.exports = mongoose.model('Books',BookSchema)
 module.exports.coverImagePath = coverImagePath