package com.online.eBooks.repository;

import com.online.eBooks.model.Book;
import com.online.eBooks.model.VideoCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoCourseRepo extends JpaRepository<VideoCourse, Integer> {

    @Query("SELECT v FROM VideoCourse v ORDER BY v.rating DESC")
    List<VideoCourse> findTopRatedVideos();
}
