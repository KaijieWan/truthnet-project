package com.example.truthnet_backend.model.repository;

import com.example.truthnet_backend.model.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface VoteRepository extends JpaRepository<Vote, UUID> {
    List<Vote> findByContentId(UUID contentId);
}
