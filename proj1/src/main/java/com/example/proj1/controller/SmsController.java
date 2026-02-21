package com.example.proj1.controller;

import com.example.proj1.service.EmailService;
import com.example.proj1.util.OTPUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/otp")
@CrossOrigin(origins = "*")
public class SmsController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private OTPUtil otpUtil;

    // Temporary OTP store
    private Map<String, String> otpStore = new HashMap<>();

    @PostMapping("/send")
    public String sendOtp(@RequestParam String email) {

        String otp = otpUtil.generateOTP();
        otpStore.put(email, otp);

        emailService.sendOTP(email, otp);

        return "OTP sent to email successfully";
    }

    @PostMapping("/verify")
    public String verifyOtp(@RequestParam String email,
                            @RequestParam String otp) {

        if (otp.equals(otpStore.get(email))) {
            otpStore.remove(email);
            return "OTP verified successfully";
        }
        return "Invalid OTP";
    }
}
