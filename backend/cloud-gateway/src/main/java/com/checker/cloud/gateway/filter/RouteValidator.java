package com.checker.cloud.gateway.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {
    public static final List<String> openApiEndpoints = List.of(
            "/api/v1/users/",
            "/api/v1/users/login",
            "/api/v1/users/send-otp",
            "/api/v1/users/validate-otp",
            "/api/v1/users/auth",
            "/api/v1/candidates/save-candidates",
            "/eureka"
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().equals(uri));
}

