package com.online.eBooks.service;

import com.online.eBooks.model.Book;
import org.springframework.stereotype.Service;

import java.util.List;

public interface BookService {

    public Book saveBook(Book book);
    public List<Book> getAllBooks();

    List<Book> getAllBooksByTitle();

    List<String> getDistinctCategories();
}
