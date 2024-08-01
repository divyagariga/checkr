package com.checker.cloud.gateway.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JWTUtil {

//    @Value("${jwt.secret}")
//    public String jwtSecret;
    String jwtSecret = "g3lV5ZkXU2dTWE1OaTZwZ3lEclJqR2RVdXZaaHBlWUNWYXk3azFxdHJueU91ZGVpdG5lTGc1UjBHVzhyWkVIZVhxT2E5YTVZSHhHUmp4YkFHR1NkdXg=";


    public void validateToken(final String token) {
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
