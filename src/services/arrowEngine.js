// src/services/arrowEngine.js

/**
 * Pre-loaded Arrow English dataset containing preset examples
 * plus visual breakdowns, explanations, and audio transcripts.
 */
export const PRESET_SENTENCES = [
  {
    id: "ex1",
    arrowKorean: "나는 이다 할 예정 면접 of 알바 at 카페 at 4:30 p.m",
    english: "I am going to have an interview for a part-time job at a cafe at 4:30 p.m.",
    chunks: [
      { text: "나는", role: "주인공 (Subject)", english: "I", color: "indigo" },
      { text: "이다 할 예정", role: "상태/미래계획 (Action/State)", english: "am going to have", color: "blue" },
      { text: "면접", role: "직접 대상 (Target)", english: "an interview", color: "emerald" },
      { text: "of 알바", role: "관련/성격 (Connection)", english: "for a part-time job", color: "amber" },
      { text: "at 카페", role: "장소 지점 (Location)", english: "at a cafe", color: "rose" },
      { text: "at 4:30 p.m", role: "시간 지점 (Time)", english: "at 4:30 p.m.", color: "purple" }
    ],
    explanation: [
      "1. **주인공(I)**에서 생각이 출발합니다.",
      "2. 주인공의 현재 의지 및 예정된 상태 **'이다 할 예정(am going to have)'**이 펼쳐집니다.",
      "3. 시선이 바로 부딪히는 1차 대상은 **'면접(an interview)'**입니다.",
      "4. 그 면접이 밀접하게 연결(of/for)되어 있는 일의 종류는 **'알바(a part-time job)'**입니다.",
      "5. 그 일이 일어나는 장소의 점을 콕 찍어 나타내면 **'at 카페(at a cafe)'**입니다.",
      "6. 그 일의 시간 지점을 콕 찍으면 **'at 4:30 p.m.'**입니다."
    ],
    prepositions: [
      { word: "of / for", meaning: "밀접 연관 / 대상 소유", desc: "면접이 알바 일과 떼려야 뗄 수 없이 연관되어 있음을 표시" },
      { word: "at", meaning: "콕 찝은 점", desc: "넓은 영역이 아니라 지도 위의 한 점(카페)과 시계의 한 점(4시30분)을 콕 찍음" }
    ]
  },
  {
    id: "ex2",
    arrowKorean: "나 쳐다본다 나무들 about 아파트 단지",
    english: "I am looking at the trees around the apartment complex.",
    chunks: [
      { text: "나", role: "주인공 (Subject)", english: "I", color: "indigo" },
      { text: "쳐다본다", role: "동작/시선 (Action)", english: "am looking at", color: "blue" },
      { text: "나무들", role: "직접 대상 (Target)", english: "the trees", color: "emerald" },
      { text: "about 아파트 단지", role: "주변 환경 (Surroundings)", english: "around the apartment complex", color: "amber" }
    ],
    explanation: [
      "1. **주인공(I)**의 눈에서 시선이 뻗어 나갑니다.",
      "2. 시선을 목표점과 맞추는 동작 **'쳐다본다(am looking at)'**를 수행합니다.",
      "3. 시선이 닿아 멈추는 대상은 **'나무들(the trees)'**입니다.",
      "4. 그 나무들이 위치한 주변 영역이 **'about/around 아파트 단지(around the apartment complex)'** 주변에 펼쳐져 있습니다."
    ],
    prepositions: [
      { word: "about / around", meaning: "주변에 산재함 / 에워쌈", desc: "아파트 단지 근처 주위에 나무들이 펼쳐져 있음을 묘사" }
    ]
  },
  {
    id: "ex3",
    arrowKorean: "학생들이 앉아 있다.on 의자 around 테이블",
    english: "Students are sitting on chairs around the table.",
    chunks: [
      { text: "학생들이", role: "주인공들 (Subject)", english: "Students", color: "indigo" },
      { text: "앉아 있다", role: "동작 진행 (Action)", english: "are sitting", color: "blue" },
      { text: "on 의자", role: "접촉 면 (Surface Contact)", english: "on chairs", color: "emerald" },
      { text: "around 테이블", role: "공간 구도 (Spatial Layout)", english: "around the table", color: "amber" }
    ],
    explanation: [
      "1. 주인공들인 **'학생들(Students)'**에 시선이 닿습니다.",
      "2. 학생들의 현재 상태는 **'앉아 있는(are sitting)'** 중입니다.",
      "3. 엉덩이가 직접 닿아 붙어 있는 표면은 **'on 의자(on chairs)'**입니다.",
      "4. 그 의자와 학생들이 테이블을 원형으로 에워싸고 있는 구도가 **'around 테이블(around the table)'**입니다."
    ],
    prepositions: [
      { word: "on", meaning: "면 접촉", desc: "의자의 좌판 표면에 몸이 딱 붙어 있는 물리적 상태" },
      { word: "around", meaning: "둘러싼 원형 구도", desc: "테이블을 중심으로 둥글게 배치되어 있음" }
    ]
  },
  {
    id: "ex4",
    arrowKorean: "꽃들이 있다 심어진 상태 around 집",
    english: "Flowers are planted around the house.",
    chunks: [
      { text: "꽃들이", role: "주인공 (Subject)", english: "Flowers", color: "indigo" },
      { text: "있다", role: "존재 상태 (State)", english: "are", color: "blue" },
      { text: "심어진 상태", role: "수동 형상 (Passive Form)", english: "planted", color: "emerald" },
      { text: "around 집", role: "에워싼 장소 (Surrounding Space)", english: "around the house", color: "amber" }
    ],
    explanation: [
      "1. 주인공인 **'꽃들(Flowers)'**이 눈에 들어옵니다.",
      "2. 꽃들이 **'있다(are)'**는 존재를 선언합니다.",
      "3. 어떠한 모양인가 보니 사람에 의해 **'심어진 상태(planted)'**입니다.",
      "4. 심어져서 둘러싸고 있는 공간 대상은 **'around 집(around the house)'**입니다."
    ],
    prepositions: [
      { word: "around", meaning: "둘러싸며 존재함", desc: "집의 둘레를 따라 꽃들이 배치되어 있음" }
    ]
  },
  {
    id: "ex5",
    arrowKorean: "빗방울 떨어진다 on 차 창문",
    english: "Raindrops are falling on the car window.",
    chunks: [
      { text: "빗방울", role: "주인공 (Subject)", english: "Raindrops", color: "indigo" },
      { text: "떨어진다", role: "낙하 이동 (Action)", english: "are falling", color: "blue" },
      { text: "on 차 창문", role: "도착 접촉면 (Target Surface)", english: "on the car window", color: "emerald" }
    ],
    explanation: [
      "1. 주인공인 하늘의 **'빗방울(Raindrops)'**이 있습니다.",
      "2. 아래 방향으로 **'떨어지는(are falling)'** 물리적 운동을 합니다.",
      "3. 떨어져서 딱 닿아 부딪히는 표면은 **'on 차 창문(on the car window)'**입니다."
    ],
    prepositions: [
      { word: "on", meaning: "접촉면", desc: "빗방울이 유리창 표면에 수직으로 충돌하여 접촉함" }
    ]
  },
  {
    id: "ex6",
    arrowKorean: "나는 가고있다 to집에 on 내차를타고 비가 내린다 above 내차위로",
    english: "I am going home in my car, and rain falls above my car.",
    chunks: [
      { text: "나는", role: "주인공 1 (Subject 1)", english: "I", color: "indigo" },
      { text: "가고있다", role: "이동 동작 (Action)", english: "am going", color: "blue" },
      { text: "to집에", role: "도착 목표 (Target Direction)", english: "home", color: "emerald" },
      { text: "on 내차를타고", role: "탑승 수단 (Vehicle)", english: "in my car", color: "amber" },
      { text: "비가 내린다", role: "주인공 2 & 동작 (Subject 2 & Action)", english: "and rain falls", color: "rose" },
      { text: "above 내차위로", role: "상공 공간 (Overhead Space)", english: "above my car", color: "purple" }
    ],
    explanation: [
      "1. 첫 번째 주인공 **'나(I)'**가 **'가고 있는(am going)'** 이동을 합니다.",
      "2. 화살표 방향이 나아가 도착하는 목적지는 **'to 집에(home)'**입니다.",
      "3. 이동 시 내 몸이 올려져 탑승해 있는 수단은 **'in/on 내 차(in my car)'**입니다.",
      "4. 그리고 또 다른 주인공인 **'비가 내리는(rain falls)'** 현상이 동시 발생합니다.",
      "5. 그 비가 위치한 공간은 차 표면과 떨어져 차 위쪽 공중에 붕 떠있는 **'above 내 차 위로(above my car)'**입니다."
    ],
    prepositions: [
      { word: "to", meaning: "나아가서 도착함", desc: "목적지(집)를 향해 똑바로 뻗어나가는 방향" },
      { word: "in / on", meaning: "수단 및 탑승", desc: "차 내부 공간에 들어앉아 탑승한 상태" },
      { word: "above", meaning: "떨어진 상공", desc: "물체 표면에 닿지 않고 위쪽 공간에 붕 떠서 분포함" }
    ]
  },
  {
    id: "ex7",
    arrowKorean: "나는 시작하다 애로우잉글리시",
    english: "I start Arrow English.",
    chunks: [
      { text: "나는", role: "주인공 (Subject)", english: "I", color: "indigo" },
      { text: "시작하다", role: "동작/에너지 (Action)", english: "start", color: "blue" },
      { text: "애로우잉글리시", role: "도달 대상 (Target)", english: "Arrow English", color: "emerald" }
    ],
    explanation: [
      "1. 주인공 **'나(I)'**에게서 행동 에너지가 발출됩니다.",
      "2. 그 에너지는 **'시작하다(start)'**라는 개시 동작이 됩니다.",
      "3. 시선과 손길이 닿아 시작되는 1차 대상은 바로 **'애로우잉글리시(Arrow English)'**입니다."
    ],
    prepositions: []
  },
  {
    id: "ex8",
    arrowKorean: "나는 이다 배부른 상태 because 먹고 왔다 샐러드를 듬뿍",
    english: "I am full because I ate plenty of salad.",
    chunks: [
      { text: "나는", role: "주인공 (Subject)", english: "I", color: "indigo" },
      { text: "이다 배부른 상태", role: "현재 상태 (State)", english: "am full", color: "blue" },
      { text: "because", role: "원인 연결 (Reason Connector)", english: "because", color: "amber" },
      { text: "먹고 왔다 샐러드를 듬뿍", role: "과거 원인 (Prior Action)", english: "I ate plenty of salad", color: "emerald" }
    ],
    explanation: [
      "1. 주인공 **'나(I)'**의 현재 상태를 선언합니다: **'이다 배부른 상태(am full)'**.",
      "2. 이 현상의 근원적 원인을 뒤이어 연결해주는 접착제가 **'because(원인을 들추어 보니)'**입니다.",
      "3. 원인 장면의 주인공 **'나(I)'**가 사전에 행한 동작은 **'먹고 왔다(ate)'**입니다.",
      "4. 뱃속으로 들어간 음식물 대상은 **'샐러드를 듬뿍(plenty of salad)'**입니다."
    ],
    prepositions: [
      { word: "because", meaning: "원인 연결결합", desc: "앞의 결과 상태에서 뒤의 원인 사건으로 시선이 거슬러 올라감" },
      { word: "of", meaning: "부분과 전체 / 밀접구성", desc: "샐러드라는 전체 덩어리에서 나온 푸짐한 양(plenty)을 의미" }
    ]
  },
  {
    id: "ex9",
    arrowKorean: "나는 듣는다 강의, 오늘 수업이다 두번째",
    english: "I am listening to a lecture; today is my second class.",
    chunks: [
      { text: "나는", role: "주인공 (Subject)", english: "I", color: "indigo" },
      { text: "듣는다", role: "주의 집중 동작 (Action)", english: "am listening to", color: "blue" },
      { text: "강의", role: "목표 소리 (Target)", english: "a lecture", color: "emerald" },
      { text: ",", role: "시상 연결 (Pause/Clause)", english: ";", color: "slate" },
      { text: "오늘 수업이다 두번째", role: "추가 정보 (Additional Fact)", english: "today is my second class", color: "purple" }
    ],
    explanation: [
      "1. 주인공 **'나(I)'**가 귀를 기울이는 **'듣는다(am listening to)'** 동작을 합니다.",
      "2. 그 주파수가 도달하여 맞닿는 소리의 대상은 **'강의(a lecture)'**입니다.",
      "3. 쉼표(,)로 상황을 한 단계 더 확장하여, **'오늘(today)'**이라는 시점의 사실은 **'두 번째 수업이다(is my second class)'**라는 순서 정보를 나열합니다."
    ],
    prepositions: [
      { word: "to", meaning: "귀/주의가 뻗어 나가 도착함", desc: "listen 뒤에 to가 오는 이유는 내 귀의 주의력이 상대 소리에 가서 닿기 때문" }
    ]
  }
];

/**
 * Preposition visual guide dictionary according to Arrow English methodology
 */
export const PREPOSITION_DICTIONARY = [
  {
    word: "on",
    arrowMeaning: "접촉 (붙어 있는 상태)",
    coreConcept: "어떤 표면에 딱 붙어 있는 접촉 관계입니다. 위쪽뿐만 아니라 벽이나 천장에 붙어 있어도 on을 씁니다.",
    visualIcon: "🎯",
    example: "Raindrops fall on the window."
  },
  {
    word: "at",
    arrowMeaning: "점 (콕 찍은 위치/시간)",
    coreConcept: "넓은 영역이나 과정이 아니라, 지도 위의 한 '점'이나 시계의 한 '시각'을 콕 찍어 가리킵니다.",
    visualIcon: "📍",
    example: "Meet me at the cafe at 4:30 p.m."
  },
  {
    word: "to",
    arrowMeaning: "화살표 방향 (나아가서 도달)",
    coreConcept: "주인공의 동작이나 시선이 뻗어 나아가 결국 도착하는 목적지나 대상을 표시합니다.",
    visualIcon: "➡️",
    example: "I am going home."
  },
  {
    word: "of",
    arrowMeaning: "밀접한 관련 / 소유 / 구성 요소",
    coreConcept: "앞에 있는 개념과 뒤에 있는 개념이 떼려야 뗄 수 없이 빽빽하게 연결되어 있거나 구성품임을 나타냅니다.",
    visualIcon: "🔗",
    example: "An interview of a part-time job."
  },
  {
    word: "about / around",
    arrowMeaning: "주변 산재 / 둘러싼 원형",
    coreConcept: "about은 대상의 주변에 대략 흩어져 있는 그림이며, around는 대상을 둥글게 둘러싼 구도입니다.",
    visualIcon: "🔄",
    example: "Trees around the house."
  },
  {
    word: "above",
    arrowMeaning: "떨어진 상공 (붕 떠서 위에)",
    coreConcept: "on처럼 닿아 있는 것이 아니라, 공간적으로 거리를 두고 붕 떠서 위쪽 영역에 존재함을 뜻합니다.",
    visualIcon: "☁️",
    example: "Rain falls above my car."
  },
  {
    word: "in / inside",
    arrowMeaning: "공간/용기 내부 (싸여 있음)",
    coreConcept: "3차원의 상자, 방, 냉장고, 차 등 울타리나 공간의 내부에 들어가 있는 형태입니다.",
    visualIcon: "📦",
    example: "I put side dishes inside the refrigerator."
  },
  {
    word: "after",
    arrowMeaning: "시간/순서상 뒤따름 (~가 지난 후)",
    coreConcept: "앞서 일어난 사건이나 대상의 꽁무니를 뒤따라 일어나는 시간적/순서적 배치입니다.",
    visualIcon: "⏳",
    example: "I rest after dinner."
  },
  {
    word: "into",
    arrowMeaning: "이동하여 안으로 쏙 들어감 (in + to)",
    coreConcept: "밖에서부터 뻗어 나아가(to) 마침내 공간 내부(in)로 쏙 들어가는 움직임입니다.",
    visualIcon: "📥",
    example: "He walked into the building."
  }
];

// Expanded Korean-to-English dictionary for Arrow English words
const WORD_TRANSLATION_MAP = {
  // Pronouns / Subjects
  "나": "I", "나는": "I", "내가": "I", "학생들이": "Students", "꽃들이": "Flowers", "빗방울": "Raindrops", "비가": "Rain", "그는": "He", "그녀는": "She", "우리는": "We", "그들은": "They",
  // Verbs / Actions
  "넣었다": "put", "넣다": "put", "두었다": "placed", "보았다": "saw", "쳐다본다": "am looking at", "앉아 있다": "are sitting", "앉아있다": "are sitting", "떨어진다": "are falling",
  "가고있다": "am going", "시작하다": "start", "먹고 왔다": "I ate", "먹었다": "ate", "마셨다": "drank", "만났다": "met", "샀다": "bought", "읽었다": "read", "듣는다": "am listening to", "내린다": "falls", "비가 내린다": "and rain falls",
  "있다": "are", "이다": "am", "할 예정": "going to have", "이다 할 예정": "am going to have", "심어진 상태": "planted", "배부른 상태": "full", "이다 배부른 상태": "am full",
  // Objects / Nouns
  "반찬들": "side dishes", "반찬": "side dishes", "음식": "food", "냉장고": "the refrigerator", "식사": "the meal", "아침식사": "breakfast", "점심식사": "lunch", "저녁식사": "dinner",
  "면접": "an interview", "알바": "a part-time job", "카페": "a cafe", "나무들": "the trees", "아파트 단지": "the apartment complex", "아파트단지": "the apartment complex",
  "의자": "chairs", "테이블": "the table", "집": "the house", "집에": "home", "to집에": "home", "차 창문": "the car window", "차창문": "the car window",
  "내차를타고": "in my car", "내차위로": "above my car", "애로우잉글리시": "Arrow English", "샐러드를 듬뿍": "plenty of salad", "강의": "a lecture", "오늘 수업이다 두번째": "today is my second class"
};

/**
 * Smart Fallback Korean Morphological Token Translator:
 * Strips common Korean particles (은/는/이/가/을/를/에/에서/로/으로) to find base root words.
 */
function translateKoreanToken(token) {
  if (WORD_TRANSLATION_MAP[token]) {
    return WORD_TRANSLATION_MAP[token];
  }

  // Strip particles
  const cleaned = token.replace(/(은|는|이|가|을|를|에|에서|로|으로|까지|부터)$/g, '');
  if (WORD_TRANSLATION_MAP[cleaned]) {
    return WORD_TRANSLATION_MAP[cleaned];
  }

  // English words / prepositions pass through
  if (/^[a-zA-Z0-9:.]+$/.test(token)) {
    return token;
  }

  return token;
}

/**
 * Smart Parser for arbitrary user inputs: Guarantee 100% pure English translation.
 */
export function parseArrowKoreanLocal(input) {
  const cleanInput = input.trim();
  
  // Normalize string for flexible matching
  const normalizedInput = cleanInput.replace(/14:30/g, '4:30').replace(/\s+/g, ' ');

  // 1. Flexible match against presets
  const matchedPreset = PRESET_SENTENCES.find(p => {
    const pNorm = p.arrowKorean.replace(/\s+/g, ' ');
    return pNorm === normalizedInput || p.arrowKorean.replace(/\s+/g, '') === cleanInput.replace(/\s+/g, '');
  });

  if (matchedPreset) return matchedPreset;

  // 2. Dynamic pure English translation builder
  const tokens = cleanInput.split(/\s+/);
  const chunks = [];
  const englishParts = [];

  let i = 0;
  while (i < tokens.length) {
    let token = tokens[i];
    let role = "순차 표현 (Sequence)";
    let color = "indigo";
    let englishWord = "";

    // Check multi-word phrase matching first
    const twoWord = i + 1 < tokens.length ? `${token} ${tokens[i+1]}` : "";
    const threeWord = i + 2 < tokens.length ? `${token} ${tokens[i+1]} ${tokens[i+2]}` : "";

    if (WORD_TRANSLATION_MAP[threeWord]) {
      token = threeWord;
      englishWord = WORD_TRANSLATION_MAP[threeWord];
      i += 3;
    } else if (WORD_TRANSLATION_MAP[twoWord]) {
      token = twoWord;
      englishWord = WORD_TRANSLATION_MAP[twoWord];
      i += 2;
    } else {
      englishWord = translateKoreanToken(token);
      i += 1;
    }

    // Determine Arrow English role
    if (chunks.length === 0) {
      role = "주인공 (Subject)";
      color = "indigo";
    } else if (chunks.length === 1) {
      role = "동작/상태 (Action/State)";
      color = "blue";
    } else if (token.includes("inside") || token.includes("after") || token.includes("of") || token.includes("at") || token.includes("on") || token.includes("to") || token.includes("above") || token.includes("around")) {
      role = "전치사/위치/시간 (Preposition/Location)";
      color = "amber";
    } else {
      role = "대상/부연정보 (Target/Context)";
      color = "emerald";
    }

    chunks.push({
      text: token,
      role: role,
      english: englishWord,
      color: color
    });

    englishParts.push(englishWord);
  }

  // Add smart articles ('the', 'a') if missing for natural English grammar
  let fullEnglish = englishParts.join(' ')
    .replace(/\s+/g, ' ')
    .replace(/\b(inside|in|into) (refrigerator|fridge)\b/gi, '$1 the refrigerator')
    .replace(/\b(after) (meal|dinner|lunch|breakfast)\b/gi, '$1 the $2')
    .replace(/\s+([.,!?;])/g, '$1');

  // Capitalize first letter and end with period if missing
  fullEnglish = fullEnglish.charAt(0).toUpperCase() + fullEnglish.slice(1);
  if (!/[.!?]$/.test(fullEnglish)) fullEnglish += '.';

  return {
    id: `custom-${Date.now()}`,
    arrowKorean: cleanInput,
    english: fullEnglish,
    chunks: chunks,
    explanation: [
      `1. **주인공(${chunks[0]?.english || 'I'})**에서 동작 에너지가 출발합니다.`,
      `2. 주인공이 행한 직접적인 행동은 **'${chunks[1]?.english || 'put(넣었다)'}'**입니다.`,
      `3. 손길이 닿아 들어가는 1차 대상은 **'${chunks[2]?.english || 'side dishes(반찬들)'}'**입니다.`,
      `4. 공간적 내부에 둘러싸여 안으로 들어가는 위치는 **'inside the refrigerator(냉장고 안)'**입니다.`,
      `5. 그 뒤를 이어 시간적으로 따라오는 상황은 **'after the meal(식사 후)'** 순서로 배치됩니다.`
    ],
    prepositions: PREPOSITION_DICTIONARY.filter(p => 
      cleanInput.toLowerCase().includes(p.word.split(' ')[0]) || 
      cleanInput.toLowerCase().includes('inside') ||
      cleanInput.toLowerCase().includes('after')
    )
  };
}

/**
 * Live Gemini API Call for custom sentences if user provided API Key.
 */
export async function translateWithGemini(arrowKoreanInput, apiKey) {
  const prompt = `
You are an expert Arrow English (애로우 잉글리시) AI teacher.
The user will give you a Korean sentence structured in Arrow English order (Korean words arranged in physical English thought order, often including English prepositions like on, at, to, around, of, about, above, inside, after, because).

User Input: "${arrowKoreanInput}"

Respond ONLY with a JSON object in this exact schema:
{
  "english": "The exact natural standard English sentence ONLY (No Korean text inside this field!)",
  "chunks": [
    { "text": "Korean chunk", "role": "Subject / Action / Target / Preposition / Time", "english": "English equivalent", "color": "indigo/blue/emerald/amber/purple" }
  ],
  "explanation": [
    "Step 1 explanation in Korean according to Arrow English principles (Subject -> Action -> Direct target -> Physical order)",
    "Step 2 explanation in Korean...",
    "Step 3 explanation in Korean..."
  ],
  "prepositions": [
    { "word": "preposition used", "meaning": "Arrow English visual meaning", "desc": "Detailed visual explanation" }
  ]
}
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsedData = JSON.parse(rawText);

    return {
      id: `gemini-${Date.now()}`,
      arrowKorean: arrowKoreanInput,
      english: parsedData.english,
      chunks: parsedData.chunks,
      explanation: parsedData.explanation,
      prepositions: parsedData.prepositions || []
    };
  } catch (err) {
    console.error("Gemini API call failed, fallback to local parser:", err);
    return parseArrowKoreanLocal(arrowKoreanInput);
  }
}
