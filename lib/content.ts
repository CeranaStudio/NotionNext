// 官網所有文案都在這裡。原本在 Notion 與 NotionNext starter 主題 config，2026-11 起改為直接寫在 repo。

export const site = {
  name: '東蜂科技',
  nameEn: 'Cerana Technology',
  url: 'https://www.cerana.tech',
  tagline: '智能驅動的數位轉型，從部署到成長的全程夥伴',
  description:
    '東蜂科技為中小企業、學校與醫療院所打造客製化系統：流程數位化、生產自動化、AI 助理與 RAG 知識庫，從需求訪談、開發到上線維運一路陪跑。',
  keywords: ['接案', '網站', '數位轉型', 'AI 導入', 'RAG', '系統開發', '流程自動化'],
  email: 'cerana.mail@gmail.com',
  location: '台灣・台北',
  since: 2024,
  // 聯絡表單送到 n8n；若 webhook 掛掉，前端會改成開信件草稿
  contactWebhook: 'https://n8n.cerana.tech/webhook/6ca95608-4b4a-4148-bc5b-1974802663e6'
}

export const nav = [
  { label: '服務', href: '/#services' },
  { label: '合作案例', href: '/cases' },
  { label: '合作流程', href: '/#process' },
  { label: '方案', href: '/#pricing' },
  { label: '團隊', href: '/#team' },
  { label: '常見問題', href: '/#faq' }
]

export const hero = {
  eyebrow: '客製化系統・AI 導入・數位轉型',
  title: ['客製化方案，', '為企業開啟數位新篇章'],
  text: '我們把你每天在 Excel、紙本和 LINE 群組裡處理的事，變成真的好用的系統。從一個痛點開始，做到看得見的成效。',
  stats: [
    { value: '>300%', label: '學生提問處理效率', note: '大學 AI 助教' },
    { value: '>100%', label: '板金生產效率', note: '板金加工廠' },
    { value: '5+', label: '產業落地案例', note: '製造・教育・醫療' }
  ]
}

export type Service = { key: string; title: string; text: string; points: string[] }

export const services: Service[] = [
  {
    key: 'workflow',
    title: '行政流程數位化',
    text: '把傳統行政流程轉成數位系統，提升效率、降低人為錯誤。',
    points: ['排課、薪資、表單線上化', '紙本紀錄改為一鍵匯出', 'LINE 通知與資料同步']
  },
  {
    key: 'factory',
    title: '自動化生產流程',
    text: '導入智能製造工具，優化生產流程，提高產能並確保品質一致。',
    points: ['規格書自動解析', '排料與切割路徑演算法', '輸出 DXF 直接上機']
  },
  {
    key: 'ai',
    title: 'AI 智慧化解決方案',
    text: '打造只根據你自己資料回答的 AI 助理，答案有依據，內容隨時可更新。',
    points: ['企業 / 校園知識庫助理', 'LINE Bot 與網頁問答', '影像辨識與自動填寫']
  },
  {
    key: 'edge',
    title: '邊緣運算與系統整合',
    text: '結合 5G 與邊緣運算即時處理現場資料，並串接你既有的系統。',
    points: ['API 串接與資料整合', '地端部署方案', '監控與告警建置']
  }
]

export type CaseStudy = {
  slug: string
  client: string
  industry: string
  product: string
  title: string
  summary: string
  date: string
  accent: string
  metric?: { value: string; label: string }
  challenges: string[]
  solutions: { title: string; text: string }[]
  results: string[]
}

export const cases: CaseStudy[] = [
  {
    slug: 'sheet-metal',
    client: '板金加工廠',
    industry: '製造業',
    product: '板金展開與排料自動化',
    title: '板金切割業如何透過自動化，增加超過一倍的生產效率',
    summary: '從規格書到切割機，把四段仰賴老師傅的人工流程串成一條自動化產線。',
    date: '2025-01-27',
    accent: '#2f9e6a',
    metric: { value: '>100%', label: '生產效率提升' },
    challenges: [
      '規格書格式不一，仰賴人工判讀',
      '零件展開尺寸要靠熟悉工程計算的人力',
      '人工排料，板材空間浪費',
      '人工切割板金，費時費力'
    ],
    solutions: [
      { title: '客戶直接上傳圖檔', text: '不用再人工判讀格式不一的規格書，客戶上傳設計檔即可開始。' },
      { title: '自動計算零件尺寸', text: '輸入幾個基本尺寸，系統自動算出展開尺寸，不再只有少數老師傅會算。' },
      { title: '自動排料', text: '自動把零件排進板材，算出最省料的排法與切割順序。' },
      { title: '檔案直接上切割機', text: '直接產出切割機可讀的檔案；也能一鍵分享模型給客戶即時改參數，縮短下單時間。' }
    ],
    results: ['減少材料浪費', '減少溝通成本', '減少下單等待時間'],
  },
  {
    slug: 'university-ai-tutor',
    client: '國立大學',
    industry: '高等教育',
    product: 'AI 課程助教',
    title: '學校如何透過導入 AI 提高學生學習效率',
    summary: '只根據課程教材回答的 AI 助教，24 小時回覆學生，老師用後台就能管理。',
    date: '2025-03-07',
    accent: '#3a56c5',
    metric: { value: '>300%', label: '解答學生疑問效率' },
    challenges: [
      '學生遇到課業問題只能等',
      '寄信問助教，往返效率低',
      '改問 ChatGPT，答案與課程內容脫節',
      '模型幻覺，答案不精確'
    ],
    solutions: [
      { title: '課程設定', text: '老師控制哪些教材能被 AI 讀取，並以提示詞設定考試時間、評分方式等課程資訊。' },
      { title: 'LINE Bot 一次設定', text: '在後台設定一次即可上線，一個平台支援多個 LINE Bot。' },
      { title: '學生問答介面', text: '不用安裝 APP，學生選擇專家與教材範圍即可提問。' },
      { title: '只依教材回答', text: '先找到教材裡相關的段落再回答，不會在課外亂答。' }
    ],
    results: ['減少回信溝通時間', '蒐集學生疑問，優化教學', '減少課程人力成本'],
  },
  {
    slug: 'clinical-assessment',
    client: '醫學中心',
    industry: '醫療院所',
    product: '臨床早期活動評估助理',
    title: '醫療院所如何透過數位化，提升臨床判斷準確率和效率',
    summary: '用影像辨識與即時計算取代手抄，讓臨床早期活動評估更快、更一致。',
    date: '2025-07-03',
    accent: '#16a571',
    challenges: ['手抄資料耗時、易出錯', '評估過程繁瑣', '評估標準與來源不熟悉', '紙本紀錄繁瑣、易遺漏'],
    solutions: [
      { title: '影像辨識', text: '掃描病患 QR Code 自動帶入資料；拍攝儀器螢幕即可讀取心率、血氧、呼吸等數值。' },
      { title: '計算工具', text: '依指標自動計算 ICH 分數，結果即時帶入紀錄，不用翻表換算。' },
      { title: '外部文獻連結', text: '評估時即時提示國內外文獻與指引，判斷有依據。' },
      { title: '紀錄統整匯出', text: '評估、介入、回饋全程自動串接，一鍵匯出 Excel 供追蹤與研究。' }
    ],
    results: ['加速評估流程', '提高追蹤效率', '減少抄寫時間'],
  },
  {
    slug: 'cram-school',
    client: '多分校補習班',
    industry: '補教業',
    product: '補習班教務管理平台',
    title: '補習班教務效率全面升級，解決排課混亂和薪資錯帳',
    summary: '可視化課表、自動結算講師薪資、一頁掌握各分班資訊，告別 Excel 與 LINE 群組。',
    date: '2025-07-03',
    accent: '#2b9bd6',
    challenges: [
      '每月用 Excel 人工排課，請假代課難即時更新',
      '人工計算講師時數與薪資，比對費時易出錯',
      '分部多、課程多，資訊分散',
      '靠 LINE 互傳通知，訊息混亂'
    ],
    solutions: [
      { title: '可視化課表系統', text: '課表排程一目了然，教師與行政一鍵新增、調整課程，所有人同步看到。' },
      { title: '自動化講師薪資', text: '依課程紀錄自動結算薪資，一鍵匯出 Excel 報表，減少錯帳與爭議。' },
      { title: '一頁掌握課程 / 班級', text: '統一課程與分班資料，排課效率與正確性一起提升。' }
    ],
    results: ['強化排課流程', '加快資訊同步速度', '提升對帳透明度', '縮短行政作業時間'],
  },
  {
    slug: 'campus-assistant',
    client: '公立國中',
    industry: '國中小教育',
    product: '3D 校園 AI 助手',
    title: '用 AI 打造聰明校園，即時回應學生需求',
    summary: '站在校門口的 3D 校園助手，用語音就能問，答案來自學校自己的知識庫。',
    date: '2025-07-03',
    accent: '#f08a1c',
    challenges: ['校務資訊分散，學生不知道去哪問', '打字提問對國中生與長者不友善', '模型需能隨校務變化更新'],
    solutions: [
      { title: '3D 角色互動', text: '擬真動畫角色站上校門前，可依學校形象客製服裝與說話風格。' },
      { title: '語音輸入', text: '即問即答、免打字，支援多種說法與提問方式。' },
      { title: '學校自己管理的知識庫', text: '行政單位可自行新增、修改內容，不需重新訓練模型。' }
    ],
    results: ['強化校本特色與品牌', '提升互動參與度', '靈活回應校務變化'],
  }
]

export const process = [
  { title: '免費諮詢', text: '想法還不完整也沒關係。先聊你的流程與痛點，我們幫你判斷從哪一步開始最划算。' },
  { title: '需求訪談與規劃', text: '到現場看實際作業，整理成可驗收的規格、時程與報價。' },
  { title: '分段開發與驗收', text: '從最關鍵的需求先做，每個階段都能實際操作、確認再往下。' },
  { title: '上線與維運', text: '新舊系統平行運作、提供教育訓練；上線後持續維護、監控與健檢。' }
]

export type Plan = {
  title: string
  price: string
  header: string
  features: string[]
  tag?: string
}

export const plans: Plan[] = [
  {
    title: '純軟體',
    price: '4 萬',
    header: '網站、系統、APP 與 AI 助理',
    tag: '最常見',
    features: [
      '官網與一頁式網站',
      '內部系統（排課、薪資、表單、報表）',
      'APP 開發（iOS / Android / PWA）',
      'AI 助理、LINE Bot 與知識庫',
      '流程自動化與 API 串接'
    ]
  },
  {
    title: '軟體＋硬體',
    price: '10 萬',
    header: '需要現場設備、感測器或地端主機',
    features: [
      '現場設備與感測器整合',
      '產線自動化與機台串接',
      '影像辨識與邊緣運算',
      '地端部署與主機建置',
      '上線後監控與維運'
    ]
  }
]

export const testimonials = [
  {
    text: '他們的團隊非常專業且反應迅速，一步一步幫我們完成軟體規劃，過程中不斷提供專業建議，讓流程數位化更加順利。',
    name: '陳先生',
    role: '製造業負責人'
  },
  {
    text: '溝通時都非常有耐心，連我們沒發現的痛點也會被指出來。成品有效解決問題，助教老師再也不用半夜收信回答學生。',
    name: '鄭先生',
    role: '大學行政人員'
  },
  {
    text: '技術團隊不僅理解我們的需求，還能精準地把創意轉化為實際的應用程式。從提案到落地過程順暢，也讓產品在區域競賽中奪得佳績。',
    name: '林小姐',
    role: '廣告相關業者'
  }
]

export const team = [
  { name: 'Brandon Lu', role: '產品經理', photo: '/team/brandon.webp' },
  { name: 'Jack Zheng', role: '技術負責人', photo: '/team/yjack.webp' },
  { name: 'Mark Lai', role: '網站可靠性工程師', photo: '/team/mark.webp' },
  { name: 'Yen Chiu', role: 'Web3 工程師', photo: '/team/yen.webp' },
  { name: 'Ian Chiu', role: '物聯網工程師', photo: '/team/ian.webp' },
  { name: 'Peter Chang', role: '軟體工程師', photo: '/team/peter.webp' }
]

export const faqs = [
  {
    q: '想法還不太完整，該怎麼開始？',
    a: '我們會安排顧問與您討論，一起規劃最適合的轉型方案。從小步驟開始，確保每個環節都符合您的需求。'
  },
  {
    q: '數位轉型需要投入龐大預算嗎？我們是中小企業，預算有限。',
    a: '我們提供彈性方案，從最關鍵的需求開始，讓您在合理預算內獲得最大效益，再逐步擴展。'
  },
  {
    q: '導入新系統會影響現有營運嗎？',
    a: '我們採用漸進式轉換，新舊系統平行運作，並提供完整培訓，協助團隊順利上手。'
  },
  {
    q: '完成專案後，後續的維護支援如何？',
    a: '提供完整的售後支援，包括系統維護、問題排除和定期健檢。遇到緊急狀況，技術團隊會立即處理。'
  }
]

export const contactServices = ['官網設計', '數位轉型', '手機 APP 開發', '開發 POC 產品', '流程自動化', 'AI 智慧化解決方案', '其他']
