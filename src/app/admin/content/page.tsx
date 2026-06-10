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
  { id: "p1", title: "Web3项目的未来发展趋势分析", author: "CryptoView", content: "深度解析Web3在各行业的应用前景...", time: "2小时前", likes: 2341, comments: 187, views: 45200, reports: 0, status: "published", pinned: true, tags: ["Web3", "趋势"] },
  { id: "p2", title: "如何用AI工具提升内容创作效率", author: "AI_Writer", content: "推荐几款我常用的AI辅助创作工具...", time: "4小时前", likes: 1892, comments: 143, views: 32100, reports: 0, status: "published", pinned: false, tags: ["AI", "效率"] },
  { id: "p3", title: "Spam: Click this link to win BTC!", author: "SpamBot999", content: "Click here for free bitcoin!!!", time: "10分钟前", likes: 0, comments: 0, views: 12, reports: 5, status: "pending", pinned: false, tags: ["垃圾"] },
  { id: "p4", title: "DeFi质押避坑指南完整版", author: "DeFiMaster", content: "主流DeFi平台质押风险全面评估...", time: "6小时前", likes: 1456, comments: 98, views: 21300, reports: 0, status: "published", pinned: false, tags: ["DeFi", "教程"] },
  { id: "p5", title: "Harassment content...", author: "BadActor", content: "个人攻击和恶意骚扰内容...", time: "30分钟前", likes: 2, comments: 0, views: 45, reports: 8, status: "reported", pinned: false, tags: ["违规"] },
  { id: "p6", title: "Meme币炒作的底层逻辑", author: "MemeKing", content: "Meme币背后的社群共识与炒作机制...", time: "1天前", likes: 1203, comments: 234, views: 48900, reports: 0, status: "published", pinned: false, tags: ["Meme"] },
  { id: "p7", title: "待审核的新文章草稿", author: "NewAuthor", content: "这是一篇关于区块链技术的基础介绍...", time: "3小时前", likes: 0, comments: 0, views: 10, reports: 0, status: "pending", pinned: false, tags: ["新手"] },
];

const TABS = [
  { key: "all", label: "全部", count: 7 },
  { key: "pending", label: "待审核", count: 2 },
  { key: "reported", label: "被举报", count: 1 },
  { key: "published", label: "已发布", count: 4 },
];

const STATUS_STYLE: Record<string, { color: string; bg: string; label: string }> = {
  published: { color: "#10b981", bg: "rgba(16,185,129,0.1)", label: "已发布" },
  pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", label: "待审核" },
  reported: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", label: "被举报" },
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
      <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 16 }}>内容管理</h2>

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
          placeholder="搜索帖子标题或作者..."
          style={{ flex: 1, border: "none", outline: "none", fontSize: 13, color: "#333" }}
        />
        {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: 16 }}>×</button>}
      </div>

      {/* Content List */}
      <div>
        {filtered.map((post, i) => (
          <div key={post.id} style={{ background: "#fff", borderRadius: 16, padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
                  {post.pinned && <span style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", gap: 2 }}><Pin size={9} /> 置顶</span>}
                  <span style={{ background: STATUS_STYLE[post.status].bg, color: STATUS_STYLE[post.status].color, padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>{STATUS_STYLE[post.status].label}</span>
                  {post.tags.map((tag) => <span key={tag} style={{ background: "#f5f5f5", color: "#888", padding: "1px 6px", borderRadius: 4, fontSize: 10 }}>#{tag}</span>)}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 4, lineHeight: 1.4 }}>{post.title}</div>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.content}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 11, color: "#bbb" }}>@{post.author}</span>
                  <span style={{ fontSize: 11, color: "#bbb", display: "flex", alignItems: "center", gap: 3 }}><Clock size={10} /> {post.time}</span>
                  {post.reports > 0 && (
                    <span style={{ fontSize: 11, color: "#ef4444", display: "flex", alignItems: "center", gap: 3 }}><Flag size={10} /> {post.reports}举报</span>
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
                      <CheckCircle size={11} /> 通过
                    </button>
                    <button style={{ padding: "6px 10px", borderRadius: 8, background: "#ef4444", color: "#fff", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                      <XCircle size={11} /> 拒绝
                    </button>
                  </>
                )}
                <button style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(124,58,237,0.08)", color: "#7c3aed", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                  <Star size={11} /> {post.pinned ? "取消置顶" : "置顶"}
                </button>
                <button style={{ padding: "6px 10px", borderRadius: 8, background: "#f5f5f5", color: "#666", border: "none", cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}>
                  <Eye size={11} /> 查看
                </button>
                <button style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                  <Trash2 size={11} /> 删除
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "#bbb", fontSize: 13 }}>没有找到内容</div>
        )}
      </div>
    </div>
  );
}
