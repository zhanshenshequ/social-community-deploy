"use client";
import { useState } from "react";
import {
  Settings,
  Globe,
  Mail,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Database,
  Key,
  Save,
  CheckCircle,
  DollarSign,
  Users,
  Link,
  Smartphone,
  Search,
  Eye,
  EyeOff,
} from "lucide-react";

const SECTIONS = [
  { key: "general", label: "基本信息", icon: Settings },
  { key: "seo", label: "SEO设置", icon: Globe },
  { key: "email", label: "邮件配置", icon: Mail },
  { key: "payment", label: "支付设置", icon: CreditCard },
  { key: "notification", label: "通知设置", icon: Bell },
  { key: "security", label: "安全设置", icon: Shield },
];

const SETTINGS: Record<string, { key: string; label: string; value: string; desc?: string }[]> = {
  general: [
    { key: "site_name", label: "网站名称", value: "钻石手社区", desc: "显示在导航栏和浏览器标签" },
    { key: "site_desc", label: "网站描述", value: "全球最专业的加密货币社区", desc: "用于SEO和分享卡片" },
    { key: "logo_url", label: "Logo地址", value: "/logo.png", desc: "推荐尺寸 200x60px" },
    { key: "per_page", label: "每页条数", value: "20" },
    { key: "timezone", label: "时区", value: "Asia/Shanghai (GMT+8)" },
  ],
  seo: [
    { key: "meta_title", label: "Meta标题", value: "钻石手社区 - 加密货币投资者家园" },
    { key: "meta_desc", label: "Meta描述", value: "汇聚全球专业交易员，分享投资策略与分析" },
    { key: "og_image", label: "分享图片", value: "https://zuanshishou.com/og.png", desc: "推荐尺寸 1200x630px" },
    { key: "google_analytics", label: "Google Analytics ID", value: "" },
    { key: "baidu_tongji", label: "百度统计Token", value: "" },
  ],
  email: [
    { key: "smtp_host", label: "SMTP服务器", value: "smtp.gmail.com", desc: "邮件发送服务器地址" },
    { key: "smtp_port", label: "SMTP端口", value: "587" },
    { key: "smtp_user", label: "发件邮箱", value: "noreply@zuanshishou.com" },
    { key: "smtp_pass", label: "SMTP密码", value: "••••••••••••", desc: "使用应用专用密码" },
    { key: "from_name", label: "发件人名称", value: "钻石手社区" },
    { key: "daily_digest", label: "每日摘要", value: "开启" },
  ],
  payment: [
    { key: "stripe_key", label: "Stripe公开密钥", value: "pk_live_••••••••••••" },
    { key: "stripe_secret", label: "Stripe密钥", value: "••••••••••••", desc: "保持机密" },
    { key: "vip_price", label: "VIP月费", value: "¥99" },
    { key: "vip_yearly", label: "VIP年费", value: "¥899" },
    { key: "min_withdraw", label: "最低提现额", value: "¥100" },
    { key: "withdraw_fee", label: "提现手续费", value: "1%" },
  ],
  notification: [
    { key: "email_notify", label: "邮件通知", value: "开启" },
    { key: "push_notify", label: "推送通知", value: "开启" },
    { key: "new_user_notify", label: "新用户注册提醒", value: "开启" },
    { key: "report_notify", label: "内容举报提醒", value: "开启" },
    { key: "vip_expire_days", label: "VIP到期提醒", value: "7天前" },
    { key: "daily_report", label: "每日数据报告", value: "关闭" },
  ],
  security: [
    { key: "require_email_verify", label: "注册邮箱验证", value: "开启" },
    { key: "require_phone_verify", label: "手机号验证", value: "关闭" },
    { key: "login_captcha", label: "登录验证码", value: "开启" },
    { key: "password_min", label: "密码最小长度", value: "8位" },
    { key: "session_timeout", label: "会话超时", value: "7天" },
    { key: "ip_whitelist", label: "IP白名单", value: "" },
  ],
};

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState("general");
  const [saved, setSaved] = useState(false);
  const [showPass, setShowPass] = useState<Record<string, boolean>>({});

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields = SETTINGS[activeSection] || [];

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 16 }}>系统设置</h2>

      {/* Section Tabs */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 16, scrollbarWidth: "none" }}>
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            style={{
              padding: "8px 16px",
              borderRadius: 99,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: "nowrap",
              background: activeSection === s.key ? "#7c3aed" : "#fff",
              color: activeSection === s.key ? "#fff" : "#666",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <s.icon size={13} />
            {s.label}
          </button>
        ))}
      </div>

      {/* Settings Form */}
      <div style={{ background: "#fff", borderRadius: 16, padding: "20px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        {fields.map((field, i) => (
          <div key={field.key} style={{ marginBottom: i < fields.length - 1 ? 20 : 0, paddingBottom: i < fields.length - 1 ? 20 : 0, borderBottom: i < fields.length - 1 ? "1px solid #f0f0f0" : "none" }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6 }}>
              {field.label}
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass[field.key] ? "text" : "password" === field.value.slice(0, 1) ? "text" : "text"}
                value={field.value}
                readOnly
                style={{
                  width: "100%",
                  padding: "9px 36px 9px 12px",
                  borderRadius: 10,
                  border: "1px solid #e5e7eb",
                  fontSize: 13,
                  color: "#333",
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#fafafa",
                }}
              />
              {field.value.startsWith("••") && (
                <button
                  onClick={() => setShowPass({ ...showPass, [field.key]: !showPass[field.key] })}
                  style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#999", padding: 2 }}
                >
                  {showPass[field.key] ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              )}
            </div>
            {field.desc && <p style={{ fontSize: 11, color: "#bbb", margin: "4px 0 0" }}>{field.desc}</p>}
          </div>
        ))}

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button
            onClick={handleSave}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: 12,
              background: saved ? "#10b981" : "#7c3aed",
              color: "#fff",
              border: "none",
              cursor: saved ? "default" : "pointer",
              fontSize: 14,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transition: "background 0.3s",
            }}
          >
            {saved ? <CheckCircle size={15} /> : <Save size={15} />}
            {saved ? "已保存 ✓" : "保存设置"}
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div style={{ marginTop: 20, background: "#fff", borderRadius: 16, padding: "20px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: "1px solid rgba(239,68,68,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Shield size={16} style={{ color: "#ef4444" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: "#ef4444" }}>危险区域</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#ef4444", textAlign: "left" }}>
            🗄️ 导出全部数据（JSON格式）
          </button>
          <button style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#ef4444", textAlign: "left" }}>
            📤 备份数据库到云存储
          </button>
          <button style={{ padding: "10px 14px", borderRadius: 10, background: "#ef4444", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#fff", textAlign: "left" }}>
            ⚠️ 清空所有缓存数据
          </button>
        </div>
      </div>
    </div>
  );
}
