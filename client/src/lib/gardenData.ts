// ============================================================
// 家庭果园与菜园施肥与植保指南 — 核心数据 v2
// 设计风格：田园手帐 (Illustrated Naturalism)
// 更新：Bonide产品替换、植物当前状态、育苗浇水指南
// ============================================================

export interface Product {
  id: string;
  name: string;
  nameCn: string;
  activeIngredient: string;
  activeIngredientCn: string;
  role: "核心预防" | "纯预防性" | "预防+杀虫4合1" | "治疗为主" | "纯治疗性" | "预防性地面防御" | "酸性专用肥" | "蔬菜促果肥" | "有机底肥" | "速效追肥" | "花卉专用" | "物理防御" | "果树缓释基肥";
  category: "杀菌剂" | "杀虫剂" | "杀菌杀虫多效" | "肥料" | "物理防御";
  mixRatio: string;
  frequency: string;
  phi: string;
  amazonRating: string;
  keyWarning?: string;
  icon: string;
}

export interface PlantStatus {
  id: string;
  name: string;
  emoji: string;
  currentState: string;
  urgentAction: string;
  urgentDetail: string;
  nextAction: string;
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
  summary: PhaseSummary;
  tasks: CalendarTask[];
}

export interface PhaseSummary {
  sprayCount: number;
  fertCount: number;
  waterCount: number;
  otherCount: number;
  keyActions: string[];  // 3-5 bullet points for quick visual overview
}

export interface CalendarTask {
  crops: string;
  type: "预防打药" | "治疗打药" | "施肥" | "物理防御" | "停药" | "应急治疗" | "育苗" | "浇水";
  action: string;
  frequency?: string;
  detail: string;
}

export interface SeedlingGuide {
  crop: string;
  emoji: string;
  method: "移栽小苗" | "直播种子" | "已定植";
  soilTemp: string;
  spacing: string;
  depth: string;
  hardenOff: string;
  tips: string;
}

export interface WateringGuide {
  crop: string;
  emoji: string;
  category: "果树" | "浆果" | "蔬菜" | "花卉";
  newPlant: string;
  established: string;
  method: string;
  tips: string;
}

// ─── 产品数据（已替换：矿物油→印楝油，Liqui-Cop→铜皂）───
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
    id: "coppersoap",
    name: "Captain Jack's Copper Fungicide",
    nameCn: "铜皂杀菌剂（替代Liqui-Cop）",
    activeIngredient: "Copper Octanoate 10%",
    activeIngredientCn: "辛酸铜（铜皂）",
    role: "纯预防性",
    category: "杀菌剂",
    mixRatio: "果树：1-3汤匙/加仑\n蔬菜：2-4汤匙/加仑\n（按标签具体作物调整）",
    frequency: "每 7-10 天一次",
    phi: "有机认证，可用至采收当天",
    amazonRating: "4.4/5",
    keyWarning: "比Liqui-Cop更温和，药害风险更低。喷后必须清洗喷雾器！",
    icon: "🧪",
  },
  {
    id: "neemoil",
    name: "Captain Jack's Fruit Tree Spray",
    nameCn: "印楝油4合1（替代矿物油）",
    activeIngredient: "Cold Pressed Neem Oil 70%",
    activeIngredientCn: "冷压印楝油",
    role: "预防+杀虫4合1",
    category: "杀菌杀虫多效",
    mixRatio: "每加仑水兑 2 汤匙（1 fl oz）\n一品脱浓缩液可配20加仑",
    frequency: "每 10-14 天一次",
    phi: "有机认证，可用至采收当天",
    amazonRating: "4.3/5",
    keyWarning: "低温(<60°F)会凝固，需温水预溶。不适合休眠期高浓度清园。30天内勿与含硫药剂混用。",
    icon: "🌿",
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
    id: "treetone",
    name: "Espoma Tree-tone (6-3-2)",
    nameCn: "果树缓释有机肥（含益生菌）",
    activeIngredient: "Organic 6-3-2 + Bio-tone Microbes + 5% Calcium",
    activeIngredientCn: "有机肥 6-3-2 + Bio-tone益生菌 + 5%钙",
    role: "果树缓释基肥",
    category: "肥料",
    mixRatio: "按树干直径用量（1磅≈3杯）：\n• 树干≤2英寸：3磅(9杯)/英寸\n• 树干2-4英寸：4磅(12杯)/英寸\n• 树干4-6英寸：5磅(15杯)/英寸\n• 树干>6英寸：6磅(18杯)/英寸\n葡萄：每株约1-2磅(3-6杯)",
    frequency: "每年2次（早春发芽前 + 秋季落叶后）",
    phi: "有机肥，无PHI限制",
    amazonRating: "4.7/5 (数千评价，50年经典)",
    keyWarning: "颗粒缓释肥，不需要兑水溶解！直接撒在土壤表面或埋入土中，施后浇透水即可。",
    icon: "🌳",
  },
  {
    id: "kellogg",
    name: "Kellogg Organic Citrus & Fruit Food",
    nameCn: "有机底肥（蔬菜定植/补充用）",
    activeIngredient: "Organic NPK",
    activeIngredientCn: "有机复合肥",
    role: "有机底肥",
    category: "肥料",
    mixRatio: "蔬菜定植穴：拌入 1-2 汤匙\n颗粒肥，直接撒施后浇透水",
    frequency: "蔬菜定植时一次",
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
    name: "Miracle-Gro Vegetables & Herbs (18-18-21)",
    nameCn: "速效水溶肥（蔬菜专用追肥）",
    activeIngredient: "Water Soluble 18-18-21",
    activeIngredientCn: "速溶氮磷钾 18-18-21",
    role: "速效追肥",
    category: "肥料",
    mixRatio: "Garden Feeder喷施器：装入肥粉，接水管自动配比\n手动兑水：1汤匙(约15g)/1加仑(3.8L)水\n每棵蔬菜浇灌约0.5-1加仑稀释液",
    frequency: "蔬菜：每 7-14 天一次",
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

// ─── 植物当前状态（2026年4月初）───
export const plantStatus: PlantStatus[] = [
  {
    id: "pear",
    name: "梨树",
    emoji: "🍐",
    currentState: "🌸 正在开花",
    urgentAction: "花期禁止喷杀虫剂！仅可喷杀菌剂",
    urgentDetail: "立即喷 Immunox (1.5 oz/gal) 预防黑星病。花期严禁使用 Deadbug、Sevin 等任何杀虫剂，保护蜜蜂授粉。",
    nextAction: "落花后立即进行「黄金保果喷雾」",
  },
  {
    id: "apple1",
    name: "苹果树 1号",
    emoji: "🍎",
    currentState: "🌿 已长出嫩叶",
    urgentAction: "立即开始喷 Immunox 预防黑星病",
    urgentDetail: "黑星病在嫩叶展开时最易感染！立即喷 Immunox (1.5 oz/gal)，每 7-10 天重复。可搭配印楝油 (Fruit Tree Spray) 低浓度喷洒防虫。",
    nextAction: "花苞出现时继续喷 Immunox，花开后停杀虫剂",
  },
  {
    id: "apple2",
    name: "苹果树 2号",
    emoji: "🍎",
    currentState: "🌺 有花苞了",
    urgentAction: "花苞期（粉红蕾期）是喷药黄金窗口",
    urgentDetail: "立即喷 Immunox (1.5 oz/gal) 预防黑星病和白粉病。必须在花朵完全打开之前完成！一旦花开，停止所有杀虫剂。",
    nextAction: "花开后仅喷杀菌剂，落花后进行黄金保果喷雾",
  },
  {
    id: "blueberry",
    name: "蓝莓",
    emoji: "🫐",
    currentState: "🌺 有花苞",
    urgentAction: "施第一次 Holly-tone + 花期禁杀虫剂",
    urgentDetail: "如还未施肥，立即在滴水线下撒 Holly-tone (每英尺枝展1杯)。花苞期/花期禁止喷杀虫剂。可喷铜皂 (1-2汤匙/gal) 预防僵果病。",
    nextAction: "落花后45-60天施第二次 Holly-tone",
  },
  {
    id: "grape",
    name: "葡萄",
    emoji: "🍇",
    currentState: "💤 还没发芽",
    urgentAction: "抓紧最后的清园窗口",
    urgentDetail: "葡萄未发芽时是清园最佳时机！喷铜皂 (2-3汤匙/gal) + 印楝油 (2汤匙/gal) 混合液清除越冬病菌和虫卵。安装 Catchmaster 粘带。",
    nextAction: "新梢长出6-10英寸时开始喷 Immunox",
  },
  {
    id: "veggies",
    name: "番茄/辣椒/茄子/芹菜",
    emoji: "🍅",
    currentState: "🌱 刚买的小苗",
    urgentAction: "炼苗 + 准备定植",
    urgentDetail: "小苗需先炼苗5-7天：白天搬到室外半阴处，晚上搬回室内。等最后一次霜冻过后再定植。定植穴底部拌入 Kellogg 有机底肥。",
    nextAction: "定植后2-3周开始喷铜皂预防病害",
  },
  {
    id: "seeds",
    name: "南瓜/豆角",
    emoji: "🎃",
    currentState: "🌰 还是种子",
    urgentAction: "等土温达到60-70°F再直播",
    urgentDetail: "南瓜需土温≥70°F，豆角需≥60°F。可先在室内用育苗盘催芽（南瓜提前3-4周，豆角提前2周），或等5月中下旬直播到户外。播种深度：南瓜1英寸，豆角1-1.5英寸。",
    nextAction: "出苗后间苗，真叶展开后开始施薄肥",
  },
  {
    id: "rose",
    name: "玫瑰/月季",
    emoji: "🌹",
    currentState: "🌿 新芽萌发中",
    urgentAction: "第一次 BioAdvanced 蓝色瓶灌根",
    urgentDetail: "使用 BioAdvanced (3 oz/gal) 浇灌根部，提供6周的内吸性保护。⚠️ 严禁在蔬菜区附近使用！同时可喷 Immunox 预防黑斑病。",
    nextAction: "6周后第二次灌根",
  },
];

// ─── 作物数据（更新产品引用）───
export const crops: Crop[] = [
  {
    id: "apple",
    name: "苹果树",
    emoji: "🍎",
    category: "果树",
    diseases: ["黑星病(Apple Scab)", "白粉病", "锈病"],
    pests: ["蚊虫", "苹果蠹蛾", "日本甲虫"],
    matchedProducts: ["immunox", "coppersoap", "neemoil", "deadbug", "sevin", "treetone", "catchmaster"],
  },
  {
    id: "pear",
    name: "梨树",
    emoji: "🍐",
    category: "果树",
    diseases: ["黑星病", "火疫病"],
    pests: ["梨木虱", "蚊虫"],
    matchedProducts: ["immunox", "coppersoap", "neemoil", "deadbug", "sevin", "treetone", "catchmaster"],
  },
  {
    id: "grape",
    name: "葡萄",
    emoji: "🍇",
    category: "果树",
    diseases: ["黑腐病", "白粉病", "霜霉病", "灰霉病"],
    pests: ["葡萄叶蝉", "日本甲虫"],
    matchedProducts: ["immunox", "coppersoap", "neemoil", "deadbug", "sevin", "treetone"],
  },
  {
    id: "blueberry",
    name: "蓝莓",
    emoji: "🫐",
    category: "浆果",
    diseases: ["僵果病", "枝枯病"],
    pests: ["蓝莓果蝇", "鸟害"],
    matchedProducts: ["hollytone", "coppersoap", "deadbug", "sevin"],
  },
  {
    id: "tomato",
    name: "番茄",
    emoji: "🍅",
    category: "蔬菜",
    diseases: ["早疫病", "晚疫病", "叶斑病"],
    pests: ["番茄角斑蛾", "蚜虫", "蠼螋"],
    matchedProducts: ["coppersoap", "neemoil", "deadbug", "sevin", "vigoro", "miraclegro", "sluggo"],
  },
  {
    id: "pepper",
    name: "辣椒",
    emoji: "🌶️",
    category: "蔬菜",
    diseases: ["炭疽病", "细菌性斑点病"],
    pests: ["蚜虫", "跳甲"],
    matchedProducts: ["coppersoap", "neemoil", "deadbug", "sevin", "vigoro", "miraclegro", "sluggo"],
  },
  {
    id: "eggplant",
    name: "茄子",
    emoji: "🍆",
    category: "蔬菜",
    diseases: ["早疫病", "叶斑病"],
    pests: ["跳甲", "蚜虫"],
    matchedProducts: ["coppersoap", "neemoil", "deadbug", "sevin", "vigoro", "miraclegro"],
  },
  {
    id: "celery",
    name: "芹菜",
    emoji: "🥬",
    category: "蔬菜",
    diseases: ["叶斑病", "早疫病"],
    pests: ["蚜虫", "潜叶蝇"],
    matchedProducts: ["coppersoap", "neemoil", "deadbug", "miraclegro"],
  },
  {
    id: "pumpkin",
    name: "南瓜",
    emoji: "🎃",
    category: "蔬菜",
    diseases: ["白粉病", "霜霉病"],
    pests: ["南瓜虫", "黄瓜甲虫"],
    matchedProducts: ["immunox", "coppersoap", "neemoil", "deadbug", "sevin", "miraclegro"],
  },
  {
    id: "bean",
    name: "豆角",
    emoji: "🫘",
    category: "蔬菜",
    diseases: ["锈病", "细菌性枯萎病"],
    pests: ["豆荚螟", "蚜虫"],
    matchedProducts: ["immunox", "coppersoap", "neemoil", "deadbug", "miraclegro"],
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

// ─── 育苗指南 ───
export const seedlingGuides: SeedlingGuide[] = [
  {
    crop: "番茄",
    emoji: "🍅",
    method: "移栽小苗",
    soilTemp: "≥60°F (16°C)",
    spacing: "株距 24-36 英寸，行距 36-48 英寸",
    depth: "埋至第一对真叶以下（深栽促生根）",
    hardenOff: "定植前 5-7 天炼苗：白天放室外半阴处，夜间搬回",
    tips: "选择阴天或傍晚定植，减少移栽休克。定植后立即浇透定根水。可插支架或笼子。",
  },
  {
    crop: "辣椒",
    emoji: "🌶️",
    method: "移栽小苗",
    soilTemp: "≥65°F (18°C)",
    spacing: "株距 18-24 英寸，行距 24-36 英寸",
    depth: "与原土坨齐平（不要深栽）",
    hardenOff: "定植前 7-10 天炼苗，辣椒比番茄更怕冷",
    tips: "辣椒喜温，夜温低于50°F时需覆盖保温。定植穴底部拌入少量有机底肥。",
  },
  {
    crop: "茄子",
    emoji: "🍆",
    method: "移栽小苗",
    soilTemp: "≥70°F (21°C)",
    spacing: "株距 24-30 英寸，行距 30-36 英寸",
    depth: "与原土坨齐平",
    hardenOff: "定植前 7-10 天炼苗，茄子最怕冷风",
    tips: "茄子是最怕冷的蔬菜之一，确保霜冻完全过后再定植。喜肥，定植时多施底肥。",
  },
  {
    crop: "芹菜",
    emoji: "🥬",
    method: "移栽小苗",
    soilTemp: "≥50°F (10°C)，耐轻霜",
    spacing: "株距 6-10 英寸，行距 24 英寸",
    depth: "与原土坨齐平，不要埋住生长点",
    hardenOff: "定植前 5-7 天炼苗",
    tips: "芹菜喜凉爽湿润，需持续保持土壤湿润。生长期长（80-120天），需耐心。高温时用遮阳网。",
  },
  {
    crop: "南瓜",
    emoji: "🎃",
    method: "直播种子",
    soilTemp: "≥70°F (21°C)",
    spacing: "丘播：每丘2-3粒种子，丘距 4-6 英尺",
    depth: "播种深度 1 英寸",
    hardenOff: "直播无需炼苗。也可室内提前3-4周育苗再移栽",
    tips: "南瓜需大量空间蔓延。播种前浇透底水，覆土后轻压。出苗后间苗至每丘1-2株最壮苗。",
  },
  {
    crop: "豆角",
    emoji: "🫘",
    method: "直播种子",
    soilTemp: "≥60°F (16°C)",
    spacing: "株距 4-6 英寸，行距 18-24 英寸",
    depth: "播种深度 1-1.5 英寸",
    hardenOff: "直播无需炼苗。豆科不建议移栽（根系敏感）",
    tips: "豆科植物自带固氮根瘤菌，不需要太多氮肥。可搭架让蔓生品种攀爬。播种前可用接种剂拌种提高产量。",
  },
];

// ─── 浇水指南 ───
export const wateringGuides: WateringGuide[] = [
  {
    crop: "苹果/梨树",
    emoji: "🍎",
    category: "果树",
    newPlant: "定植后前2周：每天浇水\n3-12周：每2-3天浇一次\n12周后：每周一次",
    established: "每周深浇一次，每次 5-10 加仑\n干旱期增加至每周2次",
    method: "缓慢滴灌或用水管在滴水线下慢流15-20分钟，浸透根区12-18英寸深",
    tips: "避免频繁浅浇，会导致根系上浮。果实膨大期（6-8月）需水量最大。秋季落叶前减少浇水。",
  },
  {
    crop: "葡萄",
    emoji: "🍇",
    category: "果树",
    newPlant: "定植第一年：每周浇2-3次\n每次约2加仑",
    established: "每周深浇一次，每次约5加仑\n转色期（Veraison）后减少浇水促进糖分积累",
    method: "滴灌最佳，避免喷洒叶片（减少真菌病害）",
    tips: "葡萄根系较深，成熟后比较耐旱。过度浇水会导致果实风味变淡。转色后适当控水。",
  },
  {
    crop: "蓝莓",
    emoji: "🫐",
    category: "浆果",
    newPlant: "定植后前2周：每天浇水\n之后：每2-3天一次",
    established: "每周 1-2 英寸水量\n保持土壤持续湿润但不积水",
    method: "滴灌或浅浇，蓝莓根系很浅（集中在表层6-8英寸）。覆盖3-4英寸松针或木屑保湿",
    tips: "蓝莓是最需水的果树之一！根系极浅，干旱1-2天就会受损。用雨水或酸化水浇灌最佳（蓝莓喜酸）。",
  },
  {
    crop: "番茄",
    emoji: "🍅",
    category: "蔬菜",
    newPlant: "移栽后立即浇透定根水\n前2周：每天浇水\n之后：每2-3天一次",
    established: "每周 1-2 英寸水量\n深浇2-3次/周，优于每天浅浇",
    method: "根部浇水，避免淋湿叶片（减少疫病风险）。早晨浇水最佳",
    tips: "浇水不均匀是烂底病(BER)的主因！保持规律浇水，覆盖2-3英寸覆盖物保湿。果实转色后可略减水量。",
  },
  {
    crop: "辣椒/茄子",
    emoji: "🌶️",
    category: "蔬菜",
    newPlant: "移栽后浇透定根水\n前2周：每天浇水",
    established: "每周 1-1.5 英寸水量\n每2-3天深浇一次",
    method: "根部浇水，早晨操作。辣椒比番茄略耐旱",
    tips: "辣椒适度干旱胁迫会增加辣度。茄子需水量略大于辣椒。两者都怕积水烂根。",
  },
  {
    crop: "芹菜",
    emoji: "🥬",
    category: "蔬菜",
    newPlant: "移栽后浇透\n前2周：每天浇水保持湿润",
    established: "保持土壤持续湿润！每周至少 2 英寸水量\n可能需要每天浇水",
    method: "浅根作物，需频繁浇水。覆盖物必不可少",
    tips: "芹菜是最需水的蔬菜！土壤稍干就会导致茎秆空心、纤维粗糙。高温天可能需要每天浇水甚至一天两次。",
  },
  {
    crop: "南瓜",
    emoji: "🎃",
    category: "蔬菜",
    newPlant: "播种后保持土壤湿润直到出苗\n出苗后：每2-3天浇一次",
    established: "每周 1-1.5 英寸水量\n果实膨大期增加至每周2英寸",
    method: "根部浇水，避免淋湿叶片（减少白粉病）。清晨浇水",
    tips: "南瓜叶片大蒸发快，高温天需水量大。果实接触地面处垫一块板或稻草防腐烂。",
  },
  {
    crop: "豆角",
    emoji: "🫘",
    category: "蔬菜",
    newPlant: "播种后浇透，保持湿润直到出苗\n出苗后：每2-3天一次",
    established: "每周约 1 英寸水量\n开花结荚期增加浇水",
    method: "根部浇水，避免淋湿叶片和花朵",
    tips: "豆角比较耐旱，但开花和结荚期缺水会严重减产。过度浇水会导致根腐病。",
  },
  {
    crop: "玫瑰/月季",
    emoji: "🌹",
    category: "花卉",
    newPlant: "定植后前2周：每天浇水\n之后：每2-3天一次",
    established: "每周深浇 1-2 次\n每次约 2-3 加仑/株",
    method: "根部浇水，严禁喷洒叶片（黑斑病的头号诱因）。早晨浇水",
    tips: "玫瑰喜湿但怕积水。覆盖2-3英寸覆盖物保湿抑草。高温天增加浇水频率。",
  },
];

// ─── 月历时间表（更新产品引用）───
export const calendar: CalendarMonth[] = [
  {
    month: "4月上旬",
    monthNum: 4,
    season: "spring",
    title: "🚨 现在！当前紧急任务",
    goal: "根据每棵植物的当前状态，立即执行最关键的操作",
    warning: "⚠️ 梨树和苹果树2号正在花期/花苞期，严禁喷杀虫剂！",
    summary: {
      sprayCount: 4,
      fertCount: 3,
      waterCount: 3,
      otherCount: 3,
      keyActions: [
        "🌿 苹果树1号：立即喷 Immunox 防黑星病",
        "🌸 苹果树2号/梨树：花期仅喷杀菌剂",
        "🌱 果树施 Tree-tone 早春基肥",
        "💧 新植果树每2-3天浇一次",
        "🌾 蔬菜小苗开始炼苗",
      ],
    },
    tasks: [
      {
        crops: "🍎 苹果树1号（已长嫩叶）",
        type: "预防打药",
        action: "立即喷 Immunox 预防黑星病",
        detail: "Immunox (1.5 oz/gal) 喷湿所有嫩叶正反面。嫩叶期是黑星病最易感染的阶段，每7-10天重复。可同时喷印楝油 (2汤匙/gal) 防虫。",
        frequency: "每 7-10 天一次",
      },
      {
        crops: "🍎 苹果树2号（有花苞）",
        type: "预防打药",
        action: "粉红蕾期黄金窗口 — 喷 Immunox",
        detail: "花苞变粉但未开放时，立即喷 Immunox (1.5 oz/gal)。这是花前最后一次喷药机会！花朵一旦打开，停止所有杀虫剂，仅可继续喷杀菌剂。",
        frequency: "花前仅此一次",
      },
      {
        crops: "🍐 梨树（正在开花）",
        type: "预防打药",
        action: "花期仅喷杀菌剂，严禁杀虫剂",
        detail: "可喷 Immunox (1.5 oz/gal) 预防黑星病。⚠️ 严禁使用 Deadbug、Sevin、印楝油等任何杀虫剂！保护蜜蜂授粉。",
        frequency: "每 10-14 天一次",
      },
      {
        crops: "🫐 蓝莓（有花苞）",
        type: "施肥",
        action: "第一次 Holly-tone 追肥",
        detail: "✅ 颗粒缓释肥，不需要兑水溶解！\n在蓝莓树冠滴水线下撒施 Holly-tone（每英尺枝展1杯），轻轻拌入表土2-3cm，然后用水管浇透整个施肥区域（约5分钟慢流）。\n花期禁止喷杀虫剂。",
        frequency: "本年度第1次（共2次）",
      },
      {
        crops: "🍎🍐 苹果树、梨树",
        type: "施肥",
        action: "早春基肥 — Espoma Tree-tone (6-3-2)",
        detail: "✅ 颗粒缓释肥，不需要兑水溶解！\n操作步骤：\n1. 测量树干直径（离地面4英尺处）\n2. 按用量表取肥（树干≤2英寸→每英寸3磅即9杯）\n3. 小树：均匀撒在树冠滴水线下的土壤表面\n4. 大树：在滴水线下挖洞（2-3英寸直径×12-18英寸深，间距2-3英尺），分入肥料，填土\n5. 施后用水管浇透整个施肥区域（约10-15分钟慢流）\n↳ 含 Bio-tone益生菌和5%钙，改善土壤+预防缺钙",
        frequency: "每年2次（早春 + 秋季）",
      },
      {
        crops: "🍇 葡萄（未发芽）",
        type: "施肥",
        action: "早春基肥 — Espoma Tree-tone (6-3-2)",
        detail: "✅ 颗粒缓释肥，不需要兑水溶解！\n在葡萄根部周围 30-60cm 范围内均匀撒施 Tree-tone（每株约1-2磅即3-6杯），轻轻拌入表土2-3cm，然后用水管浇透整个施肥区域（约5-10分钟慢流）。",
        frequency: "每年2次（早春 + 秋季）",
      },
      {
        crops: "🍇 葡萄（未发芽）",
        type: "预防打药",
        action: "抓紧清园！喷铜皂+印楝油",
        detail: "铜皂 (2-3汤匙/gal) + 印楝油 (2汤匙/gal) 混合喷洒所有枝干。这是休眠期清园的最后窗口！同时安装 Catchmaster 粘带。",
        frequency: "仅此一次",
      },
      {
        crops: "🍅🌶️🍆🥬 蔬菜小苗",
        type: "育苗",
        action: "开始炼苗，准备定植",
        detail: "白天搬到室外半阴处2-4小时，逐日增加时间和光照。5-7天后可定植。等最后霜冻过后再移栽。\n定植穴底部拌入 Kellogg 有机底肥（1-2汤匙），定植后立即浇透定根水（每株约0.5加仑）。",
        frequency: "每天炼苗，持续5-7天",
      },
      {
        crops: "🎃🫘 南瓜/豆角种子",
        type: "育苗",
        action: "等待土温或室内催芽",
        detail: "南瓜需土温≥70°F，豆角需≥60°F。可先在室内育苗盘催芽。南瓜播深1英寸，豆角1-1.5英寸。或等到5月中下旬直播。",
        frequency: "一次性操作",
      },
      {
        crops: "🌹 玫瑰/月季",
        type: "施肥",
        action: "第一次 BioAdvanced 蓝色瓶灌根",
        detail: "将 BioAdvanced 浓缩液 3 oz 兑入 1 加仑(3.8L)水，浇灌玫瑰根部土壤（每株约0.5-1加仑稀释液）。\n⚠️ 严禁在蔬菜区附近使用！同时喷 Immunox 预防黑斑病。",
        frequency: "每6周一次（本年度第1次）",
      },
      {
        crops: "🍎🍐🍇 全线果树",
        type: "物理防御",
        action: "安装物理防线",
        detail: "在果树树干距地面30-60cm处缠绕 Catchmaster 粘带一圈；树下方圆1米范围撒布 Sluggo Plus 颗粒诱杀蠼螋。",
        frequency: "粘带整季保留，Sluggo每月补撒",
      },
      {
        crops: "🍎🍐 苹果树、梨树（新植1-3年）",
        type: "浇水",
        action: "新植果树浇水",
        detail: "每2-3天浇一次，每次慢浇 3-5 加仑，确保水渗透到根球以下。早晨浇水最佳。\n成年果树：每周浇一次，每次 5-10 加仑，滤水线内慢浇。",
        frequency: "新植每2-3天，成年每周",
      },
      {
        crops: "🍇🫐 葡萄、蓝莓",
        type: "浇水",
        action: "浆果浇水",
        detail: "葡萄：新植每2-3天浇 2-3 加仑，成年每周 3-5 加仑。\n蓝莓：新植每2天浇 1-2 加仑，成年每周 1-2 加仑。蓝莓根浅，少量多次。",
        frequency: "新植每2-3天，成年每周",
      },
      {
        crops: "🌿 蔬菜小苗（室内炼苗期）",
        type: "浇水",
        action: "炼苗期浇水",
        detail: "室内育苗盆土保持湿润但不积水，每1-2天检查一次。\n炼苗期间逐渐减少浇水频率，让小苗适应户外环境。",
        frequency: "每1-2天检查",
      },
    ],
  },
  {
    month: "4月下旬-5月",
    monthNum: 5,
    season: "spring",
    title: "落花期至幼果期 / 蔬菜定植",
    goal: "全年最重要的一喷（保果），蔬菜定植后防病",
    summary: {
      sprayCount: 3,
      fertCount: 3,
      waterCount: 3,
      otherCount: 2,
      keyActions: [
        "⭐ 落花后立即喷 Immunox+Deadbug 黄金保果喷雾",
        "🌱 蔬菜定植到户外，浇透定根水",
        "💧 新植苗每天浇水，2周后渐减",
        "🌾 南瓜豆角直播到户外",
        "🪤 果树 Tree-tone 缓释肥持续作用中",
      ],
    },
    tasks: [
      {
        crops: "🍎🍐 苹果、梨",
        type: "预防打药",
        action: "⭐ 黄金保果喷雾（落花后立即）",
        detail: "落花后立即喷洒 Immunox (1.5 oz/gal) + Deadbug Brew (2 oz/gal) 混合液。这是全年最关键的一次喷洒！用Milwaukee喷雾器高档，360°喷湿整棵树。",
        frequency: "每10-14天重复，连喷2-3次",
      },
      {
        crops: "🍇 葡萄",
        type: "预防打药",
        action: "新梢期防病",
        detail: "新梢长出6-10英寸时，喷 Immunox (1.5 oz/gal) 预防黑腐病和白粉病。可加印楝油 (2汤匙/gal) 防虫防螨。",
        frequency: "每10-14天一次",
      },
      {
        crops: "🫐 蓝莓",
        type: "预防打药",
        action: "落花后防僵果病",
        detail: "蓝莓落花后，喷铜皂 (1-2汤匙/gal) 预防僵果病。注意：铜皂比Liqui-Cop更温和，蓝莓更安全。",
        frequency: "每10-14天一次，共2-3次",
      },
      {
        crops: "🍅🌶️🍆🥬 番茄、辣椒、茄子、芹菜",
        type: "育苗",
        action: "定植到户外",
        detail: "最后霜冻过后，选阴天或傍晚定植。番茄深栽至第一对真叶以下。辣椒/茄子与原土坨齐平。定植后立即浇透定根水。",
        frequency: "一次性操作",
      },
      {
        crops: "🍅🌶️🍆🥬 蔬菜",
        type: "预防打药",
        action: "定植后2-3周开始防病",
        detail: "每7-10天喷铜皂 (2-4汤匙/gal) 预防叶斑病和疫病。清晨喷洒，喷湿叶片正反面。可交替使用印楝油防虫防病。",
        frequency: "每7-10天一次",
      },
      {
        crops: "🎃🫘 南瓜、豆角",
        type: "育苗",
        action: "直播到户外",
        detail: "土温达标后直播。南瓜：每丘2-3粒，丘距4-6英尺，深1英寸。豆角：株距4-6英寸，深1-1.5英寸。浇透底水后覆土轻压。",
        frequency: "一次性操作",
      },
      {
        crops: "🍎🍐 苹果、梨（落花后）",
        type: "施肥",
        action: "Tree-tone 已在早春施过，无需额外追肥",
        detail: "✅ Espoma Tree-tone 是缓释肥，早春施的一次可持续释放营养6-8周，覆盖落花后幼果发育期。\n幼年果树（定植<3年）可额外补充：在滴水线下再撒施半量 Tree-tone，浇透水。",
        frequency: "缓释肥自动释放，无需额外操作",
      },
      {
        crops: "🍇 葡萄（新梢期）",
        type: "施肥",
        action: "Tree-tone 已在早春施过，无需额外追肥",
        detail: "✅ 早春施的 Tree-tone 缓释肥正在持续释放营养，覆盖新梢生长期。\n葡萄对氮肥需求中等，不要过量施肥，否则会徒长。",
        frequency: "缓释肥自动释放，无需额外操作",
      },
      {
        crops: "🍅🌶️🍆🥬🎃🫘 所有蔬菜",
        type: "施肥",
        action: "提苗追肥 — Miracle-Gro 蔬菜专用肥",
        detail: "定植/出苗后2-3周开始：\n方法A（Garden Feeder喷施器）：装入肥粉，接水管对着根部喷施，自动配比\n方法B（手动兑水）：1汤匙肥粉兑入1加仑(3.8L)水，每棵蔬菜浇灌约0.5-1加仑稀释液\n⚠️ 此肥为蔬菜专用(18-18-21)，不用于果树和葡萄",
        frequency: "每7-14天一次",
      },
      {
        crops: "🍎🍐 苹果、梨（幼果发育期）",
        type: "浇水",
        action: "果树浇水 — 幼果发育关键期",
        detail: "新植果树：每2-3天浇 3-5 加仑。\n成年果树：每周浇 5-10 加仑，滤水线内慢浇。\n❗ 幼果发育期缺水会导致落果，确保土壤持续湿润。",
        frequency: "新植每2-3天，成年每周",
      },
      {
        crops: "🍅🌶️🍆🥬🎃🫘 新定植蔬菜",
        type: "浇水",
        action: "定植后浇水 — 缓苗期关键",
        detail: "定植后立即浇透定根水（每株0.5-1加仑）。\n前2周：每天浇水，保持土壤湿润。\n2周后：逐渐减少到每2-3天一次。\n❗ 早晨浇水，避免叶面湿润过夜引发病害。",
        frequency: "前2周每天，之后每2-3天",
      },
      {
        crops: "🍇🫐 葡萄、蓝莓",
        type: "浇水",
        action: "浆果花期/幼果期浇水",
        detail: "葡萄：新植每2-3天 2-3 加仑，成年每周 3-5 加仑。\n蓝莓：新植每2天 1-2 加仑，成年每周 1-2 加仑。\n蓝莓花期缺水会严重影响坐果率。",
        frequency: "新植每2-3天，成年每周",
      },
    ],
  },
  {
    month: "6月-7月",
    monthNum: 6,
    season: "summer",
    title: "夏季生长旺盛期 / 果实膨大",
    goal: "维持防线，促果追肥，应对突发虫害",
    summary: {
      sprayCount: 3,
      fertCount: 4,
      waterCount: 1,
      otherCount: 2,
      keyActions: [
        "🛡️ 每14天喷 Immunox 维持防线",
        "🍅 番茄施促果肥（含钙防烂底）",
        "💧 高温天所有作物加量浇水",
        "⚠️ 突发虫害局部喷 Sevin 应急",
        "❌ 7月中旬后果树停施氮肥",
      ],
    },
    tasks: [
      {
        crops: "🍎🍐🍇 苹果、梨、葡萄",
        type: "预防打药",
        action: "夏季覆盖喷洒",
        detail: "每14天喷 Immunox (1.5 oz/gal) 维持杀菌保护层。可交替加入印楝油 (2汤匙/gal) 防虫防螨。高温天(>90°F)改在清晨或傍晚喷洒。",
        frequency: "每14天一次",
      },
      {
        crops: "🫐 蓝莓",
        type: "施肥",
        action: "第二次 Holly-tone 追肥",
        detail: "✅ 颗粒缓释肥，不需要兑水溶解！\n距第一次施肥45-60天后，再次在滴水线下撒施 Holly-tone（用量同第一次：每英尺枝展1杯），拌入表土后浇透水（5分钟慢流）。",
        frequency: "本年度第2次（共2次）",
      },
      {
        crops: "🎃🫘 南瓜、豆角",
        type: "预防打药",
        action: "防白粉病/锈病",
        detail: "南瓜藤蔓蔓延、豆角开花前开始，每14天喷 Immunox 预防白粉病和锈病。南瓜叶片大，注意喷湿叶片背面。",
        frequency: "每14天一次",
      },
      {
        crops: "🍅🌶️🍆 番茄、辣椒、茄子",
        type: "施肥",
        action: "促果防烂底追肥 — Vigoro/Pennington 番茄肥",
        detail: "果实开始膨大时：\n1. 在每棵番茄/辣椒/茄子根部周围撒施 3-4汤匙颗粒肥\n2. 轻轻拌入表土\n3. 浇透水（每株约0.5加仑）\n✅ 颗粒缓释肥，不需要兑水溶解！含钙配方可预防烂底病(BER)。",
        frequency: "每3-4周一次",
      },
      {
        crops: "🍅🌶️🍆🥬🎃🫘 所有蔬菜",
        type: "预防打药",
        action: "继续铜皂/印楝油轮喷",
        detail: "每7-10天交替喷铜皂和印楝油，维持病虫害防线。发现蚜虫或毛毛虫时加喷 Deadbug Brew (2 oz/gal)。",
        frequency: "每7-10天一次",
      },
      {
        crops: "🍎🍐🍇🍅🌶️🍆🎃🫘 全线果蔬",
        type: "应急治疗",
        action: "突发虫害应急处理",
        detail: "发现日本甲虫、大量毛毛虫或跳甲时：局部喷 Sevin Concentrate (4 oz/gal)。仅喷受害部位，不要全树喷洒。清晨或傍晚操作。",
        frequency: "仅在发现害虫时使用，每7天最多1次",
      },
      {
        crops: "🍎🍐 苹果、梨（果实膨大期）",
        type: "施肥",
        action: "Tree-tone 缓释肥持续作用中",
        detail: "✅ 早春施的 Tree-tone 缓释肥仍在持续释放营养。\n幼年果树（定植<3年）可在6月初再补施一次半量 Tree-tone，撒施后浇透水。\n❗ 7月中旬后停止任何施肥，避免刺激秋季新梢影响越冬。",
        frequency: "幼年树可6月补施一次，7月后停肥",
      },
      {
        crops: "🍇 葡萄（果实发育期）",
        type: "施肥",
        action: "Tree-tone 缓释肥持续作用中",
        detail: "✅ 早春施的 Tree-tone 缓释肥正在持续释放营养。\n❗ 转色期 (Veraison) 开始后不再施任何肥，让葡萄集中糖分积累。",
        frequency: "缓释肥自动释放，转色后停肥",
      },
      {
        crops: "🎃🥬 南瓜、芹菜",
        type: "施肥",
        action: "促蔓/促叶追肥 — Miracle-Gro 蔬菜专用肥",
        detail: "用 Garden Feeder 接水管对着根部喷施，或手动兑水（1汤匙/1加仑水）浇灌根部。\n南瓜：每株浇约1加仑稀释液，促进蔓延和果实膨大\n芹菜：每株浇约0.5加仑稀释液，促进叶柄生长",
        frequency: "每7-14天一次",
      },
      {
        crops: "🌹 玫瑰/月季",
        type: "预防打药",
        action: "第二次 BioAdvanced 灌根",
        detail: "距上次灌根6周后，再次用 BioAdvanced 3 oz/1加仑水 浇灌根部（每株0.5-1加仑稀释液）。同时可喷 Immunox 预防黑斑病。",
        frequency: "每6周一次",
      },
      {
        crops: "🍎🍐🍇🫐🍅🌶️🍆🥬🎃🫘 全部作物",
        type: "浇水",
        action: "夏季浇水加量",
        detail: "高温天蒸发快，所有作物需增加浇水频率。果树每周深浇1-2次(5-10加仑/次)；蔬菜每2-3天浇一次(每周1-2英寸)；蓝莓和芹菜保持持续湿润。清晨浇水最佳。",
        frequency: "根据作物需求，详见浇水指南",
      },
    ],
  },
  {
    month: "8月-9月",
    monthNum: 8,
    season: "summer",
    title: "采收季 / 晚夏管理",
    goal: "严格遵守停药期，确保食品安全",
    summary: {
      sprayCount: 0,
      fertCount: 0,
      waterCount: 2,
      otherCount: 4,
      keyActions: [
        "⏰ 苹果/梨：采收前14天停 Immunox/Sevin",
        "⏰ 葡萄：采收前14天停 Immunox",
        "💧 葡萄转色后减少浇水促糖分",
        "💧 其他作物维持正常浇水",
        "🧹 采收前用清水冲洗果实和蔬菜",
      ],
    },
    tasks: [
      {
        crops: "🍎🍐 苹果、梨",
        type: "停药",
        action: "停药倒计时",
        detail: "采收前14天：停用 Immunox 和 Sevin\n采收前7天：停用 Deadbug Brew\n铜皂和印楝油可用至采收当天\n采收前用清水冲洗果实",
        frequency: "严格按PHI执行",
      },
      {
        crops: "🍇 葡萄",
        type: "停药",
        action: "停药倒计时",
        detail: "采收前14天：停用 Immunox\n采收前1天：停用 Sevin 和 Deadbug Brew\n铜皂和印楝油可用至采收当天\n转色后减少浇水促糖分积累",
        frequency: "严格按PHI执行",
      },
      {
        crops: "🫐 蓝莓",
        type: "停药",
        action: "停药倒计时",
        detail: "采收前1天：停用 Sevin\n采收前7天：停用 Deadbug Brew\n铜皂和印楝油可用至采收当天\n蓝莓采收期较早，注意提前停药",
        frequency: "严格按PHI执行",
      },
      {
        crops: "🍅🌶️🍆🥬🎃🫘 所有蔬菜",
        type: "停药",
        action: "蔬菜停药期",
        detail: "采收前1天：停用 Deadbug Brew 和 Sevin\n铜皂和印楝油（有机认证）可用至采收当天\nSluggo Plus：采收前3天停用\n采收前用清水冲洗蔬菜",
        frequency: "严格按PHI执行",
      },
      {
        crops: "🍇 葡萄（转色期）",
        type: "浇水",
        action: "葡萄转色后减少浇水",
        detail: "葡萄开始转色后，减少浇水量至正常的一半，促进糖分积累。\n但不要完全断水，保持土壤微湿。",
        frequency: "每周浇水量减半",
      },
      {
        crops: "🍎🍐🫐🍅🌶️🍆 其他作物",
        type: "浇水",
        action: "维持正常浇水",
        detail: "苹果/梨：每周 5-10 加仑深浇。\n蓝莓：每周 1-2 加仑，保持湿润。\n蔬菜：每2-3天浇一次，采收前保持土壤均匀湿润防裂果。",
        frequency: "果树每周，蔬菜每2-3天",
      },
    ],
  },
  {
    month: "10月-11月",
    monthNum: 10,
    season: "autumn",
    title: "秋季收尾 / 来年准备",
    goal: "清理残枝落叶，施秋季基肥，为来年打好基础",
    summary: {
      sprayCount: 1,
      fertCount: 2,
      waterCount: 1,
      otherCount: 2,
      keyActions: [
        "🍂 落叶后喷铜皂清园",
        "🌾 施 Tree-tone 秋季基肥（第2次）",
        "💧 冻前深浇一次越冬水",
        "🧹 清理菜地残株和病叶",
        "🌹 玫瑰最后一次灌根+覆盖越冬",
      ],
    },
    tasks: [
      {
        crops: "🍎🍐🍇🫐 全线果树/浆果",
        type: "施肥",
        action: "秋季基肥 — Espoma Tree-tone 第二次",
        detail: "✅ 颗粒缓释肥，不需要兑水溶解！\n采收结束、落叶后，施 Tree-tone 第二次（用量同早春）：\n• 苹果/梨：按树干直径查用量表\n• 葡萄：每株1-2磅(3-6杯)\n• 蓝莓：继续用 Holly-tone（不用Tree-tone，蓝莓需要酸性肥）\n撒施后浇透水（10-15分钟慢流）。秋季基肥为来年春季发芽和开花储备养分。",
        frequency: "采收后、落叶后一次（本年度第2次）",
      },
      {
        crops: "🍎🍐🍇 果树",
        type: "预防打药",
        action: "落叶后清园喷铜皂",
        detail: "落叶后喷一次铜皂 (2-3汤匙/gal) 清除残留病菌孢子。清理地面落叶和烂果，减少来年病害基数。",
        frequency: "仅此一次",
      },
      {
        crops: "🍅🌶️🍆🥬🎃🫘 所有蔬菜",
        type: "施肥",
        action: "清理菜地 + 冬季覆盖",
        detail: "拔除残株，清理病叶（不要堆肥！）。翻土后撒施有机肥或种植覆盖作物（如冬黑麦）改良土壤。",
        frequency: "一次性操作",
      },
      {
        crops: "🌹 玫瑰/月季",
        type: "预防打药",
        action: "秋季修剪 + 最后一次灌根",
        detail: "霜冻前进行轻度修剪。最后一次 BioAdvanced 灌根（3 oz/1加仑水，每株0.5-1加仑稀释液）。根部覆盖3-4英寸覆盖物保暖越冬。",
        frequency: "一次性操作",
      },
      {
        crops: "🍎🍐🍇🫐 所有果树/浆果",
        type: "浇水",
        action: "冻前深浇越冬水",
        detail: "在地面冻结前，给所有果树和浆果深浇一次越冬水：\n苹果/梨：10-15 加仑，滤水线内慢浇 20-30 分钟\n葡萄：5-8 加仑\n蓝莓：3-5 加仑\n越冬水帮助根系在冬季保持水分，减少冻害。",
        frequency: "冻前一次",
      },
    ],
  },
];

// ─── 安全准则（更新产品名称）───
export const safetyRules = [
  {
    icon: "🐝",
    title: "蜜蜂保护法",
    content: "任何含杀虫剂（Deadbug、Sevin、BioAdvanced）的喷洒作业，必须在清晨或傍晚进行（蜜蜂不活跃时），且严禁在植物盛花期喷洒。Deadbug施用后3小时内对蜜蜂有毒。印楝油对蜜蜂毒性较低，但花期仍建议避免。",
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
    content: "每次喷完铜皂（Copper Fungicide）后，必须在水箱中加入清水，开启喷雾器循环喷洗至少2分钟。铜制剂会结晶堵塞喷头。印楝油喷完后也需用温肥皂水清洗。",
    level: "warning" as const,
  },
  {
    icon: "🌡️",
    title: "气温限制",
    content: "白天最高气温超过90°F（32°C）时，严禁喷洒印楝油或任何油类农药，否则会导致严重药害（叶片焦枯）。印楝油在低温(<60°F)下会凝固，需用温水预溶。",
    level: "warning" as const,
  },
  {
    icon: "⏱️",
    title: "印楝油30天规则",
    content: "喷洒印楝油（Fruit Tree Spray）后30天内，严禁使用含硫药剂（如部分版本的Captain Jack's Orchard Spray含硫磺+除虫菊酯，注意区分！）。硫+油=严重药害。",
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
  {
    icon: "💧",
    title: "浇水黄金法则",
    content: "深浇少次优于浅浇多次！根部浇水，避免淋湿叶片（减少真菌病害）。清晨浇水最佳，让叶片白天蒸干。蓝莓和芹菜例外——需要持续保持湿润。",
    level: "info" as const,
  },
];
