package com.apps.library.manager.controller;

import com.apps.library.manager.dto.ResponseDTO;
import com.apps.library.manager.dto.UserDTO;
import com.apps.library.manager.model.app.Item;
import com.apps.library.manager.model.security.User;
import com.apps.library.manager.service.AuthService;
import com.apps.library.manager.service.ItemService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/v1")
public class AppController {
    private final AuthService authService;
    private final ItemService itemService;

    @Autowired
    public AppController(AuthService authService, ItemService itemService) {
        this.authService = authService;
        this.itemService = itemService;
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
    public ResponseEntity<ResponseDTO> login(HttpServletRequest request){
        ResponseDTO responseDTO = new ResponseDTO();
        Authentication authentication = authService.authenticateUser(request);
        responseDTO.setStatus(authentication.isAuthenticated() ? 200 : 401);
        responseDTO.setResponse(authentication);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/user/home")
    public ResponseEntity<ResponseDTO> getUserProfile(@RequestBody Map<String, Integer> userDetails){
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setStatus(200);

        System.out.println(Long.valueOf(userDetails.get("userId")));

        System.out.println(itemService.findByUserId(Long.valueOf(userDetails.get("userId"))));

        responseDTO.setResponse(itemService.findByUserId(Long.valueOf(userDetails.get("userId"))));
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/user/create-item")
    public ResponseEntity<ResponseDTO> createItem(@RequestBody Item item){
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setStatus(200);
        responseDTO.setResponse(itemService.createItem(item));
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/user/get-details/{name}")
    public ResponseEntity<ResponseDTO> getDetails(@PathVariable String name){
        StringBuilder uri = new StringBuilder("https://www.omdbapi.com/?apikey=6d4509cf&t=");
        uri.append(name);
        RestTemplate restTemplate = new RestTemplate();

        String result = restTemplate
                .getForObject(uri.toString().replace(" ", "+"), String.class);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setStatus(200);
        responseDTO.setResponse(result);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
}
