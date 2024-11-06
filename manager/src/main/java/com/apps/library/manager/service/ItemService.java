package com.apps.library.manager.service;

import com.apps.library.manager.model.app.Item;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ItemService {
    Item createItem(Item item);
    Item findItemById(Long id);
    List<Item> findAllItems();
    boolean deleteItemById(Long id);
    List<Item> findByUserId(Long id);
}
