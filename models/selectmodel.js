const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const selectSchema = mongoose.Schema({

    title:{
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    publishedYear: {
        type: Number,
        require: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
    
        
},
{
    timestamps: true
}

);



const Select = mongoose.model('Select', selectSchema);;
module.exports = Select