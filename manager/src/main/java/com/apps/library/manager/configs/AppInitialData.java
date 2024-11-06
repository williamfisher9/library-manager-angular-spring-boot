package com.apps.library.manager.configs;

import com.apps.library.manager.dao.MenuRepository;
import com.apps.library.manager.dao.RoleRepository;
import com.apps.library.manager.model.app.Menu;
import com.apps.library.manager.model.security.Role;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AppInitialData implements CommandLineRunner {
    private final Logger LOGGER = LoggerFactory.getLogger(AppInitialData.class);
    private final RoleRepository roleRepository;
    private final MenuRepository menuRepository;

    @Autowired
    public AppInitialData(RoleRepository roleRepository, MenuRepository menuRepository) {
        this.roleRepository = roleRepository;
        this.menuRepository = menuRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if(roleRepository.findAll().isEmpty()){
            LOGGER.info("Creating required roles...");
            Role role1 = new Role("ROLE_ADMIN");
            Role role2 = new Role("ROLE_USER");
            LOGGER.info("ADMIN role saved successfully.");
            roleRepository.save(role1);
            LOGGER.info("USER role saved successfully.");
            roleRepository.save(role2);
        } else {
            LOGGER.info("Roles already exist.");
        }

        if(menuRepository.findAll().isEmpty()){
            Menu menu1 = new Menu("PUBLIC", "register", "fa-solid fa-user-plus", 1, "/register");
            Menu menu2 = new Menu("PUBLIC", "login", "fa-solid fa-arrow-right-to-bracket", 2, "/login");
            Menu menu3 = new Menu("ROLE_USER", "settings", "fa-solid fa-gear", 2, "/settings");
            Menu menu4 = new Menu("ROLE_USER", "logout", "fa-solid fa-right-from-bracket", 1, "/logout");
            Menu menu5 = new Menu("ROLE_USER", "search", "fa-solid fa-right-from-bracket", 1, "/search");
            Menu menu6 = new Menu("ROLE_USER", "add", "fa-solid fa-right-from-bracket", 1, "/add");
            menuRepository.save(menu1);
            menuRepository.save(menu2);
            menuRepository.save(menu3);
            menuRepository.save(menu4);
            menuRepository.save(menu5);
            menuRepository.save(menu6);
        } else {
            LOGGER.info("Menu already exist.");
        }




    }
}