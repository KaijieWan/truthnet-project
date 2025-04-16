package com.example.truthnet_backend.model.repository;

import com.example.truthnet_backend.model.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ContentRepository extends JpaRepository<Content, UUID> {}
