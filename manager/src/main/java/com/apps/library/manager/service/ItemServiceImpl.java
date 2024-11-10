package com.apps.library.manager.service;

import com.apps.library.manager.dao.ItemRepository;
import com.apps.library.manager.exceptions.ItemNotFoundException;
import com.apps.library.manager.model.app.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ItemServiceImpl implements ItemService{
    private final ItemRepository itemRepository;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    @Override
    public Item findItemById(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Item " + id + " not found."));
    }

    @Override
    public List<Item> findAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public List<Item> deleteItemById(Long userId, Long id) {
        if(itemRepository.findById(id).isPresent()){
            itemRepository.deleteById(id);
        }

        return itemRepository.findByUserId(userId);
    }

    @Override
    public List<Item> findByUserId(Long id) {
        return itemRepository.findByUserId(id);
    }
}
