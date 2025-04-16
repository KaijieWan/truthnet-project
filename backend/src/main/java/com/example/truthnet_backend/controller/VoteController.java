package com.example.truthnet_backend.controller;

import com.example.truthnet_backend.model.entity.Content;
import com.example.truthnet_backend.model.entity.Vote;
import com.example.truthnet_backend.model.repository.ContentRepository;
import com.example.truthnet_backend.model.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/vote")
public class VoteController {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private ContentRepository contentRepository;

    @PostMapping
    public ResponseEntity<Map<String, String>> vote(@RequestBody Vote vote) {
        Optional<Content> contentOpt = contentRepository.findById(vote.getContent().getId());
        if (!contentOpt.isPresent()) return ResponseEntity.badRequest().body(Map.of("message", "Content not found"));

        vote.setContent(contentOpt.get());
        voteRepository.save(vote);

        // Update credibility score
        List<Vote> votes = voteRepository.findByContentId(vote.getContent().getId());
        double score = calculateCredibilityScore(votes);
        String label = labelCredibility(score);
        Content content = contentOpt.get();
        content.setCredibilityScore(score);
        content.setCredibilityLabel(label);
        contentRepository.save(content);

        return ResponseEntity.ok(Map.of("message", "Vote registered!"));
    }

    private double calculateCredibilityScore(List<Vote> votes) {
        double score = 0.0;

        for (Vote v : votes) {
            switch (v.getVoteType().toLowerCase()) {
                case "accurate" -> score += 1.0;
                case "inaccurate" -> score -= 0.5;
                case "misleading" -> score -= 1.0;
                case "unclear" -> {} // no change
            }
        }

        int total = votes.size();
        return total > 0 ? score / total : 0.0;
    }

    private String labelCredibility(double score) {
        if (score >= 0.75) return "Highly Reliable";
        else if (score >= 0.4) return "Mostly Reliable";
        else if (score >= 0.1) return "Somewhat Reliable";
        else if (score >= -0.1) return "Unclear or Mixed";
        else if (score >= -0.5) return "Somewhat Unreliable";
        else return "Unreliable / Misleading";
    }

}
