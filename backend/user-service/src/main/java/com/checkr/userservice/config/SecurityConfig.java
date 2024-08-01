package com.checkr.userservice.config;

import com.checkr.userservice.security.JwtTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import javax.validation.constraints.NotNull;
import java.util.List;

import static com.checkr.userservice.constants.UserServiceConstants.ALL_OPTIONS;
import static com.checkr.userservice.constants.UserServiceConstants.USER_URL;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @NotNull
    private final JwtTokenFilter jwtTokenFilter;

    @Autowired
    public SecurityConfig(JwtTokenFilter jwtTokenFilter) {
        this.jwtTokenFilter = jwtTokenFilter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .configurationSource(
                        request -> {
                            return getCorsConfiguration();
                        })
                .and()
                .csrf()
                .disable();

        // Set session management to stateless
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        HttpStatus unAuthorizedHttpStatus = HttpStatus.UNAUTHORIZED;

        // Set unauthorized requests exception handler
        http.exceptionHandling()
                .authenticationEntryPoint(new HttpStatusEntryPoint(unAuthorizedHttpStatus));

        // Set permissions on endpoints
        http
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, USER_URL)
                .permitAll()
                .antMatchers(HttpMethod.GET, USER_URL)
                .permitAll()
                .antMatchers(HttpMethod.PATCH, USER_URL)
                .permitAll()
                .anyRequest()
                .authenticated();

        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }

    /**
     * Sets allowed methods and origins for Cors
     * @return cors
     */
    private static CorsConfiguration getCorsConfiguration() {
        CorsConfiguration cors = new CorsConfiguration();
        cors.setAllowedOrigins(List.of(ALL_OPTIONS));
        cors.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH"));
        cors.setAllowedHeaders(List.of(ALL_OPTIONS));
        return cors;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
