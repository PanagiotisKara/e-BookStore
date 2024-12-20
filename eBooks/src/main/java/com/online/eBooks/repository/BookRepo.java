package com.online.eBooks.repository;

import com.online.eBooks.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepo extends JpaRepository<Book, Integer> {

    @Query("SELECT DISTINCT b.categories FROM Book b WHERE b.categories IS NOT NULL")
    List<String> findDistinctCategories();
}
