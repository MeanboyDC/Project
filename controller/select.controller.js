const Select = require ('../models/selectmodel.js');
const jwt = require ('jsonwebtoken')
const secret = "ask10_^ask"
const selectBook = async(req, res)=>{
          try{ 
                  

        const userId = req.user?.id;
        
        
        console.log(userId, "User ID")
        
        
        const BookData = {title: req.title, author: req.author, publishedYear: req.publishedYear, createdBy: userId}
        
        const book = await Select.create(BookData)
        res.status(200).json(book)
    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
    
}

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
        const {id} = req.params;
        const book = await Select.findById(id)
        if(!book){
            return res.status(404).json({message: "Book not found"})
        }
        res.status(200).json({book, message: "successfully"})
        }catch(error){
        res.status(500).json({message: error.message})
    }
}


const deleteBook = async(req, res)=>{
    try{  
        const {id} = req.params;
        const book = await Select.findByIdAndDelete(id)
        if(!book){
            return res.status(404).json({message: "Book not found"})
        }
        res.status(200).json({message: "Book deleted successfully"})

    }catch(error){
        res.status(500).json({message: error.message})
    }
}
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