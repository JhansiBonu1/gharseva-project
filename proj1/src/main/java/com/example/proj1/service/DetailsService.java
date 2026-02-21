package com.example.proj1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.proj1.Model.Details;
import com.example.proj1.repository.DetailsRepository;
import com.example.proj1.util.OTPUtil;

@Service
public class DetailsService {

    @Autowired
    private DetailsRepository repo;

    @Autowired
    private OTPUtil otpUtil;

    @Autowired
    private EmailService emailService;

    public Details saveDetails(Details details) {
        return repo.save(details);
    }

    public List<Details> getAllBookingsSortedByDate() {
        return repo.findAll();
    }

    public List<Details> getByUserEmail(String email) {
        return repo.findByUserEmail(email);
    }

    public List<Details> getByWorkerEmail(String email) {
        return repo.findByWorkerEmail(email);
    }

    // ✅ FIXED
    public Details updateStatus(Long id, String status) {
        Details d = repo.findById(id).orElse(null);
        if (d != null) {
            d.setWorkStatus(status); // ✔ correct method
            repo.save(d);
        }
        return d;
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    public Details getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // 🔐 GENERATE & SEND OTP (EMAIL)
    public String generateOtpAndSend(Long id) {
        Details d = getById(id);
        if (d == null) return "Booking not found";

        String otp = otpUtil.generateOTP();
        d.setOtp(otp);
        d.setOtpVerified(false);
        repo.save(d);

        emailService.sendOTP(d.getUserEmail(), otp);
        return "OTP sent to user email";
    }

    // ✅ VERIFY OTP
    public boolean verifyOtp(Long id, String enteredOtp) {
        Details d = getById(id);
        if (d == null) return false;

        if (enteredOtp.equals(d.getOtp())) {
            d.setOtpVerified(true);
            d.setOtp(null); // prevent reuse
            repo.save(d);
            return true;
        }
        return false;
    }


    public List<Details> getAllSorted() {
    return repo.findAllByOrderByDateTimeDesc();
}

public long getCompletedCount() {
    return repo.countByCompletedTrue();
}

public long getCancelledCount() {
    return repo.countByCancelledTrue();
}

public long getTotalBookings() {
    return repo.count();
}

public long getTotalRevenue() {
    return repo.findAll().stream()
            .filter(d -> "Paid".equalsIgnoreCase(d.getMoneyStatus()))
            .count() * 500;  // Example: assume ₹500 per job
}

}
