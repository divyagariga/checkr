package com.checkr.userservice.security;

import com.checkr.userservice.entity.User;
import com.checkr.userservice.exception.UserNotFoundException;

public interface JsonWebTokenService {

    /**
     * Generate an access token for a user during signup or login.
     *
     * @param user The user for whom the access token is generated.
     * @return A String representing the generated access token.
     */
    String generateToken(User user);

    /**
     * Retrieve user information based on the provided access token.
     *
     * @param token The access token to retrieve user information.
     * @return The user associated with the provided access token.
     * @throws UserNotFoundException If no user is found based on the provided access token.
     */
    User retrieveUserByToken(String token) throws UserNotFoundException;

    /**
     * Validate the provided access token for each request.
     * <p>
     * Validation can fail if the access token is null, invalid, or expired.
     *
     * @param token The access token to be validated.
     * @return True if the access token is valid; otherwise, false.
     */
    Boolean validateAccessToken(String token);
}
