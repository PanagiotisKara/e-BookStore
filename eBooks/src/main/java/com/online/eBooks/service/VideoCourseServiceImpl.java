package com.online.eBooks.service;

import com.online.eBooks.model.Book;
import com.online.eBooks.model.VideoCourse;
import com.online.eBooks.repository.VideoCourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class VideoCourseServiceImpl implements VideoCourseService{
    @Autowired
    private VideoCourseRepo videoCourseRepo;

    @Override
    public VideoCourse saveVideo(VideoCourse videoCourse) {
        return videoCourseRepo.save(videoCourse);
    }

    @Override
    public List<VideoCourse> getAllVideos() {
        return videoCourseRepo.findAll(Sort.by(Sort.Direction.ASC, "Title"));
    }

    @Override
    public List<VideoCourse> getTopRatedVideos() {
        return videoCourseRepo.findTopRatedVideos();
    }
}
