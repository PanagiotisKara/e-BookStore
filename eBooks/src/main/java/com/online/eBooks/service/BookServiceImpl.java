package com.online.eBooks.service;

import com.online.eBooks.model.Book;
import com.online.eBooks.repository.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService{

    @Autowired
    private BookRepo bookRepo;

    @Override
    public Book saveBook(Book book) {
        return bookRepo.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepo.findAll();
    }

    @Override
    public List<Book> getAllBooksByTitle() {
        return bookRepo.findAll(Sort.by(Sort.Direction.ASC, "title"));
    }

    @Override
    public List<String> getDistinctCategories() {
        return bookRepo.findDistinctCategories();
    }
}
