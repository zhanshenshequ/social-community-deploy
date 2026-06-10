"use client";
import { useState } from "react";
import {
  FileText,
  Search,
  CheckCircle,
  XCircle,
  Pin,
  Trash2,
  Eye,
  Flag,
  Filter,
  RefreshCw,
  ThumbsUp,
  MessageSquare,
  Eye as ViewIcon,
  Share2,
  AlertTriangle,
  Clock,
  Star,
} from "lucide-react";

const MOCK_POSTS = [
  { id: "p1", title: "Web3椤圭洰鐨勬湭鏉ュ彂灞曡秼鍔垮垎鏋?, author: "CryptoView", content: "娣卞害瑙ｆ瀽Web3鍦ㄥ悇琛屼笟鐨勫簲鐢ㄥ墠鏅?..", time: "2灏忔椂鍓?, likes: 2341, comments: 187, views: 45200, reports: 0, status: "published", pinned: true, tags: ["Web3", "瓒嬪娍"] },
  { id: "p2", title: "濡備綍鐢ˋI宸ュ叿鎻愬崌鍐呭鍒涗綔鏁堢巼", author: "AI_Writer", content: "鎺ㄨ崘鍑犳鎴戝父鐢ㄧ殑AI杈呭姪鍒涗綔宸ュ叿...", time: "4灏忔椂鍓?, likes: 1892, comments: 143, views: 32100, reports: 0, status: "published", pinned: false, tags: ["AI", "鏁堢巼"] },
  { id: "p3", title: "Spam: Click this link to win BTC!", author: "SpamBot999", content: "Click here for free bitcoin!!!", time: "10鍒嗛挓鍓?, likes: 0, comments: 0, views: 12, reports: 5, status: "pending", pinned: false, tags: ["鍨冨溇"] },
  { id: "p4", title: "DeFi璐ㄦ娂閬垮潙鎸囧崡瀹屾暣鐗?, author: "DeFiMaster", content: "涓绘祦DeFi骞冲彴璐ㄦ娂椋庨櫓鍏ㄩ潰璇勪及...", time: "6灏忔椂鍓?, likes: 1456, comments: 98, views: 21300, reports: 0, status: "published", pinned: false, tags: ["DeFi", "鏁欑▼"] },
  { id: "p5", title: "Harassment content...", author: "BadActor", content: "涓汉鏀诲嚮鍜屾伓鎰忛獨鎵板唴瀹?..", time: "30鍒嗛挓鍓?, likes: 2, comments: 0, views: 45, reports: 8, status: "reported", pinned: false, tags: ["杩濊"] },
  { id: "p6", title: "Meme甯佺倰浣滅殑搴曞眰閫昏緫", author: "MemeKing", content: "Meme甯佽儗鍚庣殑绀剧兢鍏辫瘑涓庣倰浣滄満鍒?..", time: "1澶╁墠", likes: 1203, comments: 234, views: 48900, reports: 0, status: "published", pinned: false, tags: ["Meme"] },
  { id: "p7", title: "寰呭鏍哥殑鏂版枃绔犺崏绋?, author: "NewAuthor", content: "杩欐槸涓€绡囧叧浜庡尯鍧楅摼鎶€鏈殑鍩虹浠嬬粛...", time: "3灏忔椂鍓?, likes: 0, comments: 0, views: 10, reports: 0, status: "pending", pinned: false, tags: ["鏂版墜"] },
];

const TABS = [
  { key: "all", label: "鍏ㄩ儴", count: 7 },
  { key: "pending", label: "寰呭鏍?, count: 2 },
  { key: "reported", label: "琚妇鎶?, count: 1 },
  { key: "published", label: "宸插彂甯?, count: 4 },
];

const STATUS_STYLE: Record<string, { color: string; bg: string; label: string }> = {
  published: { color: "#10b981", bg: "rgba(16,185,129,0.1)", label: "宸插彂甯? },
  pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", label: "寰呭鏍? },
  reported: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", label: "琚妇鎶? },
};

export default function AdminContent() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_POSTS.filter((p) => {
    const matchTab = tab === "all" || p.status === tab;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.author.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 16 }}>鍐呭绠＄悊</h2>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, overflowX: "auto", paddingBottom: 4 }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: "7px 14px",
              borderRadius: 99,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: "nowrap",
              background: tab === t.key ? "#7c3aed" : "#fff",
              color: tab === t.key ? "#fff" : "#666",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            {t.label} <span style={{ opacity: 0.7, marginLeft: 4 }}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "10px 14px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <Search size={15} style={{ color: "#999", flexShrink: 0 }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="鎼滅储甯栧瓙鏍囬鎴栦綔鑰?.."
          style={{ flex: 1, border: "none", outline: "none", fontSize: 13, color: "#333" }}
        />
        {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: 16 }}>脳</button>}
      </div>

      {/* Content List */}
      <div>
        {filtered.map((post, i) => (
          <div key={post.id} style={{ background: "#fff", borderRadius: 16, padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
                  {post.pinned && <span style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", gap: 2 }}><Pin size={9} /> 缃《</span>}
                  <span style={{ background: STATUS_STYLE[post.status].bg, color: STATUS_STYLE[post.status].color, padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>{STATUS_STYLE[post.status].label}</span>
                  {post.tags.map((tag) => <span key={tag} style={{ background: "#f5f5f5", color: "#888", padding: "1px 6px", borderRadius: 4, fontSize: 10 }}>#{tag}</span>)}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 4, lineHeight: 1.4 }}>{post.title}</div>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.content}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 11, color: "#bbb" }}>@{post.author}</span>
                  <span style={{ fontSize: 11, color: "#bbb", display: "flex", alignItems: "center", gap: 3 }}><Clock size={10} /> {post.time}</span>
                  {post.reports > 0 && (
                    <span style={{ fontSize: 11, color: "#ef4444", display: "flex", alignItems: "center", gap: 3 }}><Flag size={10} /> {post.reports}涓炬姤</span>
                  )}
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <span style={{ fontSize: 11, color: "#bbb", display: "flex", alignItems: "center", gap: 3 }}><ThumbsUp size={10} /> {post.likes.toLocaleString()}</span>
                  <span style={{ fontSize: 11, color: "#bbb", display: "flex", alignItems: "center", gap: 3 }}><MessageSquare size={10} /> {post.comments}</span>
                  <span style={{ fontSize: 11, color: "#bbb", display: "flex", alignItems: "center", gap: 3 }}><ViewIcon size={10} /> {(post.views / 1000).toFixed(1)}k</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}>
                {post.status === "pending" && (
                  <>
                    <button style={{ padding: "6px 10px", borderRadius: 8, background: "#10b981", color: "#fff", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                      <CheckCircle size={11} /> 閫氳繃
                    </button>
                    <button style={{ padding: "6px 10px", borderRadius: 8, background: "#ef4444", color: "#fff", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                      <XCircle size={11} /> 鎷掔粷
                    </button>
                  </>
                )}
                <button style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(124,58,237,0.08)", color: "#7c3aed", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                  <Star size={11} /> {post.pinned ? "鍙栨秷缃《" : "缃《"}
                </button>
                <button style={{ padding: "6px 10px", borderRadius: 8, background: "#f5f5f5", color: "#666", border: "none", cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}>
                  <Eye size={11} /> 鏌ョ湅
                </button>
                <button style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                  <Trash2 size={11} /> 鍒犻櫎
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "#bbb", fontSize: 13 }}>娌℃湁鎵惧埌鍐呭</div>
        )}
      </div>
    </div>
  );
}
