package com.example.proj1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.proj1.Model.Account;
import com.example.proj1.Model.Worker;
import com.example.proj1.repository.AccountRepository;
import com.example.proj1.repository.WorkerRepository;

@Service
public class WorkerService {

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private AccountRepository accountRepository;

    // ✅ CREATE WORKER (Creates Account + Worker)
    public String createWorker(Worker worker) {

        if (worker.getEmail() == null || worker.getPassword() == null) {
            return "Email and Password required";
        }

        if (accountRepository.findByEmail(worker.getEmail()) != null) {
            return "Email already exists";
        }

        // Create Account
        Account account = new Account();
        account.setEmail(worker.getEmail());
        account.setUsername(worker.getUsername());
        account.setPassword(worker.getPassword());
        account.setRole("WORKER");

        accountRepository.save(account);

        // Link Worker with Account
        worker.setAccount(account);

        workerRepository.save(worker);

        return "Worker Created Successfully";
    }

    // ✅ GET ALL WORKERS
    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }

    // ✅ GET WORKER BY ID
    public Worker getWorkerById(Long id) {
        return workerRepository.findById(id).orElse(null);
    }

    // ✅ UPDATE WORKER
    public Worker updateWorker(Long id, Worker updated) {

        Worker existing = workerRepository.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        existing.setUsername(updated.getUsername());
        existing.setEmail(updated.getEmail());
        existing.setLocation(updated.getLocation());
        existing.setSkill(updated.getSkill());
        existing.setAvailable(updated.getAvailable());
        existing.setActive(updated.getActive());

        return workerRepository.save(existing);
    }

    // ✅ DELETE WORKER (Also delete Account)
    public String deleteWorker(Long id) {

        Worker worker = workerRepository.findById(id).orElse(null);

        if (worker == null) {
            return "Worker not found";
        }

        Account account = worker.getAccount();

        workerRepository.delete(worker);

        if (account != null) {
            accountRepository.delete(account);
        }

        return "Worker Deleted Successfully";
    }

    // ✅ FIND AVAILABLE WORKERS BY SKILL
    public List<Worker> findAvailableBySkill(String skill) {
        return workerRepository
                .findBySkillIgnoreCaseAndAvailableTrueAndActiveTrue(skill);
    }
}