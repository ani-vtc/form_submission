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
    { value: "4", label: "Sponsor a school" },
    { value: "5", label: "DA Territory Intelligence" },
    { value: "6", label: "Pattern Recognition Workshop" },
]

function Form() {
    const [form, setForm] = useState(formData);
    const [errors, setErrors] = useState({
        email: "",
        phone: "",
    });
    const [submitted, setSubmitted] = useState(false);     

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
        setSubmitted(true);
        //setTimeout(() => setSubmitted(false), 5000);
        console.log(formData)
    }

    return (
        <>
            <div className="logo-placeholder">VTCo</div>
            <div className="container">
                <div className="left-section">
                    <div className="eyebrow">CONTACT SALES</div>
                    <h1>Let's build together</h1>
                    <p>
                        Whether you're a founding partner, school sponsor, realtor, or exploring our civic intelligence tools, we'd love to hear from you. Tell us a little about your goals and we'll connect you with the right person on our team.
                    </p>
                </div>
                <div className="right-section">
                    <form>
                        {submitted && <div className="success-message">Thank you! Your form has been submitted successfully.</div>}

                        <div>
                            <label>Reason for inquiry</label>
                            <select className="reason-select" name="reason" value={form.reason} onChange={handleReasonChange}>
                                <option value="">Founding partners</option>
                                {reasonOptions.map((option) => (
                                    <option className="reason-option" key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-row">
                            <div>
                                <label>First name*</label>
                                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" />
                            </div>
                            <div>
                                <label>Last name*</label>
                                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div>
                                <label>Email*</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={errors.email ? "error" : ""}
                                    placeholder="john@something.com"
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>
                            <div>
                                <label>Phone number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className={errors.phone ? "error" : ""}
                                    placeholder="+1 777-777-7777"
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div>
                                <label>Company name</label>
                                <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company Inc" />
                            </div>
                            <div>
                                <label>Industry</label>
                                <input type="text" name="industry" value={form.industry} onChange={handleChange} placeholder="Sales" />
                            </div>
                        </div>

                        <div>
                            <label>How can we help?*</label>
                            <textarea
                                name="comment"
                                value={form.comment}
                                onChange={handleChange}
                                placeholder="Tell us why you're reaching out"
                                maxLength={300}
                            />
                            <div className="character-limit">Max 300 characters</div>
                        </div>

                        <button type="submit" onClick={handleSubmit}>Submit →</button>

                        <div className="terms-text">
                            By clicking submit, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Form;