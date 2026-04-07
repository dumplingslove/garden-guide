/**
 * 家庭果园与菜园施肥与植保指南 — 主页 v3
 * 设计风格：田园手帐 (Illustrated Naturalism)
 * 色彩：亚麻白底 + 苔藓绿主色 + 泥土棕辅色 + 季节强调色
 * 字体：Playfair Display (标题) + Source Sans 3 (正文)
 * 更新：浇水合并到月历、每阶段可视化概览、移除独立浇水板块
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Droplets,
  Shield,
  Calendar,
  ChevronDown,
  AlertTriangle,
  Bug,
  Flower2,
  TreePine,
  Cherry,
  Sprout,
  Menu,
  X,
  Zap,
  CloudRain,
  Thermometer,
  Download,
  Share,
  Smartphone,
} from "lucide-react";
import {
  products,
  crops,
  calendar,
  safetyRules,
  plantStatus,
  seedlingGuides,
} from "@/lib/gardenData";
import type {
  CalendarMonth,
  CalendarTask,
  Product,
  Crop,
  PlantStatus,
  SeedlingGuide,
} from "@/lib/gardenData";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663328359702/EtuGgEXh3NhqYYxcDZkFms/hero-banner-TCVdQnKKiDmXq8BEDjegDN.webp";

type Section =
  | "status"
  | "calendar"
  | "products"
  | "crops"
  | "seedling"
  | "safety";

const NAV_ITEMS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "status", label: "当前状态", icon: <Zap className="w-4 h-4" /> },
  { id: "calendar", label: "月历", icon: <Calendar className="w-4 h-4" /> },
  { id: "products", label: "药剂肥料", icon: <Droplets className="w-4 h-4" /> },
  { id: "crops", label: "作物管理", icon: <Leaf className="w-4 h-4" /> },
  { id: "seedling", label: "育苗", icon: <Sprout className="w-4 h-4" /> },
  { id: "safety", label: "安全", icon: <Shield className="w-4 h-4" /> },
];

// ─── Fade-in animation wrapper ───
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
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

// ─── Task type config ───
const TASK_TYPE_CONFIG: Record<string, { color: string; icon: string; badgeClass: string }> = {
  预防打药: { color: "emerald", icon: "🛡️", badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  治疗打药: { color: "blue", icon: "💊", badgeClass: "bg-blue-100 text-blue-800 border-blue-200" },
  施肥: { color: "amber", icon: "🌾", badgeClass: "bg-amber-100 text-amber-800 border-amber-200" },
  物理防御: { color: "orange", icon: "🪤", badgeClass: "bg-orange-100 text-orange-800 border-orange-200" },
  停药: { color: "red", icon: "⏰", badgeClass: "bg-red-100 text-red-800 border-red-200" },
  应急治疗: { color: "rose", icon: "🚨", badgeClass: "bg-rose-100 text-rose-800 border-rose-200" },
  育苗: { color: "lime", icon: "🌱", badgeClass: "bg-lime-100 text-lime-800 border-lime-200" },
  浇水: { color: "sky", icon: "💧", badgeClass: "bg-sky-100 text-sky-800 border-sky-200" },
};

// ─── Type badge ───
function TypeBadge({ type }: { type: CalendarTask["type"] }) {
  const config = TASK_TYPE_CONFIG[type];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded border ${config?.badgeClass || "bg-gray-100 text-gray-700 border-gray-200"}`}
    >
      <span>{config?.icon}</span>
      {type}
    </span>
  );
}

// ─── Phase Visual Summary ───
function PhaseSummary({ month }: { month: CalendarMonth }) {
  const summary = month.summary;
  if (!summary) return null;

  const stats = [
    { label: "打药", count: summary.sprayCount, icon: "🛡️", color: "bg-emerald-500" },
    { label: "施肥", count: summary.fertCount, icon: "🌾", color: "bg-amber-500" },
    { label: "浇水", count: summary.waterCount, icon: "💧", color: "bg-sky-500" },
    { label: "其他", count: summary.otherCount, icon: "📋", color: "bg-gray-400" },
  ];
  const total = stats.reduce((s, x) => s + x.count, 0);

  return (
    <div className="space-y-4">
      {/* Task type distribution bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>本阶段共 <strong className="text-foreground">{total}</strong> 项任务</span>
        </div>
        <div className="flex h-3 rounded-full overflow-hidden bg-muted/50">
          {stats.filter(s => s.count > 0).map((s, i) => (
            <div
              key={i}
              className={`${s.color} transition-all duration-500`}
              style={{ width: `${(s.count / total) * 100}%` }}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {stats.filter(s => s.count > 0).map((s, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs">
              <div className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
              <span className="text-muted-foreground">{s.icon} {s.label}</span>
              <span className="font-semibold text-foreground">{s.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key actions checklist */}
      {summary.keyActions && summary.keyActions.length > 0 && (
        <div className="bg-white/70 rounded-lg border border-border/40 p-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            关键行动清单
          </p>
          <div className="space-y-1.5">
            {summary.keyActions.map((action, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-muted-foreground mt-0.5 shrink-0">▸</span>
                <span className="text-foreground leading-snug">{action}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Grouped Task View ───
function GroupedTasks({ tasks }: { tasks: CalendarTask[] }) {
  // Group tasks by type
  const groups: Record<string, CalendarTask[]> = {};
  const typeOrder = ["预防打药", "治疗打药", "应急治疗", "施肥", "浇水", "育苗", "物理防御", "停药"];

  tasks.forEach((task) => {
    if (!groups[task.type]) groups[task.type] = [];
    groups[task.type].push(task);
  });

  const sortedTypes = typeOrder.filter((t) => groups[t]);

  const groupBg: Record<string, string> = {
    预防打药: "bg-emerald-50/80 border-emerald-200",
    治疗打药: "bg-blue-50/80 border-blue-200",
    施肥: "bg-amber-50/80 border-amber-200",
    物理防御: "bg-orange-50/80 border-orange-200",
    停药: "bg-red-50/80 border-red-200",
    应急治疗: "bg-rose-50/80 border-rose-200",
    育苗: "bg-lime-50/80 border-lime-200",
    浇水: "bg-sky-50/80 border-sky-200",
  };

  const groupTitle: Record<string, string> = {
    预防打药: "🛡️ 预防性打药任务",
    治疗打药: "💊 治疗性打药任务",
    施肥: "🌾 施肥任务",
    浇水: "💧 浇水任务",
    育苗: "🌱 育苗与定植",
    物理防御: "🪤 物理防御",
    停药: "⏰ 停药倒计时",
    应急治疗: "🚨 应急处理",
  };

  return (
    <div className="space-y-4">
      {sortedTypes.map((type) => (
        <div
          key={type}
          className={`rounded-lg border p-4 space-y-3 ${groupBg[type] || "bg-white/80 border-border/40"}`}
        >
          <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
            {groupTitle[type] || type}
            <span className="text-xs font-normal text-muted-foreground">
              ({groups[type].length} 项)
            </span>
          </h4>
          <div className="space-y-2">
            {groups[type].map((task, i) => (
              <div
                key={i}
                className="bg-white/90 rounded-md border border-border/30 p-3 space-y-1.5"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">
                    {task.action}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{task.crops}</p>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {task.detail}
                </p>
                {task.frequency && (
                  <p className="text-xs text-primary font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    频率：{task.frequency}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Plant Status Card ───
function PlantStatusCard({ plant }: { plant: PlantStatus }) {
  return (
    <motion.div
      layout
      className="bg-white rounded-xl border-2 border-amber-200 shadow-md overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{plant.emoji}</span>
          <div>
            <h3 className="font-semibold text-foreground">{plant.name}</h3>
            <span className="text-sm font-medium text-amber-700">
              {plant.currentState}
            </span>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2">
          <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-1">
            🚨 现在该做的
          </p>
          <p className="text-sm font-semibold text-red-800">
            {plant.urgentAction}
          </p>
          <p className="text-xs text-red-700 mt-1 leading-relaxed">
            {plant.urgentDetail}
          </p>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-lg p-2">
          <p className="text-xs text-sky-700">
            <span className="font-semibold">下一步：</span>
            {plant.nextAction}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Product Card ───
function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const categoryColors: Record<string, string> = {
    杀菌剂: "border-l-emerald-600",
    杀虫剂: "border-l-amber-600",
    杀菌杀虫多效: "border-l-teal-500",
    肥料: "border-l-sky-600",
    物理防御: "border-l-orange-500",
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
            <h3 className="font-semibold text-foreground text-sm leading-tight">
              {product.nameCn}
            </h3>
            <span className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground">
              {product.role}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{product.name}</p>
          <p className="text-xs text-muted-foreground">
            活性成分：{product.activeIngredientCn} ({product.activeIngredient})
          </p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground shrink-0 mt-1 transition-transform ${open ? "rotate-180" : ""}`}
        />
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
                  <span className="text-xs text-muted-foreground block">
                    配比
                  </span>
                  <span className="text-foreground whitespace-pre-line text-xs">
                    {product.mixRatio}
                  </span>
                </div>
                <div className="bg-muted/50 rounded p-2">
                  <span className="text-xs text-muted-foreground block">
                    频率
                  </span>
                  <span className="text-foreground text-xs">
                    {product.frequency}
                  </span>
                </div>
                <div className="bg-muted/50 rounded p-2">
                  <span className="text-xs text-muted-foreground block">
                    安全采收间隔 (PHI)
                  </span>
                  <span className="text-foreground whitespace-pre-line text-xs">
                    {product.phi}
                  </span>
                </div>
                <div className="bg-muted/50 rounded p-2">
                  <span className="text-xs text-muted-foreground block">
                    Amazon评分
                  </span>
                  <span className="text-foreground text-xs">
                    {product.amazonRating}
                  </span>
                </div>
              </div>
              {product.keyWarning && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded p-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-red-800">
                    {product.keyWarning}
                  </span>
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
  const matchedProds = products.filter((p) =>
    crop.matchedProducts.includes(p.id),
  );

  return (
    <motion.div
      layout
      className="bg-card rounded-lg border border-border/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 flex items-center gap-3"
      >
        <span className="text-3xl">{crop.emoji}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{crop.name}</h3>
          <span className="text-xs text-muted-foreground">{crop.category}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
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
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  常见病害
                </h4>
                <div className="flex flex-wrap gap-1">
                  {crop.diseases.map((d) => (
                    <span
                      key={d}
                      className="text-xs px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  常见虫害
                </h4>
                <div className="flex flex-wrap gap-1">
                  {crop.pests.map((p) => (
                    <span
                      key={p}
                      className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  适用产品
                </h4>
                <div className="flex flex-wrap gap-1">
                  {matchedProds.map((p) => (
                    <span
                      key={p.id}
                      className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded"
                    >
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

// ─── Calendar Month Card (v3 with visual summary) ───
function CalendarMonthCard({ month }: { month: CalendarMonth }) {
  const [open, setOpen] = useState(
    month.monthNum === 4 && month.month.includes("上旬"),
  );
  const [viewMode, setViewMode] = useState<"grouped" | "list">("grouped");

  const seasonColors: Record<
    string,
    { bg: string; border: string; badge: string }
  > = {
    spring: {
      bg: "bg-pink-50/60",
      border: "border-pink-200",
      badge: "bg-pink-100 text-pink-700",
    },
    summer: {
      bg: "bg-amber-50/60",
      border: "border-amber-200",
      badge: "bg-amber-100 text-amber-700",
    },
    autumn: {
      bg: "bg-orange-50/60",
      border: "border-orange-200",
      badge: "bg-orange-100 text-orange-700",
    },
  };
  const sc = seasonColors[month.season];
  const seasonLabel: Record<string, string> = {
    spring: "春",
    summer: "夏",
    autumn: "秋",
  };

  const isUrgent = month.month.includes("上旬") && month.monthNum === 4;

  return (
    <motion.div
      layout
      className={`rounded-xl border-2 ${isUrgent ? "border-red-400 ring-2 ring-red-200" : sc.border} ${sc.bg} overflow-hidden shadow-sm`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        <div
          className={`shrink-0 w-14 h-14 rounded-lg ${isUrgent ? "bg-red-100 text-red-700" : sc.badge} flex flex-col items-center justify-center`}
        >
          {isUrgent ? (
            <>
              <Zap className="w-5 h-5" />
              <span className="text-[10px] mt-0.5 font-bold">NOW</span>
            </>
          ) : (
            <>
              <span className="text-lg font-bold leading-none">
                {month.month.split("月")[0]}
              </span>
              <span className="text-[10px] mt-0.5">
                {seasonLabel[month.season]}季
              </span>
            </>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-display text-lg font-semibold ${isUrgent ? "text-red-800" : "text-foreground"}`}
          >
            {month.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">{month.goal}</p>
          {month.warning && (
            <p className="text-xs text-red-700 font-medium mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {month.warning}
            </p>
          )}
          {/* Mini stats preview when collapsed */}
          {!open && month.summary && (
            <div className="flex flex-wrap gap-2 mt-2">
              {month.summary.sprayCount > 0 && (
                <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                  🛡️ {month.summary.sprayCount}打药
                </span>
              )}
              {month.summary.fertCount > 0 && (
                <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                  🌾 {month.summary.fertCount}施肥
                </span>
              )}
              {month.summary.waterCount > 0 && (
                <span className="text-xs bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded">
                  💧 {month.summary.waterCount}浇水
                </span>
              )}
              {month.summary.otherCount > 0 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                  📋 {month.summary.otherCount}其他
                </span>
              )}
            </div>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 mt-2 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
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
            <div className="px-5 pb-5 space-y-4">
              {/* Visual Summary */}
              <PhaseSummary month={month} />

              {/* View mode toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grouped")}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    viewMode === "grouped"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  按类型分组
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    viewMode === "list"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  列表视图
                </button>
              </div>

              {/* Tasks */}
              {viewMode === "grouped" ? (
                <GroupedTasks tasks={month.tasks} />
              ) : (
                <div className="space-y-3">
                  {month.tasks.map((task, i) => (
                    <div
                      key={i}
                      className="bg-white/80 rounded-lg border border-border/40 p-4 space-y-2"
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <TypeBadge type={task.type} />
                        <span className="text-sm font-medium text-foreground">
                          {task.action}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {task.crops}
                      </p>
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                        {task.detail}
                      </p>
                      {task.frequency && (
                        <p className="text-xs text-primary font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          频率：{task.frequency}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Seedling Guide Card ───
function SeedlingCard({ guide }: { guide: SeedlingGuide }) {
  const [open, setOpen] = useState(false);
  const methodColor: Record<string, string> = {
    移栽小苗: "bg-green-100 text-green-800 border-green-200",
    直播种子: "bg-amber-100 text-amber-800 border-amber-200",
    已定植: "bg-sky-100 text-sky-800 border-sky-200",
  };

  return (
    <motion.div
      layout
      className="bg-card rounded-lg border border-border/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 flex items-center gap-3"
      >
        <span className="text-3xl">{guide.emoji}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{guide.crop}</h3>
          <span
            className={`text-xs px-2 py-0.5 rounded border ${methodColor[guide.method]}`}
          >
            {guide.method}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="bg-muted/50 rounded p-2">
                  <span className="text-xs text-muted-foreground block">
                    <Thermometer className="w-3 h-3 inline mr-1" />
                    最低土温
                  </span>
                  <span className="text-foreground text-xs font-semibold">
                    {guide.soilTemp}
                  </span>
                </div>
                <div className="bg-muted/50 rounded p-2">
                  <span className="text-xs text-muted-foreground block">
                    📏 株距
                  </span>
                  <span className="text-foreground text-xs font-semibold">
                    {guide.spacing}
                  </span>
                </div>
                <div className="bg-muted/50 rounded p-2">
                  <span className="text-xs text-muted-foreground block">
                    📐 种植深度
                  </span>
                  <span className="text-foreground text-xs font-semibold">
                    {guide.depth}
                  </span>
                </div>
                <div className="bg-muted/50 rounded p-2">
                  <span className="text-xs text-muted-foreground block">
                    🌡️ 炼苗
                  </span>
                  <span className="text-foreground text-xs">
                    {guide.hardenOff}
                  </span>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-2">
                <p className="text-xs text-green-800">
                  <span className="font-semibold">小贴士：</span>
                  {guide.tips}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Safety Rule Card ───
function SafetyCard({ rule }: { rule: (typeof safetyRules)[0] }) {
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
    <div
      className={`rounded-lg border p-4 shadow-sm ${levelStyles[rule.level]}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">{rule.icon}</span>
        <div>
          <h3 className={`font-semibold text-sm ${titleStyles[rule.level]}`}>
            {rule.title}
          </h3>
          <p
            className={`text-sm mt-1 leading-relaxed ${contentStyles[rule.level]}`}
          >
            {rule.content}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Section Divider ───
function Divider({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="flex-1 h-px bg-border" />
      <span className="text-primary/40">{icon}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

// ─── Main Home Page ───
// ─── Global PWA prompt capture (before any component mounts) ───
let _deferredInstallPrompt: any = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  _deferredInstallPrompt = e;
});

// ─── PWA Install Prompt ───
function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(_deferredInstallPrompt);
  const [showGuide, setShowGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isMobile = isIOS || isAndroid;

  useEffect(() => {
    // Check if already installed as standalone
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for late-arriving beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      _deferredInstallPrompt = e;
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Also check if global already captured it
    if (_deferredInstallPrompt) {
      setDeferredPrompt(_deferredInstallPrompt);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (isInstalled || dismissed) return null;
  if (!isMobile) return null;

  const handleInstall = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') setDismissed(true);
        setDeferredPrompt(null);
        _deferredInstallPrompt = null;
      } catch {
        // prompt() failed, show manual guide
        setShowGuide(true);
      }
    } else {
      // No deferred prompt available, show manual guide
      setShowGuide(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 left-4 right-4 z-[60] bg-white rounded-2xl shadow-2xl border border-border/60 p-4 flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
          <Smartphone className="w-6 h-6 text-emerald-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground">安装为 App</p>
          <p className="text-xs text-muted-foreground">添加到主屏幕，离线也能查看</p>
        </div>
        <button
          onClick={handleInstall}
          className="shrink-0 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          安装
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Manual Install Guide Modal (iOS Safari / Android Chrome fallback) */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/50 flex items-end justify-center p-4"
            onClick={() => setShowGuide(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {isIOS ? (
                <>
                  <h3 className="text-lg font-bold text-foreground text-center">在 iPhone 上安装</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sm font-bold text-sky-700">1</div>
                      <p className="text-sm text-foreground">点击底部 Safari 的 <Share className="w-4 h-4 inline text-sky-600" /> <strong>分享</strong>按钮</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sm font-bold text-sky-700">2</div>
                      <p className="text-sm text-foreground">向下滑动，选择 <strong>"添加到主屏幕"</strong></p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sm font-bold text-sky-700">3</div>
                      <p className="text-sm text-foreground">点击右上角 <strong>"添加"</strong> 即可完成</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-foreground text-center">在 Android 上安装</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700">1</div>
                      <p className="text-sm text-foreground">点击 Chrome 右上角 <strong>⋮ 菜单</strong>按钮</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700">2</div>
                      <p className="text-sm text-foreground">选择 <strong>"添加到主屏幕"</strong> 或 <strong>"安装应用"</strong></p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700">3</div>
                      <p className="text-sm text-foreground">点击 <strong>"安装"</strong> 确认即可</p>
                    </div>
                  </div>
                </>
              )}
              <button
                onClick={() => setShowGuide(false)}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium"
              >
                我知道了
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("status");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef<Record<Section, HTMLElement | null>>({
    status: null,
    calendar: null,
    products: null,
    crops: null,
    seedling: null,
    safety: null,
  });

  const scrollToSection = (id: Section) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
      { rootMargin: "-20% 0px -60% 0px" },
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const fungicides = products.filter((p) => p.category === "杀菌剂");
  const multiEffect = products.filter(
    (p) => p.category === "杀菌杀虫多效",
  );
  const insecticides = products.filter(
    (p) => p.category === "杀虫剂" || p.category === "物理防御",
  );
  const fertilizers = products.filter((p) => p.category === "肥料");

  const fruitTrees = crops.filter((c) => c.category === "果树");
  const berries = crops.filter((c) => c.category === "浆果");
  const veggies = crops.filter((c) => c.category === "蔬菜");
  const flowers = crops.filter((c) => c.category === "花卉");

  return (
    <div className="min-h-screen bg-background">
      {/* ─── PWA Install Banner ─── */}
      <InstallBanner />

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
            <p
              className="text-sm font-medium tracking-widest uppercase mb-2"
              style={{ color: "var(--color-earth)" }}
            >
              2026 家庭园艺手册
            </p>
            <h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-sm"
              style={{ color: "var(--color-bark)" }}
            >
              果园与菜园
              <br />
              <span style={{ color: "var(--color-moss)" }}>
                施肥与植保指南
              </span>
            </h1>
            <p
              className="mt-4 text-sm sm:text-base max-w-xl leading-relaxed"
              style={{ color: "var(--color-earth)" }}
            >
              涵盖苹果、梨、葡萄、蓝莓、番茄、辣椒、茄子、芹菜、南瓜、豆角、玫瑰共
              11 种作物。
              <br />
              含育苗定植、浇水管理、预防性打药、施肥追肥完整方案。
            </p>
          </motion.div>
        </div>
      </header>

      {/* ─── Sticky Nav ─── */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/60 shadow-sm">
        <div className="container">
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 py-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
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
          <div className="md:hidden flex items-center justify-between py-2">
            <span className="text-sm font-semibold text-foreground">
              {NAV_ITEMS.find((n) => n.id === activeSection)?.label}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-muted"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden pb-2"
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
      <main className="container py-8 space-y-12">
        {/* ─── Plant Status Section ─── */}
        <section
          id="status"
          ref={(el) => {
            sectionRefs.current.status = el;
          }}
          className="scroll-mt-20"
        >
          <FadeIn>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  🚨 当前植物状态
                </h2>
                <p className="text-sm text-muted-foreground">
                  2026年4月初 — 每棵植物现在该做什么
                </p>
              </div>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            {plantStatus.map((plant, i) => (
              <FadeIn key={plant.id} delay={i * 0.05}>
                <PlantStatusCard plant={plant} />
              </FadeIn>
            ))}
          </div>
        </section>

        <Divider icon={<Calendar className="w-5 h-5" />} />

        {/* ─── Calendar Section ─── */}
        <section
          id="calendar"
          ref={(el) => {
            sectionRefs.current.calendar = el;
          }}
          className="scroll-mt-20"
        >
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  月历时间表
                </h2>
                <p className="text-sm text-muted-foreground">
                  按月份查看施肥、打药、浇水、育苗全部计划 — 点击展开查看详情
                </p>
              </div>
            </div>
          </FadeIn>
          <div className="space-y-4">
            {calendar.map((month, i) => (
              <FadeIn key={month.month} delay={i * 0.05}>
                <CalendarMonthCard month={month} />
              </FadeIn>
            ))}
          </div>
        </section>

        <Divider icon={<Droplets className="w-5 h-5" />} />

        {/* ─── Products Section ─── */}
        <section
          id="products"
          ref={(el) => {
            sectionRefs.current.products = el;
          }}
          className="scroll-mt-20"
        >
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  药剂与肥料速查
                </h2>
                <p className="text-sm text-muted-foreground">
                  点击展开查看配比、频率、PHI 和 Amazon 评分
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Fungicides */}
          <FadeIn>
            <h3 className="flex items-center gap-2 text-lg font-display font-semibold text-foreground mb-3">
              <Shield className="w-4 h-4 text-emerald-600" />
              杀菌剂
              <span className="text-xs font-normal text-muted-foreground">
                （预防和治疗真菌病害）
              </span>
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {fungicides.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>

          {/* Multi-effect */}
          {multiEffect.length > 0 && (
            <>
              <FadeIn>
                <h3 className="flex items-center gap-2 text-lg font-display font-semibold text-foreground mb-3">
                  <Leaf className="w-4 h-4 text-teal-600" />
                  杀菌杀虫多效
                  <span className="text-xs font-normal text-muted-foreground">
                    （4合1：杀菌+杀虫+杀螨+杀线虫）
                  </span>
                </h3>
              </FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {multiEffect.map((p, i) => (
                  <FadeIn key={p.id} delay={i * 0.05}>
                    <ProductCard product={p} />
                  </FadeIn>
                ))}
              </div>
            </>
          )}

          {/* Insecticides */}
          <FadeIn>
            <h3 className="flex items-center gap-2 text-lg font-display font-semibold text-foreground mb-3">
              <Bug className="w-4 h-4 text-amber-600" />
              杀虫剂与物理防御
              <span className="text-xs font-normal text-muted-foreground">
                （防治虫害）
              </span>
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
              <span className="text-xs font-normal text-muted-foreground">
                （营养补给）
              </span>
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

        <Divider icon={<Flower2 className="w-5 h-5" />} />

        {/* ─── Crops Section ─── */}
        <section
          id="crops"
          ref={(el) => {
            sectionRefs.current.crops = el;
          }}
          className="scroll-mt-20"
        >
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  作物管理
                </h2>
                <p className="text-sm text-muted-foreground">
                  查看每种作物的病虫害和适用产品
                </p>
              </div>
            </div>
          </FadeIn>

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

        <Divider icon={<Sprout className="w-5 h-5" />} />

        {/* ─── Seedling Guide Section ─── */}
        <section
          id="seedling"
          ref={(el) => {
            sectionRefs.current.seedling = el;
          }}
          className="scroll-mt-20"
        >
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-lime-100 flex items-center justify-center">
                <Sprout className="w-5 h-5 text-lime-700" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  育苗与定植指南
                </h2>
                <p className="text-sm text-muted-foreground">
                  土温要求、株距、种植深度、炼苗方法
                </p>
              </div>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {seedlingGuides.map((g, i) => (
              <FadeIn key={g.crop} delay={i * 0.05}>
                <SeedlingCard guide={g} />
              </FadeIn>
            ))}
          </div>
        </section>

        <Divider icon={<Shield className="w-5 h-5" />} />

        {/* ─── Safety Section ─── */}
        <section
          id="safety"
          ref={(el) => {
            sectionRefs.current.safety = el;
          }}
          className="scroll-mt-20"
        >
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  安全准则（必读）
                </h2>
                <p className="text-sm text-muted-foreground">
                  使用任何药剂前请务必阅读以下安全规则
                </p>
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
            数据来源：密苏里大学农业推广站 · 威斯康星大学推广站 · EPA产品标签 ·
            Amazon用户评价
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            2026 家庭果园与菜园管理手册 · 产品已更新为 Bonide Captain Jack's
            系列
          </p>
        </div>
      </footer>
    </div>
  );
}
