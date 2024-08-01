package com.checkr.userservice.security;

import com.checkr.userservice.entity.User;
import com.checkr.userservice.exception.InvalidCredentialsException;
import com.checkr.userservice.exception.UserNotFoundException;
import com.checkr.userservice.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.checkr.userservice.constants.UserServiceConstants.*;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public AuthenticationServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<User> getCurrentUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return Optional.empty();
        }

        if (authentication.getPrincipal().equals(ANONYMOUS_USER)) {
            return Optional.empty();
        }
        var userDetails = (UserDetails) authentication.getPrincipal();
        return userRepository.findByEmail(userDetails.getUsername());
    }

    @Override
    public Optional<String> getCurrentUserToken() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        return Optional.ofNullable((String) authentication.getCredentials());
    }

    @Override
    public User authenticateUser(String email, String password) throws UserNotFoundException, InvalidCredentialsException {
        Optional<User> userResultByEmail = userRepository
                .findByEmail(email);

        if (!userResultByEmail.isPresent()) {
            throw new UserNotFoundException(String.format(USER_WITH_EMAIL_NOT_FOUND, email));
        }
        User user = userResultByEmail.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException(INVALID_CREDENTIALS_ERROR);
        }
        return user;
    }

    @Override
    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }
}
