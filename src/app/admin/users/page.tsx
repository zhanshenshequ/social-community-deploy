"use client";
import { useState } from "react";
import {
  Users,
  Search,
  Shield,
  Crown,
  Ban,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  ChevronDown,
  Filter,
  Download,
  UserPlus,
  Star,
  AlertTriangle,
} from "lucide-react";

const MOCK_USERS = [
  { id: "u1", name: "CryptoVader", email: "vader@eth.com", avatar: null, role: "vip", status: "active", joinDate: "2024-01-15", posts: 234, followers: 5420, income: "¥3,200", lastActive: "刚刚" },
  { id: "u2", name: "DeFiHunter", email: "hunter@btc.io", avatar: null, role: "vip", status: "active", joinDate: "2024-02-03", posts: 189, followers: 3210, income: "¥1,850", lastActive: "5分钟前" },
  { id: "u3", name: "BlockchainDev", email: "dev@web3.com", avatar: null, role: "admin", status: "active", joinDate: "2024-01-10", posts: 56, followers: 890, income: "¥0", lastActive: "1小时前" },
  { id: "u4", name: "Newbie_2024", email: "newbie@x.com", avatar: null, role: "user", status: "active", joinDate: "2024-06-01", posts: 3, followers: 12, income: "¥0", lastActive: "刚刚" },
  { id: "u5", name: "SpamBot999", email: "spam@x.com", avatar: null, role: "user", status: "flagged", joinDate: "2024-05-20", posts: 47, followers: 2, income: "¥0", lastActive: "昨天" },
  { id: "u6", name: "MemeQueen", email: "queen@meme.io", avatar: null, role: "vip", status: "active", joinDate: "2024-03-12", posts: 412, followers: 12000, income: "¥8,500", lastActive: "10分钟前" },
  { id: "u7", name: "QuietReader", email: "reader@x.com", avatar: null, role: "user", status: "banned", joinDate: "2024-04-05", posts: 1, followers: 0, income: "¥0", lastActive: "3天前" },
];

const ROLE_COLORS: Record<string, { color: string; bg: string; label: string }> = {
  admin: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", label: "管理员" },
  vip: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", label: "VIP" },
  user: { color: "#10b981", bg: "rgba(16,185,129,0.1)", label: "普通" },
};

const STATUS_COLORS: Record<string, { color: string; bg: string; label: string }> = {
  active: { color: "#10b981", bg: "rgba(16,185,129,0.1)", label: "正常" },
  flagged: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", label: "可疑" },
  banned: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", label: "封禁" },
};

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = MOCK_USERS.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 16 }}>用户管理</h2>

      {/* Search + Filters */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索用户名或邮箱..."
              style={{
                width: "100%",
                padding: "9px 12px 9px 36px",
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                fontSize: 13,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button style={{ padding: "9px 12px", borderRadius: 10, background: "#7c3aed", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
            <UserPlus size={14} /> 添加
          </button>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} style={{ flex: 1, padding: "7px 10px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12, color: "#666", outline: "none" }}>
            <option value="all">全部角色</option>
            <option value="admin">管理员</option>
            <option value="vip">VIP</option>
            <option value="user">普通用户</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ flex: 1, padding: "7px 10px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12, color: "#666", outline: "none" }}>
            <option value="all">全部状态</option>
            <option value="active">正常</option>
            <option value="flagged">可疑</option>
            <option value="banned">封禁</option>
          </select>
          <button style={{ padding: "7px 10px", borderRadius: 8, background: "#f5f5f5", border: "1px solid #e5e7eb", cursor: "pointer", fontSize: 12, color: "#666", display: "flex", alignItems: "center", gap: 4 }}>
            <Download size={12} /> 导出
          </button>
        </div>
      </div>

      {/* User List */}
      <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        {filtered.map((user, i) => (
          <div key={user.id} style={{ padding: "14px 16px", borderBottom: i < filtered.length - 1 ? "1px solid #f5f5f5" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                {user.name[0].toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{user.name}</span>
                  <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, background: ROLE_COLORS[user.role].bg, color: ROLE_COLORS[user.role].color }}>
                    {ROLE_COLORS[user.role].label}
                  </span>
                  <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, background: STATUS_COLORS[user.status].bg, color: STATUS_COLORS[user.status].color }}>
                    {STATUS_COLORS[user.status].label}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: "#bbb" }}>{user.email} · {user.lastActive}活跃</div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <button title="查看" style={{ padding: 6, borderRadius: 8, background: "#f5f5f5", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <Eye size={13} style={{ color: "#888" }} />
                </button>
                {user.status !== "banned" ? (
                  <button title="封禁" style={{ padding: 6, borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                    <Ban size={13} style={{ color: "#ef4444" }} />
                  </button>
                ) : (
                  <button title="解封" style={{ padding: 6, borderRadius: 8, background: "rgba(16,185,129,0.08)", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                    <CheckCircle size={13} style={{ color: "#10b981" }} />
                  </button>
                )}
                <button title="删除" style={{ padding: 6, borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <Trash2 size={13} style={{ color: "#ef4444" }} />
                </button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 8, paddingLeft: 52 }}>
              <span style={{ fontSize: 11, color: "#bbb" }}>帖子 {user.posts}</span>
              <span style={{ fontSize: 11, color: "#bbb" }}>粉丝 {user.followers.toLocaleString()}</span>
              <span style={{ fontSize: 11, color: "#f59e0b" }}>收入 {user.income}</span>
              <span style={{ fontSize: 11, color: "#bbb" }}>注册 {user.joinDate}</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: "40px 16px", textAlign: "center", color: "#bbb", fontSize: 13 }}>没有找到匹配的用户</div>
        )}
      </div>
    </div>
  );
}
