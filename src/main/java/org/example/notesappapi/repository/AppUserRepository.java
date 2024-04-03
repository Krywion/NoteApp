package org.example.notesappapi.repository;

import org.example.notesappapi.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findUserByUsername(String username);

    Optional<AppUser> findUserByEmail(String email);
}
