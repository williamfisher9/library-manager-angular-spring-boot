package com.apps.library.manager.configs;

import com.apps.library.manager.dao.RoleRepository;
import com.apps.library.manager.model.Role;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AppInitialData implements CommandLineRunner {
    private final Logger LOGGER = LoggerFactory.getLogger(AppInitialData.class);
    private final RoleRepository roleRepository;

    @Autowired
    public AppInitialData(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
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
    }
}