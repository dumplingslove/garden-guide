// 每月植物状态数据 — 6月到12月（4月数据保留在gardenData.ts中）
// 根据当前月份自动显示对应的任务
// ============================================================

export interface MonthlyPlantStatus {
  id: string;
  name: string;
  emoji: string;
  currentState: string;
  urgentAction: string;
  urgentDetail: string;
  nextAction: string;
}

export interface MonthData {
  month: number;
  label: string;
  subtitle: string;
  plants: MonthlyPlantStatus[];
}

export const monthlyStatusData: MonthData[] = [
  // ─── 4月 ───
  {
    month: 4,
    label: "4月",
    subtitle: "早春萌动 — 清园打药+施底肥",
    plants: [
      {
        id: "pear", name: "梨树", emoji: "🍐",
        currentState: "🌸 正在开花",
        urgentAction: "花期禁止喷杀虫剂！仅可喷杀菌剂",
        urgentDetail: "立即喷 Immunox (1.5 oz/gal) 预防黑星病。花期严禁使用 Deadbug、Sevin 等任何杀虫剂，保护蜜蜂授粉。",
        nextAction: "落花后立即进行「黄金保果喷雾」",
      },
      {
        id: "apple1", name: "苹果树 1号", emoji: "🍎",
        currentState: "🌿 已长出嫩叶",
        urgentAction: "立即开始喷 Immunox 预防黑星病",
        urgentDetail: "黑星病在嫩叶展开时最易感染！立即喷 Immunox (1.5 oz/gal)，每 7-10 天重复。可搭配印楝油 (Fruit Tree Spray) 低浓度喷洒防虫。",
        nextAction: "花苞出现时继续喷 Immunox，花开后停杀虫剂",
      },
      {
        id: "apple2", name: "苹果树 2号", emoji: "🍎",
        currentState: "🌺 有花苞了",
        urgentAction: "花苞期（粉红蕾期）是喷药黄金窗口",
        urgentDetail: "立即喷 Immunox (1.5 oz/gal) 预防黑星病和白粉病。必须在花朵完全打开之前完成！一旦花开，停止所有杀虫剂。",
        nextAction: "花开后仅喷杀菌剂，落花后进行黄金保果喷雾",
      },
      {
        id: "blueberry", name: "蓝莓", emoji: "🫐",
        currentState: "🌺 有花苞",
        urgentAction: "施第一次 Holly-tone + 花期禁杀虫剂",
        urgentDetail: "如还未施肥，立即在滴水线下撒 Holly-tone (每英尺枝展1杯)。花苞期/花期禁止喷杀虫剂。可喷铜皂 (1-2汤匙/gal) 预防僵果病。",
        nextAction: "落花后45-60天施第二次 Holly-tone",
      },
      {
        id: "grape", name: "葡萄", emoji: "🍇",
        currentState: "💤 还没发芽",
        urgentAction: "抓紧最后的清园窗口",
        urgentDetail: "葡萄未发芽时是清园最佳时机！喷铜皂 (2-3汤匙/gal) + 印楝油 (2汤匙/gal) 混合液清除越冬病菌和虫卵。安装 Catchmaster 粘带。",
        nextAction: "新梢长出6-10英寸时开始喷 Immunox",
      },
      {
        id: "veggies", name: "番茄/辣椒/茄子/芹菜", emoji: "🍅",
        currentState: "🌱 刚买的小苗",
        urgentAction: "炼苗 + 准备定植",
        urgentDetail: "小苗需先炼苗5-7天：白天搬到室外半阴处，晚上搬回室内。等最后一次霜冻过后再定植。定植穴底部拌入 Kellogg 有机底肥。",
        nextAction: "定植后2-3周开始喷铜皂预防病害",
      },
      {
        id: "seeds", name: "南瓜/豆角", emoji: "🎃",
        currentState: "🌰 还是种子",
        urgentAction: "等土温达到60-70°F再直播",
        urgentDetail: "南瓜需土温≥70°F，豆角需≥60°F。可先在室内用育苗盘催芽（南瓜提前3-4周，豆角提前2周），或等5月中下旬直播到户外。播种深度：南瓜1英寸，豆角1-1.5英寸。",
        nextAction: "出苗后间苗，真叶展开后开始施薄肥",
      },
      {
        id: "rose", name: "玫瑰/月季", emoji: "🌹",
        currentState: "🌿 新芽萌发中",
        urgentAction: "第一次 BioAdvanced 蓝色瓶灌根",
        urgentDetail: "使用 BioAdvanced (3 oz/gal) 浇灌根部，提供6周的内吸性保护。⚠️ 严禁在蔬菜区附近使用！同时可喷 Immunox 预防黑斑病。",
        nextAction: "6周后第二次灌根",
      },
      {
        id: "kiwi", name: "拇指猕猴桃", emoji: "🥝",
        currentState: "🌿 新芽开始萌动",
        urgentAction: "绑蔓上架 + 检查冬季冻伤",
        urgentDetail: "检查藤蔓是否有冬季冻伤（枝条发黑/干枯），剪除受损部分。新芽萌动后将新梢引导绑到棚架上。现在可以施早春基肥 Tree-tone。⚠️ 猕猴桃根系浅且敏感，施肥不要太靠近根部！",
        nextAction: "5月霜冻风险过后开始正常管理，6月修剪探索枝",
      },
    ],
  },

  // ─── 5月 ───
  {
    month: 5,
    label: "5月",
    subtitle: "落花坐果 — 黄金保果喷雾+定植蔬菜",
    plants: [
      {
        id: "pear", name: "梨树", emoji: "🍐",
        currentState: "🍐 小果已坐住",
        urgentAction: "落花后「黄金保果喷雾」",
        urgentDetail: "落花后7天内喷 Immunox (1.5 oz/gal) + Deadbug (4汤匙/gal) 混合液。这是全年最重要的一次喷药！保护幼果免受黑星病+蛀果虫。",
        nextAction: "每10-14天继续喷Immunox直到6月底",
      },
      {
        id: "apple1", name: "苹果树 1号", emoji: "🍎",
        currentState: "🌸 正在开花/刚落花",
        urgentAction: "花开期仅喷杀菌剂，落花后加杀虫剂",
        urgentDetail: "如果还在开花：仅喷 Immunox。落花后立即加 Deadbug (4汤匙/gal) 防苹果蠹蛾。这是保果关键窗口！",
        nextAction: "5月中旬开始疏果（每簇留1个最大的果）",
      },
      {
        id: "apple2", name: "苹果树 2号", emoji: "🍎",
        currentState: "🌸 正在盛花/开始落花",
        urgentAction: "准备落花后的黄金保果喷雾",
        urgentDetail: "花期只喷 Immunox 杀菌剂。一旦花瓣掉落80%，立即喷 Immunox + Deadbug 混合液。每10天重复一次。",
        nextAction: "5月下旬开始疏果",
      },
      {
        id: "blueberry", name: "蓝莓", emoji: "🫐",
        currentState: "🌸 花期/幼果期",
        urgentAction: "花期结束后恢复喷药保护",
        urgentDetail: "花落后可以恢复喷铜皂 (1-2汤匙/gal) 预防灰霉病。保持土壤湿润但不积水。覆盖松针或木屑保持酸性。",
        nextAction: "6月初施第二次 Holly-tone",
      },
      {
        id: "grape", name: "葡萄", emoji: "🍇",
        currentState: "🌿 新梢快速生长中",
        urgentAction: "新梢6-10英寸时开始喷 Immunox",
        urgentDetail: "新梢展开后是霜霉病和白粉病易感期。喷 Immunox (1.5 oz/gal) 每10-14天一次。绑蔓引导新梢上架。施 Tree-tone 基肥。",
        nextAction: "6月花前再喷一次，花后继续保护",
      },
      {
        id: "veggies", name: "番茄/辣椒/茄子/芹菜", emoji: "🍅",
        currentState: "🌱 定植到户外",
        urgentAction: "最后霜冻后定植 + 浇定根水",
        urgentDetail: "确认夜温稳定>50°F后定植。番茄深埋到第一对真叶。定植后浇透定根水，搭支架。定植2周后开始喷铜皂 (1-2汤匙/gal) 预防早疫病。",
        nextAction: "定植3周后开始追肥 Tomato-tone",
      },
      {
        id: "seeds", name: "南瓜/豆角", emoji: "🎃",
        currentState: "🌱 出苗/直播",
        urgentAction: "直播或移栽到户外",
        urgentDetail: "土温达标后直播：南瓜株距4-6英尺，豆角6英寸。或将室内催芽苗移栽。浇透水，覆薄层覆盖物保湿。豆角搭架。",
        nextAction: "出苗后间苗，2-3周后开始施薄肥",
      },
      {
        id: "rose", name: "玫瑰/月季", emoji: "🌹",
        currentState: "🌸 第一波花苞出现",
        urgentAction: "继续 Immunox 防黑斑 + 追肥",
        urgentDetail: "每10-14天喷 Immunox 预防黑斑病。施一次 Rose-tone 或通用花肥促花。检查蚜虫，发现立即用 Deadbug 或强水流冲。",
        nextAction: "第一波花后修剪残花促第二波",
      },
      {
        id: "kiwi", name: "拇指猕猴桃", emoji: "🥝",
        currentState: "🌿 新梢快速生长",
        urgentAction: "继续绑蔓 + 施追肥",
        urgentDetail: "新梢生长旺盛，每周检查并绑到棚架上。5月中施一次 Tree-tone 追肥。注意浇水保持土壤湿润（根系浅！）。",
        nextAction: "6月开始修剪探索枝控制藤蔓",
      },
    ],
  },

  // ─── 6月 ───
  {
    month: 6,
    label: "6月",
    subtitle: "果实膨大 — 疏果+夏季病虫害防控",
    plants: [
      {
        id: "pear", name: "梨树", emoji: "🍐",
        currentState: "🍐 果实膨大中",
        urgentAction: "疏果 + 继续喷 Immunox",
        urgentDetail: "每簇果只留1-2个最大的，间距15-20cm。继续每10-14天喷 Immunox 防黑星病。检查梨木虱，发现喷 Deadbug。高温天注意浇水。",
        nextAction: "7月中旬停药（采收前14天）",
      },
      {
        id: "apple1", name: "苹果树 1号", emoji: "🍎",
        currentState: "🍎 幼果膨大中",
        urgentAction: "6月初完成疏果！每簇只留1个",
        urgentDetail: "疏果是提高果实品质的关键！每簇花只留1个最大最健康的果，间距15-20cm。继续每10-14天喷 Immunox + Deadbug 防蛀虫。",
        nextAction: "7月减少喷药频率，注意浇水",
      },
      {
        id: "apple2", name: "苹果树 2号", emoji: "🍎",
        currentState: "🍎 幼果膨大中",
        urgentAction: "完成疏果 + 继续保护性喷药",
        urgentDetail: "同苹果1号：每簇留1果。继续 Immunox + Deadbug 每10-14天。检查苹果蠹蛾（果实入口处有虫粪），发现加喷 Sevin。",
        nextAction: "7月减少喷药，8月准备采收",
      },
      {
        id: "blueberry", name: "蓝莓", emoji: "🫐",
        currentState: "🫐 果实开始变色",
        urgentAction: "施第二次 Holly-tone + 防鸟网",
        urgentDetail: "6月初施第二次 Holly-tone（每英尺枝展1杯）。果实开始变色时立即罩防鸟网！保持浇水充足（每周1-2英寸）。停止喷药（接近采收）。",
        nextAction: "6月下旬-7月开始采收蓝色饱满的果实",
      },
      {
        id: "grape", name: "葡萄", emoji: "🍇",
        currentState: "🌸 开花/坐果期",
        urgentAction: "花期管理 + 疏穗",
        urgentDetail: "葡萄6月开花，花期避免喷药干扰授粉。花后立即喷 Immunox 防霜霉病。每枝留1-2穗，去掉多余花穗。夏季摘心：主梢留12-15片叶后掐尖。",
        nextAction: "7月继续防霜霉病，果实开始转色",
      },
      {
        id: "veggies", name: "番茄/辣椒/茄子/芹菜", emoji: "🍅",
        currentState: "🌿 快速生长+开花",
        urgentAction: "打杈整枝 + 追肥 + 防病",
        urgentDetail: "番茄：每周打掉腋芽（杈子），只留主干+1-2侧枝。施 Tomato-tone 追肥（每3-4周）。每10天喷铜皂防早疫病。高温天早晚浇水，避免中午。",
        nextAction: "7月开始采收番茄，继续追肥",
      },
      {
        id: "seeds", name: "南瓜/豆角", emoji: "🎃",
        currentState: "🌿 藤蔓/植株快速生长",
        urgentAction: "追肥 + 引蔓 + 防白粉病",
        urgentDetail: "南瓜：引导藤蔓方向，施一次 Tomato-tone。豆角：开始采收嫩豆角，越摘越多！两者都注意预防白粉病，发现白色粉状物立即喷 Immunox。",
        nextAction: "7月南瓜开花需人工授粉，豆角持续采收",
      },
      {
        id: "rose", name: "玫瑰/月季", emoji: "🌹",
        currentState: "🌹 第一波盛花期",
        urgentAction: "修剪残花 + 第二次 BioAdvanced 灌根",
        urgentDetail: "第一波花后及时剪掉残花（在5片叶上方剪）促第二波。6周后进行第二次 BioAdvanced 灌根。继续每10-14天喷 Immunox 防黑斑病。",
        nextAction: "7月高温期减少施肥，注意浇水",
      },
      {
        id: "kiwi", name: "拇指猕猴桃", emoji: "🥝",
        currentState: "🌸 开花期 + 藤蔓旺长",
        urgentAction: "修剪探索枝 + 辅助授粉",
        urgentDetail: "6月猕猴桃开花，确保雄株在附近。剪除疯长的探索枝（果实后留4-6片叶剪断）。每2-3周检查一次。保持充足浇水，根系浅怕旱！",
        nextAction: "7月继续控制藤蔓，果实开始膨大",
      },
    ],
  },

  // ─── 7月 ───
  {
    month: 7,
    label: "7月",
    subtitle: "盛夏管理 — 浇水防旱+采收早熟果",
    plants: [
      {
        id: "pear", name: "梨树", emoji: "🍐",
        currentState: "🍐 果实继续膨大",
        urgentAction: "停药准备采收 + 充足浇水",
        urgentDetail: "如果8月采收，7月中旬停止所有喷药（PHI 14天）。高温天每周深浇一次（2-3英寸水）。检查梨锈病（叶片橙色斑点），严重可喷最后一次 Immunox。",
        nextAction: "8月果实变色变软时采收（梨要提前摘下后熟）",
      },
      {
        id: "apple1", name: "苹果树 1号", emoji: "🍎",
        currentState: "🍎 果实持续膨大",
        urgentAction: "减少喷药 + 充足浇水防裂果",
        urgentDetail: "7月可减少喷药到每2-3周一次 Immunox。高温天保持均匀浇水防止裂果。检查苹果蠹蛾第二代（7月中），必要时喷 Deadbug。",
        nextAction: "8-9月根据品种采收",
      },
      {
        id: "apple2", name: "苹果树 2号", emoji: "🍎",
        currentState: "🍎 果实持续膨大",
        urgentAction: "同苹果1号：浇水+减少喷药",
        urgentDetail: "保持均匀浇水，避免干湿交替导致裂果。可以在果实下方放反光膜促进着色。7月底停止施氮肥，避免秋梢旺长。",
        nextAction: "8-9月采收",
      },
      {
        id: "blueberry", name: "蓝莓", emoji: "🫐",
        currentState: "🫐 采收季！",
        urgentAction: "每2-3天采收一次成熟果实",
        urgentDetail: "果实完全变蓝后再等2-3天风味最佳。轻轻捏住果实，成熟的会轻松脱落。保持防鸟网。继续浇水（每周1-2英寸），用酸性覆盖物保湿。",
        nextAction: "采收结束后8月施最后一次 Holly-tone",
      },
      {
        id: "grape", name: "葡萄", emoji: "🍇",
        currentState: "🍇 果实膨大+开始转色",
        urgentAction: "继续防霜霉病 + 疏叶透光",
        urgentDetail: "果穗周围疏除部分叶片改善通风透光，促进着色。继续每10-14天喷 Immunox 防霜霉病/白粉病。高温天充足浇水。",
        nextAction: "8月果实转色后准备采收（糖度测试）",
      },
      {
        id: "veggies", name: "番茄/辣椒/茄子/芹菜", emoji: "🍅",
        currentState: "🍅 开始采收！",
        urgentAction: "持续采收 + 追肥 + 防病",
        urgentDetail: "番茄变色后即可采收（室内后熟更安全）。辣椒可绿色或等变红采收。继续每3-4周施 Tomato-tone。高温>95°F时番茄可能落花，属正常。继续喷铜皂防病。",
        nextAction: "8月继续采收，9月霜冻前抢收绿果",
      },
      {
        id: "seeds", name: "南瓜/豆角", emoji: "🎃",
        currentState: "🌸 开花坐果期",
        urgentAction: "南瓜人工授粉 + 豆角持续采收",
        urgentDetail: "南瓜早晨7-9点人工授粉（用雄花花粉涂雌花柱头）。每株留2-3个果。豆角每2-3天采收一次，不要让豆荚老化。防白粉病：喷 Immunox。",
        nextAction: "8月南瓜果实膨大，9-10月采收",
      },
      {
        id: "rose", name: "玫瑰/月季", emoji: "🌹",
        currentState: "🌹 持续开花中",
        urgentAction: "高温期重点浇水 + 减少施肥",
        urgentDetail: "7-8月高温期减少施肥（或用半量）。早晨充足浇水，避免叶片积水。继续剪残花。黑斑病高发：保持喷 Immunox，摘除病叶。",
        nextAction: "9月恢复正常施肥，秋花更美",
      },
      {
        id: "kiwi", name: "拇指猕猴桃", emoji: "🥝",
        currentState: "🥝 果实膨大中",
        urgentAction: "充足浇水 + 继续修剪探索枝",
        urgentDetail: "果实膨大期需水量大，每周深浇1-2次。继续每2-3周剪一次探索枝。施一次追肥 Tree-tone。检查日本金龟子，发现用 Deadbug 喷。",
        nextAction: "8-9月果实成熟采收",
      },
    ],
  },

  // ─── 8月 ───
  {
    month: 8,
    label: "8月",
    subtitle: "丰收季开始 — 采收+秋季准备",
    plants: [
      {
        id: "pear", name: "梨树", emoji: "🍐",
        currentState: "🍐 果实接近成熟",
        urgentAction: "适时采收（梨要提前摘！）",
        urgentDetail: "梨不能等到完全成熟才摘！果实变色、轻提能脱落时采收。室温放5-7天后熟。早熟品种8月采，晚熟品种9月。采后清理落果防病。",
        nextAction: "采后喷一次铜皂清园，9月施秋肥",
      },
      {
        id: "apple1", name: "苹果树 1号", emoji: "🍎",
        currentState: "🍎 果实着色中",
        urgentAction: "检查成熟度 + 准备采收",
        urgentDetail: "早熟品种8月可采收。判断成熟：果实底色从绿变黄、种子变褐色、轻提旋转能脱落。采后冷藏保存。继续均匀浇水防裂果。",
        nextAction: "晚熟品种9月采收",
      },
      {
        id: "apple2", name: "苹果树 2号", emoji: "🍎",
        currentState: "🍎 果实着色中",
        urgentAction: "继续浇水促着色 + 准备采收",
        urgentDetail: "反光膜帮助果实均匀着色。停止所有喷药（采前14天）。保持均匀浇水。可以摘除果实周围遮挡的叶片促进着色。",
        nextAction: "9月采收",
      },
      {
        id: "blueberry", name: "蓝莓", emoji: "🫐",
        currentState: "🫐 采收尾声",
        urgentAction: "最后采收 + 施秋肥",
        urgentDetail: "8月中旬蓝莓采收基本结束。施最后一次 Holly-tone 帮助花芽分化（明年的产量）。继续浇水，不要让植株缺水进入秋季。",
        nextAction: "9-10月不需要特别管理，保持浇水",
      },
      {
        id: "grape", name: "葡萄", emoji: "🍇",
        currentState: "🍇 果实转色/成熟",
        urgentAction: "测糖度 + 防鸟 + 采收",
        urgentDetail: "果实完全转色后2-3周可采收。品尝测试甜度。罩防鸟网保护。停止喷药（采前14天）。一次性剪下整穗，不要一粒粒摘。",
        nextAction: "采后清理果穗残留，9月施秋肥",
      },
      {
        id: "veggies", name: "番茄/辣椒/茄子/芹菜", emoji: "🍅",
        currentState: "🍅 丰收高峰期",
        urgentAction: "每天检查采收 + 继续防病追肥",
        urgentDetail: "番茄、辣椒、茄子进入丰收高峰。每天检查采收成熟果实。继续每3-4周追肥。注意晚疫病（连续阴雨后），发现立即摘除病叶喷铜皂。",
        nextAction: "9月霜冻前抢收所有果实（绿番茄可室内后熟）",
      },
      {
        id: "seeds", name: "南瓜/豆角", emoji: "🎃",
        currentState: "🎃 南瓜膨大/豆角持续采收",
        urgentAction: "南瓜垫板防腐 + 豆角采收",
        urgentDetail: "南瓜下面垫木板或稻草防止底部腐烂。减少浇水让果皮硬化。豆角继续每2-3天采收。8月下旬可以播种秋季豆角。",
        nextAction: "9-10月南瓜藤枯后采收",
      },
      {
        id: "rose", name: "玫瑰/月季", emoji: "🌹",
        currentState: "🌹 夏末花量减少",
        urgentAction: "8月底恢复施肥促秋花",
        urgentDetail: "8月下旬开始恢复正常施肥（Rose-tone），为秋季第二波盛花做准备。继续防黑斑病。修剪枯枝和交叉枝改善通风。",
        nextAction: "9月秋花盛开",
      },
      {
        id: "kiwi", name: "拇指猕猴桃", emoji: "🥝",
        currentState: "🥝 果实接近成熟",
        urgentAction: "检查成熟度 + 准备采收",
        urgentDetail: "拇指猕猴桃8月下旬-9月成熟。成熟标志：果实轻捏微软、甜味增加。可以剪下一个试吃。成熟的果实会自然脱落，每天捡拾。",
        nextAction: "9月集中采收",
      },
    ],
  },

  // ─── 9月 ───
  {
    month: 9,
    label: "9月",
    subtitle: "秋收+越冬准备 — 施秋肥+最后采收",
    plants: [
      {
        id: "pear", name: "梨树", emoji: "🍐",
        currentState: "🍐 晚熟品种采收/已采完",
        urgentAction: "施秋季基肥 Tree-tone",
        urgentDetail: "采收结束后施 Tree-tone 秋肥（树冠滴水线下挖浅沟撒入）。清理所有落果和病叶减少越冬病原。可以喷一次铜皂做秋季清园。",
        nextAction: "10-11月落叶后冬季修剪",
      },
      {
        id: "apple1", name: "苹果树 1号", emoji: "🍎",
        currentState: "🍎 采收季",
        urgentAction: "采收 + 施秋肥",
        urgentDetail: "晚熟品种9月采收。采后施 Tree-tone 秋肥帮助恢复树势和花芽分化。清理落果。可以开始规划冬季修剪方案。",
        nextAction: "11-12月落叶后冬季修剪",
      },
      {
        id: "apple2", name: "苹果树 2号", emoji: "🍎",
        currentState: "🍎 采收中",
        urgentAction: "完成采收 + 施秋肥",
        urgentDetail: "同苹果1号。全部采收完毕后施 Tree-tone。清除所有落果和病果（扔垃圾桶，不要堆肥）。",
        nextAction: "11-12月冬季修剪",
      },
      {
        id: "blueberry", name: "蓝莓", emoji: "🫐",
        currentState: "🌿 生长放缓，花芽分化中",
        urgentAction: "保持浇水 + 不要施肥",
        urgentDetail: "9月后不再施肥（避免刺激新梢不耐冻）。保持正常浇水直到地面结冻。可以补充松针覆盖物维持土壤酸性。",
        nextAction: "11月覆盖保护越冬",
      },
      {
        id: "grape", name: "葡萄", emoji: "🍇",
        currentState: "🍇 晚熟品种采收/已采完",
        urgentAction: "采后施秋肥 + 清园",
        urgentDetail: "采收结束后施 Tree-tone 秋肥。清除所有残留果穗和病叶。9月底可以开始计划冬季修剪方案（标记需要保留的枝条）。",
        nextAction: "11-12月落叶后冬季修剪（短截法）",
      },
      {
        id: "veggies", name: "番茄/辣椒/茄子/芹菜", emoji: "🍅",
        currentState: "🍅 抢收+拔秧",
        urgentAction: "霜冻前抢收所有果实",
        urgentDetail: "关注天气预报！第一次霜冻前摘下所有果实（绿番茄放纸袋里室内后熟）。霜后拔除植株，清理残体。可以种植秋季覆盖作物（黑麦草）。",
        nextAction: "清理菜地，为明年做准备",
      },
      {
        id: "seeds", name: "南瓜/豆角", emoji: "🎃",
        currentState: "🎃 南瓜成熟/豆角收尾",
        urgentAction: "南瓜藤枯后采收",
        urgentDetail: "南瓜：藤蔓枯黄、果柄干硬、指甲掐不动果皮时采收。留3-4英寸果柄。晾晒1-2周（curing）后可存放数月。豆角拔秧清理。",
        nextAction: "南瓜存放在阴凉干燥处，可保存2-3个月",
      },
      {
        id: "rose", name: "玫瑰/月季", emoji: "🌹",
        currentState: "🌹 秋花盛开",
        urgentAction: "欣赏秋花 + 9月底停止施肥",
        urgentDetail: "秋花通常颜色更深更美。9月底停止施肥，让植株逐渐进入休眠准备。继续防黑斑病喷药直到落叶。不要修剪（避免刺激新梢）。",
        nextAction: "11月初重剪+培土越冬",
      },
      {
        id: "kiwi", name: "拇指猕猴桃", emoji: "🥝",
        currentState: "🥝 集中采收期",
        urgentAction: "每天采收成熟果实",
        urgentDetail: "9月是拇指猕猴桃主要采收期。成熟果实轻捏微软、味甜。每天检查采收，成熟果实保存期短（冷藏1-2周）。可以做果酱或冷冻保存。",
        nextAction: "采收结束后施秋肥 Tree-tone",
      },
    ],
  },

  // ─── 10月 ───
  {
    month: 10,
    label: "10月",
    subtitle: "秋季清园 — 清理病残+准备越冬",
    plants: [
      {
        id: "pear", name: "梨树", emoji: "🍐",
        currentState: "🍂 开始落叶",
        urgentAction: "清理落叶 + 喷铜皂清园",
        urgentDetail: "及时清理落叶（黑星病菌在落叶上越冬）。落叶50%时喷铜皂 (2-3汤匙/gal) 做秋季清园。检查树干有无溃疡病斑。",
        nextAction: "11-12月完全落叶后冬季修剪",
      },
      {
        id: "apple1", name: "苹果树 1号", emoji: "🍎",
        currentState: "🍂 落叶中",
        urgentAction: "清理落叶落果 + 铜皂清园",
        urgentDetail: "清除所有落叶和落果（病菌越冬源）。喷铜皂清园。可以涂白树干防冻裂和日灼（石灰水1:5）。",
        nextAction: "11-12月冬季修剪",
      },
      {
        id: "apple2", name: "苹果树 2号", emoji: "🍎",
        currentState: "🍂 落叶中",
        urgentAction: "同苹果1号：清园+涂白",
        urgentDetail: "清理落叶落果，喷铜皂，涂白树干。可以在树盘周围覆盖堆肥或碎木屑保护根系越冬。",
        nextAction: "11-12月冬季修剪",
      },
      {
        id: "blueberry", name: "蓝莓", emoji: "🫐",
        currentState: "🍂 叶片变红/落叶",
        urgentAction: "加厚覆盖物 + 继续浇水",
        urgentDetail: "蓝莓秋叶变红很美观。加厚松针/木屑覆盖到4-6英寸保护浅根系越冬。继续浇水直到地面结冻。不要修剪。",
        nextAction: "11月如有必要可以搭防风屏障",
      },
      {
        id: "grape", name: "葡萄", emoji: "🍇",
        currentState: "🍂 落叶中",
        urgentAction: "清理落叶 + 准备冬剪",
        urgentDetail: "清除所有落叶和残留果穗。标记今年生长好的枝条（明年结果用）。可以喷铜皂清园。准备冬季修剪工具（磨利修枝剪）。",
        nextAction: "11-12月完全落叶后冬季修剪（短截法）",
      },
      {
        id: "veggies", name: "番茄/辣椒/茄子/芹菜", emoji: "🍅",
        currentState: "✅ 已清理完毕",
        urgentAction: "种覆盖作物或翻地",
        urgentDetail: "菜地已清理干净。可以撒播冬季覆盖作物（冬黑麦、三叶草）保护土壤。或者翻地晒土，加入堆肥和石灰调节pH。",
        nextAction: "明年3月开始规划春季种植",
      },
      {
        id: "seeds", name: "南瓜/豆角", emoji: "🎃",
        currentState: "✅ 已采收完毕",
        urgentAction: "清理藤蔓残体",
        urgentDetail: "拔除所有藤蔓残体，避免病虫害越冬。南瓜存放在10-15°C阴凉干燥处。菜地同上处理（覆盖作物或翻地加堆肥）。",
        nextAction: "享用储存的南瓜！",
      },
      {
        id: "rose", name: "玫瑰/月季", emoji: "🌹",
        currentState: "🌹 最后几朵花/准备休眠",
        urgentAction: "停止修剪 + 让果实（玫瑰果）留着",
        urgentDetail: "10月不要修剪残花，让玫瑰果留在枝头——这是植株进入休眠的信号。继续清理落叶防黑斑病越冬。准备越冬材料（培土/覆盖物）。",
        nextAction: "11月初第一次硬冻后重剪+培土",
      },
      {
        id: "kiwi", name: "拇指猕猴桃", emoji: "🥝",
        currentState: "🍂 叶片变黄/采收结束",
        urgentAction: "施秋肥 + 清理落叶",
        urgentDetail: "采收结束后施 Tree-tone 秋肥。清理落叶和残果。检查棚架结构是否牢固（冬季雪压）。不要现在修剪（等完全落叶后）。",
        nextAction: "11-12月落叶后冬季修剪",
      },
    ],
  },

  // ─── 11月 ───
  {
    month: 11,
    label: "11月",
    subtitle: "冬季修剪+越冬保护",
    plants: [
      {
        id: "pear", name: "梨树", emoji: "🍐",
        currentState: "🌳 完全落叶/休眠",
        urgentAction: "冬季修剪",
        urgentDetail: "完全落叶后开始冬剪。剪除：病枝、枯枝、交叉枝、内膛过密枝。保持中心开放型树形。大伤口涂愈合剂。",
        nextAction: "12月继续修剪（天气允许时）",
      },
      {
        id: "apple1", name: "苹果树 1号", emoji: "🍎",
        currentState: "🌳 休眠期",
        urgentAction: "冬季修剪（最重要的年度管理）",
        urgentDetail: "冬剪决定明年产量！剪除：下垂枝、内膛密枝、病枝、水平以上45°的直立枝。保留水平或略下垂的结果枝。每年去掉约20%枝量。",
        nextAction: "12月继续修剪",
      },
      {
        id: "apple2", name: "苹果树 2号", emoji: "🍎",
        currentState: "🌳 休眠期",
        urgentAction: "同苹果1号：冬季修剪",
        urgentDetail: "同上。注意两棵苹果树修剪风格保持一致。修剪后的枝条如有病斑要集中销毁，不要堆肥。",
        nextAction: "12月继续修剪",
      },
      {
        id: "blueberry", name: "蓝莓", emoji: "🫐",
        currentState: "🌳 落叶休眠",
        urgentAction: "轻度修剪 + 越冬保护",
        urgentDetail: "剪除：枯枝、细弱枝、贴地枝。3年以上老枝从基部剪除1-2根促更新。确保覆盖物厚度4-6英寸。寒冷地区可搭麻布防风屏障。",
        nextAction: "冬季保持覆盖物，来年3月检查",
      },
      {
        id: "grape", name: "葡萄", emoji: "🍇",
        currentState: "🌳 完全休眠",
        urgentAction: "冬季修剪（短截法）",
        urgentDetail: "葡萄冬剪非常重要！每根主枝臂留2-3根结果母枝（今年生），每根保留6-10个芽。其余全部剪除。留预备枝（2芽短桩）。详见修剪疏果Tab。",
        nextAction: "修剪完绑蔓上架，等待来年萌芽",
      },
      {
        id: "veggies", name: "番茄/辣椒/茄子/芹菜", emoji: "🍅",
        currentState: "❄️ 休息期",
        urgentAction: "规划明年品种 + 订种子",
        urgentDetail: "11月是规划明年菜园的好时机。总结今年经验：哪些品种好、哪些位置需要轮作。开始浏览种子目录，早订热门品种。",
        nextAction: "12-1月订购种子，2月开始室内育苗",
      },
      {
        id: "seeds", name: "南瓜/豆角", emoji: "🎃",
        currentState: "❄️ 休息期",
        urgentAction: "总结+规划明年",
        urgentDetail: "记录今年的种植经验。南瓜和豆角需要轮作，明年换个位置种。可以开始堆肥为明年准备有机肥。",
        nextAction: "明年5月再种",
      },
      {
        id: "rose", name: "玫瑰/月季", emoji: "🌹",
        currentState: "🌳 进入休眠",
        urgentAction: "第一次硬冻后重剪+培土越冬",
        urgentDetail: "等第一次硬冻（连续几晚低于-5°C）后：剪到30-45cm高，清除所有叶片。根部培土20-30cm或用玫瑰越冬锥罩住。⚠️ 不要太早培土，等完全休眠后！",
        nextAction: "冬季不需管理，来年4月去除培土",
      },
      {
        id: "kiwi", name: "拇指猕猴桃", emoji: "🥝",
        currentState: "🌳 完全落叶/休眠",
        urgentAction: "冬季修剪 + 越冬保护",
        urgentDetail: "完全落叶后开始冬剪：剪除已结过果的老枝，选留2-3根健壮当年生枝作为明年结果枝。根部覆盖厚层覆盖物（10-15cm）保护浅根系。检查棚架。",
        nextAction: "12月继续修剪，绑蔓上架",
      },
    ],
  },

  // ─── 12月 ───
  {
    month: 12,
    label: "12月",
    subtitle: "深冬休眠 — 完成修剪+工具保养",
    plants: [
      {
        id: "pear", name: "梨树", emoji: "🍐",
        currentState: "🌳 深度休眠",
        urgentAction: "完成冬剪 + 检查树干",
        urgentDetail: "如果11月没剪完，12月天气好时继续。检查树干有无冻裂、溃疡病斑。涂白保护（如未涂）。确保树盘覆盖物到位。",
        nextAction: "来年3月萌芽前喷石硫合剂清园",
      },
      {
        id: "apple1", name: "苹果树 1号", emoji: "🍎",
        currentState: "🌳 深度休眠",
        urgentAction: "完成冬剪 + 保养工具",
        urgentDetail: "完成所有修剪工作。修枝剪消毒（酒精擦拭）后涂油保养。检查是否需要补涂树干白漆。规划明年的喷药日历。",
        nextAction: "来年3月萌芽前清园喷药",
      },
      {
        id: "apple2", name: "苹果树 2号", emoji: "🍎",
        currentState: "🌳 深度休眠",
        urgentAction: "同苹果1号",
        urgentDetail: "完成修剪，保养工具，检查树干。可以趁冬天研究明年的综合管理方案（IPM）。",
        nextAction: "来年3月清园",
      },
      {
        id: "blueberry", name: "蓝莓", emoji: "🫐",
        currentState: "❄️ 深度休眠",
        urgentAction: "检查越冬保护是否到位",
        urgentDetail: "检查覆盖物是否被风吹散，补充到4-6英寸。防风屏障是否牢固。大雪后轻轻抖落枝上积雪防折断。",
        nextAction: "来年3月去除多余覆盖物，恢复管理",
      },
      {
        id: "grape", name: "葡萄", emoji: "🍇",
        currentState: "🌳 深度休眠",
        urgentAction: "完成冬剪 + 绑蔓",
        urgentDetail: "如果11月没完成，12月继续修剪和绑蔓。将保留的结果母枝水平绑到架上铁丝。检查架子结构，修复松动部分。",
        nextAction: "来年3-4月萌芽前喷铜皂清园",
      },
      {
        id: "veggies", name: "番茄/辣椒/茄子/芹菜", emoji: "🍅",
        currentState: "❄️ 休息期",
        urgentAction: "订种子 + 准备育苗设备",
        urgentDetail: "12月-1月订购明年的种子（热门品种容易断货）。检查育苗灯、加热垫、育苗盘是否完好。规划种植日历（从定植日倒推育苗时间）。",
        nextAction: "来年2月中开始室内育苗（番茄、辣椒提前6-8周）",
      },
      {
        id: "seeds", name: "南瓜/豆角", emoji: "🎃",
        currentState: "❄️ 休息期",
        urgentAction: "订种子 + 规划轮作",
        urgentDetail: "订购明年的南瓜和豆角种子。规划轮作方案：南瓜和豆角不要种在去年同一位置。豆角（固氮）后面适合种需肥多的南瓜。",
        nextAction: "来年5月直播",
      },
      {
        id: "rose", name: "玫瑰/月季", emoji: "🌹",
        currentState: "❄️ 越冬中",
        urgentAction: "不需要管理，检查培土",
        urgentDetail: "冬季不需要任何管理。偶尔检查培土/越冬锥是否被风吹开。大雪后不需要清理（雪是天然保温层）。",
        nextAction: "来年4月气温稳定回升后去除培土",
      },
      {
        id: "kiwi", name: "拇指猕猴桃", emoji: "🥝",
        currentState: "🌳 深度休眠",
        urgentAction: "完成冬剪 + 检查覆盖物",
        urgentDetail: "完成所有修剪和绑蔓工作。确保根部覆盖物厚实（10-15cm）。检查棚架在积雪下是否稳固。极寒地区可用麻布包裹主干。",
        nextAction: "来年4月萌芽前检查冻伤，开始新一年管理",
      },
    ],
  },
];

// 获取当前月份对应的植物状态数据
export function getCurrentMonthData(): MonthData {
  const currentMonth = new Date().getMonth() + 1; // 1-12
  // 查找当前月份的数据，如果没有则返回最接近的
  const data = monthlyStatusData.find(d => d.month === currentMonth);
  if (data) return data;
  // 如果当前月份没有数据（1-3月），返回4月的数据作为默认
  return monthlyStatusData[0];
}

// 获取指定月份的数据
export function getMonthData(month: number): MonthData | undefined {
  return monthlyStatusData.find(d => d.month === month);
}
