"use client";
import { useState } from "react";
import {
  Bell,
  Send,
  Clock,
  Users,
  Pin,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Plus,
  ChevronDown,
  Mail,
  AlertTriangle,
  Star,
} from "lucide-react";

const MOCK_NOTIFICATIONS = [
  { id: "n1", title: "系统升级通知", content: "平台将于6月15日凌晨2:00-4:00进行系统升级，届时服务将短暂中断。", type: "system", target: "全部用户", sentAt: "2024-06-10 09:00", status: "sent", reads: 8432, sentNum: 12847 },
  { id: "n2", title: "VIP权益升级公告", content: "VIP会员新增优先客服通道和专属活动参与资格，快去个人中心查看吧！", type: "vip", target: "VIP用户", sentAt: "2024-06-08 14:30", status: "sent", reads: 1203, sentNum: 1205 },
  { id: "n3", title: "新功能上线：AI助手", content: "全新AI助手现已上线，帮助你更高效地管理内容和互动！", type: "feature", target: "全部用户", sentAt: "2024-06-05 10:00", status: "sent", reads: 9100, sentNum: 12847 },
  { id: "n4", title: "社区规范更新", content: "请各位用户仔细阅读更新后的社区规范，违规内容将受到相应处理。", type: "system", target: "全部用户", sentAt: "2024-06-01 08:00", status: "sent", reads: 7200, sentNum: 12847 },
  { id: "n5", title: "端午节活动公告", content: "端午活动即将开始，参与即有机会获得VIP会员和平台代币！", type: "event", target: "全部用户", sentAt: "2024-06-12 00:00", status: "scheduled", reads: 0, sentNum: 0 },
];

const TYPE_STYLES: Record<string, { color: string; bg: string; icon: string }> = {
  system: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: "🔴" },
  vip: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: "👑" },
  feature: { color: "#7c3aed", bg: "rgba(124,58,237,0.1)", icon: "✨" },
  event: { color: "#10b981", bg: "rgba(16,185,129,0.1)", icon: "🎉" },
};

export default function AdminNotifications() {
  const [tab, setTab] = useState<"sent" | "draft" | "scheduled">("sent");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: "", content: "", type: "system", target: "全部用户" });

  const sent = MOCK_NOTIFICATIONS.filter((n) => n.status === "sent");
  const scheduled = MOCK_NOTIFICATIONS.filter((n) => n.status === "scheduled");
  const drafts = MOCK_NOTIFICATIONS.filter((n) => n.status === "draft");
  const list = tab === "sent" ? sent : tab === "scheduled" ? scheduled : drafts;

  const handleSend = () => {
    setShowModal(false);
    setModalData({ title: "", content: "", type: "system", target: "全部用户" });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e" }}>通知管理</h2>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "9px 16px",
            borderRadius: 10,
            background: "#7c3aed",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Plus size={14} /> 创建通知
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {([["sent", "已发送", sent.length], ["scheduled", "定时发送", scheduled.length], ["draft", "草稿箱", drafts.length]] as const).map(([key, label, count]) => (
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
            {label} {count > 0 && <span style={{ opacity: 0.7 }}>({count})</span>}
          </button>
        ))}
      </div>

      {/* Notification List */}
      {list.map((notif, i) => {
        const style = TYPE_STYLES[notif.type] || TYPE_STYLES.system;
        return (
          <div key={notif.id} style={{ background: "#fff", borderRadius: 16, padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: style.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                {style.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{notif.title}</span>
                  {notif.status === "scheduled" && (
                    <span style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>⏰ 定时</span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 8, lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                  {notif.content}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: "#bbb", display: "flex", alignItems: "center", gap: 3 }}><Bell size={10} /> {notif.target}</span>
                  <span style={{ fontSize: 11, color: "#bbb", display: "flex", alignItems: "center", gap: 3 }}><Clock size={10} /> {notif.sentAt}</span>
                  {notif.status === "sent" && (
                    <span style={{ fontSize: 11, color: "#10b981", display: "flex", alignItems: "center", gap: 3 }}>
                      <CheckCircle size={10} /> {notif.reads.toLocaleString()}/{notif.sentNum.toLocaleString()} 已读
                    </span>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}>
                {notif.status === "scheduled" ? (
                  <>
                    <button style={{ padding: "6px 10px", borderRadius: 8, background: "#10b981", color: "#fff", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                      <Send size={11} /> 立即发送
                    </button>
                    <button style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(124,58,237,0.08)", color: "#7c3aed", border: "none", cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}>
                      <Edit size={11} /> 编辑
                    </button>
                    <button style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                      <XCircle size={11} /> 取消
                    </button>
                  </>
                ) : (
                  <>
                    <button style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(124,58,237,0.08)", color: "#7c3aed", border: "none", cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}>
                      <Edit size={11} /> 编辑
                    </button>
                    <button style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                      <Trash2 size={11} /> 删除
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Compose Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: "24px 20px 40px", width: "100%", maxWidth: 480 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>创建通知</h3>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#999", padding: 0, lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>通知类型</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {Object.entries(TYPE_STYLES).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setModalData({ ...modalData, type: key })}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        border: `1px solid ${modalData.type === key ? val.color : "#e5e7eb"}`,
                        background: modalData.type === key ? val.bg : "#fff",
                        color: modalData.type === key ? val.color : "#888",
                        cursor: "pointer",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {val.icon} {key === "system" ? "系统" : key === "vip" ? "VIP" : key === "feature" ? "功能" : "活动"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>发送对象</label>
                <select
                  value={modalData.target}
                  onChange={(e) => setModalData({ ...modalData, target: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13, outline: "none", color: "#333" }}
                >
                  <option>全部用户</option>
                  <option>VIP用户</option>
                  <option>普通用户</option>
                  <option>新注册用户（7天内）</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>通知标题</label>
                <input
                  value={modalData.title}
                  onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
                  placeholder="请输入通知标题"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>通知内容</label>
                <textarea
                  value={modalData.content}
                  onChange={(e) => setModalData({ ...modalData, content: e.target.value })}
                  placeholder="请输入通知内容..."
                  rows={4}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13, outline: "none", resize: "none", boxSizing: "border-box", lineHeight: 1.6 }}
                />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => { setShowModal(false); setModalData({ title: "", content: "", type: "system", target: "全部用户" }); }} style={{ flex: 1, padding: "12px", borderRadius: 12, background: "#f5f5f5", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#666" }}>
                  取消
                </button>
                <button onClick={handleSend} style={{ flex: 1, padding: "12px", borderRadius: 12, background: "#7c3aed", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Send size={14} /> 发送
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
