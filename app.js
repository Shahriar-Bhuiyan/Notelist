// book class for represting a book  
class Book{ 
 constructor(title,author,bookNumber){ 
     this.title = title; 
     this.author = author; 
     this.bookNumber = bookNumber;
 }
} 

// ul class : Handle ul tasks   

class UI { 
    static displayBooks(){ 
         
        const books = Store.getBooks();  
        books.forEach((book) => UI.addBookToList(book));
         
    } ;
    static addBookToList(book){ 
       const list = document.querySelector("#book-list"); 
       const row = document.createElement("tr"); 
       row.innerHTML = ` 
       <td>${book.title}</td>  
       <td>${book.author}</td>  
       <td>${book.bookNumber}</td>  
       <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>  
       `; 
       list.appendChild(row);
   }  
   static deleteBook(el){ 
       if(el.classList.contains("delete")){ 
           el.parentElement.parentElement.remove();
       }
   }  
    
   static showAlert(message,className){ 
       const div = document.createElement("div"); 
       div.className =`alert alert-${className}`; 
       div.appendChild(document.createTextNode(message)); 
       const container = document.querySelector(".container"); 
       const form = document.querySelector("#book-form"); 
       container.insertBefore(div,form); 
    //    vanish in 3 sec 
       setTimeout(()=>document.querySelector(".alert").remove(),3000)
   }

   static clearField=()=>{ 
       document.querySelector("#title").value = " ";  
       document.querySelector("#author").value = "";  
       document.querySelector("#number").value = ""; 


   }
}
// store class: handles storage  
 class Store{ 
    static getBooks(){ 
     let books; 
     if(localStorage.getItem("books")===null){ 
        books =[];
     }else{ 
         books=JSON.parse(localStorage.getItem("books"));
     } 
     return books;
     } 
    static addBook(book){ 
     const books = Store.getBooks(); 
     books.push(book); 
     localStorage.setItem("books",JSON.stringify(books));
     } 
    static removeBook(bookNumber){ 
      const books = Store.getBooks(); 
      books.forEach((book,index)=>{ 
       if(book.bookNumber===bookNumber){ 
         books.splice(index,1) ; 
       }
      }); 
      localStorage.setItem("books",JSON.stringify(books));
     }
 }
// event:display books   
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// event: add a book  
document.querySelector("#book-form").addEventListener("submit",(e)=>{ 
    // prevent actual submit 
     e.preventDefault();
    // get values  

    const title = document.querySelector("#title").value; 
    const author = document.querySelector("#author").value; 
    const bookNumber = document.querySelector("#number").value; 
      
    // validate 
    if(title === "" || author==="" || bookNumber === ''){ 
       UI.showAlert("please enter all field","danger");
    }else{ 
         // instatiate Book 
    const book = new Book(title,author,bookNumber); 
     
    // add book to store 
      Store.addBook(book);

    // add book list to Ui
    UI.addBookToList(book);  
    // show success message 
    UI.showAlert("Book Added","success");
     
    // clearfield 
    UI.clearField();
    }
   
});
// event : remove a book  
document.querySelector("#book-list").addEventListener("click",(e)=>{  
    // remove book from UI
  UI.deleteBook(e.target);  
    // remove book from store 
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
  UI.showAlert("Book removed","success");
});
