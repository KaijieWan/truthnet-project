package com.example.truthnet_backend.controller;

import com.example.truthnet_backend.model.entity.Content;
import com.example.truthnet_backend.model.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/content")
public class ContentController {

    @Autowired
    private ContentRepository contentRepository;

    @GetMapping("")
    public ResponseEntity<Map<String, String>> checkAuth() {
        return ResponseEntity.ok(Map.of("message", "Authenticated"));
    }


    @PostMapping("/submit")
    public ResponseEntity<Content> submitContent(@RequestBody Content content) {
        Content saved = contentRepository.save(content);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Content> getContent(@PathVariable UUID id) {
        return contentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/allContent")
    public ResponseEntity<List<Content>> getAllContent() {
        return ResponseEntity.ok(contentRepository.findAll());
    }


}
