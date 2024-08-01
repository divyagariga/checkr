package com.checkr.userservice.security;

import com.checkr.userservice.entity.User;
import com.checkr.userservice.exception.UserNotFoundException;
import com.checkr.userservice.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.checkr.userservice.constants.UserServiceConstants.*;

@Component
public class JsonWebTokenServiceImpl implements JsonWebTokenService {
    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(JsonWebTokenServiceImpl.class);

    // inject jwt secret for token generation
//    @Value("${jwt.secret}")
//    private String jwtSecret;
    private String jwtSecret = "g3lV5ZkXU2dTWE1OaTZwZ3lEclJqR2RVdXZaaHBlWUNWYXk3azFxdHJueU91ZGVpdG5lTGc1UjBHVzhyWkVIZVhxT2E5YTVZSHhHUmp4YkFHR1NkdXg=";


    // inject token expire time
    @Value("${token.expiry.time}")
    private int sessionTime;

    /**
     * The class is used for all session management tasks of generating, validating access tokens and to fetch user information by their access token
     *
     * @param userRepository
     */
    public JsonWebTokenServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //Generate token for a user with an expiry time which can be used further throughout the session
    @Override
    public String generateToken(User user) {
        Map<String, Object> tokenClaims = new HashMap<>();
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS512;
        int millisecondsConversion = OTP_EXPIRATION_PERIOD;
        return Jwts.builder().setClaims(tokenClaims).setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + (long) sessionTime * millisecondsConversion))
                .signWith(signatureAlgorithm, jwtSecret).compact();
    }

    //Get user information from the access token provided. This can be sed to identify the current user
    @Override
    public User retrieveUserByToken(String token) throws UserNotFoundException {
        final String userEmail =
                Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();

        Optional<User> userResult = userRepository.findByEmail(userEmail);
        if (userResult.isPresent()) {
            return userResult.get();
        } else {
            logger.error(String.format(ERROR_VALIDATING_USER, userEmail));
            throw new UserNotFoundException(String.format(USER_WITH_EMAIL_NOT_FOUND, userEmail));
        }
    }

    //Validate if token is before the expiry period. Check if provided access token has already expired

    @Override
    public Boolean validateAccessToken(String token) {
        try {
            Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
            // Corrected logic: token is valid if expiration date is after current date
            return claims.getExpiration().after(new Date());
        } catch (SignatureException signatureException) {
            logger.error(String.format("Parsing Error validating token: %s", signatureException.getMessage()));
            throw new SignatureException(SIGNATURE_EXCEPTION_MESSAGE);
        }
    }

}
