package com.online.eBooks.controller;

import com.online.eBooks.model.Book;
import com.online.eBooks.model.VideoCourse;
import com.online.eBooks.service.BookService;
import com.online.eBooks.service.VideoCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/video")
public class VideoCourseController {
    @Autowired
    private VideoCourseService videoCourseService;

    @PostMapping("/add")
    public String add(@RequestBody VideoCourse videoCourse) {
        videoCourseService.saveVideo(videoCourse);
        return "New Book is added";
    }

    @CrossOrigin(origins = "http://http://localhost:3000")
    @GetMapping("/getAllVideos")
    public List<VideoCourse> getAllVideos() {
        return videoCourseService.getAllVideos();
    }

    @GetMapping("/getTopRatedVideos")
    public List<VideoCourse> getTopRatedVideos() {
        // Assuming VideoService has a method to fetch the top-rated videos
        return videoCourseService.getTopRatedVideos();
    }
}

