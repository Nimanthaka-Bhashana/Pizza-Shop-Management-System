package com.example.register.Controller;





import com.example.register.Entity.LoginResponse;
import com.example.register.Entity.User;
import com.example.register.Entity.UserLoginRequest;
import com.example.register.Repository.UserRepository;
import com.example.register.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest userLoginRequest) {
        String email = userLoginRequest.getEmail();
        String password = userLoginRequest.getPassword();

        // Validate user credentials
        User user = userRepository.findByEmail(email);
        if (user == null || !user.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        // Assuming user roles are stored in the User object
        String role = user.getRole();

        // You may include additional logic here based on user roles or any other criteria

        // Return success response with user role
        return ResponseEntity.ok().body(new LoginResponse(role));
    }
}

