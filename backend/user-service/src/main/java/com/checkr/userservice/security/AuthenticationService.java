package com.checkr.userservice.security;

import com.checkr.userservice.entity.User;
import com.checkr.userservice.exception.InvalidCredentialsException;
import com.checkr.userservice.exception.UserNotFoundException;

import java.util.Optional;

/**
 * Interface used for authentication purposes like login, storing password, get current user information,etc.
 */
public interface AuthenticationService {

    /**
     * Retrieves the current user as an Optional<User>.
     * <p>
     * If a user is currently authenticated, the method returns an Optional containing the user object.
     * If no user is authenticated, it returns an empty Optional.
     * </p>
     *
     * @return An Optional<User> representing the current authenticated user.
     */
    Optional<User> getCurrentUser();

    /**
     * Retrieves the access token of the current user.
     * <p>
     * If a user is currently authenticated, the method returns an Optional containing the access token as a String.
     * If no user is authenticated or the access token is not available, it returns an empty Optional.
     * </p>
     *
     * @return An Optional<String> representing the access token of the current authenticated user.
     */
    Optional<String> getCurrentUserToken();

    /**
     * Authenticates a user based on email and password.
     *
     * @param email    The email of the user.
     * @param password The password of the user.
     * @return The authenticated user.
     * @throws UserNotFoundException       If the user with the given email is not found.
     * @throws InvalidCredentialsException If the provided credentials are invalid.
     */
    User authenticateUser(String email, String password) throws UserNotFoundException, InvalidCredentialsException;

    /**
     * Encodes the given password.
     *
     * @param password The password to be encoded.
     * @return The encoded password.
     */

    String encodePassword(String password);
}
