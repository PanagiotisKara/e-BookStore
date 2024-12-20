package com.online.eBooks.service;

import com.online.eBooks.model.Book;
import com.online.eBooks.model.VideoCourse;

import java.util.List;

public interface VideoCourseService {
    public VideoCourse saveVideo(VideoCourse videoCourse);
    public List<VideoCourse> getAllVideos();

    List<VideoCourse> getTopRatedVideos();
}
