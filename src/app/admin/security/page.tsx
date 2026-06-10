"use client";
import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Eye,
  Ban,
  RefreshCw,
  Download,
  Smartphone,
  Mail,
  Key,
  XCircle,
  Info,
  Activity,
} from "lucide-react";

const LOGIN_LOGS = [
  { id: "l1", user: "CryptoVader", action: "登录成功", ip: "103.45.67.xx", location: "上海市", device: "Chrome/Mac", time: "2分钟前", status: "success" },
  { id: "l2", user: "DeFiHunter", action: "登录成功", ip: "112.45.89.xx", location: "北京市", device: "Safari/iPhone", time: "15分钟前", status: "success" },
  { id: "l3", user: "SpamBot999", action: "登录失败（密码错误）", ip: "185.23.45.xx", location: "境外", device: "Unknown", time: "1小时前", status: "failed" },
  { id: "l4", user: "Newbie_2024", action: "注册", ip: "36.45.67.xx", location: "广州市", device: "Chrome/Win10", time: "2小时前", status: "success" },
  { id: "l5", user: "Unknown", action: "暴力破解尝试", ip: "198.51.100.xx", location: "境外", device: "脚本", time: "3小时前", status: "blocked" },
  { id: "l6", user: "MemeQueen", action: "修改密码", ip: "58.45.67.xx", location: "深圳市", device: "Chrome/Mac", time: "5小时前", status: "success" },
  { id: "l7", user: "QuietReader", action: "登录失败（账号封禁）", ip: "91.45.67.xx", location: "杭州市", device: "Firefox/Win11", time: "1天前", status: "blocked" },
];

const BLOCKED_IPS = [
  { ip: "185.23.45.xx", reason: "多次登录失败", blockedAt: "2024-06-10 14:00", expires: "永久" },
  { ip: "198.51.100.xx", reason: "暴力破解检测", blockedAt: "2024-06-10 12:00", expires: "永久" },
  { ip: "203.0.113.xx", reason: "垃圾信息发送源", blockedAt: "2024-06-08 09:00", expires: "7天后" },
];

const ALERTS = [
  { id: "a1", type: "warning", message: "检测到境外IP频繁登录失败，建议启用IP限制", time: "1小时前", read: false },
  { id: "a2", type: "info", message: "系统安全扫描完成，未发现漏洞", time: "6小时前", read: false },
  { id: "a3", type: "success", message: "SSL证书自动续期成功", time: "2天前", read: true },
];

export default function AdminSecurity() {
  const [tab, setTab] = useState<"logs" | "blocked" | "alerts">("logs");

  const STATUS_STYLE: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
    success: { color: "#10b981", bg: "rgba(16,185,129,0.1)", icon: <CheckCircle size={13} /> },
    failed: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: <AlertTriangle size={13} /> },
    blocked: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: <Ban size={13} /> },
  };

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 16 }}>安全中心</h2>

      {/* Security Score */}
      <div style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", borderRadius: 18, padding: "20px 16px", marginBottom: 14, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>安全评分</div>
            <div style={{ fontSize: 36, fontWeight: 900 }}>87<span style={{ fontSize: 18, opacity: 0.7 }}>/100</span></div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["🔐", "🛡️", "📱"].map((e, i) => (
              <div key={i} style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                {e}
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>建议：启用双因素认证进一步提升账号安全</div>
        <div style={{ height: 6, background: "rgba(255,255,255,0.2)", borderRadius: 99 }}>
          <div style={{ height: "100%", width: "87%", background: "#fff", borderRadius: 99 }} />
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {[
          { label: "登录记录", value: LOGIN_LOGS.length, icon: <Clock size={16} />, color: "#7c3aed" },
          { label: "封禁IP", value: BLOCKED_IPS.length, icon: <Ban size={16} />, color: "#ef4444" },
          { label: "安全警报", value: ALERTS.filter((a) => !a.read).length, icon: <AlertTriangle size={16} />, color: "#f59e0b" },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "#fff", borderRadius: 14, padding: "14px 12px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div style={{ color: stat.color, marginBottom: 6, display: "flex", justifyContent: "center" }}>{stat.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e" }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {([["logs", "登录日志"], ["blocked", "IP封禁"], ["alerts", "安全警报"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: "7px 14px",
              borderRadius: 99,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              background: tab === key ? "#7c3aed" : "#fff",
              color: tab === key ? "#fff" : "#666",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            {label}
            {key === "alerts" && ALERTS.filter((a) => !a.read).length > 0 && (
              <span style={{ marginLeft: 4, background: "#ef4444", color: "#fff", borderRadius: 99, padding: "0 5px", fontSize: 10 }}>
                {ALERTS.filter((a) => !a.read).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Login Logs */}
      {tab === "logs" && (
        <div>
          {LOGIN_LOGS.map((log, i) => {
            const s = STATUS_STYLE[log.status];
            return (
              <div key={log.id} style={{ background: "#fff", borderRadius: 14, padding: "12px 14px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{log.user}</span>
                    <span style={{ fontSize: 11, color: "#888" }}>{log.action}</span>
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, color: "#bbb", display: "flex", alignItems: "center", gap: 3 }}><MapPin size={10} /> {log.location}</span>
                    <span style={{ fontSize: 11, color: "#bbb", display: "flex", alignItems: "center", gap: 3 }}><Smartphone size={10} /> {log.device}</span>
                    <span style={{ fontSize: 11, color: "#bbb", display: "flex", alignItems: "center", gap: 3 }}><Clock size={10} /> {log.time}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#ccc", marginTop: 2 }}>IP: {log.ip}</div>
                </div>
                {log.status === "failed" || log.status === "blocked" ? (
                  <button style={{ padding: "5px 8px", borderRadius: 7, background: "rgba(239,68,68,0.08)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, color: "#ef4444", display: "flex", alignItems: "center", gap: 3 }}>
                    <Ban size={11} /> 封禁
                  </button>
                ) : (
                  <button style={{ padding: "5px 8px", borderRadius: 7, background: "#f5f5f5", border: "none", cursor: "pointer", fontSize: 11, color: "#888", display: "flex", alignItems: "center", gap: 3 }}>
                    <Eye size={11} /> 详情
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Blocked IPs */}
      {tab === "blocked" && (
        <div>
          {BLOCKED_IPS.map((item, i) => (
            <div key={item.ip} style={{ background: "#fff", borderRadius: 14, padding: "12px 14px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Ban size={16} style={{ color: "#ef4444" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", fontFamily: "monospace" }}>{item.ip}</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{item.reason} · {item.blockedAt} · 有效期: {item.expires}</div>
              </div>
              <button style={{ padding: "6px 10px", borderRadius: 8, background: "#f5f5f5", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#666", display: "flex", alignItems: "center", gap: 4 }}>
                <RefreshCw size={12} /> 解封
              </button>
            </div>
          ))}
          <button style={{ width: "100%", padding: "10px", borderRadius: 12, background: "rgba(239,68,68,0.06)", border: "1px dashed rgba(239,68,68,0.3)", cursor: "pointer", fontSize: 13, color: "#ef4444", fontWeight: 600 }}>
            + 添加IP到封禁列表
          </button>
        </div>
      )}

      {/* Alerts */}
      {tab === "alerts" && (
        <div>
          {ALERTS.map((alert, i) => {
            const defaultColor = { color: "#999", bg: "rgba(153,153,153,0.1)", icon: <Info size={16} /> };
            const colors = {
              warning: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: <AlertTriangle size={16} /> },
              info: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", icon: <Info size={16} /> },
              success: { color: "#10b981", bg: "rgba(16,185,129,0.1)", icon: <CheckCircle size={16} /> },
            }[alert.type] ?? defaultColor;
            return (
              <div key={alert.id} style={{ background: "#fff", borderRadius: 14, padding: "14px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", marginBottom: 8, display: "flex", gap: 10, opacity: alert.read ? 0.7 : 1 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", color: colors.color, flexShrink: 0 }}>
                  {colors.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "#333", marginBottom: 4, lineHeight: 1.5 }}>{alert.message}</div>
                  <div style={{ fontSize: 11, color: "#bbb" }}>{alert.time}</div>
                </div>
                {!alert.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", flexShrink: 0, marginTop: 5 }} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
