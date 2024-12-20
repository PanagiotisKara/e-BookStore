package com.online.eBooks.controller;

import com.online.eBooks.model.Cart;
import com.online.eBooks.repository.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartRepo cartRepository;

    @PostMapping
    public Cart addToCart(@RequestBody Cart cartItem) {
        return cartRepository.save(cartItem);
    }

    @DeleteMapping("/clear")
    public String clearCart() {
        try {
            cartRepository.deleteAll();
            return "Cart cleared successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to clear cart";
        }
    }

    @GetMapping
    public List<Cart> getAllCartItems() {
        return cartRepository.findAll();
    }

    @DeleteMapping("/{cartId}")
    public void deleteCartItem(@PathVariable Integer cartId) {
        cartRepository.deleteById(cartId);
    }
}
