package com.online.eBooks.service;

import com.online.eBooks.model.Cart;

import java.util.List;

public interface CartService {
    public void clearCart();
    public List<Cart> getAllCartItems();

    void deleteCartItem(Integer cartId);
}
