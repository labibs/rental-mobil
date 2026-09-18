"use client";

import { Car, LockKeyhole, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.message || "Email atau password salah.");
      }

      window.location.href = "/admin";
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Login gagal. Coba lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="admin-login-shell">
      <section className="admin-login-card">
        <div className="admin-login-brand">
          <span>
            <Car size={22} />
          </span>
          Mitra.Mobil
        </div>
        <p className="admin-login-eyebrow">Area terbatas</p>
        <h1>Masuk ke Admin Panel</h1>
        <p className="admin-login-description">
          Kelola booking, armada, pelanggan, dan operasional rental mobil.
        </p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <label>
            Email admin
            <span className="admin-input">
              <Mail size={17} />
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@autohunt.local"
              />
            </span>
          </label>
          <label>
            Password
            <span className="admin-input">
              <LockKeyhole size={17} />
              <input
                required
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Masukkan password"
              />
            </span>
          </label>
          {error && <p className="admin-login-error">{error}</p>}
          <button
            type="submit"
            className="primary-admin-button admin-login-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Memeriksa..." : "Masuk ke Dashboard"}
          </button>
        </form>

        <p className="admin-login-hint">
          Gunakan kredensial pada environment <code>ADMIN_EMAIL</code> dan{" "}
          <code>ADMIN_PASSWORD</code>.
        </p>
      </section>
    </main>
  );
}
