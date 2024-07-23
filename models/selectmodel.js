const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')



const bookSchema = mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

// const userSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     // Add other user-related fields as needed
// }, {
//     timestamps: true
// });

const SelectSchema = mongoose.Schema({
    books: [bookSchema], // Embedding multiple books within an array
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// const User = mongoose.model('User', userSchema);
const Select = mongoose.model('Select', SelectSchema);

module.exports =  Select