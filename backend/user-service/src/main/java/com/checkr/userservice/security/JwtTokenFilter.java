package com.checkr.userservice.security;

import com.checkr.userservice.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static com.checkr.userservice.constants.UserServiceConstants.AUTHORIZATION_HEADER;
import static com.checkr.userservice.constants.UserServiceConstants.BEARER;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {
    private final JsonWebTokenService jsonWebTokenService;

    /**
     * The class is meant to filter the requests based on access token passed in their headers and allow only the valid ones.
     *
     * @param jsonWebTokenService
     */
    @Autowired
    public JwtTokenFilter(JsonWebTokenService jsonWebTokenService) {
        this.jsonWebTokenService = jsonWebTokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        Optional<String> resultUser = getTokenValue(httpServletRequest.getHeader(AUTHORIZATION_HEADER));
        if (resultUser.isPresent()) {
            String token = resultUser.get();
            Boolean isExpired = jsonWebTokenService.validateAccessToken(token);
            User user = jsonWebTokenService.retrieveUserByToken(token);
            String userPassword = user.getPassword();
            String userEmail = user.getEmail();

            UserDetails userDetails =
                    org.springframework.security.core.userdetails.User.withUsername(
                                    userEmail)
                            .password(userPassword)
                            .accountExpired(false)
                            .accountLocked(false)
                            .disabled(false)
                            .credentialsExpired(isExpired).authorities(List.of())
                            .build();
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(
                            userDetails, token, userDetails == null ? List.of() : userDetails.getAuthorities());
            authenticationToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    /**
     * Fetch access token passed in the header for each request
     *
     * @param header
     * @return
     */
    private Optional<String> getTokenValue(String header) {
        int startingIndex = 7; //start index of bearer token
        if (header != null && header.startsWith(BEARER) && header.substring(startingIndex) != null) {
            return Optional.of(header.substring(startingIndex));
        }
        return Optional.empty();
    }
}
