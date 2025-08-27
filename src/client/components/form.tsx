import React, { useState } from "react";
import "./form.css";

let formData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    comment: "",
    reason: "",
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

const reasonOptions = [
    { value: "1", label: "I have a question about the product" },
    { value: "2", label: "I have a question about the service" },
    { value: "3", label: "I have a question about the website" },
]

function Form() {
    const [form, setForm] = useState(formData);
    const [errors, setErrors] = useState({
        email: "",
        phone: "",
    });     

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        
        // Clear errors when user starts typing
        if (name === "email" || name === "phone") {
            setErrors({ ...errors, [name]: "" });
        }
    }
    
    const validateEmail = (email: string): string => {
        if (!email) return "Email is required";
        if (!EMAIL_REGEX.test(email)) return "Please enter a valid email address";
        return "";
    };
    
    const validatePhone = (phone: string): string => {
        if (!phone) return "Phone number is required";
        if (!PHONE_REGEX.test(phone)) return "Please enter a valid phone number";
        return "";
    };

    const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({ ...form, reason: e.target.value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        // Validate email and phone
        const emailError = validateEmail(form.email);
        const phoneError = validatePhone(form.phone);
        
        if (emailError || phoneError) {
            setErrors({
                email: emailError,
                phone: phoneError,
            });
            return;
        }
        
        form.reason = reasonOptions.find(option => option.value === form.reason)?.label || "";
        console.log(form);
        fetch(window.location.hostname === "localhost" ? `http://localhost:${process.env.PORT || 5050}/form` : `/form`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });
        setForm(formData);
        setErrors({ email: "", phone: "" });
        console.log(formData)
    }

    return (
        <form>
            <div>
                <label>
                    <span>Reason for Contacting Us</span>
                    <select name="reason" value={form.reason} onChange={handleReasonChange}>
                        {reasonOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>First Name</label>
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} />
            </div>
            <div>
                <label>Last Name</label>
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} />
            </div>
            
            <div>
                <label>Email</label>
                <input 
                    type="email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange}
                    className={errors.email ? "error" : ""} 
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div>
                <label>Phone</label>
                <input 
                    type="tel" 
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange}
                    className={errors.phone ? "error" : ""} 
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            
            <div>
                <label>Company</label>
                <input type="text" name="company" value={form.company} onChange={handleChange} />
            </div>
            <div>
                <label>Industry</label>
                <input type="text" name="industry" value={form.industry} onChange={handleChange} />
            </div>
            <div>
                <label>Comment</label>
                <textarea name="comment" value={form.comment} onChange={handleChange} />
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            
            
        </form>
    )
}

export default Form;