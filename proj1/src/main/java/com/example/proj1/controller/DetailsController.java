package com.example.proj1.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.proj1.Model.Details;
import com.example.proj1.Model.Worker;
import com.example.proj1.repository.WorkerRepository;
import com.example.proj1.service.DetailsService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/Mapping")
public class DetailsController {


    @Autowired
private WorkerRepository workerRepository;
    @Autowired
    private DetailsService ds;

    @PostMapping("/assign")
    public Details assignWork(@RequestBody Details details) {
        return ds.saveDetails(details);
    }

    @GetMapping("/admin/all")
    public List<Details> getAllBookings() {
        return ds.getAllBookingsSortedByDate();
    }

    @GetMapping("/user/{email}")
    public List<Details> getByUser(@PathVariable String email) {
        return ds.getByUserEmail(email);
    }

    @GetMapping("/worker/{email}")
    public List<Details> getByWorker(@PathVariable String email) {
        return ds.getByWorkerEmail(email);
    }

    @PutMapping("/status/{id}")
    public Details updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ds.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void deleteWork(@PathVariable Long id) {
        ds.deleteById(id);
    }

    // 🔐 SEND OTP TO USER EMAIL
    @PutMapping("/generate-otp/{id}")
    public ResponseEntity<String> generateOtp(@PathVariable Long id) {
        return ResponseEntity.ok(ds.generateOtpAndSend(id));
    }

    // ✅ VERIFY OTP
    @PostMapping("/verify-otp/{id}")
    public ResponseEntity<String> verifyOtp(@PathVariable Long id,
                                            @RequestParam String otp) {
        boolean valid = ds.verifyOtp(id, otp);
        return valid ?
                ResponseEntity.ok("OTP Verified Successfully!") :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP");
    }

    @PutMapping("/worker-arrived/{id}")
    public ResponseEntity<String> markWorkerArrived(@PathVariable Long id) {
        Details d = ds.getById(id);
        if (d == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");

        d.setWorkerReached(true);
        ds.saveDetails(d);

        return ResponseEntity.ok("✅ Worker marked as arrived");
    }

    @PutMapping("/complete/{id}")
    public ResponseEntity<String> markComplete(@PathVariable Long id) {
        Details d = ds.getById(id);
        if (d == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");

        d.setCompleted(true);
        ds.saveDetails(d);

        return ResponseEntity.ok("✅ Work marked as completed");
    }

    @GetMapping("/admin/summary")
public ResponseEntity<?> getSummary() {
    return ResponseEntity.ok(Map.of(
            "totalBookings", ds.getTotalBookings(),
            "completed", ds.getCompletedCount(),
            "cancelled", ds.getCancelledCount(),
            "revenue", ds.getTotalRevenue()
    ));
}

@PutMapping("/assign-worker/{bookingId}/{workerId}")
public ResponseEntity<?> assignWorker(
        @PathVariable Long bookingId,
        @PathVariable Long workerId) {

    Details booking = ds.getById(bookingId);
    if (booking == null)
        return ResponseEntity.badRequest().body("Booking not found");

    Worker worker = workerRepository.findById(workerId).orElse(null);
    if (worker == null)
        return ResponseEntity.badRequest().body("Worker not found");

    booking.setWorker(worker);
    booking.setWorkerName(worker.getUsername());
    booking.setWorkerEmail(worker.getEmail());
    booking.setWorkStatus("Assigned");

    worker.setAvailable(false); // mark worker busy

    ds.saveDetails(booking);
    workerRepository.save(worker);

    return ResponseEntity.ok("Worker assigned successfully");
}

}
