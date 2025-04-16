package com.example.truthnet_backend.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;

import java.util.UUID;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "content")
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String url;

    @Column(columnDefinition = "TEXT")
    private String contentText;

    private String status = "pending";

    private Double credibilityScore = 0.0;

    private String credibilityLabel = "uncalculated";

    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and setters
}
