// src/services/prepositionData.js

export const PREPOSITION_CATEGORIES = [
  {
    id: "all",
    name: "전체보기",
    englishName: "All Prepositions",
    icon: "🌟",
    color: "indigo",
    desc: "모든 주요 전치사를 한눈에 탐색합니다."
  },
  {
    id: "time",
    name: "1. 시간 전치사",
    englishName: "Time",
    icon: "⏰",
    color: "amber",
    desc: "특정 시점, 기간, 또는 사건의 전후 관계를 나타냅니다."
  },
  {
    id: "place",
    name: "2. 장소 및 위치 전치사",
    englishName: "Place & Position",
    icon: "📍",
    color: "emerald",
    desc: "물체가 존재하는 정지된 상태의 위치나 공간을 나타냅니다."
  },
  {
    id: "direction",
    name: "3. 방향 및 이동 전치사",
    englishName: "Direction & Movement",
    icon: "🚀",
    color: "sky",
    desc: "물체가 움직이는 경로, 목적지, 또는 방향을 나타냅니다."
  },
  {
    id: "other",
    name: "4. 기타 주요 문법 전치사",
    englishName: "Other Relations",
    icon: "🧩",
    color: "purple",
    desc: "수단, 원인, 소유 등 다양한 추상적/문법적 관계를 표현합니다."
  },
  {
    id: "advanced",
    name: "5. 실전 빈출 Level 2",
    englishName: "Advanced & Formal",
    icon: "🏆",
    color: "rose",
    desc: "despite, within, beyond, via 등 비즈니스·TOEIC·수능에서 자주 만나는 핵심 고급 전치사 20선입니다."
  }
];

export const PREPOSITION_LIST = [
  // ----------------------------------------------------
  // 1. 시간 전치사 (Time)
  // ----------------------------------------------------
  {
    id: "time-at",
    word: "at",
    category: "time",
    categoryLabel: "시간 (Time)",
    arrowMeaning: "시계 위의 콕 찍은 특정 시각",
    coreConcept: "구체적인 시각이나 특정 때를 핀포인트 점(Point)으로 찍어서 가리킵니다.",
    visualIcon: "🎯",
    examples: [
      { en: "The meeting starts at 5 p.m.", kr: "미팅은 시작한다 콕 찍어 오후 5시에" },
      { en: "Stars shine bright at night.", kr: "별들은 밝게 빛난다 콕 찍은 밤이라는 때에" },
      { en: "We eat lunch at noon.", kr: "우리는 점심을 먹는다 콕 찍은 정오에" }
    ],
    phrasalVerbs: ["at night (밤에)", "at noon (정오에)", "at the moment (지금 현재)", "at 5 o'clock (5시에)"]
  },
  {
    id: "time-on",
    word: "on",
    category: "time",
    categoryLabel: "시간 (Time)",
    arrowMeaning: "달력 달판의 면(날짜/요일)에 딱 붙어 있음",
    coreConcept: "특정 날짜, 요일, 특별한 기념일 등 2차원적인 달력의 하루 날짜 면 위에 얹어져 있음을 나타냅니다.",
    visualIcon: "📅",
    examples: [
      { en: "I will meet you on Monday.", kr: "나는 너를 만날 것이다 월요일이라는 날에" },
      { en: "We open presents on Christmas Day.", kr: "우리는 선물들을 연다 크리스마스 날에" },
      { en: "My birthday is on July 22.", kr: "내 생일은 7월 22일 날에 있다" }
    ],
    phrasalVerbs: ["on Monday (월요일에)", "on time (제시간에, 정각에)", "on my birthday (내 생일에)", "on weekends (주말에)"]
  },
  {
    id: "time-in",
    word: "in",
    category: "time",
    categoryLabel: "시간 (Time)",
    arrowMeaning: "긴 시간/기간의 테두리 안",
    coreConcept: "월, 계절, 연도, 세기 등 비교적 길거나 울타리가 있는 시간 상자 안(In)에 들어가 있음을 나타냅니다.",
    visualIcon: "⏳",
    examples: [
      { en: "It is hot in July.", kr: "날씨가 덥다 7월이라는 달의 안에서는" },
      { en: "Snow falls in winter.", kr: "눈이 내린다 겨울이라는 계절 안에서" },
      { en: "Humans will land on Mars in 2026.", kr: "인류는 마르스에 착륙할 것이다 2026년이라는 연도 안에" }
    ],
    phrasalVerbs: ["in the morning (아침에)", "in summer (여름에)", "in 2026 (2026년에)", "in a few minutes (몇 분 안에/후에)"]
  },
  {
    id: "time-for",
    word: "for",
    category: "time",
    categoryLabel: "시간 (Time)",
    arrowMeaning: "숫자로 측정된 기간의 폭",
    coreConcept: "숫자나 수량이 포함된 시간의 누적 측정 폭(Duration) 동안 지속됨을 나타냅니다.",
    visualIcon: "⏱️",
    examples: [
      { en: "I studied English for three hours.", kr: "나는 영어를 공부했다 3시간이라는 지속된 기간 동안" },
      { en: "They lived in Seoul for two years.", kr: "그들은 서울에 살았다 2년이라는 기간 동안" }
    ],
    phrasalVerbs: ["for hours (수시간 동안)", "for a long time (오랜 기간 동안)", "for two weeks (2주 동안)"]
  },
  {
    id: "time-since",
    word: "since",
    category: "time",
    categoryLabel: "시간 (Time)",
    arrowMeaning: "과거의 출발점 이후 지금까지 쭉",
    coreConcept: "과거의 특정 기점(Start Point)에서 시작되어 현재까지 이어져 오는 지속을 나타냅니다.",
    visualIcon: "📍➡️",
    examples: [
      { en: "He has worked here since 2010.", kr: "그는 일해오고 있다 2010년이라는 출발 시점 이후로 지금까지" },
      { en: "It has been raining since morning.", kr: "비가 계속 내리고 있다 아침이라는 시점 이후로 쭉" }
    ],
    phrasalVerbs: ["since 2010 (2010년부터)", "since morning (아침부터)", "ever since (~이래로 계속)"]
  },
  {
    id: "time-during",
    word: "during",
    category: "time",
    categoryLabel: "시간 (Time)",
    arrowMeaning: "특정 명사 사건/행사의 진행 동안",
    coreConcept: "숫자가 아닌 특정 명사 형태의 사건, 행사, 방학 등의 기간 전체 동안을 나타냅니다.",
    visualIcon: "🎪",
    examples: [
      { en: "She slept during the movie.", kr: "그녀는 잠들었다 영화라는 상영 사건 동안" },
      { en: "We visited Jeju during the vacation.", kr: "우리는 방학이라는 휴가 기간 동안 제주를 방문했다" }
    ],
    phrasalVerbs: ["during the vacation (방학 동안)", "during the concert (콘서트 동안)", "during the meeting (회의 동안)"]
  },
  {
    id: "time-by",
    word: "by",
    category: "time",
    categoryLabel: "시간 (Time)",
    arrowMeaning: "늦어도 해당 기점 타임라인 전까지 완료",
    coreConcept: "늦어도 지정된 시점까지는 행동이나 작업이 완료(Completion)되어야 하는 최종 마감 기한을 나타냅니다.",
    visualIcon: "🏁",
    examples: [
      { en: "Please finish this report by tomorrow.", kr: "이 보고서를 완료해주세요 늦어도 내일이라는 마감 시점까지는" },
      { en: "Submit the form by 5 p.m.", kr: "신청서를 제출하세요 늦어도 오후 5시까지는" }
    ],
    phrasalVerbs: ["by tomorrow (내일까지 완료)", "by 5 o'clock (5시까지)", "by next week (다음 주까지)"]
  },
  {
    id: "time-until",
    word: "until",
    category: "time",
    categoryLabel: "시간 (Time)",
    arrowMeaning: "해당 시점까지 계속 유지되어 연속함",
    coreConcept: "지정된 시점이 올 때까지 현재의 행동이나 상태가 끊어지지 않고 계속해서 유지(Continuation)됨을 나타냅니다.",
    visualIcon: "🔄➡️",
    examples: [
      { en: "I will wait here until midnight.", kr: "나는 여기서 계속 기다릴 것이다 자정이 되는 시점까지" },
      { en: "The shop stays open until 10 p.m.", kr: "매장은 열린 상태를 계속 유지한다 오후 10시가 될 때까지" }
    ],
    phrasalVerbs: ["until midnight (자정이 될 때까지 줄곧)", "until further notice (추후 공지가 있을 때까지)"]
  },
  {
    id: "time-before",
    word: "before",
    category: "time",
    categoryLabel: "시간 (Time)",
    arrowMeaning: "기준 사건보다 시간 순서상 앞서 있음",
    coreConcept: "기준이 되는 사건이나 시점보다 먼저 일어나는 순서(Earlier in time)를 나타냅니다.",
    visualIcon: "⏮️",
    examples: [
      { en: "Wash your hands before lunch.", kr: "손을 씻어라 점심 식사라는 시점보다 앞서서" },
      { en: "Before the game, we practiced hard.", kr: "경기 시작이라는 시점보다 앞서서, 우리는 열심히 훈련했다" }
    ],
    phrasalVerbs: ["before long (머지않아)", "before the deadline (마감 전에)", "the day before (전날)"]
  },
  {
    id: "time-after",
    word: "after",
    category: "time",
    categoryLabel: "시간 (Time)",
    arrowMeaning: "기준 사건의 꽁무니를 뒤따라오는 시간",
    coreConcept: "기준이 되는 사건이나 시점이 끝난 그 뒤를 이어 일어나는 순서(Later in time)를 나타냅니다.",
    visualIcon: "⏭️",
    examples: [
      { en: "We went home after the movie.", kr: "우리는 집으로 갔다 영화가 끝난 뒤를 이어서" },
      { en: "After the rain, the air was fresh.", kr: "비가 온 그 뒤를 이어 공기가 상쾌했다" }
    ],
    phrasalVerbs: ["after all (결국, 알고 보니)", "day after day (날마다 계속)", "after school (방과 후에)"]
  },
  // ----------------------------------------------------
  // 2. 장소 및 위치 전치사 (Place & Position)
  // ----------------------------------------------------
  {
    id: "place-at",
    word: "at",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "지도 상의 콕 찍은 한 지점",
    coreConcept: "넓은 내부 공간이 아니라, 특정 건물, 지점, 부딪히는 장소의 점(Point)을 콕 찍어 나타냅니다.",
    visualIcon: "📍",
    examples: [
      { en: "Meet me at the bus stop.", kr: "나를 만나자 버스 정류장이라는 지점에서" },
      { en: "He is waiting at the entrance.", kr: "그는 기다리고 있다 입구라는 점 콕 찍은 장소에서" }
    ],
    phrasalVerbs: ["at home (집에서)", "at school (학교에서)", "at the airport (공항에서)", "look at (~를 쳐다보다)"]
  },
  {
    id: "place-on",
    word: "on",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "표면에 밀착되어 접해 있는 상태",
    coreConcept: "책상, 벽, 천장, 바닥 등 어떤 물체의 2차원 표면에 딱 붙어서(Contact) 위치해 있음을 뜻합니다.",
    visualIcon: "🧱",
    examples: [
      { en: "The apple is on the table.", kr: "사과가 있다 테이블 표면에 붙어 있는 상태로" },
      { en: "There is a painting on the wall.", kr: "그림 한 점이 있다 벽 표면에 딱 붙어" }
    ],
    phrasalVerbs: ["on the floor (바닥에)", "on the street (거리 위에)", "depend on (~에 의존하다/달려있다)"]
  },
  {
    id: "place-in",
    word: "in",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "3차원 울타리/공간의 내부",
    coreConcept: "방, 상자, 도시, 자동차 등 사방이 둘러싸인 3차원 입체 공간 내부(Inside)에 존재함을 뜻합니다.",
    visualIcon: "📦",
    examples: [
      { en: "She is sitting in the room.", kr: "그녀는 앉아 있다 방이라는 3차원 공간 안에" },
      { en: "I left my phone in the car.", kr: "나는 내 전화를 두었다 자동차 내부 공간에" }
    ],
    phrasalVerbs: ["in the room (방 안에)", "in Seoul (서울에)", "in box (상자 안에)", "in prison (감옥에)"]
  },
  {
    id: "place-under",
    word: "under",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "물체의 수직 바로 아래쪽 공간",
    coreConcept: "어떤 물체의 커버나 지붕 수직 바로 아래(Under) 공간에 덮여 있거나 위치함을 나타냅니다.",
    visualIcon: "👇",
    examples: [
      { en: "The cat is sleeping under the bed.", kr: "고양이가 자고 있다 침대 아래쪽 공간에서" },
      { en: "We sat under the tree.", kr: "우리는 앉았다 나무 그늘 아래 공간에" }
    ],
    phrasalVerbs: ["under the bed (침대 아래)", "under control (통제 하에)", "under construction (공사 중인)"]
  },
  {
    id: "place-over",
    word: "over",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "표면에 닿지 않고 수직 상공을 덮는 느낌",
    coreConcept: "물체와 직접 닿지는 않지만, 수직 위쪽을 전체적으로 덮거나 포괄하는 형태를 나타냅니다.",
    visualIcon: "☂️",
    examples: [
      { en: "The bridge is built over the river.", kr: "다리가 건설되어 있다 강 위쪽 공간을 덮듯이 건너" },
      { en: "Clouds gathered over the building.", kr: "구름이 모였다 건물 수직 상공 위로" }
    ],
    phrasalVerbs: ["over the world (전 세계에 걸쳐)", "all over (곳곳에)", "get over (~를 극복하다)"]
  },
  {
    id: "place-above",
    word: "above",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "기준면보다 높이가 위에 떠 있는 상태",
    coreConcept: "어떤 기준 수평선(Sea Level, Average)보다 상대적인 높이가 더 위쪽에 붕 떠 있음을 나타냅니다.",
    visualIcon: "☁️",
    examples: [
      { en: "The plane is flying above sea level.", kr: "비행기는 날고 있다 해수면 기준선보다 더 높은 상공에서" },
      { en: "His score is above average.", kr: "그의 점수는 있다 평균 기준선보다 더 위쪽에" }
    ],
    phrasalVerbs: ["above sea level (해발)", "above all (무엇보다도)", "above average (평균 이상)"]
  },
  {
    id: "place-below",
    word: "below",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "기준면보다 높이가 아래에 있는 상태",
    coreConcept: "어떤 기준 수평선(Freezing point, Average)보다 상대적인 위치나 수치가 더 아래쪽에 있음을 나타냅니다.",
    visualIcon: "📉",
    examples: [
      { en: "The temperature dropped below freezing point.", kr: "온도가 떨어졌다 빙점 기준선보다 더 아래로" },
      { en: "Please read the notes below.", kr: "아래 기준선 밑에 작성된 노트들을 읽으세요" }
    ],
    phrasalVerbs: ["below freezing point (영하로)", "below average (평균 이하)", "see below (아래 참조)"]
  },
  {
    id: "place-between",
    word: "between",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "명확히 구분되는 두 대상 사이의 중간 공간",
    coreConcept: "보통 명확한 2개의 대상 사이 중간 공간에 위치함을 나타냅니다. 경계가 분명한 두 지점 사이입니다.",
    visualIcon: "↔️",
    examples: [
      { en: "The shop is located between the bank and the bakery.", kr: "가게는 위치한다 은행과 제과점 둘 사이 중간에" },
      { en: "She sat between her parents.", kr: "그녀는 앉았다 부모님 두 분 사이 중간 자리에" }
    ],
    phrasalVerbs: ["between A and B (A와 B 사이에)", "between meetings (회의 사이에)", "between you and me (우리끼리 얘기)"]
  },
  {
    id: "place-among",
    word: "among",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "셋 이상의 다수 무리에 둘러싸인 상태",
    coreConcept: "3개 이상 혹은 셀 수 없이 많은 무리들 사이에 완전히 둘러싸여 있는 공간감을 나타냅니다.",
    visualIcon: "👥",
    examples: [
      { en: "The cottage is hidden among the trees.", kr: "오두막은 숨겨져 있다 여러 나무들 다수 사이에 둘러싸여" },
      { en: "He is popular among his classmates.", kr: "그는 인기가 있다 그의 반 친구들 다수 무리 사이에서" }
    ],
    phrasalVerbs: ["among friends (친구들 사이에서)", "among the crowd (군중 속에서)", "among the best (최고들 중에)"]
  },
  {
    id: "place-next-to",
    word: "next to",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "바로 나란히 딱 붙어 있는 옆 위치",
    coreConcept: "어떤 대상의 바로 옆 지점에 나란히 위치함을 나타냅니다. beside보다 더 일상 회화적인 표현입니다.",
    visualIcon: "🛋️",
    examples: [
      { en: "The hospital is next to the pharmacy.", kr: "병원이 위치한다 약국 바로 나란히 옆에" },
      { en: "Come sit next to me.", kr: "와서 앉아라 내 바로 옆 자리에" }
    ],
    phrasalVerbs: ["next to (~바로 옆에)", "next to nothing (거의 없는, 극히 적은)", "sit next to (~옆에 앉다)"]
  },
  {
    id: "place-beside",
    word: "beside",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "측면 바로 옆에 나란히 딱 붙어 있음",
    coreConcept: "어떤 대상의 측면 바로 옆 지점(Side-by-side)에 나란히 위치하고 있음을 나타냅니다. 격식체에서도 자주 씁니다.",
    visualIcon: "🤸",
    examples: [
      { en: "Sit beside the window.", kr: "앉아라 창문의 바로 옆 위치에" },
      { en: "She stood beside her mother.", kr: "그녀는 서 있었다 엄마 바로 옆에 나란히" }
    ],
    phrasalVerbs: ["beside the sea (바닷가 옆에)", "beside oneself (제정신이 아닌)", "beside the point (핵심에서 벗어난)"]
  },
  {
    id: "place-behind",
    word: "behind",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "등 뒤쪽에 숨어 있거나 위치하는 공간",
    coreConcept: "대상 기준으로 등 뒤(Rear)에 해당하는 공간에 위치하거나 숨어 있음을 나타냅니다.",
    visualIcon: "🔙",
    examples: [
      { en: "The thief hid behind the door.", kr: "도둑은 숨었다 문 뒤쪽 공간에" },
      { en: "He is walking behind me.", kr: "그는 걷고 있다 나의 등 뒤쪽으로 따라오며" }
    ],
    phrasalVerbs: ["behind the scenes (무대 뒤에서, 비하인드)", "behind schedule (일정보다 늦은)", "leave behind (뒤에 남기다)"]
  },
  {
    id: "place-in-front-of",
    word: "in front of",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "시선이 향하는 바로 전방 앞쪽 공간",
    coreConcept: "대상의 시선이나 정면이 향하는 바로 앞(Front) 공간에 위치함을 나타냅니다.",
    visualIcon: "🔜",
    examples: [
      { en: "A car stopped in front of the store.", kr: "차가 멈춰 섰다 가게 앞 전방 위치에" },
      { en: "Stand in front of the camera.", kr: "서라 카메라 정면 앞쪽 공간에" }
    ],
    phrasalVerbs: ["in front of the building (건물 앞에서)", "in front of everyone (모두 앞에서)", "speak in front of (~앞에서 발표하다)"]
  },

  // ----------------------------------------------------
  // 3. 방향 및 이동 전치사 (Direction & Movement)
  // ----------------------------------------------------
  {
    id: "dir-to",
    word: "to",
    category: "direction",
    categoryLabel: "방향 및 이동 (Direction & Movement)",
    arrowMeaning: "화살표가 뻗어나가 최종 도달하는 도착지",
    coreConcept: "주인공의 동작이나 시선이 뻗어가서(Point) 마침내 정확히 도착하는 최종 목적지를 나타냅니다.",
    visualIcon: "🎯➡️",
    examples: [
      { en: "I go to school every morning.", kr: "나는 간다 뻗어나가 도달하는 학교로 매일 아침" },
      { en: "Send this letter to him.", kr: "이 편지를 보내라 나아가서 맞닿는 대상인 그에게" }
    ],
    phrasalVerbs: ["go to (~로 가다)", "listen to (~에 귀를 기울이다)", "talk to (~에게 말하다)", "lead to (~로 이끌다)"]
  },
  {
    id: "dir-toward",
    word: "toward",
    category: "direction",
    categoryLabel: "방향 및 이동 (Direction & Movement)",
    arrowMeaning: "목적지에 도착 여부와 상관없이 그 방향을 향함",
    coreConcept: "최종 도착지 완성 여부보다, 몸이나 시선이 '그 방향(Heading direction)'을 향해 움직이고 있음을 강조합니다.",
    visualIcon: "🧭",
    examples: [
      { en: "He walked toward the river.", kr: "그는 걸어갔다 강이 위치한 그 방향을 향해" },
      { en: "Run toward the exit!", kr: "뛰어가라 비상구가 있는 그 쪽 방향을 향해서!" }
    ],
    phrasalVerbs: ["walk toward (~방향으로 걷다)", "attitude toward (~에 대한 태도)", "move toward (~쪽으로 이동하다)"]
  },
  {
    id: "dir-into",
    word: "into",
    category: "direction",
    categoryLabel: "방향 및 이동 (Direction & Movement)",
    arrowMeaning: "밖에서 나아가(to) 안으로(in) 쏙 들어감",
    coreConcept: "외부 공간에서 출발해(to) 마침내 내부 공간(in)으로 파고 들어가 결합되는 속도감 있는 이동입니다.",
    visualIcon: "📥",
    examples: [
      { en: "She stepped into the house.", kr: "그녀는 발을 디뎌 나아갔다 집 내부 안으로 쏙" },
      { en: "He dived into the water.", kr: "그는 다이빙하여 뛰어들었다 물 속 안으로" }
    ],
    phrasalVerbs: ["step into (~안으로 발을 들이다)", "turn into (~로 변하다)", "look into (~를 조사하다)"]
  },
  {
    id: "dir-out-of",
    word: "out of",
    category: "direction",
    categoryLabel: "방향 및 이동 (Direction & Movement)",
    arrowMeaning: "내부 공간(in)에서 밖으로(out) 빠져나옴",
    coreConcept: "안쪽에 갇혀 있거나 속해 있던 공간에서 벗어나 외부로 이탈하는 이동 방향을 나타냅니다.",
    visualIcon: "📤",
    examples: [
      { en: "Get out of the car.", kr: "내려라 자동차 내부에서 밖으로 빠져나와" },
      { en: "He ran out of the room.", kr: "그는 달려 나왔다 방 내부에서 밖으로" }
    ],
    phrasalVerbs: ["out of order (고장 난)", "out of date (구식의)", "run out of (~가 떨어지다/고갈되다)"]
  },
  {
    id: "dir-onto",
    word: "onto",
    category: "direction",
    categoryLabel: "방향 및 이동 (Direction & Movement)",
    arrowMeaning: "이동하여(to) 표면 위(on)에 착지함",
    coreConcept: "공중이나 외부에서 움직여서 어떤 물체의 표면 위(Surface)로 상륙하거나 얹어지는 이동입니다.",
    visualIcon: "🔝",
    examples: [
      { en: "The cat jumped onto the sofa.", kr: "고양이가 점프하여 올라갔다 소파 표면 위로" },
      { en: "Step onto the stage.", kr: "발을 내딛어 올라서라 무대 표면 위로" }
    ],
    phrasalVerbs: ["jump onto (~위로 뛰어오르다)", "hold onto (~를 잡고 있다)", "step onto (~위로 올라서다)"]
  },
  {
    id: "dir-off",
    word: "off",
    category: "direction",
    categoryLabel: "방향 및 이동 (Direction & Movement)",
    arrowMeaning: "붙어 있던 표면에서 뚝 떨어져 분리됨",
    coreConcept: "접촉(on)되어 있던 상태가 떨어져서(Detach) 멀어지거나 분리되는 이동 및 이탈을 뜻합니다.",
    visualIcon: "📴",
    examples: [
      { en: "Take off your shoes.", kr: "너의 신발을 벗어라 발표면에서 뚝 떼어내어" },
      { en: "He fell off the bicycle.", kr: "그는 자전거 표면에서 뚝 떨어져 낙하했다" }
    ],
    phrasalVerbs: ["take off (신발/옷을 벗다, 이륙하다)", "fall off (떨어지다)", "turn off (전원을 끄다)", "get off (하차하다)"]
  },
  {
    id: "dir-across",
    word: "across",
    category: "direction",
    categoryLabel: "방향 및 이동 (Direction & Movement)",
    arrowMeaning: "2차원 평면/선 가로질러 건너감",
    coreConcept: "도로, 강, 무대, 지도 등 넓은 평면의 이쪽 끝에서 저쪽 끝으로 십자가 모양처럼 가로지르는 이동입니다.",
    visualIcon: "🌉",
    examples: [
      { en: "The dog ran across the street.", kr: "개는 달려갔다 도로 평면을 가로질러 건너서" },
      { en: "They swam across the river.", kr: "그들은 헤엄쳐 건넜다 강 면을 가로질러" }
    ],
    phrasalVerbs: ["come across (~를 우연히 발견하다)", "run across (가로질러 뛰다)", "across the world (전 세계에)"]
  },
  {
    id: "dir-through",
    word: "through",
    category: "direction",
    categoryLabel: "방향 및 이동 (Direction & Movement)",
    arrowMeaning: "3차원 입체 터널/공간을 관통하여 지나감",
    coreConcept: "터널, 숲, 관, 과정 등 사방이 막힌 3차원 시야 공간의 입구로 들어가 출구로 관통(Pierce)해 나오는 이동입니다.",
    visualIcon: "🚇",
    examples: [
      { en: "The train went through the tunnel.", kr: "열차는 지나갔다 터널 3차원 공간 내부를 관통하여" },
      { en: "We walked through the dense forest.", kr: "우리는 걸어 통과했다 빽빽한 숲 공간을 지나" }
    ],
    phrasalVerbs: ["go through (~를 겪다/통과하다)", "look through (~를 훑어보다)", "pass through (관통하다)"]
  },
  {
    id: "dir-along",
    word: "along",
    category: "direction",
    categoryLabel: "방향 및 이동 (Direction & Movement)",
    arrowMeaning: "길이나 강 등 긴 선 라인을 따라 쭉",
    coreConcept: "해변, 도로, 강변, 담장 등 기다랗게 늘어선 선(Line)을 벗어나지 않고 평행하게 나란히 따라가는 이동입니다.",
    visualIcon: "🛣️",
    examples: [
      { en: "They walked along the beach.", kr: "그들은 걸었다 해변의 긴 선 라인을 따라 쭉" },
      { en: "Trees are planted along the road.", kr: "나무들이 심어져 있다 도로 선을 따라 나란히" }
    ],
    phrasalVerbs: ["along with (~와 함께)", "go along with (~에 동조하다)", "get along (~와 잘 지내다)"]
  },

  // ----------------------------------------------------
  // 4. 기타 주요 문법 전치사 (Other Relations)
  // ----------------------------------------------------
  {
    id: "other-of",
    word: "of",
    category: "other",
    categoryLabel: "기타 문법 관계 (Other Relations)",
    arrowMeaning: "뿌리가 연결된 소유 / 구성 성분 / 관련",
    coreConcept: "앞의 대상과 뒤의 대상이 떼려야 뗄 수 없이 밀접하게 결합되어 있거나 소속, 원료, 구성 원천임을 뜻합니다.",
    visualIcon: "🔗",
    examples: [
      { en: "He is a friend of mine.", kr: "그는 한 명의 친구이다 나라는 사람에게 빽빽하게 소속된" },
      { en: "The table is made of wood.", kr: "테이블은 만들어져 있다 그 구성 재료인 나무로" }
    ],
    phrasalVerbs: ["made of (~로 만들어진)", "think of (~를 떠올리다)", "instead of (~대신에)", "because of (~때문에)"]
  },
  {
    id: "other-for",
    word: "for",
    category: "other",
    categoryLabel: "기타 문법 관계 (Other Relations)",
    arrowMeaning: "마음과 시선이 향하는 목적 / 이유 / 대상",
    coreConcept: "누군가나 무언가를 향해 마음(Heart)과 이유를 기울이는 목적(Target) 및 위함, 교환을 나타냅니다.",
    visualIcon: "🎁",
    examples: [
      { en: "This special gift is for you.", kr: "이 특별한 선물은 혜택을 받을 대상인 너를 위한 것이다" },
      { en: "Thank you for helping me.", kr: "고맙다 나를 도와준 그 이유와 행동에 대해" }
    ],
    phrasalVerbs: ["look for (~를 찾다)", "famous for (~로 유명한)", "ask for (~를 요청하다)", "wait for (~를 기다리다)"]
  },
  {
    id: "other-with",
    word: "with",
    category: "other",
    categoryLabel: "기타 문법 관계 (Other Relations)",
    arrowMeaning: "동반하는 파트너 / 사용 도구 / 소지 상태",
    coreConcept: "동행하는 사람(Partner), 손에 쥐고 사용하는 도구(Tool), 혹은 지니고 있는 특성을 함께(Together) 묶습니다.",
    visualIcon: "🤝",
    examples: [
      { en: "I went to the movie with my family.", kr: "나는 영화관에 갔다 동반하는 내 가족과 함께" },
      { en: "Write your name with a pen.", kr: "너의 이름을 써라 손에 들고 사용하는 도구인 펜으로" }
    ],
    phrasalVerbs: ["agree with (~에 동의하다)", "deal with (~를 다루다)", "filled with (~로 가득 찬)"]
  },
  {
    id: "other-by",
    word: "by",
    category: "other",
    categoryLabel: "기타 문법 관계 (Other Relations)",
    arrowMeaning: "행동을 일으킨 능동 주체 / 이용한 수단",
    coreConcept: "수동태 문장에서 동작을 일으킨 직접적 원인 제공자(Agent), 혹은 탑승하는 교통/통신 수단을 뜻합니다.",
    visualIcon: "🚌",
    examples: [
      { en: "I travel by bus every day.", kr: "나는 여행/이동한다 탑승하는 교통 수단인 버스를 타고" },
      { en: "The novel was written by Him.", kr: "그 소설은 쓰여졌다 그것을 쓴 행위 주체인 그에 의해서" }
    ],
    phrasalVerbs: ["by bus / train / air (버스로/기차로/비행기로)", "by chance (우연히)", "by the way (그런데)"]
  },
  {
    id: "other-about",
    word: "about",
    category: "other",
    categoryLabel: "기타 문법 관계 (Other Relations)",
    arrowMeaning: "주위 주변 영역 / 다루는 주제",
    coreConcept: "어떤 주제나 핵심 물체 주변(Around)을 둘러싸고 형성되는 내용, 소문, 관련 정보들을 의미합니다.",
    visualIcon: "📖",
    examples: [
      { en: "I read a book about world history.", kr: "나는 책을 읽었다 세계사라는 주제 주변 내용을 다룬" },
      { en: "Don't worry about the small test.", kr: "걱정하지 마라 그 작은 시험에 관련된 문제에 대해" }
    ],
    phrasalVerbs: ["talk about (~에 대해 이야기하다)", "know about (~에 대해 알다)", "how about (~는 어때?)"]
  },
  {
    id: "other-like",
    word: "like",
    category: "other",
    categoryLabel: "기타 문법 관계 (Other Relations)",
    arrowMeaning: "모양이나 성질이 닮아 겹쳐보임",
    coreConcept: "외형, 느낌, 행동 등이 대상과 흡사하여 비슷하게 겹쳐 보이는 유사함(~처럼, ~같은)을 나타냅니다.",
    visualIcon: "⭐",
    examples: [
      { en: "She shines brightly like a star.", kr: "그녀는 밝게 빛난다 하늘의 별처럼 똑같은 느낌으로" },
      { en: "It tastes like sweet chocolate.", kr: "이것은 맛이 난다 달콤한 초콜릿과 같은 느낌으로" }
    ],
    phrasalVerbs: ["look like (~처럼 보이다)", "sound like (~처럼 들리다)", "feel like (~하고 싶다, ~처럼 느끼다)"]
  },
  {
    id: "other-as",
    word: "as",
    category: "other",
    categoryLabel: "기타 문법 관계 (Other Relations)",
    arrowMeaning: "실제 자격 및 신분과 동일함",
    coreConcept: "단순한 비유가 아니라, 실제 100% 자격, 직책, 신분(~로서)으로 완전히 일치함을 뜻합니다.",
    visualIcon: "🪪",
    examples: [
      { en: "He works as a professional teacher.", kr: "그는 일한다 실제 100% 직무 자격인 전문 교사로서" },
      { en: "Use this big box as a desk.", kr: "이 큰 상자를 사용하라 책상이라는 임시 용도로서" }
    ],
    phrasalVerbs: ["work as (~로서 일하다)", "known as (~로 알려진)", "such as (예를 들어 ~와 같은)"]
  },
  {
    id: "other-without",
    word: "without",
    category: "other",
    categoryLabel: "기타 문법 관계 (Other Relations)",
    arrowMeaning: "함께 있어야 할 동반/소유의 결여",
    coreConcept: "with(동반)의 반대 개념으로, 있어야 할 사람, 도구, 조건이 부재하고 결여(~없이)되어 있음을 표현합니다.",
    visualIcon: "🚫",
    examples: [
      { en: "He answered without any hesitation.", kr: "그는 답변했다 망설임이라는 상태가 전혀 없이" },
      { en: "I drink coffee without sugar.", kr: "나는 커피를 마신다 설탕 첨가 없이" }
    ],
    phrasalVerbs: ["without hesitation (주저함 없이)", "without a doubt (의심할 여지 없이)", "do without (~없이 지내다)"]
  },

  // ====================================================
  // 5. 실전 빈출 전치사 Level 2 (Advanced Prepositions)
  // ====================================================
  {
    id: "adv-despite",
    word: "despite",
    category: "other",
    categoryLabel: "실전 빈출 Level 2",
    arrowMeaning: "장애물을 무릅쓰고 뚫고 나아감",
    coreConcept: "어떤 어려움, 반대, 불리한 조건이 존재하더라도 그것을 개의치 않고 무릅쓰면서(~에도 불구하고) 행동함을 나타냅니다.",
    visualIcon: "💪",
    examples: [
      { en: "She smiled despite the pain.", kr: "그녀는 미소 지었다 고통이라는 장애물을 무릅쓰고" },
      { en: "He finished the race despite the rain.", kr: "그는 결승선을 완주했다 빗속이라는 악조건을 무릅쓰고" }
    ],
    phrasalVerbs: ["despite everything (모든 것에도 불구하고)", "despite difficulties (어려움에도 불구하고)"]
  },
  {
    id: "adv-throughout",
    word: "throughout",
    category: "other",
    categoryLabel: "실전 빈출 Level 2",
    arrowMeaning: "시간/공간 전체에 걸쳐 빠짐없이 관통",
    coreConcept: "특정 기간 전체 또는 특정 공간 전체에 걸쳐 어느 한 부분도 빠짐없이 퍼져 있거나 이어짐을 나타냅니다.",
    visualIcon: "🌐",
    examples: [
      { en: "It rained throughout the night.", kr: "비가 내렸다 밤이라는 시간 전체를 빠짐없이 관통하여" },
      { en: "The news spread throughout the world.", kr: "그 소식은 퍼졌다 전 세계 공간 전체에 걸쳐" }
    ],
    phrasalVerbs: ["throughout the day (하루 종일)", "throughout history (역사 전반에 걸쳐)", "throughout the country (전국에 걸쳐)"]
  },
  {
    id: "adv-within",
    word: "within",
    category: "other",
    categoryLabel: "실전 빈출 Level 2",
    arrowMeaning: "범위나 경계 안에 딱 들어와 있음",
    coreConcept: "지정된 시간·거리·범위의 경계(Boundary) 안에 완전히 들어와 있거나 그 범위를 벗어나지 않음을 나타냅니다.",
    visualIcon: "⭕",
    examples: [
      { en: "Please reply within 24 hours.", kr: "답장하세요 24시간이라는 경계 범위 안에" },
      { en: "The store is within walking distance.", kr: "그 매장은 있다 도보 가능한 거리 범위 안에" }
    ],
    phrasalVerbs: ["within reach (손 닿는 범위 내에)", "within limits (한계 범위 내에서)", "within budget (예산 범위 내에서)"]
  },
  {
    id: "adv-beyond",
    word: "beyond",
    category: "direction",
    categoryLabel: "방향 및 이동 (Direction & Movement)",
    arrowMeaning: "현재 경계나 기준을 한참 넘어선 저 너머",
    coreConcept: "보이는 경계, 능력, 예상, 시간의 범위를 넘어서 저 너머(Far side)에 있거나 그 이상임을 나타냅니다.",
    visualIcon: "🚀",
    examples: [
      { en: "The mountain village is beyond the forest.", kr: "그 산속 마을은 있다 숲 경계를 한참 넘어선 저 너머에" },
      { en: "This is beyond my understanding.", kr: "이것은 있다 나의 이해 한계를 한참 넘어선 저 너머에" }
    ],
    phrasalVerbs: ["beyond belief (믿기 어려울 만큼)", "beyond control (통제 불가)", "go beyond (~을 넘어서다)"]
  },
  {
    id: "adv-against",
    word: "against",
    category: "direction",
    categoryLabel: "방향 및 이동 (Direction & Movement)",
    arrowMeaning: "힘과 방향이 맞부딪히며 대립함",
    coreConcept: "물리적으로 힘이 부딪히거나(물체가 벽에 기댐), 의견·방향이 정반대로 충돌하는(~에 반대하여) 상태를 나타냅니다.",
    visualIcon: "⚔️",
    examples: [
      { en: "He leaned against the wall.", kr: "그는 기댔다 벽이라는 표면에 힘을 맞대며" },
      { en: "We voted against the proposal.", kr: "우리는 투표했다 그 제안에 정반대 방향으로 반대하여" }
    ],
    phrasalVerbs: ["against the wall (벽에 기대어)", "against the law (법에 반하여)", "fight against (~에 맞서 싸우다)"]
  },
  {
    id: "adv-except",
    word: "except",
    category: "other",
    categoryLabel: "실전 빈출 Level 2",
    arrowMeaning: "전체 집합에서 하나만 쏙 빼고 제외함",
    coreConcept: "전체 그룹이나 목록에서 특정 대상만을 콕 집어 제외하고(~을 제외하고) 나머지 전부에 해당함을 나타냅니다.",
    visualIcon: "✂️",
    examples: [
      { en: "Everyone is here except Tom.", kr: "모두가 여기 있다 Tom이라는 한 명만 쏙 빼고 제외하여" },
      { en: "The park is open every day except Monday.", kr: "공원은 매일 열린다 월요일 하루만 쏙 제외하고" }
    ],
    phrasalVerbs: ["except for (~을 제외하고)", "except that (~이라는 점만 빼면)", "none except (~외에는 없음)"]
  },
  {
    id: "adv-via",
    word: "via",
    category: "direction",
    categoryLabel: "방향 및 이동 (Direction & Movement)",
    arrowMeaning: "중간 경유지나 통로를 거쳐서",
    coreConcept: "출발지에서 최종 목적지로 가는 중간에 특정 경유지(Waypoint)나 수단·통로를 통해서 지나감을 나타냅니다.",
    visualIcon: "🔀",
    examples: [
      { en: "The flight goes to Tokyo via Seoul.", kr: "그 항공편은 도쿄로 간다 서울이라는 중간 경유지를 거쳐서" },
      { en: "Send me the file via email.", kr: "파일을 보내줘 이메일이라는 통로·수단을 통해서" }
    ],
    phrasalVerbs: ["via email (이메일을 통해)", "via satellite (위성 경유로)", "via the highway (고속도로 경유로)"]
  },
  {
    id: "adv-upon",
    word: "upon",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "닿자마자 혹은 표면 위에 격식 있게 올라섬",
    coreConcept: "on의 격식체 표현으로, 물리적으로 표면에 올라서거나 사건이 일어나자마자 즉각적으로 반응하는 상황을 나타냅니다.",
    visualIcon: "👑",
    examples: [
      { en: "Once upon a time, there was a knight.", kr: "아주 오래전 어느 한 시점 위에서, 한 기사가 있었다" },
      { en: "Upon arrival, please check in.", kr: "도착이라는 시점에 닿자마자, 체크인하세요" }
    ],
    phrasalVerbs: ["upon arrival (도착하자마자)", "once upon a time (옛날 옛적에)", "upon reflection (곰곰이 생각해 보니)"]
  },
  {
    id: "adv-beneath",
    word: "beneath",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "바로 아래에 직접 맞닿아 덮여 있는 공간",
    coreConcept: "under의 격식체 표현으로, 어떤 물체나 표면 바로 아래에 직접 맞닿거나 가려진 공간임을 강조합니다.",
    visualIcon: "🏔️",
    examples: [
      { en: "She hid the letter beneath her pillow.", kr: "그녀는 편지를 숨겼다 베개 바로 아래 맞닿은 공간에" },
      { en: "Treasure lay buried beneath the ground.", kr: "보물이 묻혀 있었다 땅 바로 아래 덮여 있는 공간에" }
    ],
    phrasalVerbs: ["beneath the surface (표면 아래에)", "beneath the ground (땅속에)", "beneath one's dignity (체면에 맞지 않는)"]
  },
  {
    id: "adv-near",
    word: "near",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "물리적/심리적 거리가 가까이 붙어 있는 상태",
    coreConcept: "특정 장소, 시간, 상태와의 거리가 물리적으로 또는 심리적으로 가까운(Close proximity) 상태임을 나타냅니다.",
    visualIcon: "📡",
    examples: [
      { en: "I live near the train station.", kr: "나는 산다 기차역과 거리가 가까운 곳에" },
      { en: "We are near the finish line.", kr: "우리는 있다 결승선에 거의 근접한 가까운 상태에" }
    ],
    phrasalVerbs: ["near the station (역 근처에)", "near the end (끝에 가까워서)", "nowhere near (전혀 가깝지 않은)"]
  },
  {
    id: "adv-inside",
    word: "inside",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "경계나 껍질의 내부 속 공간에 완전히 들어가 있음",
    coreConcept: "건물, 컨테이너, 그룹 등의 외부 경계로 둘러싸인 내부 공간에 완전히 속해 있음을 나타냅니다. in보다 강조된 표현입니다.",
    visualIcon: "🏠",
    examples: [
      { en: "Stay inside the building during the storm.", kr: "폭풍 동안에는 있어라 건물 내부 안쪽 공간에" },
      { en: "There is a surprise inside the box.", kr: "상자의 안쪽 내부 공간에 깜짝 선물이 있다" }
    ],
    phrasalVerbs: ["inside the room (방 안에)", "inside out (안팎을 뒤집어)", "inside information (내부 정보)"]
  },
  {
    id: "adv-outside",
    word: "outside",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "경계나 껍질의 바깥 외부 공간에 나와 있음",
    coreConcept: "건물, 그룹, 한계 등의 경계 바깥쪽 외부 공간에 위치함을 나타냅니다. outside는 내부의 반대 공간을 강조합니다.",
    visualIcon: "🌳",
    examples: [
      { en: "The dog is waiting outside the door.", kr: "개가 기다리고 있다 문의 바깥쪽 외부 공간에서" },
      { en: "Let's eat outside today.", kr: "오늘은 먹자 건물 외부 바깥 공간에서" }
    ],
    phrasalVerbs: ["outside the house (집 밖에서)", "outside the box (틀 밖에서 창의적으로)", "outside working hours (업무 시간 외에)"]
  },
  {
    id: "adv-opposite",
    word: "opposite",
    category: "place",
    categoryLabel: "장소 및 위치 (Place & Position)",
    arrowMeaning: "정면으로 서로 마주보며 대칭으로 있는 위치",
    coreConcept: "어떤 대상과 정확히 마주보며(Facing each other) 대칭되는 반대편에 위치함을 나타냅니다.",
    visualIcon: "↔️",
    examples: [
      { en: "The bank is opposite the post office.", kr: "은행은 위치한다 우체국과 정면으로 마주보는 맞은편에" },
      { en: "He sat opposite me at the table.", kr: "그는 앉았다 식탁에서 나와 정면으로 마주보는 위치에" }
    ],
    phrasalVerbs: ["opposite side (맞은편)", "directly opposite (바로 정면에)", "sit opposite (~의 맞은편에 앉다)"]
  },
  {
    id: "adv-past",
    word: "past",
    category: "direction",
    categoryLabel: "방향 및 이동 (Direction & Movement)",
    arrowMeaning: "대상 옆을 스쳐 지나쳐 가버림",
    coreConcept: "특정 대상이나 지점의 옆을 통과하거나 스쳐서 그것을 뒤에 남기고 계속 지나쳐 가는 이동입니다.",
    visualIcon: "💨",
    examples: [
      { en: "She walked past me without saying hello.", kr: "그녀는 걸어서 나를 그냥 스쳐 지나갔다 인사도 없이" },
      { en: "Turn right just past the school.", kr: "학교를 스쳐 지나치자마자 바로 오른쪽으로 도세요" }
    ],
    phrasalVerbs: ["walk past (옆을 지나쳐 가다)", "half past 3 (3시 30분)", "past midnight (자정이 지나서)"]
  },
  {
    id: "adv-round",
    word: "round",
    category: "direction",
    categoryLabel: "방향 및 이동 (Direction & Movement)",
    arrowMeaning: "둥글게 한 바퀴 감싸며 돌아가는 이동",
    coreConcept: "어떤 대상이나 공간을 중심으로 원형 또는 곡선으로 감싸 돌거나(Around), 모퉁이를 돌아가는 이동을 나타냅니다.",
    visualIcon: "🔄",
    examples: [
      { en: "We drove round the city all day.", kr: "우리는 하루 종일 차로 달렸다 도시를 둥글게 빙 돌며" },
      { en: "Turn round the corner to find the cafe.", kr: "카페를 찾으려면 모퉁이를 돌아가세요" }
    ],
    phrasalVerbs: ["round the corner (모퉁이를 돌아서)", "all round (사방으로)", "round the clock (24시간 내내)"]
  },
  {
    id: "adv-regarding",
    word: "regarding",
    category: "other",
    categoryLabel: "실전 빈출 Level 2",
    arrowMeaning: "특정 주제를 정면으로 응시하며 관련 짓는 눈길",
    coreConcept: "특정 주제나 사안을 공식적으로 다루거나 언급할 때(~에 관하여, ~와 관련하여) 사용하는 격식체 표현입니다.",
    visualIcon: "📋",
    examples: [
      { en: "I am writing regarding your application.", kr: "저는 편지를 씁니다 귀하의 지원서에 관하여" },
      { en: "Regarding the meeting, it has been canceled.", kr: "회의에 관하여 말씀드리자면, 취소되었습니다" }
    ],
    phrasalVerbs: ["regarding the matter (그 사안에 관하여)", "regarding your request (요청 건에 관하여)"]
  },
  {
    id: "adv-per",
    word: "per",
    category: "other",
    categoryLabel: "실전 빈출 Level 2",
    arrowMeaning: "단위 하나당 비율이나 속도의 기준",
    coreConcept: "단위 수량 하나에 대응하는 비율, 속도, 가격을 나타낼 때(~당, ~마다) 사용합니다.",
    visualIcon: "📊",
    examples: [
      { en: "This car runs 60 miles per hour.", kr: "이 차는 달린다 시간이라는 단위 하나당 60마일의 속도로" },
      { en: "The price is $10 per person.", kr: "가격은 한 사람이라는 단위당 10달러입니다" }
    ],
    phrasalVerbs: ["per hour (시간당)", "per day (하루당)", "per person (인당)", "as per (~에 따라서)"]
  },
  {
    id: "adv-unlike",
    word: "unlike",
    category: "other",
    categoryLabel: "실전 빈출 Level 2",
    arrowMeaning: "두 대상이 서로 닮지 않고 대조적으로 다름",
    coreConcept: "like(~처럼)의 반대로, 비교 대상과 성질·행동이 서로 다르거나(~와는 달리) 어울리지 않음을 나타냅니다.",
    visualIcon: "🔀",
    examples: [
      { en: "Unlike her sister, she loves the cold weather.", kr: "그녀의 언니와는 달리, 그녀는 추운 날씨를 사랑한다" },
      { en: "This movie is unlike anything I have seen.", kr: "이 영화는 다르다 내가 본 어떤 것과도 닮지 않고" }
    ],
    phrasalVerbs: ["unlike before (예전과는 달리)", "unlike others (다른 이들과 달리)"]
  },
  {
    id: "adv-according-to",
    word: "according to",
    category: "other",
    categoryLabel: "실전 빈출 Level 2",
    arrowMeaning: "특정 출처나 기준을 따라 그대로 맞춤",
    coreConcept: "특정 자료, 사람, 규정, 계획 등을 기준·출처로 삼아(~에 따르면, ~에 의하면) 그것에 맞추어 따름을 나타냅니다.",
    visualIcon: "📰",
    examples: [
      { en: "According to the news, it will rain tomorrow.", kr: "뉴스 보도에 따르면, 내일 비가 올 것이다" },
      { en: "Everything went according to plan.", kr: "모든 것이 진행되었다 계획이라는 기준에 그대로 따라서" }
    ],
    phrasalVerbs: ["according to the report (보고에 따르면)", "according to schedule (일정에 따라)"]
  },
  {
    id: "adv-due-to",
    word: "due to",
    category: "other",
    categoryLabel: "실전 빈출 Level 2",
    arrowMeaning: "결과를 만들어낸 직접 원인이 뒤에서 밀어냄",
    coreConcept: "어떤 결과나 상태가 발생한 직접적인 원인이나 이유(~때문에, ~ 덕분에/탓에)를 공식적으로 지목할 때 씁니다.",
    visualIcon: "⚡",
    examples: [
      { en: "The flight was delayed due to bad weather.", kr: "항공편이 지연되었다 악천후라는 직접적 원인 때문에" },
      { en: "Her success was due to hard work.", kr: "그녀의 성공은 이루어졌다 열심히 한 노력이라는 원인 덕분에" }
    ],
    phrasalVerbs: ["due to weather (날씨 때문에)", "due to illness (질병 때문에)", "due to demand (수요 때문에)"]
  }
];

export const PREPOSITION_NUANCES = [
  {
    id: "nuance-in-at",
    title: "In vs At (시간 & 장소 구별법)",
    tag: "시간 & 장소",
    summary: "At은 콕 찍은 '점(Point)', In은 울타리가 있는 넓은 '공간/기간(Area/Volume)'입니다.",
    details: [
      {
        aspect: "시간 (Time)",
        first: "At 5:00 p.m. / At night (시계/때의 한 점)",
        second: "In July / In 2026 / In winter (월, 연도, 계절의 넓은 기간 상자)"
      },
      {
        aspect: "장소 (Place)",
        first: "At the bus stop / At the entrance (지도 위 콕 찍은 지점)",
        second: "In the room / In Seoul (사방이 막힌 3차원 공간 내부)"
      }
    ],
    tip: "💡 tip: 버스 정류장에서 친구를 만날 때는 지점이니까 at! 방 안에 누워있을 때는 울타리 안이니까 in!"
  },
  {
    id: "nuance-by-until",
    title: "By vs Until (기한 마감 vs 행동 지속)",
    tag: "시간 완료 vs 지속",
    summary: "By는 늦어도 그때까지는 작업을 완료(Finish)하는 것이고, Until은 그때까지 행동을 줄곧 계속(Continue)하는 것입니다.",
    details: [
      {
        aspect: "핵심 동작",
        first: "By tomorrow (늦어도 내일까지 1회성 완료 제출)",
        second: "Until midnight (자정이 될 때까지 지속적으로 계속 기다림)"
      },
      {
        aspect: "짝이 되는 동사",
        first: "finish, submit, complete, return, arrive + BY",
        second: "stay, wait, remain, sleep, continue + UNTIL"
      }
    ],
    tip: "💡 tip: '내일까지 숙제 내!'는 finish by tomorrow / '밤 10시까지 여기서 기다려!'는 stay until 10 p.m.!"
  },
  {
    id: "nuance-for-during",
    title: "For vs During (~동안 기간 비교)",
    tag: "기간 표현",
    summary: "For 뒤에는 '숫자 수량(Quantified period)', During 뒤에는 '명사 사건/행사(Event)'가 옵니다.",
    details: [
      {
        aspect: "뒤따르는 단어",
        first: "For three hours / For 2 years (숫자가 들어간 수량 시간)",
        second: "During the vacation / During the concert (사건 명사)"
      }
    ],
    tip: "💡 tip: 'for + 숫자' (for 3 days) vs 'during + 명사' (during summer) 규칙만 기억하면 절대 틀리지 않습니다!"
  },
  {
    id: "nuance-to-toward",
    title: "To vs Toward (목적지 도착 vs 방향성)",
    tag: "방향 & 이동",
    summary: "To는 마침내 도착하는 최종 '목적지 Point', Toward는 도착 여부와 상관없이 그 '방향'을 향하는 이동입니다.",
    details: [
      {
        aspect: "이동 결과",
        first: "Go to school (학교라는 최종 목적지에 착석/도착함)",
        second: "Walk toward the river (강 쪽 방향으로 발걸음을 옮김)"
      }
    ],
    tip: "💡 tip: To는 화살표가 꽂혀 도착한 것, Toward는 화살표 머리가 그쪽을 겨누고 나아가는 중인 것!"
  },
  {
    id: "nuance-on-over-above",
    title: "On vs Over vs Above (위쪽 위치 3총사)",
    tag: "위치 정밀 비교",
    summary: "On은 '표면 밀착 접촉', Over는 '수직 상공을 덮듯이 커버', Above는 '기준면보다 높은 위치'입니다.",
    details: [
      {
        aspect: "물리적 상태",
        first: "On the table (책상 표면에 붙어 닿아 있음)",
        second: "Over the building (건물 위를 수직으로 포괄하며 덮음)",
        third: "Above sea level (해수면 기준선보다 붕 떠서 더 높은 위치)"
      }
    ],
    tip: "💡 tip: 딱 붙으면 On! 위에서 지붕처럼 덮어씌우면 Over! 기준 수치보다 높으면 Above!"
  },
  {
    id: "nuance-under-below",
    title: "Under vs Below (아래쪽 위치 2종)",
    tag: "아래 위치",
    summary: "Under는 수직으로 덮여 있는 바로 '아래 공간', Below는 기준선보다 더 낮은 '수치/위치'입니다.",
    details: [
      {
        aspect: "비교 포인트",
        first: "Under the bed / Under the tree (지붕/커버 수직 아래 공간)",
        second: "Below zero / Below freezing point (온도/수치 기준면 이하)"
      }
    ],
    tip: "💡 tip: 침대 밑 공간은 under! 영하 온도는 zero 아래 수치이므로 below freezing point!"
  },
  {
    id: "nuance-of-for",
    title: "Of vs For (관계와 목적)",
    tag: "추상적 관계",
    summary: "Of는 뿌리가 끈끈하게 연결된 '소유/구성 성분', For는 마음이 향하는 '목적/대상'입니다.",
    details: [
      {
        aspect: "뉘앙스 차이",
        first: "a friend of mine (나라는 사람과 떼려야 뗄 수 없이 빽빽하게 소속된 친구)",
        second: "a gift for you (너라는 대상을 향해 마음이 전해지는 목적)"
      }
    ],
    tip: "💡 tip: 이미 빽빽하게 연결된 뿌리는 Of! 앞으로 대상을 위해 준비된 목적은 For!"
  }
];
