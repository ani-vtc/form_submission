import React, { useState } from "react";
import "./form.css";

let formData = {
    reason: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    comment: "",
}

const reasonOptions = [
    { value: "1", label: "I have a question about the product" },
    { value: "2", label: "I have a question about the service" },
    { value: "3", label: "I have a question about the website" },
]

function Form() {
    const [form, setForm] = useState(formData);     

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({ ...form, reason: e.target.value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        form.reason = reasonOptions.find(option => option.value === form.reason)?.label || "";
        console.log(form);
        fetch(`http://localhost:${process.env.PORT || 5050}/form`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });
        setForm(formData);
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
                <input type="email" name="email" value={form.email} onChange={handleChange} />
            </div>
            
            <div>
                <label>Phone</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
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