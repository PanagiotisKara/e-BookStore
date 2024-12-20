package com.online.eBooks.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartId;
    private Integer bookId;
    private String bookTitle;
    private String thumbnail;
    private Integer videoCourseId;
    private String videoCourseTitle;
    private String videoCourseLink;
    private Double price;
    private Integer quantity;

    public Cart() {
    }

    // Getters and Setters for all fields

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getCartId() {
        return cartId;
    }

    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Integer getVideoCourseId() {
        return videoCourseId;
    }

    public void setVideoCourseId(Integer videoCourseId) {
        this.videoCourseId = videoCourseId;
    }

    public String getVideoCourseTitle() {
        return videoCourseTitle;
    }

    public void setVideoCourseTitle(String videoCourseTitle) {
        this.videoCourseTitle = videoCourseTitle;
    }

    public String getVideoCourseLink() {
        return videoCourseLink;
    }

    public void setVideoCourseLink(String videoCourseLink) {
        this.videoCourseLink = videoCourseLink;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
