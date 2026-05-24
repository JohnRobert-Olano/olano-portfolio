"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, MapPin, Linkedin, Github } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Contact() {
  const headerReveal = useScrollReveal(0.3);
  const leftReveal = useScrollReveal(0.15);
  const rightReveal = useScrollReveal(0.15);

  const headerVariants = {
    below: { opacity: 0, y: 30, rotateX: 6, transformPerspective: 1000 },
    inside: { opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000 },
    above: { opacity: 0, y: -30, rotateX: -6, transformPerspective: 1000 },
  };

  const panelVariants = {
    below: { opacity: 0, y: 40, rotateX: 8, transformPerspective: 1000, scale: 0.98 },
    inside: { opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000, scale: 1 },
    above: { opacity: 0, y: -40, rotateX: -8, transformPerspective: 1000, scale: 0.98 },
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Collaboration Request",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sendSuccess, setSendSuccess] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Coordinator name is required.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Recipient inbox email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please input a valid email coordinate format.";
      isValid = false;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message context must exceed 10 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Build the mailto: URL with all form fields pre-filled
    const recipient = "jrobertolano@gmail.com";
    const subject = encodeURIComponent(
      `[Portfolio] ${formData.subject} — from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Hi J.R.,\n\nYou have a new message from your portfolio contact form.\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Topic: ${formData.subject}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `---\nSent via portfolio contact form`
    );

    // Create a temporary <a> and click it — works in all browsers / Next.js
    const link = document.createElement("a");
    link.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success state and reset form
    setSendSuccess(true);
    setFormData({
      name: "",
      email: "",
      subject: "Collaboration Request",
      message: "",
    });
  };

  return (
    <section id="contact" className="relative py-24 px-6 lg:px-24 bg-brand-dark border-t border-zinc-900 overflow-hidden scroll-mt-24">
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto w-full z-10 relative">
        
        {/* Header Section */}
        <motion.div
          id="contact-header"
          ref={headerReveal.ref}
          variants={headerVariants}
          animate={headerReveal.position}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 text-brand-orange font-mono text-xs tracking-[0.2em] uppercase font-bold">
            <Mail className="w-4 h-4 text-brand-orange" />
            04 / SECURE COMMUNICATIONS PORTAL
          </div>
          
          <h2 className="font-display text-[45px] md:text-[64px] font-black uppercase tracking-tight leading-none text-white">
            Get In <span className="text-transparent text-outline">Touch.</span>
          </h2>
          <p className="text-zinc-400 font-serif text-base max-w-lg mx-auto italic leading-relaxed">
            Ready to integrate production engineering frameworks or configure specialized edge classification networks? Drop J.R. a correspondence payload below.
          </p>
        </motion.div>

        {/* Contact Layout Grid */}
        <div id="contact-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
          
          {/* Left panel: Info cards */}
          <motion.div
            id="info-left-panel"
            ref={leftReveal.ref}
            variants={panelVariants}
            animate={leftReveal.position}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-4 space-y-6 text-left"
          >
            
            <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-8 space-y-6">
              
              <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">
                Coordinates Tracker
              </h3>

              <div className="space-y-6">
                
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-none flex items-center justify-center text-brand-orange">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-zinc-505 uppercase font-bold tracking-wider">Primary Inbox</p>
                    <a href="mailto:jrobertolano@gmail.com" className="text-sm font-bold text-white hover:text-brand-orange transition-colors">
                      jrobertolano@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-none flex items-center justify-center text-zinc-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-zinc-505 uppercase font-bold tracking-wider">Geographical Base</p>
                    <span className="text-sm text-zinc-300 font-sans font-bold">
                      Imus City, Cavite (Open to Metro Manila)
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Social channels card */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-8 space-y-4">
              <h3 className="font-display font-black text-xs uppercase tracking-wider text-zinc-400">
                Digital Web Channels
              </h3>
              
              <div className="grid grid-cols-1 gap-2 font-mono text-xs">
                
                <a
                  id="link-github-contact"
                  href="https://github.com/JohnRobert-Olano"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between bg-zinc-900 border border-zinc-850 p-4 rounded-none hover:bg-brand-orange hover:text-black hover:border-transparent text-zinc-350 transition-all uppercase font-bold text-[10px] tracking-widest cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    GitHub Index
                  </span>
                  <span>&rarr;</span>
                </a>

                <a
                  id="link-linkedin-contact"
                  href="https://linkedin.com/in/olano"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between bg-zinc-900 border border-zinc-850 p-4 rounded-none hover:bg-brand-orange hover:text-black hover:border-transparent text-zinc-350 transition-all uppercase font-bold text-[10px] tracking-widest cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn Space
                  </span>
                  <span>&rarr;</span>
                </a>

              </div>
            </div>

          </motion.div>

          {/* Right panel: Main interactive form */}
          <motion.div
            id="contact-form-panel"
            ref={rightReveal.ref}
            variants={panelVariants}
            animate={rightReveal.position}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-8"
          >
            <div className="relative bg-zinc-950 border border-zinc-850 rounded-sm p-8 md:p-12 shadow-2xl">
              
              <AnimatePresence mode="wait">
                {!sendSuccess ? (
                  <motion.form
                    id="contact-interactive-form"
                    key="interactive-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-left"
                  >
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Name input */}
                      <div className="space-y-2">
                        <label htmlFor="input-name" className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                          Coordinator Name
                        </label>
                        <input
                          id="input-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name..."
                          className={`w-full text-xs font-mono bg-zinc-900 border rounded-none px-4 py-3.5 text-white focus:outline-none focus:border-brand-orange transition-all ${
                            errors.name ? "border-brand-orange/80 bg-brand-orange/5" : "border-zinc-850"
                          }`}
                        />
                        {errors.name && (
                          <p id="err-name-hint" className="text-[10px] font-mono text-brand-orange font-bold uppercase tracking-wider">{errors.name}</p>
                        )}
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label htmlFor="input-email" className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                          Correspondence Email
                        </label>
                        <input
                          id="input-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com..."
                          className={`w-full text-xs font-mono bg-zinc-900 border rounded-none px-4 py-3.5 text-white focus:outline-none focus:border-brand-orange transition-all ${
                            errors.email ? "border-brand-orange/80 bg-brand-orange/5" : "border-zinc-850"
                          }`}
                        />
                        {errors.email && (
                          <p id="err-email-hint" className="text-[10px] font-mono text-brand-orange font-bold uppercase tracking-wider">{errors.email}</p>
                        )}
                      </div>

                    </div>

                    {/* Subject selection */}
                    <div className="space-y-2">
                      <label htmlFor="select-subject" className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                        Topic Classification
                      </label>
                      <select
                        id="select-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-none px-4 py-3.5 text-white focus:outline-none focus:border-brand-orange transition-all"
                      >
                        <option value="Collaboration Request">Full Stack & UI Collaboration Request</option>
                        <option value="Computer Vision Project">Lightweight Computer Vision / Edge Project</option>
                        <option value="Recruiting Candidate Inquiry">Recruitment Candidate Consultation</option>
                        <option value="Other Inquiries">General Digital Correspondence</option>
                      </select>
                    </div>

                    {/* Content Message */}
                    <div className="space-y-2">
                      <label htmlFor="textarea-message" className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                        Transmission Message Context
                      </label>
                      <textarea
                        id="textarea-message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your request message particulars..."
                        className={`w-full text-xs font-mono bg-zinc-900 border rounded-none p-4 text-white focus:outline-none focus:border-brand-orange transition-all ${
                          errors.message ? "border-brand-orange/80 bg-brand-orange/5" : "border-zinc-850"
                        }`}
                      />
                      {errors.message ? (
                        <p id="err-message-hint" className="text-[10px] font-mono text-brand-orange font-bold uppercase tracking-wider">{errors.message}</p>
                      ) : (
                        <p className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Provide clean context parameters of your project constraints.</p>
                      )}
                    </div>

                    {/* Action submit */}
                    <button
                      id="btn-dispatch-message"
                      type="submit"
                      className="group flex items-center justify-center gap-3 bg-brand-orange text-black font-black text-xs uppercase tracking-[0.2em] w-full py-4 rounded-none transition-all duration-300 hover:bg-red-600 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-black stroke-[3px]" />
                      Open Email Client to Send
                    </button>

                  </motion.form>
                ) : (
                  <motion.div
                    id="contact-success-panel"
                    key="success-panel"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 space-y-6"
                  >
                    
                    <div className="w-14 h-14 bg-emerald-950 border border-emerald-900 rounded-none flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
                      <CheckCircle className="w-6 h-6" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-display font-black text-2xl uppercase tracking-tight text-white">
                        Transmission Complete
                      </h4>
                      <p className="text-zinc-400 font-serif italic text-sm max-w-md mx-auto leading-relaxed">
                        Message Dispatch completed successfully. Thank you for establishing touch, J.R. Olaño will index and return correspondence shortly.
                      </p>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 py-4 px-6 rounded-none max-w-sm mx-auto">
                      <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Emergency Coordinates</p>
                      <a href="mailto:jrobertolano@gmail.com" className="text-sm font-mono font-bold text-brand-orange hover:underline">
                        jrobertolano@gmail.com
                      </a>
                    </div>

                    <button
                      id="btn-send-another"
                      onClick={() => setSendSuccess(false)}
                      className="text-[9px] uppercase font-mono tracking-wider bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 px-5 py-3 rounded-none transition-all cursor-pointer"
                    >
                      Transmit Secondary Coordinates
                    </button>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
