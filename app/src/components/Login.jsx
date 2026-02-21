import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: ""
  });

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const submit = async (e) => {
  // 1. THIS IS CRITICAL: Stops the browser from refreshing the page 
  // and sending a 'GET' request to the backend.
  e.preventDefault(); 

  if (!form.email || !form.password || !form.role) {
    alert("All fields are required");
    return;
  }

  try {
    // 2. Ensure this is exactly 'post'
    const res = await axios.post("http://localhost:3019/auth/login", form, { 
      withCredentials: true 
    });

    console.log("Login Response Data:", res.data);
    alert("Login successful");

    // 3. Store the ID (returned from our previous Java fix)
    localStorage.setItem("userid", res.data.id); 
    localStorage.setItem("email", res.data.email);
    localStorage.setItem("role", res.data.role);

    // 4. Case-insensitive role check
    const role = res.data.role.toLowerCase();
    if (role === "admin") nav("/Admin");
    else if (role === "user") nav("/User");
    else if (role === "worker") nav("/Worker");
    else nav("/");

  } catch (err) {
    // This catches if the server is down or credentials fail
    if (err.response) {
       alert(err.response.data || "Invalid Credentials");
    } else {
       alert("Network Error: Check if Spring Boot is running on port 3019");
    }
  }
};
  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f0f4f8, #e0f7fa);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .login-container {
          background-color: #ffffff;
          padding: 40px 30px;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          width: 90%;
          max-width: 400px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .login-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
        }
        .login-container h1 {
          margin-bottom: 30px;
          font-size: 28px;
          color: #333;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .login-form label {
          margin-bottom: 6px;
          font-weight: 600;
          color: #555;
          font-size: 14px;
        }
        .login-form input,
        .login-form select {
          padding: 12px 14px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .login-form input:focus,
        .login-form select:focus {
          border-color: #007bff;
          box-shadow: 0 0 8px rgba(0,123,255,0.2);
          outline: none;
        }
        .login-form button {
          padding: 14px;
          background: linear-gradient(90deg, #007bff, #0056b3);
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
        }
        .login-form button:hover {
          background: linear-gradient(90deg, #0056b3, #003f7f);
          transform: translateY(-2px);
        }
        @media (max-width: 480px) {
          .login-container {
            padding: 30px 20px;
          }
          .login-container h1 {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={submit} className="login-form">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Enter email"
            onChange={change}
            autoComplete="email"
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter password"
            onChange={change}
            autoComplete="current-password"
          />

          <label>Role</label>
          <select name="role" value={form.role} onChange={change}>
            <option value="">Select Role</option>
            <option value="Worker">Worker</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;