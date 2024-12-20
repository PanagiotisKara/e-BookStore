package com.online.eBooks.controller;

import com.online.eBooks.model.Book;
import com.online.eBooks.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("/add")
    public String add(@RequestBody Book book) {
        bookService.saveBook(book);
        return "New Book is added";
    }

    @CrossOrigin(origins = "http://http://localhost:3000")
    @GetMapping("/getAllBooks")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @CrossOrigin(origins = "http://http://localhost:3000")
    @GetMapping("/getAllBooksByTitle")
    public List<Book> getAllBooksByTitle() {
        return bookService.getAllBooksByTitle();
    }

    @GetMapping("/categories")
    public List<String> getDistinctCategories() {
        return bookService.getDistinctCategories();
    }
}
