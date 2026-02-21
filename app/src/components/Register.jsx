import { useState } from "react"
import axios from "axios"
//import { useNavigate } from "react-router-dom"
function Register(){
    //const nav=useNavigate();
    const [form,setform]=useState({
        username:"",
        email:"",
        password:"",
        role:""
    })
    const change=(e)=>{
        setform({...form,[e.target.name]:e.target.value})
    }
    const submit=async(e)=>{
        e.preventDefault();
        if (!form.username || !form.email || !form.password || !form.role) {
            alert("All fields are required");
            return;
        }
        try{
            const res=await axios.post("http://localhost:3019/auth/register",form,{withCredentials:true});
            console.log(res);
            console.log(res.data);
            alert(res.data);
            window.location.href="/login"
        }
        catch(err){
            console.log(err);
            if (err.response && err.response.status === 409) {
                alert(err.response.data);
            } else {
                alert("Something went wrong. Please try again.");
            }
        }
    }
    return(
        <>
            <h1>Welcome to Registeration Form</h1>
            <form onSubmit={submit}>
                <label>Username</label><br/>
                <input onChange={change} type="text" name="username" form={form.username} placeholder="Username"/><br/><br/>
                <label>Email</label><br/>
                <input onChange={change} type="email" name="email" form={form.email} placeholder="Email"/><br/><br/>
                <label>Password</label><br/>
                <input onChange={change} type="password" name="password" form={form.password} placeholder="Password"/><br/><br/>
                <select name="role" value={form.role} onChange={change}>
                    <option value="">Select Role</option>
                    <option value="Worker">Worker</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
export default Register