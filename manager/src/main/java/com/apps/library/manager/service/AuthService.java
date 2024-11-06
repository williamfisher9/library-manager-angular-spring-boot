package com.apps.library.manager.service;

import com.apps.library.manager.dto.UserDTO;
import com.apps.library.manager.model.security.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    User createUser(UserDTO userDTO);
    Authentication authenticateUser(HttpServletRequest request);
}
