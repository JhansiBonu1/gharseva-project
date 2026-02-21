package com.example.proj1.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "details")
public class Details {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String workName;
    private String userName;
    private String workerName;

    private String userEmail;
    private String workerEmail;

    private String userPhone;
    private String workerPhone;

    private String workStatus = "Assigned";   // Assigned, InProgress, Completed
    private String moneyStatus = "Pending";   // Paid, Pending

    private boolean acceptedByUser = true;
    private boolean acceptedByWorker = false;
    private boolean completed = false;
    private boolean cancelled = false;

    private Integer rating;
    private String review;

    private boolean workerReached = false;

    private LocalDateTime dateTime = LocalDateTime.now();

    // 🔐 OTP fields
    private String otp;
    private boolean otpVerified = false;

    // ---------------- RELATIONS ----------------

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "worker_id")
    private Worker worker;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    // ---------------- GETTERS & SETTERS ----------------

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getWorkName() { return workName; }
    public void setWorkName(String workName) { this.workName = workName; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getWorkerName() { return workerName; }
    public void setWorkerName(String workerName) { this.workerName = workerName; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getWorkerEmail() { return workerEmail; }
    public void setWorkerEmail(String workerEmail) { this.workerEmail = workerEmail; }

    public String getUserPhone() { return userPhone; }
    public void setUserPhone(String userPhone) { this.userPhone = userPhone; }

    public String getWorkerPhone() { return workerPhone; }
    public void setWorkerPhone(String workerPhone) { this.workerPhone = workerPhone; }

    public String getWorkStatus() { return workStatus; }
    public void setWorkStatus(String workStatus) { this.workStatus = workStatus; }

    public String getMoneyStatus() { return moneyStatus; }
    public void setMoneyStatus(String moneyStatus) { this.moneyStatus = moneyStatus; }

    public boolean isAcceptedByUser() { return acceptedByUser; }
    public void setAcceptedByUser(boolean acceptedByUser) { this.acceptedByUser = acceptedByUser; }

    public boolean isAcceptedByWorker() { return acceptedByWorker; }
    public void setAcceptedByWorker(boolean acceptedByWorker) { this.acceptedByWorker = acceptedByWorker; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public boolean isCancelled() { return cancelled; }
    public void setCancelled(boolean cancelled) { this.cancelled = cancelled; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getReview() { return review; }
    public void setReview(String review) { this.review = review; }

    public boolean isWorkerReached() { return workerReached; }
    public void setWorkerReached(boolean workerReached) { this.workerReached = workerReached; }

    public LocalDateTime getDateTime() { return dateTime; }
    public void setDateTime(LocalDateTime dateTime) { this.dateTime = dateTime; }

    public String getOtp() { return otp; }
    public void setOtp(String otp) { this.otp = otp; }

    public boolean isOtpVerified() { return otpVerified; }
    public void setOtpVerified(boolean otpVerified) { this.otpVerified = otpVerified; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Worker getWorker() { return worker; }
    public void setWorker(Worker worker) { this.worker = worker; }

    public Account getAccount() { return account; }
    public void setAccount(Account account) { this.account = account; }
}
