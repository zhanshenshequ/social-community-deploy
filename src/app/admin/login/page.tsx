"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Shield, LogIn, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setLoading(true);
    setError("");

    try {
      const resp = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await resp.json();

      if (!resp.ok || !data.success) {
        setError(data.error || "登录失败");
        setLoading(false);
        return;
      }

      // Store admin session
      sessionStorage.setItem("admin_token", data.token);
      sessionStorage.setItem("admin_user", JSON.stringify(data.user));
      
      router.push("/admin");
      router.refresh();
    } catch {
      setError("网络错误，请重试");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      padding: 20,
      maxWidth: 480,
      margin: "0 auto",
    }}>
      {/* Background decoration */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-20%", width: 400, height: 400, borderRadius: "50%", background: "rgba(239,68,68,0.08)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-15%", left: "-20%", width: 350, height: 350, borderRadius: "50%", background: "rgba(124,58,237,0.06)", filter: "blur(80px)" }} />
      </div>

      <div style={{ width: "100%", maxWidth: 360, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 8px 32px rgba(239,68,68,0.3)",
          }}>
            <Shield size={32} color="#fff" />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 0 6px" }}>后台管理</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: 0 }}>钻石手游社区 · 管理员入口</p>
        </div>

        {/* Login Card */}
        <div style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: 20,
          padding: 28,
          boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
        }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {error && (
              <div style={{
                padding: "10px 14px",
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 10,
                color: "#ef4444",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            {/* Username */}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                用户名
              </label>
              <div style={{ position: "relative" }}>
                <Shield size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
                <input
                  type="text"
                  placeholder="请输入管理员用户名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "11px 12px 11px 38px",
                    borderRadius: 10,
                    border: "1px solid #e5e7eb",
                    background: "#f9fafb",
                    color: "#1a1a2e",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#ef4444"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                密码
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
                <input
                  type={showPwd ? "text" : "password"}
                  placeholder="请输入管理员密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "11px 38px 11px 38px",
                    borderRadius: 10,
                    border: "1px solid #e5e7eb",
                    background: "#f9fafb",
                    color: "#1a1a2e",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#ef4444"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9ca3af",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 12,
                background: loading ? "#999" : "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "#fff",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: 15,
                fontWeight: 700,
                opacity: loading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 4,
              }}
            >
              <LogIn size={16} />
              {loading ? "验证中..." : "进入后台"}
            </button>
          </form>

          {/* Hint */}
          <div style={{
            marginTop: 18,
            padding: "12px",
            background: "rgba(124,58,237,0.05)",
            borderRadius: 10,
            textAlign: "center",
          }}>
            <p style={{ fontSize: 11, color: "#999", margin: 0 }}>
              默认账号：<span style={{ fontWeight: 700, color: "#333" }}>admin</span> / 
              密码：<span style={{ fontWeight: 700, color: "#333" }}>admin123</span>
            </p>
            <p style={{ fontSize: 10, color: "#bbb", margin: "4px 0 0" }}>⚠️ 请上线后立即修改默认密码</p>
          </div>
        </div>

        {/* Back link */}
        <div
          onClick={() => router.push("/")}
          style={{
            textAlign: "center",
            marginTop: 24,
            color: "rgba(255,255,255,0.4)",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          ← 返回首页
        </div>
      </div>
    </div>
  );
}
