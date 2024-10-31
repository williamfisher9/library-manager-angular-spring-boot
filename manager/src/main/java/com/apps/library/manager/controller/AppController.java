package com.apps.library.manager.controller;

import com.apps.library.manager.dto.LoginRequestDTO;
import com.apps.library.manager.dto.ResponseDTO;
import com.apps.library.manager.dto.UserDTO;
import com.apps.library.manager.model.User;
import com.apps.library.manager.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/v1")
public class AppController {
    private final AuthService authService;

    @Autowired
    public AppController(AuthService authService) {
        this.authService = authService;
    }

    @RequestMapping(method = RequestMethod.POST, path = "/public/signup")
    public ResponseEntity<ResponseDTO> createUser(@RequestBody UserDTO userDTO){
        ResponseDTO responseDTO = new ResponseDTO();
        User user = authService.createUser(userDTO);
        responseDTO.setResponse(user);
        responseDTO.setStatus(200);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/public/login")
    public ResponseEntity<Boolean> login(HttpServletRequest request){
        return new ResponseEntity<>(authService.authenticateUser(request), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/user/user")
    public ResponseEntity<String> appLogin(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        return new ResponseEntity<>("user with user role", HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/admin/user")
    public ResponseEntity<String> adminLogin(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        return new ResponseEntity<>("user with admin role", HttpStatus.OK);
    }
}
