import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const { showToast } = useApp();

  const up = (f) => (e) =>
    setForm((p) => ({ ...p, [f]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    showToast("Message sent! We'll reply within 24 hours.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-primary font-700 text-sm uppercase tracking-widest mb-1">Get in touch</p>
        <h1 className="font-display text-4xl text-charcoal">Contact Us</h1>
        <p className="text-muted-fg mt-3 max-w-md mx-auto">
          Have a question, feedback, or need help with your order? We're here 24/7.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Form */}
        <div className="lg:col-span-2 bg-card border border-border-custom rounded-2xl p-8">
          <form onSubmit={submit} className="grid sm:grid-cols-2 gap-5">
            {[["name", "Full Name", "text", "Alex Johnson"], ["email", "Email", "email", "you@email.com"], ["phone", "Phone", "tel", "+1 555 000 0000"]].map(([field, label, type, placeholder]) => (
              <div key={field}>
                <label className="text-xs font-700 text-muted-fg uppercase tracking-wide block mb-1.5">{label}</label>
                <input
                  type={type}
                  value={form[field]}
                  onChange={up(field)}
                  placeholder={placeholder}
                  className="w-full border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="text-xs font-700 text-muted-fg uppercase tracking-wide block mb-1.5">Subject</label>
              <select
                value={form.subject}
                onChange={up("subject")}
                className="w-full border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-white"
              >
                <option value="">Select a subject...</option>
                <option>Order Issue</option>
                <option>Delivery Problem</option>
                <option>Payment Question</option>
                <option>Account Help</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-700 text-muted-fg uppercase tracking-wide block mb-1.5">Message</label>
              <textarea
                value={form.message}
                onChange={up("message")}
                placeholder="Tell us how we can help..."
                rows={5}
                className="w-full border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-700 py-4 rounded-xl transition-colors"
              >
                Send Message →
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-5">
          {[
            { label: "Phone", value: "+1 (555) 123-4567", note: "Mon–Fri, 9AM–6PM EST" },
            { label: "Email", value: "hello@foodi.com", note: "Response within 24 hours" },
            { label: "Address", value: "350 Fifth Avenue, Suite 4000", note: "New York, NY 10118" },
            { label: "Business Hours", value: "24/7 Online Support", note: "Office: Mon–Fri 9AM–6PM" },
          ].map((item) => (
            <div key={item.label} className="bg-card border border-border-custom rounded-2xl p-5 flex gap-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-700 text-charcoal text-sm">{item.label}</p>
                <p className="text-stone text-sm">{item.value}</p>
                <p className="text-xs text-muted-fg">{item.note}</p>
              </div>
            </div>
          ))}

          {/* Map placeholder */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-border-custom rounded-2xl h-40 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl mb-1">🗺️</p>
              <p className="text-sm font-700 text-stone">View on Maps</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}