import { useState } from "react";
import { Link, useNavigate } from "react-router";

function AuthWrapper({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl">🍽️</span>
            <span className="font-display text-2xl text-charcoal">Foodi<span className="text-primary">·</span></span>
          </Link>
          <h1 className="font-display text-3xl text-charcoal">{title}</h1>
          <p className="text-muted-fg mt-2">{subtitle}</p>
        </div>
        <div className="bg-card border border-border-custom rounded-2xl p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

function Input({ label, type = "text", placeholder, value, onChange }) {
  const [show, setShow] = useState(false);
  const isPass = type === "password";
  return (
    <div>
      <label className="text-xs font-700 text-muted-fg uppercase tracking-wide block mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={isPass && show ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors pr-10"
        />
        {isPass && (
          <button type="button" onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-fg hover:text-charcoal">
            {show ? "🙈" : "👁"}
          </button>
        )}
      </div>
    </div>
  );
}

export function LoginPage() {
  const [email, setEmail] = useState("alex@email.com");
  const [password, setPassword] = useState("password123");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  return (
    <AuthWrapper title="Welcome back" subtitle="Sign in to your Foodi account">
      <form onSubmit={(e) => { e.preventDefault(); navigate("/"); }} className="space-y-4">
        <Input label="Email" type="email" placeholder="you@email.com" value={email} onChange={setEmail} />
        <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={setPassword} />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-primary" />
            <span className="text-stone">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-primary hover:underline font-600">Forgot password?</Link>
        </div>

        <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-700 py-3.5 rounded-xl transition-colors mt-2">
          Sign In
        </button>

        <div className="relative flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-border-custom" />
          <span className="text-xs text-muted-fg">or continue with</span>
          <div className="flex-1 h-px bg-border-custom" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[["🔵 Google", "Continue with Google"], ["🔷 Facebook", "Continue with Facebook"]].map(([icon, label]) => (
            <button key={label} type="button"
              className="border border-border-custom rounded-xl py-3 text-sm font-700 text-stone hover:bg-muted transition-colors flex items-center justify-center gap-2">
              <span>{icon.split(" ")[0]}</span>
              <span className="hidden sm:block">{icon.split(" ")[1]}</span>
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-muted-fg mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-700 hover:underline">Sign up free</Link>
        </p>
      </form>
    </AuthWrapper>
  );
}

export function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const up = (f) => (v) => setForm((p) => ({ ...p, [f]: v }));

  return (
    <AuthWrapper title="Create account" subtitle="Join thousands of happy food lovers">
      <form onSubmit={(e) => { e.preventDefault(); navigate("/"); }} className="space-y-4">
        <Input label="Full Name" placeholder="Alex Johnson" value={form.name} onChange={up("name")} />
        <Input label="Email" type="email" placeholder="you@email.com" value={form.email} onChange={up("email")} />
        <Input label="Phone" type="tel" placeholder="+1 555 000 0000" value={form.phone} onChange={up("phone")} />
        <Input label="Password" type="password" placeholder="At least 8 characters" value={form.password} onChange={up("password")} />
        <Input label="Confirm Password" type="password" placeholder="Repeat your password" value={form.confirm} onChange={up("confirm")} />

        <label className="flex items-start gap-2 cursor-pointer text-sm">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="accent-primary mt-0.5" />
          <span className="text-stone">I agree to the{" "}
            <a href="#" className="text-primary hover:underline">Terms of Service</a> and{" "}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </span>
        </label>

        <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-700 py-3.5 rounded-xl transition-colors">
          Create Account
        </button>

        <div className="relative flex items-center gap-3">
          <div className="flex-1 h-px bg-border-custom" />
          <span className="text-xs text-muted-fg">or</span>
          <div className="flex-1 h-px bg-border-custom" />
        </div>

        <button type="button" className="w-full border border-border-custom rounded-xl py-3 text-sm font-700 text-stone hover:bg-muted transition-colors flex items-center justify-center gap-2">
          🔵 Continue with Google
        </button>

        <p className="text-center text-sm text-muted-fg">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-700 hover:underline">Sign in</Link>
        </p>
      </form>
    </AuthWrapper>
  );
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AuthWrapper
      title={sent ? "Check your email" : "Reset password"}
      subtitle={sent ? `We sent a reset link to ${email}` : "Enter your email to receive a reset link"}
    >
      {sent ? (
        <div className="text-center">
          <div className="text-6xl mb-4">📬</div>
          <p className="text-sm text-muted-fg mb-6">Didn't receive it? Check your spam folder or request a new link.</p>
          <button onClick={() => setSent(false)} className="text-primary font-700 hover:underline text-sm">
            Resend email
          </button>
          <div className="mt-4">
            <Link to="/login" className="text-muted-fg hover:text-primary text-sm font-600">← Back to Sign In</Link>
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
          <Input label="Email" type="email" placeholder="you@email.com" value={email} onChange={setEmail} />
          <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-700 py-3.5 rounded-xl transition-colors">
            Send Reset Link
          </button>
          <p className="text-center">
            <Link to="/login" className="text-muted-fg hover:text-primary text-sm font-600">← Back to Sign In</Link>
          </p>
        </form>
      )}
    </AuthWrapper>
  );
}