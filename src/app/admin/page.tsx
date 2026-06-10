"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  FileText,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  TrendingUp,
  Clock,
  MessageSquare,
  ThumbsUp,
  Share2,
  Eye,
  Crown,
  ShieldAlert,
} from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  monthlyRevenue: number;
  dailyActive: number;
  vipCount: number;
  newPostsThisWeek: number;
  pendingReports: number;
}

interface RecentUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string | null;
  role: string;
  joinDate: string;
  posts: number;
  followers: number;
  lastActive?: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState<"week" | "month" | "year">("week");
  const router = useRouter();

  const fetchDashboard = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const token = sessionStorage.getItem("admin_token");
      const resp = await fetch("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      setStats(data.stats);
      setRecentUsers(data.recentUsers || []);
      setError("");
    } catch {
      setError("数据加载失败，请刷新重试");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  // Format number with commas
  const fmt = (n: number) => n.toLocaleString();
  const fmtYuan = (n: number) => `¥${fmt(Math.round(n))}`;

  const statCards = stats ? [
    { label: "总用户", value: fmt(stats.totalUsers), change: "+0", icon: Users, color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
    { label: "总帖子", value: fmt(stats.totalPosts), change: "+0", icon: FileText, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    { label: "月收入", value: fmtYuan(stats.monthlyRevenue), change: "+0%", icon: DollarSign, color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    { label: "日活跃", value: fmt(stats.dailyActive), change: "+0%", icon: Activity, color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  ] : [];

  return (
    <div>
      {/* Page Title */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>数据统计</h2>
          <p style={{ fontSize: 12, color: "#999", margin: "4px 0 0" }}>
            {stats && !error ? "实时数据 · 刚刚更新" : loading ? "加载中..." : "数据异常"}
          </p>
        </div>
        <button
          onClick={() => fetchDashboard(true)}
          disabled={refreshing}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            borderRadius: 10,
            background: "#fff",
            border: "1px solid #e5e7eb",
            cursor: refreshing ? "not-allowed" : "pointer",
            fontSize: 13,
            fontWeight: 500,
            color: "#666",
          }}
        >
          <RefreshCw size={13} style={{ opacity: refreshing ? 1 : 0.6 }} />
          {refreshing ? "刷新中..." : "刷新"}
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div style={{
          padding: "12px 16px",
          background: "rgba(239,68,68,0.06)",
          border: "1px solid rgba(239,68,68,0.15)",
          borderRadius: 12,
          color: "#ef4444",
          fontSize: 13,
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <ShieldAlert size={16} />
          {error}
          <span style={{
            marginLeft: "auto",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: 12,
          }}
          onClick={() => fetchDashboard()}
          >
            重试
          </span>
        </div>
      )}

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {statCards.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "16px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: "#999" }}>{stat.label}</span>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <stat.icon size={14} style={{ color: stat.color }} />
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>{stat.value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <ArrowUpRight size={13} style={{ color: "#10b981" }} />
              <span style={{ fontSize: 12, color: "#10b981", fontWeight: 600 }}>{stat.change}</span>
              <span style={{ fontSize: 11, color: "#bbb" }}>较上期</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Row */}
      {stats && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
          {[
            { label: "VIP 用户", value: fmt(stats.vipCount), icon: Crown, color: "#f59e0b" },
            { label: "本周新帖", value: fmt(stats.newPostsThisWeek), icon: FileText, color: "#10b981" },
            { label: "待处理举报", value: fmt(stats.pendingReports), icon: MessageSquare, color: stats.pendingReports > 0 ? "#ef4444" : "#999" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "#fff",
              borderRadius: 12,
              padding: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${s.color}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <s.icon size={15} style={{ color: s.color }} />
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#1a1a2e" }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "#bbb" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Users */}
      <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", marginBottom: 16 }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={16} style={{ color: "#7c3aed" }} />
            <span style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>最近注册</span>
          </div>
          <span
            onClick={() => router.push("/admin/users")}
            style={{ fontSize: 11, color: "#7c3aed", cursor: "pointer", fontWeight: 600 }}
          >
            查看全部 →
          </span>
        </div>

        {loading ? (
          <div style={{ padding: "30px 16px", textAlign: "center", color: "#bbb", fontSize: 13 }}>
            加载中...
          </div>
        ) : recentUsers.length === 0 ? (
          <div style={{ padding: "40px 16px", textAlign: "center" }}>
            <Users size={40} style={{ color: "#ddd", marginBottom: 8 }} />
            <p style={{ color: "#bbb", fontSize: 13, margin: 0 }}>暂无用户数据</p>
            <p style={{ color: "#ddd", fontSize: 11, marginTop: 4 }}>数据库连接正常但还没有注册用户</p>
          </div>
        ) : (
          recentUsers.map((user, i) => (
            <div key={user.id} style={{ padding: "12px 16px", borderBottom: i < recentUsers.length - 1 ? "1px solid #f5f5f5" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: user.avatar ? `url(${user.avatar})` : "linear-gradient(135deg, #7c3aed, #ec4899)",
                  backgroundSize: "cover",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 800, fontSize: 14, flexShrink: 0,
                }}>
                  {!user.avatar && (user.name || user.username || "?")[0].toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{user.name || user.username}</span>
                    <span style={{
                      padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700,
                      background: user.role === "admin" ? "rgba(239,68,68,0.1)" :
                                 user.role === "moderator" ? "rgba(245,158,11,0.1)" : "rgba(16,185,129,0.1)",
                      color: user.role === "admin" ? "#ef4444" :
                             user.role === "moderator" ? "#f59e0b" : "#10b981",
                    }}>
                      {user.role === "admin" ? "管理员" : user.role === "moderator" ? "版主" : "用户"}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: "#bbb" }}>{user.email} · 注册于 {user.joinDate}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>{user.posts} 帖子</div>
                  <div style={{ fontSize: 10, color: "#bbb" }}>{user.followers} 粉丝</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* System Info */}
      <div style={{
        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
        borderRadius: 12,
        padding: "14px 16px",
        border: "1px solid #e5e7eb",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Clock size={14} style={{ color: "#64748b" }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>系统信息</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 11, color: "#64748b" }}>
          <span>框架：Next.js 16 + TypeScript</span>
          <span>数据库：PostgreSQL (Prisma)</span>
          <span>认证：NextAuth.js + Admin Session</span>
          <span>部署：PM2 + Nginx + SSL</span>
        </div>
      </div>
    </div>
  );
}
