package com.apps.library.manager.service;

import com.apps.library.manager.dto.UserDTO;
import com.apps.library.manager.model.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    User createUser(UserDTO userDTO);
    boolean authenticateUser(HttpServletRequest request);
}
