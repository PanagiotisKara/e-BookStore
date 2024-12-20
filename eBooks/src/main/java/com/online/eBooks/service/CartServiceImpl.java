package com.online.eBooks.service;

import com.online.eBooks.model.Cart;
import com.online.eBooks.repository.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepo cartRepository;
    @Override
    public void clearCart() {
        cartRepository.deleteAll();
    }

    @Override
    public List<Cart> getAllCartItems() {
        return cartRepository.findAll();
    }

    @Override
    public void deleteCartItem(Integer cartId) {
        cartRepository.deleteById(cartId);
    }
}
