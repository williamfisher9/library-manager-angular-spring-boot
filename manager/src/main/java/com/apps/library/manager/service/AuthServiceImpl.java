package com.apps.library.manager.service;

import com.apps.library.manager.dao.RoleRepository;
import com.apps.library.manager.dao.UserRepository;
import com.apps.library.manager.dto.UserDTO;
import com.apps.library.manager.exceptions.AuthorizationHeaderNotFoundException;
import com.apps.library.manager.exceptions.RoleNotFoundException;
import com.apps.library.manager.model.Role;
import com.apps.library.manager.model.User;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.*;

@Component
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, ModelMapper modelMapper, RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public User createUser(UserDTO userDTO) {
        Set<Role> roleSet = new HashSet<>();
        for(String val : userDTO.getRoles()){
            Role role = roleRepository.findByName(val)
                    .orElseThrow(() -> new RoleNotFoundException("Role was not found"));
            roleSet.add(role);
        }

        User user = modelMapper.map(userDTO, User.class);
        user.setRoles(roleSet);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(true);
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);
        return userRepository.save(user);
    }

    @Override
    public boolean authenticateUser(HttpServletRequest request) {
        String header;
        if(request.getHeader("Authorization") != null) {
            System.out.println(request.getHeader("Authorization"));
            header = request.getHeader("Authorization").substring("Basic ".length());
        }
        else
            throw new AuthorizationHeaderNotFoundException("Authorization header was not found.");

        String decodedHeaderVal = new String(Base64.getDecoder().decode(header), StandardCharsets.UTF_8);

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(decodedHeaderVal.split(":")[0],
                        decodedHeaderVal.split(":")[1]);

        System.out.println("before auth...");
        Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        System.out.println("after auth...");
        return authentication.isAuthenticated();
    }
}
