package com.checkr.userservice.repository;

import com.checkr.userservice.entity.ForgotPasswordOtp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForgotPasswordOtpRepository extends JpaRepository<com.checkr.userservice.entity.ForgotPasswordOtp, Integer> {
    /**
     * Finds a ForgotPasswordOtp entity based on the user's email.
     *
     * @param email The email address associated with the user.
     * @return An Optional containing the ForgotPasswordOtp/
     */
    Optional<ForgotPasswordOtp> findByUserEmail(String email);
}
