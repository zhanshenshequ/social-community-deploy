"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import {
  BarChart3,
  Users,
  FileText,
  Bell,
  Settings,
  Shield,
  ChevronLeft,
  Home,
  Compass,
  PlusSquare,
  CircleDot,
  MessageCircle,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "数据统计", icon: BarChart3, badge: null },
  { href: "/admin/users", label: "用户管理", icon: Users, badge: null },
  { href: "/admin/content", label: "内容管理", icon: FileText, badge: 0 },
  { href: "/admin/notifications", label: "通知管理", icon: Bell, badge: null },
  { href: "/admin/settings", label: "系统设置", icon: Settings, badge: null },
  { href: "/admin/security", label: "安全中心", icon: Shield, badge: 0 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<{ username: string; role: string } | null>(null);

  // Check auth on mount
  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    const userStr = sessionStorage.getItem("admin_user");
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    if (userStr) {
      try { setAdminUser(JSON.parse(userStr)); } catch {}
    }
    setIsAuthed(true);
  }, [router]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isAuthed === false && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [isAuthed, pathname, router]);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_user");
    router.replace("/admin/login");
  }, [router]);

  // Show nothing while checking auth (prevents flash)
  if (isAuthed === null || isAuthed === false) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", maxWidth: 480, margin: "0 auto", position: "relative" }}>
      {/* ===== Top Bar ===== */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 16px 10px",
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 60,
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div onClick={() => router.push("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#666" }}>
          <ChevronLeft size={22} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
          <Shield size={22} style={{ color: "#ef4444" }} />
          <h1 style={{ fontSize: 20, fontWeight: 900, color: "#1a1a2e" }}>后台管理</h1>
        </div>
        {/* Admin user info + logout */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: "#999" }}>{adminUser?.username || "Admin"}</span>
          <button
            onClick={handleLogout}
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "none",
              borderRadius: 8,
              padding: "5px 10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              color: "#ef4444",
              fontWeight: 600,
            }}
          >
            <LogOut size={13} />
            退出
          </button>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            marginLeft: 4,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            color: "#666",
          }}
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ===== Sidebar Nav ===== */}
      <div
        style={{
          position: "fixed",
          top: 56,
          left: "50%",
          transform: `translateX(-50%) translateX(${sidebarOpen ? "0" : "-110%"})`,
          width: "100%",
          maxWidth: 480,
          background: "#fff",
          borderRadius: "0 0 16px 16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          zIndex: 55,
          transition: "transform 0.3s ease",
          padding: "8px 0 16px",
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <div
              key={item.href}
              onClick={() => {
                router.push(item.href);
                setSidebarOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 20px",
                cursor: "pointer",
                background: active ? "rgba(239,68,68,0.06)" : "transparent",
                borderLeft: active ? "3px solid #ef4444" : "3px solid transparent",
                color: active ? "#ef4444" : "#444",
                fontWeight: active ? 700 : 500,
                fontSize: 15,
              }}
            >
              <item.icon size={18} style={{ color: active ? "#ef4444" : "#888" }} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge !== null && item.badge > 0 && (
                <span
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    borderRadius: 99,
                    padding: "1px 7px",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 54 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== Page Content ===== */}
      <div style={{ padding: "16px 16px 100px" }}>{children}</div>

      {/* ===== Bottom Tab Bar ===== */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 480,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(0,0,0,0.05)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "8px 0 20px",
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer", minWidth: 52, padding: "4px 0" }} onClick={() => router.push("/")}>
          <Home size={24} color="#999" strokeWidth={1.8} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer", minWidth: 52, padding: "4px 0" }} onClick={() => router.push("/hub")}>
          <Compass size={24} color="#999" strokeWidth={1.8} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer", minWidth: 52, padding: "4px 0" }} onClick={() => alert("发布功能开发中")}>
          <PlusSquare size={24} color="#999" strokeWidth={1.8} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer", minWidth: 52, padding: "4px 0" }} onClick={() => router.push("/leaderboard")}>
          <CircleDot size={24} color="#999" strokeWidth={1.8} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer", minWidth: 52, padding: "4px 0" }} onClick={() => alert("消息功能开发中")}>
          <MessageCircle size={24} color="#999" strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}
