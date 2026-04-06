/*
 * 家庭果园与菜园施肥与植保指南 — 主页
 * 设计风格：田园手帐 (Illustrated Naturalism)
 * 色彩：亚麻白底 + 苔藓绿主色 + 泥土棕辅色 + 季节强调色
 * 字体：Playfair Display (标题) + Source Sans 3 (正文)
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Droplets,
  Shield,
  Calendar,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Bug,
  Flower2,
  TreePine,
  Apple,
  Grape,
  Cherry,
  Sprout,
  Info,
  Menu,
  X,
} from "lucide-react";
import { products, crops, calendar, safetyRules } from "@/lib/gardenData";
import type { CalendarMonth, CalendarTask, Product, Crop } from "@/lib/gardenData";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328359702/EtuGgEXh3NhqYYxcDZkFms/hero-banner-TCVdQnKKiDmXq8BEDjegDN.webp";
const SPRING_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328359702/EtuGgEXh3NhqYYxcDZkFms/spring-bg-ZzCVv4KC9XBry9TRgocNEa.webp";
const SUMMER_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328359702/EtuGgEXh3NhqYYxcDZkFms/summer-bg-Jyvn7US9eUDmtJLgpYQXKb.webp";
const AUTUMN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328359702/EtuGgEXh3NhqYYxcDZkFms/autumn-bg-Cxge6LcgjZiB6TuZTJqLjj.webp";

const SEASON_BG: Record<string, string> = {
  spring: SPRING_BG,
  summer: SUMMER_BG,
  autumn: AUTUMN_BG,
};

type Section = "calendar" | "products" | "crops" | "safety";

const NAV_ITEMS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "calendar", label: "月历时间表", icon: <Calendar className="w-4 h-4" /> },
  { id: "products", label: "药剂肥料速查", icon: <Droplets className="w-4 h-4" /> },
  { id: "crops", label: "作物管理", icon: <Leaf className="w-4 h-4" /> },
  { id: "safety", label: "安全准则", icon: <Shield className="w-4 h-4" /> },
];

// ─── Fade-in animation wrapper ───
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Type badge ───
function TypeBadge({ type }: { type: CalendarTask["type"] }) {
  const styles: Record<string, string> = {
    "预防打药": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "治疗打药": "bg-blue-100 text-blue-800 border-blue-200",
    "施肥": "bg-amber-100 text-amber-800 border-amber-200",
    "物理防御": "bg-orange-100 text-orange-800 border-orange-200",
    "停药": "bg-red-100 text-red-800 border-red-200",
    "应急治疗": "bg-rose-100 text-rose-800 border-rose-200",
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded border ${styles[type] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
      {type}
    </span>
  );
}

// ─── Product Card ───
function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const categoryColors: Record<string, string> = {
    "杀菌剂": "border-l-emerald-600",
    "杀虫剂": "border-l-amber-600",
    "肥料": "border-l-sky-600",
    "物理防御": "border-l-orange-500",
  };

  return (
    <motion.div
      layout
      className={`bg-card rounded-lg border border-border/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden border-l-4 ${categoryColors[product.category] || "border-l-gray-400"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        <span className="text-2xl mt-0.5 shrink-0">{product.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-foreground text-sm leading-tight">{product.nameCn}</h3>
            <span className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground">{product.role}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{product.name}</p>
          <p className="text-xs text-muted-foreground">活性成分：{product.activeIngredientCn} ({product.activeIngredient})</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 mt-1 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2 border-t border-border/40 pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="bg-muted/50 rounded p-2">
                  <span className="text-xs text-muted-foreground block">配比</span>
                  <span className="text-foreground whitespace-pre-line text-xs">{product.mixRatio}</span>
                </div>
                <div className="bg-muted/50 rounded p-2">
                  <span className="text-xs text-muted-foreground block">频率</span>
                  <span className="text-foreground text-xs">{product.frequency}</span>
                </div>
                <div className="bg-muted/50 rounded p-2">
                  <span className="text-xs text-muted-foreground block">安全采收间隔 (PHI)</span>
                  <span className="text-foreground whitespace-pre-line text-xs">{product.phi}</span>
                </div>
                <div className="bg-muted/50 rounded p-2">
                  <span className="text-xs text-muted-foreground block">Amazon评分</span>
                  <span className="text-foreground text-xs">{product.amazonRating}</span>
                </div>
              </div>
              {product.keyWarning && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded p-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-red-800">{product.keyWarning}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Crop Card ───
function CropCard({ crop }: { crop: Crop }) {
  const [open, setOpen] = useState(false);
  const matchedProds = products.filter((p) => crop.matchedProducts.includes(p.id));

  return (
    <motion.div layout className="bg-card rounded-lg border border-border/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 flex items-center gap-3"
      >
        <span className="text-3xl">{crop.emoji}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{crop.name}</h3>
          <span className="text-xs text-muted-foreground">{crop.category}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-border/40 pt-3">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">常见病害</h4>
                <div className="flex flex-wrap gap-1">
                  {crop.diseases.map((d) => (
                    <span key={d} className="text-xs px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">常见虫害</h4>
                <div className="flex flex-wrap gap-1">
                  {crop.pests.map((p) => (
                    <span key={p} className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">适用产品</h4>
                <div className="flex flex-wrap gap-1">
                  {matchedProds.map((p) => (
                    <span key={p.id} className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                      {p.icon} {p.nameCn}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Calendar Month Card ───
function CalendarMonthCard({ month }: { month: CalendarMonth }) {
  const [open, setOpen] = useState(false);
  const seasonColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
    spring: { bg: "bg-pink-50/60", border: "border-pink-200", text: "text-pink-800", badge: "bg-pink-100 text-pink-700" },
    summer: { bg: "bg-amber-50/60", border: "border-amber-200", text: "text-amber-800", badge: "bg-amber-100 text-amber-700" },
    autumn: { bg: "bg-orange-50/60", border: "border-orange-200", text: "text-orange-800", badge: "bg-orange-100 text-orange-700" },
  };
  const sc = seasonColors[month.season];
  const seasonLabel: Record<string, string> = { spring: "春", summer: "夏", autumn: "秋" };

  return (
    <motion.div layout className={`rounded-xl border ${sc.border} ${sc.bg} overflow-hidden shadow-sm`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        <div className={`shrink-0 w-14 h-14 rounded-lg ${sc.badge} flex flex-col items-center justify-center`}>
          <span className="text-lg font-bold leading-none">{month.month.split("-")[0].replace("月", "")}</span>
          <span className="text-[10px] mt-0.5">{seasonLabel[month.season]}季</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-display text-lg font-semibold ${sc.text}`}>{month.title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{month.goal}</p>
          {month.warning && (
            <p className="text-xs text-red-700 font-medium mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {month.warning}
            </p>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 mt-2 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-3">
              {month.tasks.map((task, i) => (
                <div key={i} className="bg-white/80 rounded-lg border border-border/40 p-4 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <TypeBadge type={task.type} />
                    <span className="text-sm font-medium text-foreground">{task.action}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{task.crops}</p>
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{task.detail}</p>
                  {task.frequency && (
                    <p className="text-xs text-primary font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      频率：{task.frequency}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Safety Rule Card ───
function SafetyCard({ rule }: { rule: typeof safetyRules[0] }) {
  const levelStyles: Record<string, string> = {
    critical: "bg-red-50 border-red-300 shadow-red-100/50",
    warning: "bg-amber-50 border-amber-300 shadow-amber-100/50",
    info: "bg-sky-50 border-sky-200 shadow-sky-100/50",
  };
  const titleStyles: Record<string, string> = {
    critical: "text-red-800",
    warning: "text-amber-800",
    info: "text-sky-800",
  };
  const contentStyles: Record<string, string> = {
    critical: "text-red-700",
    warning: "text-amber-700",
    info: "text-sky-700",
  };

  return (
    <div className={`rounded-lg border p-4 shadow-sm ${levelStyles[rule.level]}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">{rule.icon}</span>
        <div>
          <h3 className={`font-semibold text-sm ${titleStyles[rule.level]}`}>{rule.title}</h3>
          <p className={`text-sm mt-1 leading-relaxed ${contentStyles[rule.level]}`}>{rule.content}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Home Page ───
export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("calendar");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef<Record<Section, HTMLElement | null>>({
    calendar: null,
    products: null,
    crops: null,
    safety: null,
  });

  const scrollToSection = (id: Section) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as Section);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const fungicides = products.filter((p) => p.category === "杀菌剂");
  const insecticides = products.filter((p) => p.category === "杀虫剂" || p.category === "物理防御");
  const fertilizers = products.filter((p) => p.category === "肥料");

  const fruitTrees = crops.filter((c) => c.category === "果树");
  const berries = crops.filter((c) => c.category === "浆果");
  const veggies = crops.filter((c) => c.category === "蔬菜");
  const flowers = crops.filter((c) => c.category === "花卉");

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero Banner ─── */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Garden illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        </div>
        <div className="relative container pt-8 pb-16 sm:pt-12 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-sm font-medium text-earth tracking-widest uppercase mb-2" style={{ color: "var(--color-earth)" }}>
              2026 家庭园艺手册
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-sm" style={{ color: "var(--color-bark)" }}>
              果园与菜园
              <br />
              <span style={{ color: "var(--color-moss)" }}>施肥与植保指南</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base max-w-xl leading-relaxed" style={{ color: "var(--color-earth)" }}>
              涵盖苹果、梨、葡萄、蓝莓、番茄、辣椒、茄子、芹菜、南瓜、扁豆、玫瑰共 11 种作物的完整管理方案。
              基于密苏里大学与威斯康星大学农业推广站的权威指南，结合 Amazon 真实用户评价验证。
            </p>
          </motion.div>
        </div>
      </header>

      {/* ─── Sticky Nav ─── */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/60 shadow-sm">
        <div className="container">
          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-1 py-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
          {/* Mobile nav */}
          <div className="sm:hidden flex items-center justify-between py-2">
            <span className="text-sm font-semibold text-foreground">
              {NAV_ITEMS.find((n) => n.id === activeSection)?.label}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-muted"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="sm:hidden overflow-hidden pb-2"
              >
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm ${
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ─── Main Content ─── */}
      <main className="container py-8 space-y-16">
        {/* ─── Calendar Section ─── */}
        <section
          id="calendar"
          ref={(el) => { sectionRefs.current.calendar = el; }}
          className="scroll-mt-20"
        >
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">月历时间表</h2>
                <p className="text-sm text-muted-foreground">按月份查看每种作物的施肥与打药计划</p>
              </div>
            </div>
          </FadeIn>
          <div className="space-y-4">
            {calendar.map((month, i) => (
              <FadeIn key={month.monthNum} delay={i * 0.05}>
                <CalendarMonthCard month={month} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ─── Divider with vine decoration ─── */}
        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 h-px bg-border" />
          <Leaf className="w-5 h-5 text-primary/40" />
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* ─── Products Section ─── */}
        <section
          id="products"
          ref={(el) => { sectionRefs.current.products = el; }}
          className="scroll-mt-20"
        >
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">药剂与肥料速查</h2>
                <p className="text-sm text-muted-foreground">点击展开查看配比、频率、PHI 和 Amazon 评分</p>
              </div>
            </div>
          </FadeIn>

          {/* Fungicides */}
          <FadeIn>
            <h3 className="flex items-center gap-2 text-lg font-display font-semibold text-foreground mb-3">
              <Shield className="w-4 h-4 text-emerald-600" />
              杀菌剂
              <span className="text-xs font-normal text-muted-foreground">（预防病害）</span>
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {fungicides.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>

          {/* Insecticides */}
          <FadeIn>
            <h3 className="flex items-center gap-2 text-lg font-display font-semibold text-foreground mb-3">
              <Bug className="w-4 h-4 text-amber-600" />
              杀虫剂与物理防御
              <span className="text-xs font-normal text-muted-foreground">（防治虫害）</span>
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {insecticides.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>

          {/* Fertilizers */}
          <FadeIn>
            <h3 className="flex items-center gap-2 text-lg font-display font-semibold text-foreground mb-3">
              <Sprout className="w-4 h-4 text-sky-600" />
              肥料
              <span className="text-xs font-normal text-muted-foreground">（营养补给）</span>
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fertilizers.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 h-px bg-border" />
          <Flower2 className="w-5 h-5 text-primary/40" />
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* ─── Crops Section ─── */}
        <section
          id="crops"
          ref={(el) => { sectionRefs.current.crops = el; }}
          className="scroll-mt-20"
        >
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">作物管理</h2>
                <p className="text-sm text-muted-foreground">查看每种作物的病虫害和适用产品</p>
              </div>
            </div>
          </FadeIn>

          {/* Fruit trees */}
          <FadeIn>
            <h3 className="flex items-center gap-2 text-lg font-display font-semibold text-foreground mb-3">
              <TreePine className="w-4 h-4 text-emerald-700" />
              果树
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {fruitTrees.map((c, i) => (
              <FadeIn key={c.id} delay={i * 0.05}>
                <CropCard crop={c} />
              </FadeIn>
            ))}
          </div>

          {/* Berries */}
          <FadeIn>
            <h3 className="flex items-center gap-2 text-lg font-display font-semibold text-foreground mb-3">
              <Cherry className="w-4 h-4 text-purple-600" />
              浆果
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {berries.map((c, i) => (
              <FadeIn key={c.id} delay={i * 0.05}>
                <CropCard crop={c} />
              </FadeIn>
            ))}
          </div>

          {/* Vegetables */}
          <FadeIn>
            <h3 className="flex items-center gap-2 text-lg font-display font-semibold text-foreground mb-3">
              <Sprout className="w-4 h-4 text-green-600" />
              蔬菜
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {veggies.map((c, i) => (
              <FadeIn key={c.id} delay={i * 0.05}>
                <CropCard crop={c} />
              </FadeIn>
            ))}
          </div>

          {/* Flowers */}
          <FadeIn>
            <h3 className="flex items-center gap-2 text-lg font-display font-semibold text-foreground mb-3">
              <Flower2 className="w-4 h-4 text-rose-500" />
              花卉
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {flowers.map((c, i) => (
              <FadeIn key={c.id} delay={i * 0.05}>
                <CropCard crop={c} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 h-px bg-border" />
          <Shield className="w-5 h-5 text-primary/40" />
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* ─── Safety Section ─── */}
        <section
          id="safety"
          ref={(el) => { sectionRefs.current.safety = el; }}
          className="scroll-mt-20"
        >
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">安全准则（必读）</h2>
                <p className="text-sm text-muted-foreground">使用任何药剂前请务必阅读以下安全规则</p>
              </div>
            </div>
          </FadeIn>
          <div className="space-y-3">
            {safetyRules.map((rule, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <SafetyCard rule={rule} />
              </FadeIn>
            ))}
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border/60 mt-12">
        <div className="container py-8 text-center">
          <p className="text-sm text-muted-foreground">
            本指南仅供家庭园艺参考，使用任何农药前请仔细阅读产品标签。
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            数据来源：密苏里大学农业推广站 · 威斯康星大学推广站 · EPA产品标签 · Amazon用户评价
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            2026 家庭果园与菜园管理手册
          </p>
        </div>
      </footer>
    </div>
  );
}
