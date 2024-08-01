package com.checkr.userservice.repository;

import com.checkr.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     * Finds a user by name.
     *
     * @param name The name of the user to search for.
     * @return An optional containing the user if found, otherwise empty.
     */
    Optional<User> findByName(String name);

    /**
     * Finds a user by email.
     *
     * @param email The email address of the user to search for.
     * @return An optional containing the user if found, otherwise empty.
     */
    Optional<User> findByEmail(String email);
}
