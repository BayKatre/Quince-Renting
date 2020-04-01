package com.quince.rentingapp.controller;

import com.quince.rentingapp.service.RegistrationService;
import com.quince.rentingapp.domain.user.User;
import com.quince.rentingapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/register")
public class RegistrationController {

    private final RegistrationService registrationService;
    private final UserService userService;



    @PostMapping
    public String  createUser(
            @RequestParam(value = "username") String username,
            @RequestParam(value = "email") String  email,
            @RequestParam(value = "password") String  password){
        User user=userService.findByEmail(email);
        if (user!=null){
            if (user.getUsername().equals(username)){
                return "{\"result\":False,\"info\":\"There is already a user registered with the credentials provided!\"}";
            }
            return "{\"result\":False,\"info\":\"There is already a user registered with the email provided!\"}";
        }
        if (userService.findByUsername(username)!=null){
            return "{\"result\":False,\"info\":\"There is already a user registered with the username provided!\"}";
        }
        User newUser=new User();
        newUser.setEmail(email);
        newUser.setUsername(username);
        final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        final String encodedPassword = bCryptPasswordEncoder.encode(password);
        newUser.setPassword(encodedPassword);
        registrationService.saveUser(newUser);
        return "{\"result\":True,\"info\":\"User has been created!\"}";

    }
}
