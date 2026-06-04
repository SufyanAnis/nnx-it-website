"use client";

import { useState } from "react";

export default function ContactForm() {
  const [note, setNote] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") || "there").toString().split(" ")[0];
    setNote(`Thanks, ${name}! Your message is ready — we'll reply within 1 business day.`);
    e.currentTarget.reset();
    setTimeout(() => setNote(""), 6000);
  };

  return (
    <form className="contact-form glass" data-tilt onSubmit={onSubmit}>
      <div className="field">
        <input type="text" id="name" name="name" required placeholder=" " />
        <label htmlFor="name">Your name</label>
      </div>
      <div className="field">
        <input type="email" id="email" name="email" required placeholder=" " />
        <label htmlFor="email">Email address</label>
      </div>
      <div className="field">
        <select id="service" name="service" defaultValue="Software Testing">
          <option>Software Testing</option>
          <option>Project Management</option>
          <option>Business Analysis</option>
          <option>Data Management &amp; Analytics</option>
          <option>Training Courses</option>
        </select>
        <label htmlFor="service" className="static-label">
          Interested in
        </label>
      </div>
      <div className="field">
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder=" "
        />
        <label htmlFor="message">Tell us about your project</label>
      </div>
      <button type="submit" className="btn btn-primary full" data-magnetic>
        <span>Send message</span>
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <p className="form-note">{note}</p>
    </form>
  );
}
