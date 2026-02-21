package com.example.proj1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proj1.Model.Review;
import com.example.proj1.Model.Worker;
import com.example.proj1.repository.ReviewRepository;
import com.example.proj1.repository.WorkerRepository;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepo;

    @Autowired
    private WorkerRepository workerRepo;

    @PostMapping("/{workerId}")
    public ResponseEntity<?> addReview(@PathVariable Long workerId, @RequestBody Review review) {
        Worker worker = workerRepo.findById(workerId).orElse(null);
        if (worker == null) return ResponseEntity.badRequest().body("Worker not found");

        review.setWorker(worker);
        return ResponseEntity.ok(reviewRepo.save(review));
    }

    @GetMapping("/{workerId}")
    public List<Review> getWorkerReviews(@PathVariable Long workerId) {
        return reviewRepo.findByWorkerId(workerId);
    }
}
