package com.apps.library.manager.dao;

import com.apps.library.manager.model.app.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByUserId(Long userId);
}
