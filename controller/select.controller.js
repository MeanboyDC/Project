
const Select = require ('../models/selectmodel.js');
const jwt = require ('jsonwebtoken')
require('dotenv').config()


const secret = process.env.SECRET_KEY

const selectBook = async (req, res) => {
    try {
        const userId = req.user?.id; // Assuming userId is obtained from authentication middleware

        // Example of req.body structure:
        // {
        //    books: [
        //        { title: 'Book 1', author: 'Author 1', publishedYear: 2023 },
        //        { title: 'Book 2', author: 'Author 2', publishedYear: 2024 }
        //    ]
        // }

        const booksData = req.body; // Assuming books data is sent from frontend

        // Create an array of book objects with createdBy set to userId
        const books = booksData.map(book => ({
            title: book.title,
            author: book.author,
            publishedYear: book.publishedYear
        }));

        // Create a new Select document with books array and createdBy userId
        const newSelect = new Select({
            books: books,
            createdBy: userId
        });

        // Save the newSelect document to MongoDB
        const savedSelect = await newSelect.save();

        res.status(200).json(savedSelect);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const showBooks = async(req, res)=>{
    try{
        const userId = req.user?.id;
        let query= {}
        if(!userId){
            return res.status(401).json({message: "Unauthorized please log in"})
        }
        if(userId){
            query = {createdBy: userId}
        }
        const books = await Select.find(query)
        res.status(200).json({
                message: "Good fetch",
                data: books
            });
        }catch(error){
        res.status(500).json({message: error.message})
    }
}

const showBook = async(req, res)=>{
    try{
        const id = req.params;
        let query= {}
        if(id){
            query = {books: id}
        }
        const book = await Select.findById(query)
        if(!book){
            return res.status(404).json({message: "Book not found"})
        }
        res.status(200).json({book, message: "successfully"})
        }catch(error){
        res.status(500).json({message: error.message})
    }
}


const deleteBook = async(req, res)=>{
    // try{
    //     const id = req.params;
    //     let query= {}
    //     if(id){
    //         query = {books: id}
    //     }
    //     // const userId = req.user?.id;
        
    //     // if(!userId){
    //     //     return res.status(401).json({message: "Unauthorized please log in"})
    //     // }
                
    //     const book = await Select.findIndexByIdAndDelete(query);
    //     if(!book){
    //         return res.status(404).json({message: "Book not found"})
    //     }
    //     res.status(200).json({ message: "Book deleted successfully" });
    // }catch(error) {
    //     res.status(500).json({ message: error.message });
    //   }}

    // ;
  
    try {
        const { id } = req.params;
    
        // Assuming 'books' is an array of objects in your document
        const result = await Select.updateOne(
          { 'books._id': id },
          { $pull: { books: { _id: id } } }
        );
    
        if (result.nModified === 0) {
          return res.status(404).json({ message: "Book not found" });
        }
    
        res.status(200).json({ message: "Book deleted successfully" });
      } catch (error) {
        console.error("Error deleting book:", error.message);
        res.status(500).json({ message: error.message });
      }
    };
    

const verifyJWT = (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({message: "unauthorized user"})
    }
    try{
        const decode = jwt.verify(token, secret)
        req.user = {id: decode.userId};
        next();
    }catch(error){
        res.status(401).json({message: "Invalid token"})
    }
}

module.exports = {selectBook, showBooks, showBook, deleteBook, verifyJWT}