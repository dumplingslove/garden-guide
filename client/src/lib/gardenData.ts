// ============================================================
// 家庭果园与菜园施肥与植保指南 — 核心数据
// 设计风格：田园手帐 (Illustrated Naturalism)
// 色彩：大地色系 + 季节强调色
// ============================================================

export interface Product {
  id: string;
  name: string;
  nameCn: string;
  activeIngredient: string;
  activeIngredientCn: string;
  role: "核心预防" | "纯预防性" | "治疗为主" | "纯治疗性" | "预防性地面防御" | "酸性专用肥" | "蔬菜促果肥" | "有机底肥" | "速效追肥" | "花卉专用" | "物理防御";
  category: "杀菌剂" | "杀虫剂" | "肥料" | "物理防御";
  mixRatio: string;
  frequency: string;
  phi: string;
  amazonRating: string;
  keyWarning?: string;
  icon: string;
}

export interface Crop {
  id: string;
  name: string;
  emoji: string;
  category: "果树" | "浆果" | "蔬菜" | "花卉";
  diseases: string[];
  pests: string[];
  matchedProducts: string[];
}

export interface CalendarMonth {
  month: string;
  monthNum: number;
  season: "spring" | "summer" | "autumn";
  title: string;
  goal: string;
  warning?: string;
  tasks: CalendarTask[];
}

export interface CalendarTask {
  crops: string;
  type: "预防打药" | "治疗打药" | "施肥" | "物理防御" | "停药" | "应急治疗";
  action: string;
  frequency?: string;
  detail: string;
}

export const products: Product[] = [
  {
    id: "immunox",
    name: "Spectracide Immunox",
    nameCn: "Immunox 内吸性杀菌剂",
    activeIngredient: "Myclobutanil",
    activeIngredientCn: "腈菌唑",
    role: "核心预防",
    category: "杀菌剂",
    mixRatio: "每加仑水兑 1.5 液量盎司",
    frequency: "生长季每 7-14 天一次",
    phi: "苹果/梨/葡萄：14天\n南瓜/扁豆：当天",
    amazonRating: "4.5/5 (96%推荐)",
    keyWarning: "配比必须按标签1.5 fl oz/gal，非1.25",
    icon: "🛡️",
  },
  {
    id: "liquicop",
    name: "Monterey Liqui-Cop",
    nameCn: "铜杀菌剂",
    activeIngredient: "Copper Ammonium Complex",
    activeIngredientCn: "铜氨络合物",
    role: "纯预防性",
    category: "杀菌剂",
    mixRatio: "果树休眠期：1-4茶匙/加仑\n蔬菜生长期：2-6茶匙/加仑",
    frequency: "每 7-14 天一次",
    phi: "多数作物可用至采收当天",
    amazonRating: "4.6/5",
    icon: "🧪",
  },
  {
    id: "hortoil",
    name: "Bonide Horticultural Oil",
    nameCn: "矿物油",
    activeIngredient: "Mineral Oil",
    activeIngredientCn: "矿物油",
    role: "纯预防性",
    category: "杀菌剂",
    mixRatio: "休眠期：5-10汤匙/加仑 (2-4%)\n生长期：5汤匙/加仑 (2.5 fl oz)",
    frequency: "休眠期仅喷1-2次",
    phi: "喷洒后30天内严禁使用含硫农药",
    amazonRating: "5/5",
    keyWarning: "气温>90°F(32°C)时严禁使用！",
    icon: "🫧",
  },
  {
    id: "deadbug",
    name: "Captain Jack's Deadbug Brew",
    nameCn: "多杀霉素杀虫剂",
    activeIngredient: "Spinosad",
    activeIngredientCn: "多杀霉素",
    role: "治疗为主",
    category: "杀虫剂",
    mixRatio: "每加仑水兑 2 液量盎司 (4汤匙)",
    frequency: "害虫高发期每 4-7 天一次",
    phi: "苹果/梨：7天\n蔬菜：1-3天",
    amazonRating: "4.8/5",
    keyWarning: "施用后3小时内对蜜蜂有毒！花期禁用",
    icon: "🐛",
  },
  {
    id: "sevin",
    name: "Sevin Concentrate",
    nameCn: "强力触杀杀虫剂（浓缩版）",
    activeIngredient: "Zeta-Cypermethrin 0.35%",
    activeIngredientCn: "高效氯氟氰菊酯",
    role: "纯治疗性",
    category: "杀虫剂",
    mixRatio: "每加仑水兑 4 液量盎司",
    frequency: "每 7 天最多一次（局部喷洒）",
    phi: "苹果/梨：14天\n葡萄/蓝莓/蔬菜：1天",
    amazonRating: "4.4/5 (1,827评价)",
    keyWarning: "对蜜蜂高毒，花期严禁使用！仅限应急",
    icon: "⚡",
  },
  {
    id: "sluggo",
    name: "Sluggo Plus",
    nameCn: "地面颗粒诱饵",
    activeIngredient: "Iron Phosphate + Spinosad",
    activeIngredientCn: "磷酸铁 + 多杀霉素",
    role: "预防性地面防御",
    category: "杀虫剂",
    mixRatio: "每1000平方英尺撒 0.5-1 磅",
    frequency: "30天内最多3次，雨后补撒",
    phi: "3天",
    amazonRating: "4.6/5 (1,963评价)",
    icon: "🐌",
  },
  {
    id: "bioadvanced",
    name: "BioAdvanced Rose & Flower Care",
    nameCn: "蓝色瓶（仅限花卉！）",
    activeIngredient: "Imidacloprid + Tebuconazole",
    activeIngredientCn: "吡虫啉 + 戊唑醇",
    role: "花卉专用",
    category: "杀虫剂",
    mixRatio: "灌根：3 fl oz/加仑\n每6周一次，每年最多3次",
    frequency: "每 6 周一次",
    phi: "⚠️ 严禁用于任何可食用植物！",
    amazonRating: "5/5",
    keyWarning: "⚠️ 严禁用于果树和蔬菜！含吡虫啉，对蜜蜂高毒！",
    icon: "🌹",
  },
  {
    id: "hollytone",
    name: "Espoma Holly-tone (4-3-4)",
    nameCn: "蓝莓专属酸性肥",
    activeIngredient: "Organic 4-3-4",
    activeIngredientCn: "有机肥 4-3-4",
    role: "酸性专用肥",
    category: "肥料",
    mixRatio: "蓝莓每英尺枝展撒1杯\n滴水线撒施后浇透水",
    frequency: "每年2次（早春 + 落花后45-60天）",
    phi: "有机肥，无PHI限制",
    amazonRating: "4.8/5 (1,492评价, 95%推荐)",
    icon: "🫐",
  },
  {
    id: "kellogg",
    name: "Kellogg Organic Citrus & Fruit Food",
    nameCn: "有机底肥",
    activeIngredient: "Organic NPK",
    activeIngredientCn: "有机复合肥",
    role: "有机底肥",
    category: "肥料",
    mixRatio: "翻土时拌入，按包装说明用量",
    frequency: "春季整地时一次",
    phi: "有机肥，无PHI限制",
    amazonRating: "4.5/5",
    icon: "🌱",
  },
  {
    id: "vigoro",
    name: "Vigoro / Pennington 番茄肥",
    nameCn: "蔬菜促果肥（含钙防烂底）",
    activeIngredient: "NPK + Calcium",
    activeIngredientCn: "氮磷钾 + 钙",
    role: "蔬菜促果肥",
    category: "肥料",
    mixRatio: "每株番茄/辣椒/茄子约 3-4 汤匙\n撒在根部周围后浇水",
    frequency: "结果期每 3-4 周一次",
    phi: "化肥，无PHI限制",
    amazonRating: "4.5/5",
    icon: "🍅",
  },
  {
    id: "miraclegro",
    name: "Miracle-Gro Water Soluble + Garden Feeder",
    nameCn: "速效水溶肥",
    activeIngredient: "Water Soluble NPK",
    activeIngredientCn: "速溶氮磷钾",
    role: "速效追肥",
    category: "肥料",
    mixRatio: "按Garden Feeder说明兑水喷施",
    frequency: "生长旺盛期每 7-14 天一次",
    phi: "化肥，无PHI限制",
    amazonRating: "4.7/5",
    icon: "💧",
  },
  {
    id: "catchmaster",
    name: "Catchmaster 粘带",
    nameCn: "物理阻隔粘带",
    activeIngredient: "无（物理方式）",
    activeIngredientCn: "物理粘捕",
    role: "物理防御",
    category: "物理防御",
    mixRatio: "缠绕树干一圈",
    frequency: "春季安装，定期检查更换",
    phi: "无",
    amazonRating: "4.3/5",
    icon: "🪤",
  },
];

export const crops: Crop[] = [
  {
    id: "apple",
    name: "苹果树",
    emoji: "🍎",
    category: "果树",
    diseases: ["黑星病(Apple Scab)", "白粉病", "锈病"],
    pests: ["蚜虫", "苹果蠹蛾", "日本甲虫"],
    matchedProducts: ["immunox", "liquicop", "hortoil", "deadbug", "sevin", "kellogg", "catchmaster"],
  },
  {
    id: "pear",
    name: "梨树",
    emoji: "🍐",
    category: "果树",
    diseases: ["黑星病", "火疫病"],
    pests: ["梨木虱", "蚜虫"],
    matchedProducts: ["immunox", "liquicop", "hortoil", "deadbug", "sevin", "kellogg", "catchmaster"],
  },
  {
    id: "grape",
    name: "葡萄",
    emoji: "🍇",
    category: "果树",
    diseases: ["黑腐病", "白粉病", "霜霉病", "灰霉病"],
    pests: ["葡萄叶蝉", "日本甲虫"],
    matchedProducts: ["immunox", "liquicop", "deadbug", "sevin"],
  },
  {
    id: "blueberry",
    name: "蓝莓",
    emoji: "🫐",
    category: "浆果",
    diseases: ["僵果病", "枝枯病"],
    pests: ["蓝莓果蝇", "鸟害"],
    matchedProducts: ["hollytone", "deadbug", "sevin"],
  },
  {
    id: "tomato",
    name: "番茄",
    emoji: "🍅",
    category: "蔬菜",
    diseases: ["早疫病", "晚疫病", "叶斑病"],
    pests: ["番茄角斑蛾", "蚜虫", "蠼螋"],
    matchedProducts: ["liquicop", "deadbug", "sevin", "vigoro", "miraclegro", "sluggo"],
  },
  {
    id: "pepper",
    name: "辣椒",
    emoji: "🌶️",
    category: "蔬菜",
    diseases: ["炭疽病", "细菌性斑点病"],
    pests: ["蚜虫", "跳甲"],
    matchedProducts: ["liquicop", "deadbug", "sevin", "vigoro", "miraclegro", "sluggo"],
  },
  {
    id: "eggplant",
    name: "茄子",
    emoji: "🍆",
    category: "蔬菜",
    diseases: ["早疫病", "叶斑病"],
    pests: ["跳甲", "蚜虫"],
    matchedProducts: ["liquicop", "deadbug", "sevin", "vigoro", "miraclegro"],
  },
  {
    id: "celery",
    name: "芹菜",
    emoji: "🥬",
    category: "蔬菜",
    diseases: ["叶斑病", "早疫病"],
    pests: ["蚜虫", "潜叶蝇"],
    matchedProducts: ["liquicop", "deadbug", "miraclegro"],
  },
  {
    id: "pumpkin",
    name: "南瓜",
    emoji: "🎃",
    category: "蔬菜",
    diseases: ["白粉病", "霜霉病"],
    pests: ["南瓜虫", "黄瓜甲虫"],
    matchedProducts: ["immunox", "liquicop", "deadbug", "sevin", "miraclegro"],
  },
  {
    id: "bean",
    name: "扁豆",
    emoji: "🫘",
    category: "蔬菜",
    diseases: ["锈病", "细菌性枯萎病"],
    pests: ["豆荚螟", "蚜虫"],
    matchedProducts: ["immunox", "liquicop", "deadbug", "miraclegro"],
  },
  {
    id: "rose",
    name: "玫瑰/月季",
    emoji: "🌹",
    category: "花卉",
    diseases: ["黑斑病", "白粉病"],
    pests: ["蚜虫", "蓟马", "日本甲虫"],
    matchedProducts: ["bioadvanced", "immunox", "deadbug"],
  },
];

export const calendar: CalendarMonth[] = [
  {
    month: "3月-4月",
    monthNum: 3,
    season: "spring",
    title: "早春 / 休眠期至发芽期",
    goal: "终极清园，底肥施入，窒息越冬病虫害",
    tasks: [
      {
        crops: "🍎🍐🍇 苹果、梨、葡萄",
        type: "预防打药",
        action: "终极清园喷雾（仅限一次）",
        detail: "Liqui-Cop (1-4茶匙/加仑) + 矿物油 (5-10汤匙/加仑) 混合，用Milwaukee喷雾器彻底喷湿所有枝干和树皮缝隙。选择无风、气温>40°F的晴天上午操作。",
        frequency: "仅此一次",
      },
      {
        crops: "🫐 蓝莓",
        type: "施肥",
        action: "第一次Holly-tone追肥",
        detail: "在蓝莓树冠滴水线下撒施Holly-tone（每英尺枝展1杯），轻轻拌入表土2-3cm，立刻浇透水。注意：Holly-tone有臭味，属正常现象。",
        frequency: "本年度第1次（共2次）",
      },
      {
        crops: "🍎🍐🍇 全线果树",
        type: "物理防御",
        action: "安装物理防线",
        detail: "在果树树干距地面30-60cm处缠绕Catchmaster粘带一圈；树下方圆1米范围撒布Sluggo Plus颗粒（约0.5磅/1000sqft）诱杀越冬蠼螋。",
        frequency: "粘带整季保留，Sluggo每月补撒",
      },
      {
        crops: "🍅🌶️🍆🥬🎃🫘 所有蔬菜",
        type: "施肥",
        action: "整地底肥",
        detail: "翻土时将Kellogg Organic颗粒肥均匀拌入土壤上层15-20cm。老肥料（2-3年前）可用，结块先用锤子敲碎。",
        frequency: "仅此一次",
      },
    ],
  },
  {
    month: "4月-5月",
    monthNum: 4,
    season: "spring",
    title: "粉红蕾期至盛花期",
    goal: "花期保护，预防早期真菌",
    warning: "⚠️ 果树开花期间绝对禁止使用任何杀虫剂！保护蜜蜂！",
    tasks: [
      {
        crops: "🍎🍐 苹果、梨",
        type: "预防打药",
        action: "花前防病（粉红蕾期）",
        detail: "喷洒Immunox (1.5盎司/加仑) 预防黑星病和白粉病。必须在花朵开放之前完成！用Milwaukee喷雾器中档，喷湿叶片正反面和花蕾。",
        frequency: "花前喷1次",
      },
      {
        crops: "🍇 葡萄",
        type: "预防打药",
        action: "新梢期防病",
        detail: "新梢长出6-10英寸时，喷洒Immunox或Liqui-Cop预防黑腐病和霜霉病。",
        frequency: "每10-14天一次",
      },
      {
        crops: "🌹 玫瑰/月季",
        type: "施肥",
        action: "灌根防虫施肥",
        detail: "使用BioAdvanced蓝色瓶 (3盎司/加仑) 浇灌根部。⚠️ 严禁在蔬菜区附近使用！严禁用于任何可食用植物！",
        frequency: "每6周一次（本年度第1次）",
      },
      {
        crops: "🍅🌶️🍆🥬 番茄、辣椒、茄子、芹菜",
        type: "施肥",
        action: "育苗/移栽准备",
        detail: "室内育苗或购买苗株。移栽前一周开始炼苗。移栽时在定植穴底部撒入少量Kellogg Organic底肥。",
        frequency: "一次性操作",
      },
    ],
  },
  {
    month: "5月-6月",
    monthNum: 5,
    season: "spring",
    title: "落花期至幼果期 / 蔬菜定植后",
    goal: "全年最重要的一喷（保果），蔬菜病害防御战打响",
    tasks: [
      {
        crops: "🍎🍐 苹果、梨",
        type: "预防打药",
        action: "⭐ 黄金保果喷雾（落花后立即）",
        detail: "落花后立即喷洒 Immunox (1.5盎司/加仑) + Deadbug Brew (2盎司/加仑) 混合液。这是全年最关键的一次喷洒！用Milwaukee喷雾器高档，360°喷湿整棵树。",
        frequency: "每10-14天重复，连喷2-3次",
      },
      {
        crops: "🫐 蓝莓",
        type: "施肥",
        action: "第二次Holly-tone追肥",
        detail: "距第一次施肥45-60天后，再次在滴水线下撒施Holly-tone（用量同第一次）。",
        frequency: "本年度第2次（共2次）",
      },
      {
        crops: "🍇 葡萄",
        type: "预防打药",
        action: "花后覆盖喷洒",
        detail: "葡萄落花后7-10天开始，喷洒Immunox预防黑腐病。此后每10-14天重复一次。",
        frequency: "每10-14天一次",
      },
      {
        crops: "🍅🌶️🍆🥬 番茄、辣椒、茄子、芹菜",
        type: "预防打药",
        action: "定植后防叶斑/疫病",
        detail: "移栽定植后2-3周开始，每7-10天喷洒Liqui-Cop (2-6茶匙/加仑) 预防叶斑病和疫病。清晨喷洒，避免烈日下操作。",
        frequency: "每7-10天一次",
      },
      {
        crops: "🍅🌶️🍆🥬🎃🫘 所有蔬菜",
        type: "施肥",
        action: "提苗追肥",
        detail: "定植后2-3周，使用Garden Feeder喷洒Miracle-Gro水溶肥，促进根系和茎叶生长。",
        frequency: "每7-14天一次",
      },
    ],
  },
  {
    month: "7月-8月",
    monthNum: 7,
    season: "summer",
    title: "夏季高温 / 果实膨大期",
    goal: "维持防线，应对突发虫害，蔬菜促果",
    tasks: [
      {
        crops: "🍎🍐🍇 苹果、梨、葡萄",
        type: "预防打药",
        action: "夏季覆盖喷洒",
        detail: "每14天单独喷洒一次Immunox (1.5盎司/加仑)，维持杀菌保护层。高温天(>90°F)改在清晨或傍晚喷洒。",
        frequency: "每14天一次",
      },
      {
        crops: "🎃🫘 南瓜、扁豆",
        type: "预防打药",
        action: "防白粉病/锈病",
        detail: "南瓜藤蔓蔓延、扁豆开花前开始，每14天喷洒Immunox预防白粉病和锈病。",
        frequency: "每14天一次",
      },
      {
        crops: "🍎🍐🍇🍅🌶️🍆🎃🫘 全线果蔬",
        type: "应急治疗",
        action: "突发虫害应急处理",
        detail: "发现日本甲虫、大量毛毛虫或跳甲时：局部喷洒Sevin Concentrate (4盎司/加仑)。仅喷受害部位，不要全树喷洒。清晨或傍晚操作（保护蜜蜂）。",
        frequency: "仅在发现害虫时使用，每7天最多1次",
      },
      {
        crops: "🍅🌶️🍆 番茄、辣椒、茄子",
        type: "施肥",
        action: "促果防烂底追肥",
        detail: "果实开始膨大时，每3-4周在根部周围撒施Vigoro/Pennington番茄肥 (3-4汤匙/株)，随后浇透水。含钙配方可预防烂底病(BER)。",
        frequency: "每3-4周一次",
      },
      {
        crops: "🎃🥬 南瓜、芹菜",
        type: "施肥",
        action: "促蔓/促叶追肥",
        detail: "每7-14天用Garden Feeder喷施Miracle-Gro水溶肥，促进南瓜蔓延和芹菜叶柄生长。",
        frequency: "每7-14天一次",
      },
      {
        crops: "🌹 玫瑰/月季",
        type: "预防打药",
        action: "第二次灌根",
        detail: "距上次灌根6周后，再次使用BioAdvanced蓝色瓶灌根。同时可喷洒Immunox预防黑斑病。",
        frequency: "每6周一次",
      },
    ],
  },
  {
    month: "8月-10月",
    monthNum: 8,
    season: "autumn",
    title: "采收前安全期",
    goal: "确保食品绝对安全，严格遵守停药期",
    tasks: [
      {
        crops: "🍎🍐 苹果、梨",
        type: "停药",
        action: "停药倒计时",
        detail: "采收前14天：停用Immunox和Sevin\n采收前7天：停用Deadbug Brew\n采收前用清水冲洗果实",
        frequency: "严格按PHI执行",
      },
      {
        crops: "🍇 葡萄",
        type: "停药",
        action: "停药倒计时",
        detail: "采收前14天：停用Immunox\n采收前1天：停用Sevin和Deadbug Brew\n注意观察果穗有无灰霉病",
        frequency: "严格按PHI执行",
      },
      {
        crops: "🫐 蓝莓",
        type: "停药",
        action: "停药倒计时",
        detail: "采收前1天：停用Sevin\n采收前7天：停用Deadbug Brew\n蓝莓采收期较早，注意提前停药",
        frequency: "严格按PHI执行",
      },
      {
        crops: "🍅🌶️🍆🥬🎃🫘 所有蔬菜",
        type: "停药",
        action: "蔬菜停药期",
        detail: "采收前1天：停用Deadbug Brew和Sevin\nLiqui-Cop（铜制剂）可用至采收当天\nSluggo Plus：采收前3天停用\n采收前用清水冲洗蔬菜",
        frequency: "严格按PHI执行",
      },
      {
        crops: "🍎🍐🍇🫐 全线果树/浆果",
        type: "施肥",
        action: "秋季基肥（可选）",
        detail: "采收结束后，在树冠滴水线下撒施Kellogg Organic有机肥，为来年储备养分。落叶后进行。",
        frequency: "采收后一次",
      },
    ],
  },
];

export const safetyRules = [
  {
    icon: "🐝",
    title: "蜜蜂保护法",
    content: "任何含杀虫剂（Deadbug、Sevin、BioAdvanced）的喷洒作业，必须在清晨或傍晚进行（蜜蜂不活跃时），且严禁在植物盛花期喷洒。Deadbug施用后3小时内对蜜蜂有毒。",
    level: "critical" as const,
  },
  {
    icon: "🔵",
    title: "蓝色瓶警告",
    content: "BioAdvanced Rose & Flower Care（蓝色瓶）含吡虫啉，严禁用于果树和蔬菜！仅限玫瑰/月季等观赏花卉。使用时远离蔬菜区。",
    level: "critical" as const,
  },
  {
    icon: "🔧",
    title: "Milwaukee喷雾器保养",
    content: "每次喷完铜制剂（Liqui-Cop）或矿物油后，必须在水箱中加入清水，开启喷雾器循环喷洗至少2分钟。这些药剂极易结晶或形成油垢，导致设备报废。",
    level: "warning" as const,
  },
  {
    icon: "🌡️",
    title: "气温限制",
    content: "白天最高气温超过90°F（32°C）时，严禁喷洒矿物油或任何乳油类农药，否则会导致严重药害（叶片焦枯）。",
    level: "warning" as const,
  },
  {
    icon: "📦",
    title: "老肥料的正确用法",
    content: "存放2-3年的颗粒肥（Vigoro、Kellogg）完全有效。使用前用锤子将结块敲碎。施肥后必须用大水彻底浇透，防止局部浓度过高烧伤根系。",
    level: "info" as const,
  },
  {
    icon: "⏰",
    title: "最佳喷药时间",
    content: "所有喷药作业优先选择清晨（日出后1-2小时）或傍晚（日落前2小时）。避免正午烈日下喷洒，既保护蜜蜂也防止药害。",
    level: "info" as const,
  },
];
