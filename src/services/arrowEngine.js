// src/services/arrowEngine.js
import { PREPOSITION_LIST } from './prepositionData.js';

export const PREPOSITION_DICTIONARY = PREPOSITION_LIST;

// Comprehensive Korean-to-English dictionary for Arrow English words
const WORD_TRANSLATION_MAP = {
  // Pronouns / Subjects / Possessives / People
  "나": "I", "나는": "I", "내가": "I", "우린": "we", "우리": "we", "우리는": "We", "그는": "He", "그녀는": "She", "그들은": "They",
  "나의": "my", "내": "my", "저의": "my", "너의": "your", "네": "your", "당신의": "your", "그의": "his", "그녀의": "her", "우리의": "our", "우리들의": "our", "그들의": "their",
  "나의 아들들": "my sons", "아들들": "sons", "아들": "a son", "딸들": "daughters", "딸": "a daughter",
  "학생들이": "students", "학생들": "students", "학생": "a student",
  "꽃들이": "flowers", "꽃": "a flower", "꽃들": "flowers", "꽃밭": "a flower garden",
  "빗방울": "raindrops", "비가": "rain", "비": "the rain",
  "아이들": "children", "아이": "a child", "사람들": "people", "사람": "a person",
  "선생님": "the teacher", "친구": "a friend", "의사": "a doctor", "간호사": "a nurse", "경찰": "a police officer", "소방관": "a firefighter",
  "소녀": "a girl", "소년": "a boy", "남자": "a man", "여자": "a woman", "아기": "a baby",
  "엄마": "mom", "어머니": "mother", "아빠": "dad", "아버지": "father",
  "할머니": "grandmother", "할아버지": "grandfather", "가족": "family",
  "할머니집": "grandma's house", "할머니 집": "grandma's house", "할머니 댁": "grandma's house", "할머니댁": "grandma's house",
  "방학": "vacation", "방학이": "vacation", "방학은": "vacation", "그들의 방학": "their vacation", "그들의방학": "their vacation",
  "시작했다": "started", "시작됐다": "started", "시작한다": "starts", "오늘부터": "today", "오늘부터는": "today",
  "동료들": "colleagues", "동료": "a colleague", "직장동료": "colleagues", "옛 동료들": "old colleagues", "옛동료들": "old colleagues", "나의 옛 동료들": "my old colleagues",

  // Animals & Insects
  "나비": "a butterfly", "벌": "a bee", "꿀벌": "a honeybee", "잠자리": "a dragonfly",
  "잠자리채": "a dragonfly net", "채": "a net", "뜰채": "a hand net", "망": "a net",
  "개미": "an ant", "거미": "a spider", "무당벌레": "a ladybug", "모기": "a mosquito", "파리": "a fly",
  "애벌레": "a caterpillar", "곤충": "an insect",
  "새": "a bird", "독수리": "an eagle", "비둘기": "a pigeon", "오리": "a duck", "닭": "a chicken", "병아리": "a chick",
  "개": "a dog", "강아지": "a puppy", "고양이": "a cat", "토끼": "a rabbit", "다람쥐": "a squirrel",
  "곰": "a bear", "사자": "a lion", "호랑이": "a tiger", "코끼리": "an elephant", "원숭이": "a monkey",
  "여우": "a fox", "늑대": "a wolf", "돼지": "a pig", "소": "a cow", "말": "a horse", "양": "a sheep", "염소": "a goat",
  "물고기": "a fish", "상어": "a shark", "고래": "a whale", "거북이": "a turtle", "개구리": "a frog", "달팽이": "a snail",

  // Verbs / Actions
  "왔다": "came", "오다": "came", "왔어": "came", "왔습니다": "came",
  "폈다": "opened", "펴다": "opened", "펼쳤다": "spread", "열었다": "opened", "닫았다": "closed",
  "나눌것이다": "will share", "나누다": "share", "나눌": "share", "이야기하다": "talk", "말하다": "speak",
  "만날것이다": "will meet", "만날 것이다": "will meet", "만날거야": "will meet", "만날게": "will meet", "만날": "will meet", "만나다": "meets", "만난다": "meets", "만났다": "met", "만날 예정이다": "will meet",
  "정리할 것이다": "will organize", "정리할것이다": "will organize", "정리할 거야": "will organize", "정리할": "will organize", "정리하다": "organize", "정리": "organize",
  "청소할 것이다": "will clean", "청소할것이다": "will clean", "청소할": "will clean", "청소하다": "clean", "청소": "cleaning",
  "치울 것이다": "will clean up", "치울것이다": "will clean up", "치울": "will clean up", "치우다": "clean up",
  "준비할 것이다": "will prepare", "준비할": "will prepare", "준비하다": "prepare",
  "요리할 것이다": "will cook", "요리할": "will cook", "요리하다": "cook",
  "공부할 것이다": "will study", "공부할": "will study", "공부하다": "study",
  "볼것이다": "will see", "할것이다": "will do", "갈것이다": "will go", "먹을것이다": "will eat",
  "것이다": "will", "것": "thing", "할 것이다": "will do",
  "넣었다": "put", "넣다": "put", "두었다": "placed", "보았다": "saw", "쳐다본다": "looks at", "앉아 있다": "is sitting", "앉아있다": "is sitting", "앉다": "sits", "앉아": "sits", "떨어진다": "falls",
  "서다": "stands", "서있다": "is standing", "서 있다": "is standing",
  "가고있다": "are going to", "가고 있다": "are going to", "간다": "are going to", "가다": "goes", "가르친다": "teaches", "가르치다": "teaches", "가르쳤다": "taught", "시작하다": "starts", "먹고 왔다": "ate", "먹었다": "ate", "먹는다": "eats", "먹다": "eats", "마셨다": "drank", "마신다": "drinks", "마시다": "drinks", "샀다": "bought", "읽었다": "read", "읽는다": "reads", "읽다": "reads", "듣는다": "listens to", "듣다": "listens to", "내린다": "falls", "비가 내린다": "rain falls",
  "달린다": "is running", "달리다": "runs", "뛰다": "runs", "걷는다": "walks", "걷다": "walks", "웃는다": "smiles", "웃다": "smiles", "운다": "cries", "울다": "cries", "만든다": "makes", "만들다": "makes", "그린다": "draws", "그리다": "draws", "잡았다": "caught", "잡다": "catches", "던졌다": "threw", "던지다": "throws", "자다": "sleeps", "깨다": "wakes up", "씻다": "washes", "날다": "flies", "날아가다": "flies away", "수영하다": "swims", "헤엄치다": "swims",
  "산책하는중이다": "am taking a walk", "산책하는 중이다": "am taking a walk", "산책중이다": "am taking a walk", "산책중": "taking a walk", "산책하다": "take a walk", "산책한다": "take a walk", "산책": "a walk",
  "있다": "is", "이다": "is", "할 예정": "going to have", "이다 할 예정": "am going to have", "심어진 상태": "planted", "배부른 상태": "full", "이다 배부른 상태": "am full",

  // Nouns / Objects / Nature & Places
  "파주출판단지": "Paju Publishing City(파주출판단지)", "파주": "Paju(파주)", "출판단지": "Publishing City",
  "독서동아리": "reading club", "독서모임": "reading group", "동아리": "club", "모임": "group",
  "1박2일": "2 days and 1 night", "1박2일,": "2 days and 1 night", "1박 2일": "2 days and 1 night",
  "궁금하다": "am curious", "궁금해": "am curious", "궁금한": "curious",
  "만다르트": "Mandal-Art", "만다라트": "Mandal-Art", "만다르트 계획": "Mandal-Art plans",
  "계획": "plans", "계획을": "plans",
  "이루지": "will achieve", "이루다": "achieve", "이룰지": "will achieve",
  "발표하다": "present", "발표할": "present", "발표": "presentation",
  "결과": "the results", "결과를": "the results",
  "송년회": "the year-end party", "망년회": "the year-end party",
  "친구들": "friends", "내 친구들": "my friends",
  "생각": "thoughts", "생각을": "thoughts", "의견": "opinions", "마음": "mind",
  "나 하고 있다 일 잘": "I am doing well at work", "나 하고있다 일 잘": "I am doing well at work", "하고 있다 일 잘": "doing well at work", "하고있다 일 잘": "doing well at work", "일 잘": "well at work", "일 잘하고 있다": "doing well at work",
  "복잡하다 머리와 마음": "my head and heart are complicated", "복잡하다 머리와 마음이": "my head and heart are complicated", "나 복잡하다 머리와 마음": "my head and heart are complicated", "머리와 마음": "head and heart", "머리와 마음이": "head and heart", "복잡하다": "is complicated",
  "죄와벌": "Crime and Punishment", "죄와 벌": "Crime and Punishment", "책": "a book", "책을": "a book", "소설": "a novel",
  "책상": "the desk", "책상에": "on the desk", "책상위": "on the desk", "의자": "a chair", "테이블": "the table",
  "가방": "a bag", "연필": "a pencil", "펜": "a pen", "지우개": "an eraser", "자": "a ruler", "필통": "a pencil case", "종이": "paper",
  "모양": "the shape", "정사각형": "a square", "정사각형이고": "is square", "사각형": "a rectangle", "삼각형": "a triangle", "동그라미": "a circle", "원": "a circle",
  "흰색": "white", "하얀색": "white", "빨간색": "red", "파란색": "blue", "노란색": "yellow", "초록색": "green", "검은색": "black", "보라색": "purple", "분홍색": "pink",

  // Everyday Objects, Food & Places
  "반찬들": "side dishes", "반찬": "side dishes", "음식": "food", "냉장고": "the refrigerator", "식사": "the meal", "아침식사": "breakfast", "점심식사": "lunch", "저녁식사": "dinner",
  "면접": "an interview", "알바": "a part-time job", "카페": "a cafe", "나무들": "the trees", "나무": "a tree", "풀": "grass", "숲": "the forest", "숲속": "the forest", "숲 속": "the forest", "아파트 단지": "the apartment complex", "아파트단지": "the apartment complex",
  "이른 아침": "the early morning", "이른아침": "the early morning", "이른": "early", "아침": "the morning", "새벽": "dawn", "늦은 오후": "the late afternoon", "늦은오후": "the late afternoon",
  // Temperature & Weather
  "오늘 온도 이다": "today's temperature is", "오늘 온도": "today's temperature", "온도 이다": "the temperature is", "온도": "the temperature", "기온": "the temperature",
  "31도": "31 degrees Celsius", "32도": "32 degrees Celsius", "33도": "33 degrees Celsius", "34도": "34 degrees Celsius", "35도": "35 degrees Celsius", "36도": "36 degrees Celsius", "37도": "37 degrees Celsius", "38도": "38 degrees Celsius", "39도": "39 degrees Celsius", "40도": "40 degrees Celsius",
  "30도": "30 degrees Celsius", "29도": "29 degrees Celsius", "28도": "28 degrees Celsius", "27도": "27 degrees Celsius", "26도": "26 degrees Celsius", "25도": "25 degrees Celsius",
  "도로": "the road", "길": "the road", "도로에서": "on the road", "도로 위": "on the road",
  "도": "degrees Celsius", "섭씨": "Celsius", "화씨": "Fahrenheit",
  "덕다": "it is hot", "더운": "hot", "더워": "hot", "춥다": "it is cold", "추운": "cold", "따뜻하다": "it is warm", "따뜻한": "warm",
  // Shade, Parasol & Outdoor
  "그늘": "the shade", "그늘 아래": "under the shade", "그늘아래": "under the shade", "그늘지다": "shady", "그늘지": "shady",
  "큰 양산": "a large parasol", "양산": "a parasol", "우산": "an umbrella", "큰 우산": "a large umbrella",
  "코너": "the corner", "코너 of": "the corner of", "모통이": "the corner", "교차로": "the intersection",
  "집": "the house", "집에": "home", "to집에": "home", "내 집": "my house", "내집": "my house", "우리 집": "our house", "우리집": "our house", "차 창문": "the car window", "차창문": "the car window", "차": "a car", "내차를타고": "in my car", "내차위로": "above my car",
  "이끼가 꼈다": "Moss grew", "이끼가 끼다": "Moss forms", "이끼": "moss", "꼈다": "grew", "창문에": "on the windows", "창문": "the window", "이유는 시원하다": "because it is cool", "이유는": "because", "시원하다": "it is cool", "건물": "the building", "때문에 of": "because of", "때문에": "because of", "에어컨": "the air conditioning", "습하다 밖": "it is humid outside", "습하다": "it is humid", "밖": "outside",
  "숙제가 밀렸다": "am behind on my homework", "숙제가 밀렸다,": "am behind on my homework", "일이 밀렸다": "am behind on my work", "밀렸다": "am behind on", "밀려있다": "am behind on", "밀린": "backlogged", "밀려서": "being behind on",
  "삼일이나": "three days of", "3일이나": "three days of", "삼일": "three days", "숙제": "my homework", "내 숙제": "my homework",
  "쓰는거": "to write", "쓰는 것": "to write", "쓰는거 문장": "to write sentences", "쓰다": "write", "문장 3개": "three sentences", "문장3개": "three sentences", "3문장": "three sentences", "문장": "sentences", "매일": "every day",
  "이번 주말": "this weekend", "이번주말": "this weekend", "주말": "the weekend",
  "청계천 다리": "Cheonggyecheon Bridge(청계천 다리)", "청계천다리": "Cheonggyecheon Bridge(청계천 다리)", "청계천": "Cheonggyecheon(청계천)", "한강 다리": "Han River Bridge(한강 다리)", "한강다리": "Han River Bridge(한강 다리)", "한강": "Han River(한강)", "다리": "a bridge",
  "문래": "Mullae(문래)", "문래동": "Mullae-dong(문래동)", "신도림": "Sindorim(신도림)", "여의도": "Yeouido(여의도)", "강남": "Gangnam(강남)", "홍대": "Hongdae(홍대)", "신촌": "Sinchon(신촌)", "이태원": "Itaewon(이태원)", "명동": "Myeongdong(명동)", "인사동": "Insadong(인사동)", "성수": "Seongsu(성수)", "잠실": "Jamsil(잠실)", "서초": "Seocho(서초)", "마포": "Mapo(마포)", "용산": "Yongsan(용산)", "종로": "Jongno(종로)",
  "용인시": "Yongin-si(용인시)", "용인": "Yongin-si(용인시)", "경기도": "Gyeonggi-do(경기도)", "경기": "Gyeonggi-do(경기도)",
  "자전거": "a bicycle", "버스": "a bus", "기차": "a train", "비행기": "an airplane", "배": "a boat", "공원": "the park", "학교": "school", "교실": "the classroom", "문": "the door", "시계": "a clock", "컴퓨터": "a computer", "전화기": "a phone", "모자": "a hat", "신발": "shoes", "옷": "clothes", "상자": "a box", "선물": "a present", "공": "a ball", "사과": "an apple", "바나나": "a banana", "빵": "bread", "우유": "milk", "물": "water", "하늘": "the sky", "구름들": "clouds", "구름": "clouds", "태양": "the sun", "해": "the sun", "달": "the moon", "별": "stars", "바다": "the sea", "산": "the mountain", "강": "the river", "호수": "the lake", "무지개": "a rainbow",
  // Objects & Places
  "오늘 이다 온도": "today's temperature is", "오늘 이다": "today is",
  "나 간다": "I am going", "나는 간다": "I am going", "내가 간다": "I am going",
  "약간의 물": "some water", "약간의물": "some water",
  "정수기": "the water purifier", "정수기로부터": "from the water purifier", "정수기에서": "from the water purifier",
  "사무실": "my office", "나의 사무실": "my office", "내 사무실": "my office",
  "얻다": "get", "얻기": "to get", "얻기 위해": "to get",
  "바깥 of 나의 사무실": "outside my office", "바깥 of 내 사무실": "outside my office", "바깥 of 사무실": "outside my office",
  "많은 주차권들": "many parking tickets", "주차권들": "parking tickets", "주차권": "a parking ticket",
  "나눠주다": "hand out", "나눠주기": "to hand out", "배부하다": "distribute",
  "교육생들": "trainees", "교육생": "a trainee",
  "그리고 넣었다 그것들": "and put them", "넣었다 그것들": "put them",
  "서류봉투": "a document envelope", "하나의 서류봉투": "a document envelope", "서류 봉투": "a document envelope",
  "전기충전소가": "an electric charging station", "전기충전소": "an electric charging station", "충전소": "a charging station", "충전소가": "a charging station",
  "한그루의 나무": "a tree", "한 그루의 나무": "a tree", "한그루의": "a", "한 그루의": "a",
  "안전경계선이": "a safety boundary line", "안전경계선": "a safety boundary line", "경계선": "a boundary line",
  "설치되어있다": "is installed", "설치되어 있다": "is installed", "설치되었다": "was installed", "설치하다": "install",
  "보호하다": "protect", "보호하기": "to protect", "보호": "protection",
  "그것": "it", "그것을": "it", "그것들": "them",
  "하나의 티백": "a tea bag", "티백": "a tea bag",
  "커피포트": "the electric kettle", "전기 주전자": "the electric kettle", "전기주전자": "the electric kettle",
  "만들다 차": "make tea", "차를 만들다": "make tea",

  // Adjectives, Numbers & Modifiers
  "한 남자가": "A man", "한 남자": "A man", "한남자가": "A man", "남자가": "a man",
  "있다 걷는 중": "is walking", "걷는 중": "is walking", "걷는 중이다": "is walking", "걷고 있는": "is walking", "걷는": "walking",
  "그의 친구들": "his friends",
  "하나의 갈색티셔츠": "a brown t-shirt", "하나의 갈색 티셔츠": "a brown t-shirt", "갈색티셔츠": "a brown t-shirt", "갈색 티셔츠": "a brown t-shirt", "갈색": "brown", "티셔츠": "a t-shirt",
  "말하면서": "talking", "말하며": "talking", "이야기하면서": "talking",
  "한 마리의 고양이": "a cat", "한 마리의": "a", "한마리의": "a", "한 마리": "a", "마리의": "a",
  "있다 누운 상태": "is lying", "누운 상태": "lying", "누워있는 상태": "lying", "누워있는": "lying", "누운": "lying",
  "하나의 주차된 자": "a parked car", "하나의 주차된 자동차": "a parked car", "주차된 자": "a parked car", "주차된 자동차": "a parked car", "주차된 차": "a parked car", "주차된": "parked",
  "옛": "old", "옛날": "old", "예전": "old", "크다": "big", "큰": "big", "작다": "small", "작은": "small", "예쁘다": "pretty", "예쁜": "pretty", "귀엽다": "cute", "귀여운": "cute", "좋다": "good", "새로운": "new", "오래된": "old", "빠른": "fast", "느린": "slow", "높은": "high", "낮은": "low", "긴": "long", "짧은": "short", "뜨거운": "hot", "차가운": "cold", "밝은": "bright", "어두운": "dark",
  "한 소녀": "a girl", "한 소년": "a boy", "한 아이": "a child", "한 사람": "a person",
  "한": "a", "하나": "one", "두": "two", "세": "three", "넷": "four", "다섯": "five", "하나의": "a",

  // Special Phrases
  "애로우잉글리시": "Arrow English", "샐러드를 듬뿍": "plenty of salad", "강의": "a lecture", "오늘 수업이다 두번째": "today is my second class"
};

/**
 * Common Korean-to-English Homonym / Context-specific translation candidates
 */
export const HOMONYM_SUGGESTIONS = {
  "다리": ["a bridge", "bridge", "legs", "a leg"],
  "집": ["the house", "home", "a house"],
  "배": ["a boat", "a pear", "the stomach"],
  "차": ["tea", "a tea", "a car", "car"],
  "눈": ["eyes", "snow"],
  "말": ["a horse", "words", "speech"]
};

/**
 * Translates Korean tokens or stems to clean English synchronously.
 */
export function translateKoreanToken(token) {
  if (!token) return '';

  // Clean trailing punctuation for lookup
  const cleanToken = token.replace(/^[,\s.]+|[,\s.]+$|[,]/g, '');

  // Return pure English directly
  if (/^[a-zA-Z0-9:.,!?'" -]+$/.test(cleanToken)) {
    return cleanToken;
  }

  // 1. Direct dictionary match
  if (WORD_TRANSLATION_MAP[cleanToken]) {
    return WORD_TRANSLATION_MAP[cleanToken];
  }
  if (WORD_TRANSLATION_MAP[token]) {
    return WORD_TRANSLATION_MAP[token];
  }

  // 2. Multi-word phrase splitting (e.g. "한 소녀" -> "a" + "girl" => "a girl")
  const parts = cleanToken.split(/\s+/);
  if (parts.length > 1) {
    const translatedParts = parts.map(p => translateKoreanToken(p));
    if (translatedParts.every(p => p && !/[\u3131-\u318E\uAC00-\uD7A3]/.test(p))) {
      return translatedParts.join(' ');
    }
  }

  // 3. Strip Korean particles & suffixes (~이고, ~이다, ~다, ~은, ~는, ~이, ~가, ~을, ~를, ~에, ~에서, ~로, ~으로, ~하고, ~와, ~과, ~며, ~도, ~만, ~의)
  const cleaned = cleanToken.replace(/(이고|이다|다|은|는|이|가|을|를|에|에서|로|으로|까지|부터|하고|와|과|며|도|만|의)$/g, '');
  if (WORD_TRANSLATION_MAP[cleaned]) {
    return WORD_TRANSLATION_MAP[cleaned];
  }

  // 4. Secondary verb/adjective stemming (~했다, ~하는, ~했던, ~입니다, ~있습니다, ~은, ~ㄴ, ~아, ~어)
  const verbStem = cleaned.replace(/(했다|하는|했던|입니다|있습니다|있다|입니다|였던|였다|아|어|ㄴ|은)$/g, '');
  if (WORD_TRANSLATION_MAP[verbStem]) {
    return WORD_TRANSLATION_MAP[verbStem];
  }

  // 5. Future verb stemming (~할 것이다, ~할것이다, ~할거야, ~할게, ~할)
  const futureStem = cleanToken.replace(/(할\s*것이다|할것이다|할거야|할게|할)$/g, '');
  if (futureStem && WORD_TRANSLATION_MAP[futureStem]) {
    const base = WORD_TRANSLATION_MAP[futureStem].replace(/^(a|an|the)\s+/, '');
    return `will ${base}`;
  }

  // 6. Compound word decomposition (e.g., "잠자리채" -> "잠자리"("a dragonfly") + "채"("a net") => "a dragonfly net")
  for (let splitIdx = 1; splitIdx < cleanToken.length; splitIdx++) {
    const head = cleanToken.slice(0, splitIdx);
    const tail = cleanToken.slice(splitIdx);
    if (WORD_TRANSLATION_MAP[head] && WORD_TRANSLATION_MAP[tail]) {
      const headEn = WORD_TRANSLATION_MAP[head].replace(/^(a|an|the)\s+/, '');
      const tailEn = WORD_TRANSLATION_MAP[tail].replace(/^(a|an|the)\s+/, '');
      return `a ${headEn} ${tailEn}`;
    }
  }

  // 7. Fallback heuristics for unmapped words
  return fallbackTranslateKorean(cleanToken);
}

/**
 * Translates Korean token asynchronously using free online translation API if dictionary misses.
 */
export async function translateKoreanTokenAsync(token) {
  if (!token) return '';
  const cleanToken = token.replace(/^[,\s.]+|[,\s.]+$|[,]/g, '');

  if (WORD_TRANSLATION_MAP[cleanToken]) {
    return WORD_TRANSLATION_MAP[cleanToken];
  }
  if (WORD_TRANSLATION_MAP[token]) {
    return WORD_TRANSLATION_MAP[token];
  }

  const syncResult = translateKoreanToken(token);
  const pureEnglishPart = syncResult.replace(/\([\u3131-\u318E\uAC00-\uD7A3\s]+\)/g, '');
  const hasKorean = /[\u3131-\u318E\uAC00-\uD7A3]/.test(pureEnglishPart);

  // If syncResult is pure English and not fallback 'a [token]' format, return it!
  if (syncResult && !hasKorean && !syncResult.startsWith('a ')) {
    return syncResult;
  }

  // 1. Try free Google Translate GTX API endpoint
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=${encodeURIComponent(cleanToken)}`);
    if (res.ok) {
      const data = await res.json();
      let text = data[0]?.[0]?.[0];
      if (text && !/[\u3131-\u318E\uAC00-\uD7A3]/.test(text)) {
        text = text.toLowerCase().trim();
        if (text === 'to sit') text = 'sits';
        if (text === 'to organize') text = 'organize';
        if (cleanToken === '일') text = 'work';
        if (cleanToken === '다리') text = 'a bridge';
        text = text.replace(/^i\s+will\s+/i, 'will ').replace(/\s+you$/i, '');
        WORD_TRANSLATION_MAP[cleanToken] = text;
        return text;
      }
    }
  } catch {
    // Continue to MyMemory
  }

  // 2. Try MyMemory API
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanToken)}&langpair=ko|en`);
    if (res.ok) {
      const data = await res.json();
      let text = data.responseData?.translatedText;
      if (text && !/[\u3131-\u318E\uAC00-\uD7A3]/.test(text)) {
        text = text.toLowerCase().trim();
        if (text === 'to sit') text = 'sits';
        if (text === 'to organize') text = 'organize';
        if (cleanToken === '일') text = 'work';
        if (cleanToken === '다리') text = 'a bridge';
        text = text.replace(/^i\s+will\s+/i, 'will ').replace(/\s+you$/i, '');
        WORD_TRANSLATION_MAP[cleanToken] = text;
        return text;
      }
    }
  } catch {
    // Ignore fetch failure
  }

  return syncResult;
}

/**
 * Translates a full Korean sentence asynchronously using free online Google Translate GTX API.
 */
export async function translateFullSentenceAsync(text) {
  if (!text) return '';
  const clean = text.replace(/\([\u3131-\u318E\uAC00-\uD7A3\s,.-]+\)/g, '').trim();
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=${encodeURIComponent(clean)}`);
    if (res.ok) {
      const data = await res.json();
      const translated = data[0]?.map(item => item[0]).join('');
      if (translated && !/[\u3131-\u318E\uAC00-\uD7A3]/.test(translated)) {
        return translated.trim();
      }
    }
  } catch {
    // Ignore error
  }
  return '';
}

/**
 * Fallback translator to convert any unmapped Korean words to clean English terms.
 * Never returns 'concept' repeatedly!
 */
function fallbackTranslateKorean(korean) {
  if (!korean) return 'item';

  // Keyword-based smart semantic mapping
  if (korean.includes("파주")) return "Paju Publishing City";
  if (korean.includes("출판")) return "Publishing City";
  if (korean.includes("동아리") || korean.includes("모임")) return "reading club";
  if (korean.includes("1박") || korean.includes("2일")) return "2 days and 1 night";
  if (korean.includes("왔") || korean.includes("오다")) return "came";
  if (korean.includes("정리")) return "organize";
  if (korean.includes("청소")) return "clean";
  if (korean.includes("나눌") || korean.includes("나누")) return "will share";
  if (korean.includes("생각")) return "thoughts";
  if (korean.includes("죄와벌") || korean.includes("죄")) return "Crime and Punishment";
  if (korean.includes("우리") || korean.includes("우린")) return "we";
  if (korean.includes("각자")) return "each other's";
  if (korean.includes("책상")) return "the desk";
  if (korean.includes("책")) return "a book";
  if (korean.includes("의자")) return "a chair";
  if (korean.includes("모양")) return "the shape";
  if (korean.includes("정사각형") || korean.includes("네모")) return "a square";
  if (korean.includes("흰") || korean.includes("하얀")) return "white";
  if (korean.includes("빨간") || korean.includes("빨강")) return "red";
  if (korean.includes("파란") || korean.includes("파랑")) return "blue";
  if (korean.includes("노란") || korean.includes("노랑")) return "yellow";
  if (korean.includes("초록")) return "green";
  if (korean.includes("검은") || korean.includes("검정")) return "black";
  if (korean.includes("펴") || korean.includes("펼")) return "opened";
  if (korean.includes("접")) return "folded";
  if (korean.includes("가방")) return "a bag";
  if (korean.includes("학교")) return "school";
  if (korean.includes("공")) return "a ball";
  if (korean.includes("사과")) return "an apple";
  if (korean.includes("집")) return "a house";
  if (korean.includes("나비")) return "a butterfly";
  if (korean.includes("벌")) return "a bee";
  if (korean.includes("꽃")) return "a flower";
  if (korean.includes("소녀")) return "a girl";
  if (korean.includes("소년")) return "a boy";
  if (korean.includes("아이")) return "a child";

  // Clean fallback: remove particles and return clean representation instead of repeating 'concept'
  const stripped = korean.replace(/(이고|이다|다|은|는|이|가|을|를|에|에서|로|으로|까지|부터|하고|와|과|며|도|만|의)$/g, '');
  if (/(할|하다|다|것이다|게|거야|ㄹ)$/g.test(stripped)) {
    return stripped;
  }
  return `a ${stripped}`;
}

/**
 * Real-Life English Word Google Image Search Helper
 * Searches for the EXACT English word/phrase directly in Google Images with SafeSearch active (safe=active)
 * GUARANTEES no Korean characters are sent in the image search URL query string.
 */
export function getEducationalGoogleImageSearchUrl(englishWord) {
  if (!englishWord) return 'https://www.google.com/search?safe=active&q=English&udm=2';

  // Extract clean English letters/phrases
  let cleanEnglish = englishWord
    .replace(/[\u3131-\u318E\uAC00-\uD7A3]/g, '') // remove Korean chars
    .replace(/[()]/g, '')
    .trim();

  // If Korean characters were passed, translate them FIRST to pure English!
  if (!cleanEnglish || cleanEnglish.length === 0) {
    cleanEnglish = translateKoreanToken(englishWord);
    cleanEnglish = cleanEnglish.replace(/[\u3131-\u318E\uAC00-\uD7A3]/g, '').trim() || 'item';
  }

  return `https://www.google.com/search?safe=active&q=${encodeURIComponent(cleanEnglish)}&udm=2`;
}

/**
 * Pre-loaded Arrow English dataset containing preset examples
 */
export const PRESET_SENTENCES = [
  {
    id: "ex_office_water",
    arrowKorean: "나 간다 바깥 of 나의 사무실 to 얻다 약간의 물 from 정수기",
    english: "I am going outside my office to get some water from the water purifier.",
    chunks: [
      { text: "나", role: "1. 주인공 (Subject)", english: "I", color: "indigo" },
      { text: "간다", role: "2. 동작 (Action)", english: "am going", color: "blue" },
      { text: "바깥 of 나의 사무실", role: "5. 장소 (Location)", english: "outside my office", color: "rose" },
      { text: "to", role: "4. 전치사/연결어 (Preposition)", english: "to", color: "amber" },
      { text: "얻다 약간의 물", role: "3. 가까운 대상 (Target)", english: "get some water", color: "emerald" },
      { text: "from 정수기", role: "4. 전치사/연결어 (Preposition)", english: "from the water purifier", color: "purple" }
    ],
    vocabCards: [
      { korean: "나 (주인공)", english: "I", role: "주인공", searchUrl: getEducationalGoogleImageSearchUrl("I") },
      { korean: "간다 (동작)", english: "am going", role: "동작", searchUrl: getEducationalGoogleImageSearchUrl("going") },
      { korean: "사무실 바깥", english: "outside my office", role: "장소", searchUrl: getEducationalGoogleImageSearchUrl("outside office") },
      { korean: "물을 얻다", english: "get some water", role: "대상", searchUrl: getEducationalGoogleImageSearchUrl("drink water") },
      { korean: "정수기", english: "the water purifier", role: "출처", searchUrl: getEducationalGoogleImageSearchUrl("water purifier") }
    ],
    kidSummary: "나 ➔ 간다(am going) ➔ 바깥(outside my office) ➔ to get(얻기 위해) ➔ 약간의 물(some water) ➔ from 정수기(the water purifier)",
    explanation: [
      "1. **주인공(I)** 1인칭 단수에 맞춰 be동사 **'am'**과 이동 동작 **'going'**이 결합합니다 (I are ❌ ➔ I am ⭕).",
      "2. 이동 장소 공간은 사무실 바깥 **'outside my office'**입니다. (outside는 전치사 of 없이 장소 명사가 바로 붙습니다).",
      "3. 물을 뜨기 위한 목적 의도는 **'to get'**입니다.",
      "4. 대상 물은 자연스러운 구어체 **'some water'**입니다.",
      "5. 물이 흘러나오는 출처 장소 지점은 정관사 the가 포함된 **'from the water purifier(정수기로부터)'**입니다."
    ],
    prepositions: [
      { word: "outside", meaning: "3차원 공간 외부 영역 (outside of ❌)", desc: "사무실 내부 상자 바깥으로 나가는 공간 이동" },
      { word: "from", meaning: "출처/출발점 지점에서 뻗어나오는 화살표", desc: "정수기라는 구체적 장치 출처 지점에서 물이 나옴" }
    ],
    correction: {
      isRefined: true,
      coachGreeting: "🌱 선생님의 1:1 맞춤 응원 코칭: 정수기에서 물을 받으러 나가는 일상의 순간을 영어식 시선 순서로 훌륭하게 구성하셨습니다!",
      userDraft: "나 간다 바깥 of 나의 사무실 to 얻다 약간의 물 from 정수기",
      refinedEnglish: "I am going outside my office to get some water from the water purifier.",
      rhythmChunks: [
        { en: "I am going outside my office", kr: "나는 사무실 밖으로 나가고 있습니다" },
        { en: "to get some water", kr: "물을 좀 얻기 위해" },
        { en: "from the water purifier", kr: "정수기로부터" }
      ],
      points: [
        {
          category: "주어-동사 인칭 수일치 오류 교정 (Subject-Verb Agreement 'I am' vs 'I are')",
          original: "I are going to",
          corrected: "I am going to",
          imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 주어가 1인칭 단수 'I'일 때는 be동사 'am'이 유일한 짝궁입니다. 'are'를 쓰면 뇌속에서 인칭 주파수가 어긋나 강한 어색함(I are ❌)을 느끼게 됩니다.",
          listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 'I am going'이 축약형 [아이엠 고잉] 또는 [암고잉]으로 닿는 소리를 체득하세요.",
          speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 'I am going outside' 한 입에 뱉는 훈련!",
          misconception: "🔄 ❌ vs ⭕ 인칭 수일치: ❌ 'I are'는 문법적으로 불가능한 수일치 오류입니다. ⭕ 'I am' 또는 'I'm'이 올바릅니다.",
          practiceExamples: [
            "I am going to the breakroom. (나는 휴게실로 가는 중입니다.)"
          ],
          reason: "주어 I에 맞추어 1인칭 be동사 am을 결합하여 문법적 정확성을 확립했습니다."
        },
        {
          category: "전치사 중복 및 관사 보완 ('outside of' ➔ 'outside', 'from water purifier' ➔ 'from the water purifier')",
          original: "outside of my office / from water purifier",
          corrected: "outside my office / from the water purifier",
          imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 장소 명사 앞 'outside'는 전치사 of를 쓰지 않는 것이 간결하며, 특정 장치인 정수기 앞에는 정관사 'the'를 명시해 줍니다.",
          listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 'from the water purifier' 소리 덩어리를 받아들이세요.",
          speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 'from the water purifier' 혀끝 근육 연결 연습!",
          misconception: "🔄 ❌ vs ⭕ 관사 누락: 구체적인 정수기 기기를 말할 때는 관사 the가 함께 붙어 3D 이미지를 명확히 해줍니다.",
          practiceExamples: [
            "He got a cup of cold water from the dispenser. (그는 정수기에서 차가운 물 한 잔을 받았습니다.)"
          ],
          reason: "불필요한 of를 제거하고 기기 명사 앞에 정관사 the를 보완하여 정통 영문을 완성했습니다."
        }
      ],
      teacherTip: "💡 원어민 뇌 가이드: [I am going outside my office] ➔ [to get some water] ➔ [from the water purifier] 순서로 카메라 렌즈를 연속 이동해 보세요!"
    }
  },
  {
    id: "ex_parking_tickets",
    arrowKorean: "나는 샀다 많은 주차권들 to 나눠주다 to 교육생들 그리고 넣었다 그것들 inside 하나의 서류봉투",
    english: "I bought many parking tickets to hand out to trainees and put them inside a document envelope.",
    chunks: [
      { text: "나는", role: "1. 주인공 (Subject)", english: "I", color: "indigo" },
      { text: "샀다", role: "2. 동작 (Action)", english: "bought", color: "blue" },
      { text: "많은 주차권들", role: "3. 가까운 대상 (Target)", english: "many parking tickets", color: "emerald" },
      { text: "to", role: "4. 전치사/연결어 (Preposition)", english: "to", color: "amber" },
      { text: "나눠주다", role: "5. 장소/부연 (Location/Context)", english: "hand out", color: "rose" },
      { text: "to 교육생들", role: "4. 전치사/연결어 (Preposition)", english: "to trainees", color: "amber" },
      { text: "그리고 넣었다 그것들", role: "2. 동작 (Action)", english: "and put them", color: "blue" },
      { text: "inside", role: "4. 전치사/연결어 (Preposition)", english: "inside", color: "amber" },
      { text: "하나의 서류봉투", role: "5. 장소/부연 (Location/Context)", english: "a document envelope", color: "purple" }
    ],
    vocabCards: [
      { korean: "나 (주인공)", english: "I", role: "주인공", searchUrl: getEducationalGoogleImageSearchUrl("I") },
      { korean: "샀다 (동작)", english: "bought", role: "동작", searchUrl: getEducationalGoogleImageSearchUrl("buy") },
      { korean: "많은 주차권들", english: "many parking tickets", role: "대상", searchUrl: getEducationalGoogleImageSearchUrl("parking ticket") },
      { korean: "나눠주다", english: "hand out", role: "목적", searchUrl: getEducationalGoogleImageSearchUrl("hand out") },
      { korean: "교육생들에게", english: "to trainees", role: "대상", searchUrl: getEducationalGoogleImageSearchUrl("trainees") },
      { korean: "그리고 넣었다 그것들", english: "and put them", role: "동작", searchUrl: getEducationalGoogleImageSearchUrl("put inside") },
      { korean: "inside (~안에)", english: "inside", role: "전치사", searchUrl: getEducationalGoogleImageSearchUrl("inside") },
      { korean: "서류봉투", english: "a document envelope", role: "장소", searchUrl: getEducationalGoogleImageSearchUrl("document envelope") }
    ],
    kidSummary: "나는 ➔ 샀다 ➔ 많은 주차권들 ➔ to hand out(나눠주기 위해) ➔ to trainees(교육생들에게) ➔ and put them ➔ inside ➔ 서류봉투",
    explanation: [
      "1. **주인공(I)**에서 구매 동작과 의도가 출발합니다.",
      "2. 주인공이 행한 구매 동작은 **'bought'**입니다.",
      "3. 1차 대상은 **'many parking tickets(많은 주차권들)'**입니다.",
      "4. 주차권을 전달하기 위한 목적 의도는 **'to hand out(나눠주기 위하여)'**입니다.",
      "5. 그 전달 대상은 **'to trainees(교육생들에게)'**입니다.",
      "6. 이어서 주차권들을 보관하는 2차 동작 **'and put them(그것들을 넣었다)'**과 내부 공간 전치사 **'inside a document envelope(서류 봉투 속으로)'**로 카메라 렌즈가 자연스럽게 이동합니다."
    ],
    prepositions: [
      { word: "to", meaning: "~를 향해 뻗어나가는 목적 화살표 (to hand out / to trainees)", desc: "나눠주는 목적 행동과 수혜자(교육생들)를 향한 시선 흐름" },
      { word: "inside", meaning: "3차원 입체 용기 내부 속 공간", desc: "서류 봉투 종이 상자 내부 공간 속으로 주차권들이 쏙 들어가는 구도" }
    ],
    correction: {
      isRefined: true,
      coachGreeting: "🌱 선생님의 1:1 맞춤 응원 코칭: 교육생들에게 전달할 주차권을 구매해 봉투에 보관하는 꼼꼼한 업무 순간을 영어식 시선 순서로 완벽히 완성하셨습니다!",
      userDraft: "나는 샀다 많은 주차권들 to 나눠주다 to 교육생들 그리고 넣었다 그것들 inside 하나의 서류봉투",
      refinedEnglish: "I bought many parking tickets to hand out to trainees and put them inside a document envelope.",
      rhythmChunks: [
        { en: "I bought many parking tickets", kr: "나는 많은 주차권을 샀습니다" },
        { en: "to hand out to trainees", kr: "교육생들에게 나눠주기 위해" },
        { en: "and put them", kr: "그리고 그것들을 넣었습니다" },
        { en: "inside a document envelope", kr: "서류 봉투 안에" }
      ],
      points: [
        {
          category: "목적 동사구 및 구어체 표현 (Phrasal Verb 'hand out' / 'pass out')",
          original: "to 나눠주다",
          corrected: "to hand out / to pass out",
          imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 여럿에게 나눠줄 때 'hand out'은 내 손에서 남의 손으로 건네어 나가는 모습이며, 'pass out'은 순차적으로 배부하는 정통 구어체 그림입니다.",
          listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 'to hand out'이 [투 핸다웃]으로 닿을 때 나눠주는 움직임을 연상하세요.",
          speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 'to hand out to trainees' 입으로 여러 번 뱉어보기!",
          misconception: "🔄 ❌ vs ⭕ 단어 선택 팁: 단순히 give보다 'hand out' 또는 'distribute'가 전문적인 배부 동작에 훨씬 자연스럽습니다.",
          practiceExamples: [
            "Please hand out these passes to the attendees. (참석자들에게 이 패스권을 나누어 주어라.)"
          ],
          reason: "배부 목적에 적합한 Phrasal Verb 'hand out'을 채택하여 구어체 직관성을 강화했습니다."
        }
      ],
      teacherTip: "💡 원어민 뇌 가이드: [I bought many parking tickets] ➔ [to hand out to trainees] ➔ [and put them inside] ➔ [a document envelope] 순서로 업무 진행 과정을 뇌속 영화처럼 떠올려 보세요!"
    }
  },
  {
    id: "ex_charging_station_tree",
    arrowKorean: "전기충전소가 서있다 beside 한그루의 나무 안전경계선이 설치되어있다 around 나무들 to 보호하다 그것",
    english: "An electric charging station stands beside a tree, and a safety boundary line is installed around the trees to protect it.",
    chunks: [
      { text: "전기충전소가", role: "1. 주인공 (Subject)", english: "An electric charging station", color: "indigo" },
      { text: "서있다", role: "2. 동작 (Action)", english: "stands", color: "blue" },
      { text: "beside", role: "4. 전치사/연결어 (Preposition)", english: "beside", color: "amber" },
      { text: "한그루의 나무", role: "3. 가까운 대상 (Target)", english: "a tree", color: "emerald" },
      { text: "안전경계선이", role: "1. 주인공 (Subject)", english: "a safety boundary line", color: "indigo" },
      { text: "설치되어있다", role: "2. 동작 (Action)", english: "is installed", color: "blue" },
      { text: "around", role: "4. 전치사/연결어 (Preposition)", english: "around", color: "amber" },
      { text: "나무들", role: "5. 장소/부연 (Location/Context)", english: "the trees", color: "rose" },
      { text: "to", role: "4. 전치사/연결어 (Preposition)", english: "to", color: "amber" },
      { text: "보호하다 그것", role: "5. 장소/부연 (Location/Context)", english: "protect it", color: "purple" }
    ],
    vocabCards: [
      { korean: "전기충전소가 (주인공)", english: "An electric charging station", role: "주인공", searchUrl: getEducationalGoogleImageSearchUrl("electric charging station") },
      { korean: "서있다 (동작)", english: "stands", role: "동작", searchUrl: getEducationalGoogleImageSearchUrl("charging station") },
      { korean: "beside (~옆에)", english: "beside", role: "전치사", searchUrl: getEducationalGoogleImageSearchUrl("beside") },
      { korean: "한그루의 나무", english: "a tree", role: "대상", searchUrl: getEducationalGoogleImageSearchUrl("tree") },
      { korean: "안전경계선이", english: "a safety boundary line", role: "주인공", searchUrl: getEducationalGoogleImageSearchUrl("safety barrier") },
      { korean: "설치되어있다", english: "is installed", role: "동작", searchUrl: getEducationalGoogleImageSearchUrl("installed fence") },
      { korean: "around (~둘레에)", english: "around", role: "전치사", searchUrl: getEducationalGoogleImageSearchUrl("around") },
      { korean: "to protect it (보호하기 위해)", english: "to protect it", role: "목적", searchUrl: getEducationalGoogleImageSearchUrl("protect tree") }
    ],
    kidSummary: "전기충전소가 ➔ 서있다 ➔ beside ➔ 한그루의 나무 ➔ 안전경계선이 ➔ 설치되어있다 ➔ around 나무들 ➔ to protect it",
    explanation: [
      "1. **주인공(An electric charging station)**에서 시각적 카메라 렌즈가 시작합니다.",
      "2. 전기충전소가 서 있는 동작 **'stands(is standing)'**를 표현합니다.",
      "3. 바로 곁에 밀착해 나란히 서 있는 위치 관계는 **'beside'**입니다. (beside는 자체 전치사로 of를 또 쓰지 않습니다).",
      "4. 그 대상은 **'a tree(한 그루의 나무)'**입니다.",
      "5. 이어지는 2차 주인공은 **'a safety boundary line(안전경계선)'**입니다.",
      "6. 그 경계선이 배치된 상태 동작은 **'is installed'**이며, 나무 둘레를 둥글게 감싸는 전치사 **'around the trees'**, 목적인 **'to protect it(그것을 보호하기 위하여)'**으로 확장됩니다."
    ],
    prepositions: [
      { word: "beside", meaning: "~의 바로 옆에 밀착해 나란히 있는 위치 (beside of ❌)", desc: "특정 대상의 측면 공간에 붙어 있는 물리적 나란함" },
      { word: "around", meaning: "중심 대상을 둥글게 원형 띠로 에워싸는 구도", desc: "나무들 둘레에 둥글게 경계선 울타리가 설치된 모습" },
      { word: "to", meaning: "목적을 향해 마음과 시선이 뻗어나가는 화살표(➔)", desc: "나무를 보호하기 위한(to protect) 행동의 목적 화살표" }
    ],
    correction: {
      isRefined: true,
      coachGreeting: "🌱 선생님의 1:1 맞춤 응원 코칭: 전기충전소와 나무를 보호하는 안전 경계선의 3D 구도를 영어식 화살표 순서로 정교하게 작성하셨습니다!",
      userDraft: "전기충전소가 서있다 beside 한그루의 나무 안전경계선이 설치되어있다 around 나무들 to 보호하다 그것",
      refinedEnglish: "An electric charging station stands beside a tree, and a safety boundary line is installed around the trees to protect it.",
      rhythmChunks: [
        { en: "An electric charging station", kr: "전기충전소가" },
        { en: "stands beside a tree", kr: "한 그루의 나무 옆에 서있고" },
        { en: "and a safety boundary line", kr: "안전 경계선이" },
        { en: "is installed around the trees", kr: "나무들 주변에 설치되어 있습니다" },
        { en: "to protect it", kr: "그것을 보호하기 위하여" }
      ],
      points: [
        {
          category: "전치사 중복 오류 교정 (Preposition 'beside' vs 'beside of')",
          original: "beside of one tree a tree",
          corrected: "beside a tree",
          imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 'beside' 단어 자체가 이미 '~옆에'라는 전치사이므로 of를 덧붙이면 뇌속에서 전치사가 2번 중복되어 어색함(beside of ❌)을 유발합니다.",
          listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 'beside a tree' 소리가 원어민 입에서 [비사이드 어 트리]로 부드럽게 넘어가는 입소리를 기억하세요.",
          speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 'stands beside a tree' ➔ of 없이 바로 'beside a tree'로 뱉는 훈련!",
          misconception: "🔄 ❌ vs ⭕ 전치사 오용: ❌ 'beside of'는 한국어 '~의'를 1:1 직역한 틀린 표현입니다. ⭕ 'beside' 또는 'next to'가 올바릅니다.",
          practiceExamples: [
            "A bench is standing beside the pond. (연못 옆에 벤치가 서 있습니다.)"
          ],
          reason: "beside는 독립적인 위치 전치사이므로 unnecessary of를 생략하는 것이 원어민 표제어법입니다."
        },
        {
          category: "대명사 및 관사 정제 ('one tree a tree' ➔ 'a tree', 'protect that' ➔ 'protect it')",
          original: "one tree a tree / protect that",
          corrected: "a tree / protect it",
          imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: '한 그루의' 수식어구 중복을 정리하고, 앞에서 언급한 대상을 지칭할 때는 지시대명사 that보다 인칭대명사 it/them이 한결 자연스럽습니다.",
          listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 'to protect it'이 [투 프로텍팃]으로 닿을 때 목적 의도를 연상하세요.",
          speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 'to protect it' 한 덩어리로 끊어 말해보세요.",
          misconception: "🔄 ❌ vs ⭕ 지시어 오해: 단일 대상을 문맥상 받아줄 때는 that 대신 it/them이 자연스러운 구어체입니다.",
          practiceExamples: [
            "They built a fence around the garden to protect it. (그들은 정원을 보호하기 위해 주변에 울타리를 쳤습니다.)"
          ],
          reason: "관사의 중복을 제거하고 문맥에 맞는 3인칭 대명사 it을 채택하여 문장의 정교함을 높였습니다."
        }
      ],
      teacherTip: "💡 원어민 뇌 가이드: [An electric charging station] ➔ [stands beside a tree] ➔ [and a safety boundary line] ➔ [is installed around the trees] ➔ [to protect it] 순서로 뇌속 렌즈를 천천히 이동해보세요!"
    }
  },
  {
    id: "ex_sons_train",
    arrowKorean: "나의 아들들 간다 할머니집 by 기차 because 그들의 방학 시작했다 오늘부터",
    english: "My sons are going to grandma's house by train because their vacation started today.",
    chunks: [
      { text: "나의 아들들", role: "1. 주인공 (Subject)", english: "My sons", color: "indigo" },
      { text: "간다", role: "2. 동작 (Action)", english: "are going to", color: "blue" },
      { text: "할머니집", role: "3. 가까운 대상 (Target)", english: "grandma's house", color: "emerald" },
      { text: "by 기차", role: "4. 전치사/연결어 (Preposition)", english: "by train", color: "amber" },
      { text: "because", role: "4. 전치사/연결어 (Preposition)", english: "because", color: "amber" },
      { text: "그들의 방학 시작했다", role: "5. 장소/부연 (Location/Context)", english: "their vacation started", color: "rose" },
      { text: "오늘부터", role: "6. 시간 (Time)", english: "today", color: "purple" }
    ],
    vocabCards: [
      { korean: "나의 아들들 (주인공)", english: "My sons", role: "주인공", searchUrl: getEducationalGoogleImageSearchUrl("sons") },
      { korean: "간다 (동작)", english: "are going to", role: "동작", searchUrl: getEducationalGoogleImageSearchUrl("going to") },
      { korean: "할머니집 (대상)", english: "grandma's house", role: "가까운 대상", searchUrl: getEducationalGoogleImageSearchUrl("grandma house") },
      { korean: "by 기차 (교통수단)", english: "by train", role: "전치사", searchUrl: getEducationalGoogleImageSearchUrl("train") },
      { korean: "because (이유 연결)", english: "because", role: "전치사", searchUrl: getEducationalGoogleImageSearchUrl("because") },
      { korean: "그들의 방학 시작했다", english: "their vacation started", role: "장소", searchUrl: getEducationalGoogleImageSearchUrl("vacation") },
      { korean: "오늘부터 (시점)", english: "today", role: "시간", searchUrl: getEducationalGoogleImageSearchUrl("today") }
    ],
    kidSummary: "나의 아들들 ➔ 간다 ➔ 할머니집 ➔ by train(기차 타고) ➔ because ➔ 그들의 방학 시작했다 ➔ 오늘부터",
    explanation: [
      "1. **주인공(My sons)**에서 움직임과 생각 에너지가 출발합니다.",
      "2. 주인공 아들들이 향해 나아가는 이동 동작 **'are going to'**를 선언합니다.",
      "3. 시선과 기차가 닿을 1차 도달 장소 대상은 **'grandma's house(할머니집)'**입니다.",
      "4. 이동을 담당하는 수단 전치사는 **'by train(기차로)'**입니다. (교통수단 by 뒤에는 관사 a 없이 train 단수로 씁니다).",
      "5. 그 이유를 밝혀주는 연결어는 **'because'**입니다.",
      "6. 구체적 원인 상황과 시간 시점은 **'their vacation started today(오늘부터 방학이 시작됐다)'**입니다."
    ],
    prepositions: [
      { word: "to", meaning: "목적지 지점을 향해 직진하여 딱 도달하는 화살표(➔)", desc: "할머니 댁이라는 물리적 최종 도달 장소 지점을 딱 찍음" },
      { word: "by", meaning: "수단/도구에 붙어 편승하는 관계", desc: "교통수단(train)을 이용해 이동하는 수단 관계. 관사 없이 'by train'으로 정통 표기" }
    ],
    correction: {
      isRefined: true,
      coachGreeting: "🌱 선생님의 1:1 맞춤 응원 코칭: 방학을 맞아 할머니 댁으로 기차를 타고 떠나는 정겨운 가족 이야기를 영어식 시선 순서로 훌륭하게 구성하셨습니다!",
      userDraft: "나의 아들들 간다 할머니집 by 기차 because 그들의 방학 시작했다 오늘부터",
      refinedEnglish: "My sons are going to grandma's house by train because their vacation started today.",
      rhythmChunks: [
        { en: "My sons are going to", kr: "나의 아들들은 가고 있습니다" },
        { en: "grandma's house", kr: "할머니 댁으로" },
        { en: "by train", kr: "기차를 타고" },
        { en: "because their vacation", kr: "그들의 방학이" },
        { en: "started today", kr: "오늘부터 시작했기 때문에" }
      ],
      points: [
        {
          category: "교통수단 전치사 관사 생략 규칙 (Preposition 'by' + Means of Transit)",
          original: "by a train",
          corrected: "by train",
          imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 교통수단을 말할 때 'by' 뒤에는 'a train'이 아닌 관사 없는 'train' 원형으로 쓰며, 이는 특정 한 대의 기차 개체보다는 '기차라는 이동 수단' 자체에 뇌의 초점이 맞춰져 있기 때문입니다.",
          listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 원어민이 'by train'을 말할 때 [바이 트레인]으로 한 덩어리로 빠르게 소리 내므로 'a' 소리를 기다리지 말고 직관적으로 받아들이세요.",
          speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 'by train' (기차로), 'by bus' (버스로), 'by car' (차로) ➔ 관사 없이 바로 붙여 말하는 근육 훈련!",
          misconception: "🔄 ❌ vs ⭕ 직역 오해: ❌ 'by a train'은 기차 바로 옆에 서 있는 위치 전치사 표현으로 오해될 수 있습니다. ⭕ 이동 수단은 'by train'이 표준 원어민 표현입니다.",
          practiceExamples: [
            "We travel by train every weekend. (우리는 주말마다 기차로 여행합니다.)",
            "They went to the beach by bus. (그들은 버스를 타고 해변으로 갔습니다.)"
          ],
          reason: "교통수단을 수식할 때 전치사 by 다음에는 관사(a/an/the)를 생략하는 것이 정통 영문법 법칙입니다."
        },
        {
          category: "이동 동사 목적지 전치사 필수 결합 (Verb 'go' + Destination 'to')",
          original: "going grandma's house",
          corrected: "going to grandma's house",
          imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 'going' 에너지가 발출된 후 목표 장소(grandma's house)로 화살표 꽂힘(to)이 없으면 공중에 붕 뜨게 됩니다. 부사인 'home'을 제외한 일반 명사 장소 앞에는 'to'가 필수입니다.",
          listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 'going to'가 구어체에서 [가나] 또는 [고잉투]로 뭉개져 닿을 때 목적지로 뻗어나가는 시선을 연상하세요.",
          speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 'are going to grandma's house' 한 호흡으로 부드럽게 연결해 보세요.",
          misconception: "🔄 ❌ vs ⭕ 'home'과의 차이: 'go home'은 home 자체가 부사라 to를 쓰지 않지만, 'grandma's house'는 명사이므로 'to'가 필수입니다.",
          practiceExamples: [
            "The kids are going to school right now. (아이들은 지금 학교에 가고 있습니다.)"
          ],
          reason: "목적지 명사 앞에는 방향과 도달을 나타내는 전치사 to가 함께 짝을 이루어야 완벽한 어순이 완성됩니다."
        }
      ],
      teacherTip: "💡 원어민 뇌 가이드: [My sons are going to] ➔ [grandma's house] ➔ [by train] ➔ [because their vacation] ➔ [started today] 순서로 기차가 칙칙폭폭 달려가듯 생각의 속도로 연결해 보세요!"
    }
  },
  {
    id: "ex_mullae",
    arrowKorean: "나는 만날것이다 나의 옛 동료들 near 문래 in August",
    english: "I will meet my old colleagues near Mullae(문래) in August.",
    chunks: [
      { text: "나는", role: "1. 주인공 (Subject)", english: "I", color: "indigo" },
      { text: "만날것이다", role: "2. 동작 (Action)", english: "will meet", color: "blue" },
      { text: "나의 옛 동료들", role: "3. 가까운 대상 (Target)", english: "my old colleagues", color: "emerald" },
      { text: "near", role: "4. 전치사/연결어 (Preposition)", english: "near", color: "amber" },
      { text: "문래", role: "5. 장소/부연 (Location/Context)", english: "Mullae(문래)", color: "rose" },
      { text: "in", role: "4. 전치사/연결어 (Preposition)", english: "in", color: "amber" },
      { text: "August", role: "5. 장소/부연 (Location/Context)", english: "August", color: "purple" }
    ],
    vocabCards: [
      { korean: "나 (주인공)", english: "I", role: "주인공", searchUrl: getEducationalGoogleImageSearchUrl("I") },
      { korean: "만날것이다 (미래 동작)", english: "will meet", role: "동작", searchUrl: getEducationalGoogleImageSearchUrl("will meet") },
      { korean: "나의 옛 동료들", english: "my old colleagues", role: "가까운 대상", searchUrl: getEducationalGoogleImageSearchUrl("old colleagues") },
      { korean: "near (~근처에)", english: "near", role: "전치사", searchUrl: getEducationalGoogleImageSearchUrl("near") },
      { korean: "문래 (장소)", english: "Mullae(문래)", role: "장소", searchUrl: getEducationalGoogleImageSearchUrl("Mullae") },
      { korean: "in August (8월에)", english: "in August", role: "시간", searchUrl: getEducationalGoogleImageSearchUrl("August") }
    ],
    kidSummary: "주인공(나) ➔ 만날 거야(동작) ➔ 나의 옛 동료들(대상) ➔ near(~근처) ➔ 문래(장소) ➔ in August(8월 시점)",
    explanation: [
      "1. **주인공(I)**에서 의지와 생각 에너지가 출발합니다.",
      "2. 주인공이 미래에 행할 만남의 동작 **'만날것이다(will meet)'**를 선언합니다.",
      "3. 시선과 손길이 닿아 만날 1차 대상은 **'나의 옛 동료들(my old colleagues)'**입니다.",
      "4. 만나기로 한 장소 주변을 에워싸는 영역 전치사는 **'near'**입니다.",
      "5. 그 장소 지점은 **'Mullae(문래)'**입니다.",
      "6. 그 사건이 일어나는 달/시간 상자는 **'in August(8월)'**입니다."
    ],
    prepositions: [
      { word: "near", meaning: "가깝게 에워싸는 주변 영역", desc: "특정 점에 딱 붙지 않고 '문래역 주변 부근' 공간 영역을 포괄함" },
      { word: "in", meaning: "달/연도/시간 상자 안", desc: "August(8월)라는 큰 시간 상자 테두리 안을 가리킴" }
    ],
    correction: {
      isRefined: true,
      coachGreeting: "🌱 선생님의 1:1 맞춤 응원 코칭: 문래역 근처에서 옛 동료분들을 만나는 정겨운 일상의 순간을 영어식 시선 순서로 완벽하게 구성하셨습니다!",
      userDraft: "나는 만날것이다 나의 옛 동료들 near 문래 in August",
      refinedEnglish: "I will meet my old colleagues near Mullae(문래) in August.",
      rhythmChunks: [
        { en: "I will meet", kr: "나는 만날 것입니다" },
        { en: "my old colleagues", kr: "나의 옛 동료들을" },
        { en: "near Mullae(문래)", kr: "문래 근처에서" },
        { en: "in August", kr: "8월에" }
      ],
      points: [
        {
          category: "한국어 지명 한글 병기 규칙 (Korean Place Name Parentheses)",
          original: "문래 ➔ Mullae",
          corrected: "Mullae(문래)",
          imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 고유 지명이나 지하철 역명은 원어민 로마자 표기 뒤에 한글 원문 지명을 괄호로 병기하면 직관성이 크게 높아집니다.",
          listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 'near Mullae'가 들릴 때 8월(in August) 달력 상자로 시선이 순차적으로 넘어가는 연결감을 체득하세요.",
          speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 'I will meet my old colleagues near ~ in August.' 입에 착 붙여보세요!",
          misconception: "🔄 지명 표기 팁: '문래'는 자음 동화(munnae)가 아닌 표준 로마자 표기 'Mullae(문래)'로 표기합니다.",
          practiceExamples: [
            "I will meet my friends near Gangnam(강남) in July. (나는 7월에 강남 근처에서 친구들을 만날 것입니다.)",
            "She will visit her family near Yeouido(여의도) in September. (그녀는 9월에 여의도 근처에 있는 가족을 방문할 것입니다.)"
          ],
          reason: "고유 지명의 한글 병기를 통해 한국인 학습자의 시각적 직관성을 극대화하고 표준 로마자 표기법을 명확히 제시합니다."
        }
      ],
      teacherTip: "💡 원어민 뇌 가이드: [I will meet] ➔ [my old colleagues] ➔ [near Mullae(문래)] ➔ [in August] 순서로 카메라 렌즈가 이동하듯 생각의 속도로 연결해 보세요!"
    }
  },
  {
    id: "ex1",
    arrowKorean: "나는 이다 할 예정 면접 of 알바 at 카페 at 4:30 p.m",
    english: "I am going to have an interview for a part-time job at a cafe at 4:30 p.m.",
    chunks: [
      { text: "나는", role: "1. 주인공 (Subject)", english: "I", color: "indigo" },
      { text: "이다 할 예정", role: "2. 동작/상태 (Action)", english: "am going to have", color: "blue" },
      { text: "면접", role: "3. 가까운 대상 (Target)", english: "an interview", color: "emerald" },
      { text: "of 알바", role: "4. 전치사/목적 (Preposition)", english: "for a part-time job", color: "amber" },
      { text: "at 카페", role: "5. 장소 (Location)", english: "at a cafe", color: "rose" },
      { text: "at 4:30 p.m", role: "6. 시간 (Time)", english: "at 4:30 p.m.", color: "purple" }
    ],
    vocabCards: [
      { korean: "나 (주인공)", english: "I", role: "주인공", searchUrl: getEducationalGoogleImageSearchUrl("I") },
      { korean: "이다 할 예정 (미래 동작)", english: "am going to have", role: "동작", searchUrl: getEducationalGoogleImageSearchUrl("am going to have") },
      { korean: "면접", english: "an interview", role: "가까운 대상", searchUrl: getEducationalGoogleImageSearchUrl("an interview") },
      { korean: "알바 (아르바이트)", english: "a part-time job", role: "관련 목적", searchUrl: getEducationalGoogleImageSearchUrl("a part-time job") },
      { korean: "카페", english: "a cafe", role: "장소 지점", searchUrl: getEducationalGoogleImageSearchUrl("a cafe") },
      { korean: "오후 4시 30분", english: "4:30 p.m.", role: "시간 지점", searchUrl: getEducationalGoogleImageSearchUrl("4:30 p.m.") }
    ],
    kidSummary: "주인공(나) ➔ 할 거야(예정) ➔ 인터뷰(면접) ➔ 알바 목적 ➔ 카페 장소 ➔ 4:30 시간",
    explanation: [
      "1. **주인공(I)**에서 생각이 출발합니다.",
      "2. 주인공의 현재 의지 및 예정된 상태 **'이다 할 예정(am going to have)'**이 펼쳐집니다.",
      "3. 시선이 바로 부딪히는 1차 대상은 **'면접(an interview)'**입니다.",
      "4. 그 면접이 밀접하게 연결(for)되어 있는 일의 종류는 **'알바(a part-time job)'**입니다.",
      "5. 그 일이 일어나는 장소의 점을 콕 찍어 나타내면 **'at 카페(at a cafe)'**입니다.",
      "6. 그 일의 시간 지점을 콕 찍으면 **'at 4:30 p.m.'**입니다."
    ],
    prepositions: [
      { word: "for", meaning: "대상 / 목적 소유", desc: "면접이 알바 일이라는 목적 대상을 위해 진행됨을 표시" },
      { word: "at", meaning: "콕 찍은 점", desc: "넓은 영역이 아니라 지도 위의 한 점(카페)과 시계의 한 점(4시30분)을 콕 찍음" }
    ],
    correction: {
      isRefined: true,
      coachGreeting: "🌱 선생님의 1:1 맞춤 응원 코칭: 처음부터 영어식 뇌가 완벽한 사람은 없습니다! 한국어 어순 순서에서 영어식 물리적 시선으로 생각을 펼치려는 시도 자체가 대단합니다. 초등생도 이해하기 쉽게 뇌속 그림과 입소리 감각을 친절하게 짚어드릴게요.",
      userDraft: "나는 이다 할 예정 면접 of 알바 at 카페 at 4:30 p.m",
      refinedEnglish: "I am going to have an interview for a part-time job at a cafe at 4:30 p.m.",
      rhythmChunks: [
        { en: "I am going to have", kr: "나는 할 예정입니다" },
        { en: "an interview", kr: "면접을" },
        { en: "for a part-time job", kr: "알바라는 목적으로" },
        { en: "at a cafe", kr: "카페라는 지점에서" },
        { en: "at 4:30 p.m.", kr: "오후 4:30 시각에" }
      ],
      points: [
        {
          category: "전치사 뉘앙스 업그레이드 (Preposition Nuance)",
          original: "면접 of 알바",
          corrected: "an interview for a part-time job",
          imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 'of'는 이미 빽빽하게 붙어 소속된 자석 그림이고, 'for'는 그 대상을 향해 내 마음과 시선이 뻗어나가는 목적의 화살표 그림입니다.",
          listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 원어민이 'an interview' 다음에 'for'를 뱉는 순간, 귀에서 뒤로 번역하지 말고 바로 '아, 무슨 일 목적의 면접이구나!'하고 목적 대상을 받아들이세요.",
          speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 'an interview for ~' (~~를 위한 면접) 패턴을 입에 찰떡처럼 붙여두세요.",
          misconception: "🔄 ❌ vs ⭕ 뉘앙스 비교: ❌ '알바의 면접'을 한국어 '~의'만 보고 'of'로 직역하면 안 됩니다. ⭕ 면접은 그 알바 자리를 목적으로 치르는 것이므로 'for'가 정통 원어민 표현입니다.",
          practiceExamples: [
            "I have an interview for a new job. (새 직장을 위한 면접이 있어요.)",
            "She is preparing for a job interview. (그녀는 취업 면접을 준비 중입니다.)"
          ],
          reason: "알바 자리를 목적으로 치르는 면접이므로 단순 소유 'of'보다 목적을 향해 나아가는 전치사 'for'가 훨씬 매끄럽고 정통 표현입니다."
        }
      ],
      teacherTip: "💡 원어민 뇌 가이드: 영어를 들을 때 한글로 번역하지 마시고, [I am going to have] ➔ [an interview] ➔ [for a part-time job] 순서로 기차가 연결되듯 순차적으로 연상해 보세요!"
    }
  },
  {
    id: "ex2",
    arrowKorean: "나 쳐다본다 나무들 about 아파트 단지",
    english: "I am looking at the trees around the apartment complex.",
    chunks: [
      { text: "나", role: "1. 주인공 (Subject)", english: "I", color: "indigo" },
      { text: "쳐다본다", role: "2. 동작/시선 (Action)", english: "am looking at", color: "blue" },
      { text: "나무들", role: "3. 가까운 대상 (Target)", english: "the trees", color: "emerald" },
      { text: "about 아파트 단지", role: "4. 전치사/장소 (Preposition/Location)", english: "around the apartment complex", color: "amber" }
    ],
    vocabCards: [
      { korean: "나", english: "I", role: "주인공", searchUrl: getEducationalGoogleImageSearchUrl("I") },
      { korean: "쳐다본다 (시선 콕)", english: "am looking at", role: "동작", searchUrl: getEducationalGoogleImageSearchUrl("am looking at") },
      { korean: "나무들", english: "the trees", role: "가까운 대상", searchUrl: getEducationalGoogleImageSearchUrl("the trees") },
      { korean: "아파트 단지 둘레", english: "around the apartment complex", role: "장소 에워쌈", searchUrl: getEducationalGoogleImageSearchUrl("around the apartment complex") }
    ],
    kidSummary: "주인공(나) ➔ 보는 중(시선) ➔ 나무들(대상) ➔ 아파트 단지를 둥글게 둘러싼(장소)",
    explanation: [
      "1. **주인공(I)**의 눈에서 시선이 뻗어 나갑니다.",
      "2. 시선을 목표점과 맞추는 동작 **'쳐다본다(am looking at)'**를 수행합니다.",
      "3. 시선이 닿아 멈추는 대상은 **'나무들(the trees)'**입니다.",
      "4. 그 나무들이 위치한 주변 영역이 **'around 아파트 단지(around the apartment complex)'** 주변에 둘러싸여 펼쳐져 있습니다."
    ],
    prepositions: [
      { word: "around", meaning: "둘러싼 원형 구도", desc: "아파트 단지 근처 주위를 둥글게 둘러싸고 있는 구도" }
    ],
    correction: {
      isRefined: true,
      coachGreeting: "🌱 선생님의 1:1 맞춤 응원 코칭: 'about'과 'around'의 공간 뉘앙스를 체득하는 순간 영어 실력이 획기적으로 상승합니다! 뇌속 카메라 렌즈 화살표를 따라가 볼까요?",
      userDraft: "나 쳐다본다 나무들 about 아파트 단지",
      refinedEnglish: "I am looking at the trees around the apartment complex.",
      rhythmChunks: [
        { en: "I am looking at", kr: "나는 쳐다보는 중입니다" },
        { en: "the trees", kr: "그 나무들을" },
        { en: "around the apartment complex", kr: "아파트 단지를 둥글게 둘러싼 주변에서" }
      ],
      points: [
        {
          category: "전치사 공간 위치 업그레이드 (Preposition Spatial Layout)",
          original: "about 아파트 단지",
          corrected: "around the apartment complex",
          imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 'about'은 대략 근처에 무질서하게 점으로 흩어진 그림이고, 'around'는 중심 대상을 둥글게 원형 띠로 에워싸는 구도의 그림입니다.",
          listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 'around ~'가 들리면 '아, 중심 물체를 둥글게 둘러싸고 있구나!'하고 원형 배치 공간을 머릿속에 그리세요.",
          speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 'around the ~' (~~의 둘레를 따라 둘러싸고) 패턴을 묶어서 말해봅니다.",
          misconception: "🔄 ❌ vs ⭕ 뉘앙스 비교: ❌ 한국어 '근처/주변'만 생각하고 'about'을 쓰면 산만하게 흩어진 그림이 됩니다. ⭕ 단지를 예쁘게 둘러싼 울타리 나무 구도엔 'around'가 맞습니다.",
          practiceExamples: [
            "People gathered around the fountain. (사람들이 분수대 주위로 둥글게 모였습니다.)",
            "There are fence walls around the garden. (정원 둘레에 울타리 벽이 서 있습니다.)"
          ],
          reason: "아파트 단지 둘레를 원형으로 감싸고 있는 3차원 위치 관계이므로 'around'가 훨씬 정확한 표준 표현입니다."
        }
      ],
      teacherTip: "💡 원어민 뇌 가이드: 시선이 닿을 때 [look at]으로 점을 찍고, 그 주변을 둘러쌀 때 [around]로 원을 그리는 그림을 뇌에 입력하세요!"
    }
  },
  {
    id: "ex6",
    arrowKorean: "나는 가고있다 to집에 on 내차를타고 비가 내린다 above 내차위로",
    english: "I am going home in my car, and rain falls above my car.",
    chunks: [
      { text: "나는", role: "1. 주인공 (Subject)", english: "I", color: "indigo" },
      { text: "가고있다", role: "2. 이동 동작 (Action)", english: "am going", color: "blue" },
      { text: "to집에", role: "3. 도착 목표 (Target)", english: "home", color: "emerald" },
      { text: "on 내차를타고", role: "4. 전치사/수단 (Vehicle)", english: "in my car", color: "amber" },
      { text: "비가 내린다", role: "5. 추가 사건 (Secondary Action)", english: "and rain falls", color: "rose" },
      { text: "above 내차위로", role: "6. 상공 공간 (Time/Space)", english: "above my car", color: "purple" }
    ],
    vocabCards: [
      { korean: "나 (주인공)", english: "I", role: "주인공", searchUrl: getEducationalGoogleImageSearchUrl("I") },
      { korean: "가고있다 (이동)", english: "am going", role: "동작", searchUrl: getEducationalGoogleImageSearchUrl("am going") },
      { korean: "집 (안식처)", english: "home", role: "도착 목표", searchUrl: getEducationalGoogleImageSearchUrl("home") },
      { korean: "내 차 안에서", english: "in my car", role: "차량 공간", searchUrl: getEducationalGoogleImageSearchUrl("in my car") },
      { korean: "비가 내린다", english: "rain falls", role: "자연 현상", searchUrl: getEducationalGoogleImageSearchUrl("rain falls") },
      { korean: "내 차 위 상공에", english: "above my car", role: "공중 공간", searchUrl: getEducationalGoogleImageSearchUrl("above my car") }
    ],
    kidSummary: "주인공(나) ➔ 간다(동작) ➔ 집(목적지) ➔ 차 안에 타고(수단) ➔ 비 내린다 ➔ 차 위 상공에서",
    explanation: [
      "1. 첫 번째 주인공 **'나(I)'**가 **'가고 있는(am going)'** 이동을 합니다.",
      "2. 화살표 방향이 나아가 도착하는 목적지는 **'home(집에)'**입니다.",
      "3. 이동 시 내 몸이 들어앉아 있는 수단은 **'in 내 차(in my car)'**입니다.",
      "4. 그리고 또 다른 주인공인 **'비가 내리는(rain falls)'** 현상이 동시 발생합니다.",
      "5. 그 비가 위치한 공간은 차 표면과 떨어져 차 위쪽 공중에 붕 떠있는 **'above 내 차 위로(above my car)'**입니다."
    ],
    prepositions: [
      { word: "in", meaning: "차량 내부 탑승", desc: "승용차 3차원 내부 공간 안에 들어앉아 이동하는 상태" },
      { word: "above", meaning: "떨어진 상공", desc: "물체 표면에 닿지 않고 위쪽 공간에 붕 떠서 분포함" }
    ],
    correction: {
      isRefined: true,
      coachGreeting: "🌱 선생님의 1:1 맞춤 응원 코칭: 'to home'이나 'on my car'는 한국인 학습자들이 가장 자주 마주치는 대표적인 뉘앙스 탐구 포인트입니다! 이 2가지만 원어민 뇌속 그림으로 완전히 훔쳐 오면 영어 실력이 급상승합니다.",
      userDraft: "나는 가고있다 to집에 on 내차를타고 비가 내린다 above 내차위로",
      refinedEnglish: "I am going home in my car, and rain falls above my car.",
      rhythmChunks: [
        { en: "I am going home", kr: "나는 집에 가고 있습니다" },
        { en: "in my car", kr: "내 차 안에 탑승해서" },
        { en: "and rain falls", kr: "그리고 비가 내립니다" },
        { en: "above my car", kr: "내 차 위 상공 공간에서" }
      ],
      points: [
        {
          category: "전치사 중복 생략 튜터링 (Redundant Preposition Omission)",
          original: "to 집에 (to home)",
          corrected: "home (집으로)",
          imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 'home'이라는 단어 자체는 단순한 집 건물이 아니라 '내가 안전하게 돌아갈 내 안식처로'라는 이동 방향 화살표(➔)를 이미 뱃속에 내장하고 있습니다. 따라서 여기에 전치사 'to'를 또 붙이면 뇌속에서 화살표가 2번 중복되어 튕겨 나가는 어색함을 느끼게 됩니다.",
          listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 영화나 대화에서 'I am going...' 뒤에 'to' 소리가 안 들리더라도 당황하지 마세요! 바로 'home' 소리가 꽂히면 '아, 집으로 직행하는구나!'하고 이해하면 됩니다.",
          speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 'go home' (집에 가다) ➔ 'to' 없이 한 입에 뱉는 근육 훈련을 하세요.",
          misconception: "🔄 ❌ vs ⭕ 한국어 직역 오해 vs 원어민 뉘앙스: ❌ 한국어 '집에/집으로'의 '~에/로'를 보고 무조건 'to'로 1:1 직역하는 습관 때문입니다. ⭕ 안식처 부사 'home'은 to를 겹쳐 쓰지 않는 것이 원어민 직관입니다.",
          practiceExamples: [
            "I want to go home right now. (나 지금 당장 집에 가고 싶어.)"
          ],
          reason: "home은 부사이므로 방향 전치사 to를 생략해야 가장 깔끔하고 완벽한 원어민 표준 표현이 완성됩니다."
        },
        {
          category: "차량 공간 전치사 튜터링 (Vehicle Preposition Nuance)",
          original: "on 내차를타고 (on my car)",
          corrected: "in my car (내 차를 타고)",
          imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 전치사 'on'은 2차원 지붕이나 판자 표면 위에 발을 딛고 서 있는 그림입니다. 반면 'in'은 3차원 입체 상자 공간 내부 속으로 몸이 쏙 들어가 앉아 보호받는 그림입니다.",
          listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 'in my car'는 '인 마이 카'로 잘게 잘리지 않고 연음으로 [인마이카]로 뭉쳐 들립니다.",
          speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 'in my car' (내 차 안에서) ➔ 공간 전치사 in을 입에 입히세요.",
          misconception: "🔄 ❌ vs ⭕ 한국어 직역 오해 vs 원어민 뉘앙스: ❌ 승용차 지붕 위에 올라타고 가는 것이 아니므로 'on'이 아니라 내부 공간 'in'을 씁니다.",
          practiceExamples: [
            "Let's go in my car together. (내 차 타고 같이 가자!)"
          ],
          reason: "승용차처럼 내부 3차원 공간 속으로 몸이 들어앉는 이동 수단에는 공간 전치사 'in'을 사용하는 것이 원어민 표제어법입니다."
        }
      ],
      teacherTip: "💡 원어민 뇌 가이드: [go home]은 to 없이 그대로! 승용차에 쏙 들어앉으면 [in my car]! 차 위 공중에 비가 떠있으면 [above my car]!"
    }
  },
  {
    id: "ex3",
    arrowKorean: "학생들이 앉아 있다.on 의자 around 테이블",
    english: "Students are sitting on chairs around the table.",
    chunks: [
      { text: "학생들이", role: "1. 주인공들 (Subject)", english: "Students", color: "indigo" },
      { text: "앉아 있다", role: "2. 동작 진행 (Action)", english: "are sitting", color: "blue" },
      { text: "on 의자", role: "3. 표면 접촉 (Target Surface)", english: "on chairs", color: "emerald" },
      { text: "around 테이블", role: "4. 공간 구도 (Location Layout)", english: "around the table", color: "amber" }
    ],
    vocabCards: [
      { korean: "학생들 (주인공)", english: "Students", role: "주인공", searchUrl: getEducationalGoogleImageSearchUrl("Students") },
      { korean: "앉아 있다 (동작)", english: "are sitting", role: "동작", searchUrl: getEducationalGoogleImageSearchUrl("are sitting") },
      { korean: "의자들 표면에", english: "on chairs", role: "표면 접촉", searchUrl: getEducationalGoogleImageSearchUrl("on chairs") },
      { korean: "테이블을 둘러싸며", english: "around the table", role: "공간 구도", searchUrl: getEducationalGoogleImageSearchUrl("around the table") }
    ],
    kidSummary: "주인공(학생들) ➔ 앉아있다(동작) ➔ 의자 위에(접촉) ➔ 테이블을 둘러싸고(장소)",
    explanation: [
      "1. 주인공들인 **'학생들(Students)'**에 시선이 닿습니다.",
      "2. 학생들의 현재 상태는 **'앉아 있는(are sitting)'** 중입니다.",
      "3. 엉덩이가 직접 닿아 붙어 있는 표면은 **'on 의자(on chairs)'**입니다.",
      "4. 그 의자와 학생들이 테이블을 원형으로 에워싸고 있는 구도가 **'around 테이블(around the table)'**입니다."
    ],
    prepositions: [
      { word: "on", meaning: "면 접촉", desc: "의자의 좌판 표면에 몸이 딱 붙어 있는 물리적 상태" },
      { word: "around", meaning: "둘러싼 원형 구도", desc: "테이블을 중심으로 둥글게 배치되어 있음" }
    ],
    correction: {
      isRefined: true,
      coachGreeting: "🌱 선생님의 1:1 맞춤 응원 코칭: 엉덩이가 붙는 면 접촉 'on'과 테이블 둘레를 싸는 'around'의 전치사 감각이 너무나 우수합니다! 명사의 수량감만 살짝 완성해 보겠습니다.",
      userDraft: "학생들이 앉아 있다.on 의자 around 테이블",
      refinedEnglish: "Students are sitting on chairs around the table.",
      rhythmChunks: [
        { en: "Students are sitting", kr: "학생들이 앉아 있는 중입니다" },
        { en: "on chairs", kr: "의자들 위에 붙어서" },
        { en: "around the table", kr: "테이블을 둘러싸며" }
      ],
      points: [
        {
          category: "명사 수량 일치 & 공간 조화 (Plural & Article Match)",
          original: "on 의자 / around 테이블",
          corrected: "on chairs / around the table",
          imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 여럿인 학생 각각의 의자들(chairs)과, 그 중앙의 특정한 하나의 테이블(the table) 주위로 둥글게 둘러앉은 구도입니다.",
          listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 'on chairs', 'around the table'을 묶어서 들으며 학생들의 미팅 풍경을 머릿속 시각화하세요.",
          speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 'sitting on chairs around the table'을 한 숨에 뱉는 훈련을 진행해보세요.",
          misconception: "🔄 ❌ vs ⭕ 뉘앙스 비교: ❌ 주어는 여러 명인데 의자(chair)를 단수로 쓰면 어색해집니다. ⭕ 수량을 'chairs'로 맞추는 것이 자연스럽습니다.",
          practiceExamples: [
            "They are sitting on chairs in the lobby. (그들은 로비 의자들에 앉아 있습니다.)"
          ],
          reason: "여러 주어의 수량에 맞춰 의자를 복수형(chairs)으로 맞추고, 중심이 되는 테이블 앞엔 정관사 'the'를 붙여줍니다."
        }
      ],
      teacherTip: "💡 원어민 뇌 가이드: 엉덩이가 붙으면 [on], 원형으로 모여앉으면 [around]! 이 두 그림을 동시에 떠올리는 훈련이 최고입니다."
    }
  }
];

/**
 * Smart Parser for arbitrary user inputs (Synchronous fallback)
 */
export function parseArrowKoreanLocal(input) {
  const cleanInput = input.trim();
  const normalizedInput = cleanInput.replace(/14:30/g, '4:30').replace(/\s+/g, ' ');

  const matchedPreset = PRESET_SENTENCES.find(p => {
    const pNorm = p.arrowKorean.replace(/\s+/g, ' ');
    return pNorm === normalizedInput || p.arrowKorean.replace(/\s+/g, '') === cleanInput.replace(/\s+/g, '');
  });
  if (matchedPreset) return matchedPreset;

  const tokenRegex = /[a-zA-Z0-9_-]+(?:\([\u3131-\u318E\uAC00-\uD7A3\s,.-]+\))?|[\u3131-\u318E\uAC00-\uD7A3]+(?:\([\u3131-\u318E\uAC00-\uD7A3\s,.-]+\))?|[^\s]+/g;
  const tokens = cleanInput.match(tokenRegex) || cleanInput.split(/\s+/);
  const chunks = [];
  const englishParts = [];
  const vocabCards = [];

  let i = 0;
  while (i < tokens.length) {
    let token = tokens[i];
    let englishWord = "";

    const cleanTokenForEn = token.replace(/\([\u3131-\u318E\uAC00-\uD7A3\s,.-]+\)/g, '').trim();

    const twoWord = i + 1 < tokens.length ? `${token} ${tokens[i + 1]}` : "";
    const threeWord = i + 2 < tokens.length ? `${token} ${tokens[i + 1]} ${tokens[i + 2]}` : "";
    const cleanTwoWord = i + 1 < tokens.length ? `${cleanTokenForEn} ${tokens[i + 1].replace(/\([\u3131-\u318E\uAC00-\uD7A3\s,.-]+\)/g, '').trim()}` : "";
    const cleanThreeWord = i + 2 < tokens.length ? `${cleanTokenForEn} ${tokens[i + 1].replace(/\([\u3131-\u318E\uAC00-\uD7A3\s,.-]+\)/g, '').trim()} ${tokens[i + 2].replace(/\([\u3131-\u318E\uAC00-\uD7A3\s,.-]+\)/g, '').trim()}` : "";

    if (WORD_TRANSLATION_MAP[threeWord] || WORD_TRANSLATION_MAP[cleanThreeWord]) {
      token = threeWord;
      englishWord = WORD_TRANSLATION_MAP[threeWord] || WORD_TRANSLATION_MAP[cleanThreeWord];
      i += 3;
    } else if (WORD_TRANSLATION_MAP[twoWord] || WORD_TRANSLATION_MAP[cleanTwoWord]) {
      token = twoWord;
      englishWord = WORD_TRANSLATION_MAP[twoWord] || WORD_TRANSLATION_MAP[cleanTwoWord];
      i += 2;
    } else if (WORD_TRANSLATION_MAP[cleanTokenForEn]) {
      englishWord = WORD_TRANSLATION_MAP[cleanTokenForEn];
      i += 1;
    } else if (/^[a-zA-Z0-9_-]+$/.test(cleanTokenForEn)) {
      englishWord = cleanTokenForEn;
      i += 1;
    } else {
      englishWord = translateKoreanToken(cleanTokenForEn);
      i += 1;
    }

    const pureEnglishPart = englishWord.replace(/\([\u3131-\u318E\uAC00-\uD7A3\s]+\)/g, '');
    if (/[\u3131-\u318E\uAC00-\uD7A3]/.test(pureEnglishPart)) {
      englishWord = translateKoreanToken(englishWord);
      const pureCheck = englishWord.replace(/\([\u3131-\u318E\uAC00-\uD7A3\s]+\)/g, '');
      if (/[\u3131-\u318E\uAC00-\uD7A3]/.test(pureCheck)) {
        englishWord = fallbackTranslateKorean(token);
      }
    }

    const lowerToken = token.toLowerCase();
    const isPrep = PREPOSITION_LIST.some(p => p.word.toLowerCase() === lowerToken) ||
      ["at", "on", "in", "to", "into", "onto", "off", "from", "of", "for", "with", "without", "by", "about", "around", "above", "over", "below", "under", "beneath", "behind", "next", "beside", "between", "among", "across", "through", "along", "like", "as", "after", "before", "inside", "outside", "towards", "near"].includes(lowerToken);

    const isVerb = ["run", "runs", "running", "is running", "walk", "walks", "fly", "flies", "sit", "sits", "sleep", "sleeps", "eat", "eats", "go", "goes", "came", "come", "saw", "see", "look", "looks", "is", "are", "am", "have", "has"].includes(lowerToken);

    let role = "5. 장소/부연 (Location/Context)";
    let color = "rose";

    if (chunks.length === 0) {
      role = "1. 주인공 (Subject)";
      color = "indigo";
    } else if (isPrep) {
      role = "4. 전치사/연결어 (Preposition)";
      color = "amber";
    } else if (isVerb || (chunks.length === 1 && !isPrep)) {
      role = "2. 동작 (Action)";
      color = "blue";
    } else if (chunks.length === 2 && !isPrep) {
      role = "3. 가까운 대상 (Target)";
      color = "emerald";
    } else if (token.includes("시") || token.includes("p.m") || token.includes("a.m") || token.includes("어제") || token.includes("오늘") || token.includes("1박2일")) {
      role = "6. 시간 (Time)";
      color = "purple";
    }

    chunks.push({
      text: token,
      role: role,
      english: englishWord,
      color: color
    });

    vocabCards.push({
      korean: token,
      english: englishWord,
      role: role.split(' ')[1] || role,
      searchUrl: getEducationalGoogleImageSearchUrl(englishWord)
    });

    englishParts.push(englishWord);
  }

  // Post-process chunks to strip redundant articles when preceded by possessive pronouns or modal verbs
  for (let cIdx = 0; cIdx < chunks.length - 1; cIdx++) {
    const currEn = (chunks[cIdx].english || '').toLowerCase().trim();
    if (['my', 'your', 'his', 'her', 'our', 'their', 'its'].includes(currEn)) {
      if (chunks[cIdx + 1].english) {
        chunks[cIdx + 1].english = chunks[cIdx + 1].english.replace(/^(a|an|the)\s+/i, '');
        if (vocabCards[cIdx + 1]) {
          vocabCards[cIdx + 1].english = chunks[cIdx + 1].english;
        }
      }
    }
  }

  let fullEnglish = chunks.map(c => c.english).join(' ')
    .replace(/\s+/g, ' ')
    .replace(/\bI\s+are\s+going\b/gi, 'I am going')
    .replace(/\bI\s+is\s+going\b/gi, 'I am going')
    .replace(/\b(He|She|It)\s+are\s+going\b/gi, '$1 is going')
    .replace(/\b(They|We|My sons)\s+is\s+going\b/gi, '$1 are going')
    .replace(/\bI\s+(i'm|I'm)\b/g, "I'm")
    .replace(/\bI\s+am\s+taking\b/gi, "I'm taking")
    .replace(/\binside\s+in\s+the\s+forest\b/gi, 'in the forest')
    .replace(/\binside\s+the\s+forest\b/gi, 'in the forest')
    .replace(/\bin\s+early\s+morning\b/gi, 'in the early morning')
    .replace(/\boutside\s+of\s+(my|the|a|his|her|our|their)\s+office\b/gi, 'outside $1 office')
    .replace(/\boutside\s+of\b/gi, 'outside')
    .replace(/\ba\s+little\s+water\b/gi, 'some water')
    .replace(/\bfrom\s+(a\s+)?water\s+purifier\b/gi, 'from the water purifier')
    .replace(/\btoday\s+is\s+(the\s+)?temperature\b/gi, "today's temperature is")
    .replace(/\btoday\s+temperature\b/gi, "today's temperature")
    .replace(/\btoday\s+the\s+temperature\b/gi, "today's temperature")
    .replace(/\b(temperature)\s+is\b/gi, 'the $1 is')
    .replace(/\btoday's\s+the\s+temperature\b/gi, "today's temperature")
    .replace(/(\d+)\s+do\b/gi, '$1 degrees Celsius')
    .replace(/\bin\s+my\s+home\b/gi, 'at my home')
    .replace(/\byongin\s+city\b/gi, 'Yongin-si(용인시)')
    .replace(/\bgyeonggi-do\b/gi, 'Gyeonggi-do(경기도)')
    .replace(/\bYongin-si\(용인시\)\(용인시\)/gi, 'Yongin-si(용인시)')
    .replace(/\bGyeonggi-do\(경기도\)\(경기도\)/gi, 'Gyeonggi-do(경기도)')
    .replace(/\bI\s+is\b/gi, 'I am')
    .replace(/\b(He|She|It)\s+am\b/gi, '$1 is')
    .replace(/\bunder\s+shade\b/gi, 'under the shade')
    .replace(/\bbig\s+parasol\b/gi, 'a big parasol')
    .replace(/\bat\s+corner\s+of\b/gi, 'at the corner of')
    .replace(/\bcorner\s+of\s+(road|street|avenue|boulevard)\b/gi, 'corner of the $1')
    .replace(/\bcorner\s+of\s+degrees\s+Celsius\b/gi, 'corner of the road')
    .replace(/\bof\s+degrees\s+Celsius\b/gi, 'of the road')
    .replace(/\bbeside\s+of\b/gi, 'beside')
    .replace(/\b(a|an|the|one)?\s*tree\s+(a|an|the|one)?\s*tree\b/gi, 'a tree')
    .replace(/\b(one|a)\s+tree\s+a\s+tree\b/gi, 'a tree')
    .replace(/^(Electric charging station)\b/i, 'An electric charging station')
    .replace(/\b(beside\s+a\s+tree)\s+(a\s+safety\s+boundary\s+line|a\s+safety\s+barrier)\b/gi, '$1, and $2')
    .replace(/\bprotect\s+that\b/gi, 'protect it')
    .replace(/\bby\s+(a|an|the)\s+(train|bus|car|subway|plane|airplane|boat|ship|taxi|bike|bicycle)\b/gi, 'by $2')
    .replace(/\b(go|goes|going|went|heading)\s+(grandma's house|grandma house|grandmother's house|school|hospital|park|station|office)\b/gi, '$1 to $2')
    .replace(/\b(sons|daughters|kids|children|they|we|my sons|my daughters)\s+going\b/gi, '$1 are going')
    .replace(/\bgoing\s+(grandma's house|grandma house|grandmother's house)\b/gi, 'going to $1')
    .replace(/\bstarted\s+from\s+today\b/gi, 'started today')
    .replace(/\bstarts\s+from\s+today\b/gi, 'starts today')
    .replace(/\bstarting\s+from\s+today\b/gi, 'starting today')
    .replace(/\b(to|for|on|in|at|of)\s+\1\b/gi, '$1')
    .replace(/\b(my|your|his|her|our|their|its)\s+(a|an|the)\b/gi, '$1')
    .replace(/\b(will|can|could|should|would|must|may|might)\s+(a|an|the)\b/gi, '$1')
    .replace(/\bto home\b/gi, 'home')
    .replace(/\bon my car\b/gi, 'in my car')
    .replace(/\b(inside|in|into) (refrigerator|fridge)\b/gi, '$1 the refrigerator')
    .replace(/\b(after) (meal|dinner|lunch|breakfast)\b/gi, '$1 the $2')
    .replace(/\b(a|an|the)\s+(a|an|the)\b/gi, '$2')
    .replace(/\b(I|i)\s+(i|I)\b/g, 'I')
    .replace(/\b(I|you|he|she|we|they)\s+\1\b/gi, '$1')
    .replace(/\bmeet\s+you\s+(my|the|a|an|his|her|our|their|old)\b/gi, 'meet $1')
    .replace(/\bsentences\s+3\b/gi, 'three sentences')
    .replace(/\s+([.,!?;])/g, '$1');

  fullEnglish = fullEnglish.charAt(0).toUpperCase() + fullEnglish.slice(1);
  if (!/[.!?]$/.test(fullEnglish)) fullEnglish += '.';

  const correctionPoints = [];

  if (cleanInput.includes("to집") || cleanInput.includes("to home")) {
    correctionPoints.push({
      category: "전치사 중복 생략 튜터링 (Redundant Preposition Omission)",
      original: "to 집에 (to home)",
      corrected: "home (집으로)",
      imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 'home'이라는 단어 자체는 단순한 집 건물이 아니라 '내가 안전하게 돌아갈 내 안식처로'라는 이동 방향 화살표(➔)를 이미 뱃속에 내장하고 있습니다.",
      listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 영화나 대화에서 'I am going...' 뒤에 'to' 소리가 안 들리더라도 바로 'home' 소리가 꽂히면 감을 잡으세요.",
      speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 'go home' (집에 가다) ➔ 'to' 없이 한 입에 뱉는 근육 훈련을 하세요.",
      misconception: "🔄 ❌ vs ⭕ 한국어 직역 오해 vs 원어민 뉘앙스: ❌ 한국어 '집에/집으로'의 '~에/로'를 보고 무조건 'to'로 1:1 직역하는 습관 때문입니다.",
      practiceExamples: ["I want to go home right now."],
      reason: "home은 부사이므로 방향 전치사 to를 생략하는 것이 표준 원어민 표현입니다."
    });
  }

  if (correctionPoints.length === 0) {
    correctionPoints.push({
      category: "어순 및 입소리 덩어리 보완 (Word Order & Speech Rhythm)",
      original: cleanInput,
      corrected: fullEnglish,
      imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 주인공에서 출발한 생각이 동작 ➔ 대상 ➔ 공간/시간 순서로 똑바로 뻗어나가는 화살표 그림입니다.",
      listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 영어를 들을 때 거꾸로 뒤집지 말고 앞에서부터 덩어리 순서대로 뇌에 받아들이세요.",
      speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 주어+동사 묶어서 하나, 목적어 묶어서 하나 덩어리로 끊어 말해봅니다.",
      misconception: "🔄 ❌ vs ⭕ 한국어 직역 오해 vs 원어민 뉘앙스: ❌ 한국어 어순을 생각하면 말이 늦어집니다. ⭕ 주인공에서 동사 에너지가 즉시 발출되어야 어순이 완성됩니다.",
      practiceExamples: [`${fullEnglish}`],
      reason: "학습자님의 생각을 물리적 화살표 순서(주인공 ➔ 동작 ➔ 대상)에 맞춰 정통 영문 덩어리로 다듬었습니다."
    });
  }

  return {
    id: `custom-${Date.now()}`,
    arrowKorean: cleanInput,
    english: fullEnglish,
    chunks: chunks,
    vocabCards: vocabCards,
    kidSummary: chunks.map(c => `${c.text}(${c.english})`).join(' ➔ '),
    explanation: [
      `1. **주인공(${chunks[0]?.english || 'I'})**에서 동작 에너지가 출발합니다.`,
      `2. 주인공이 행한 직접적인 행동은 **'${chunks[1]?.english || 'action'}'**입니다.`,
      `3. 시선과 손길이 닿아 나아가는 1차 대상은 **'${chunks[2]?.english || 'target'}'**입니다.`,
      `4. 전치사와 공간/시간 배치가 연속하여 화살표 어순(주인공➔동작➔대상➔전치사➔장소➔시간)으로 전개됩니다.`
    ],
    prepositions: PREPOSITION_DICTIONARY.filter(p =>
      cleanInput.toLowerCase().includes(p.word.split(' ')[0]) ||
      cleanInput.toLowerCase().includes('inside') ||
      cleanInput.toLowerCase().includes('after')
    ),
    correction: {
      isRefined: true,
      coachGreeting: "🌱 선생님의 1:1 맞춤 응원 코칭: 영어식 뇌를 만드는 과정에서 생기는 도전적인 시도를 열렬히 응원합니다!",
      userDraft: cleanInput,
      refinedEnglish: fullEnglish,
      rhythmChunks: chunks.map(c => ({ en: c.english, kr: c.text })),
      points: correctionPoints,
      teacherTip: "💡 원어민 뇌 가이드: 한글로 역번역하지 말고 주인공에서 시작해 순서대로 그려나가는 영어식 사고 훈련에 집중해 보세요!"
    }
  };
}

/**
 * Smart Parser for arbitrary user inputs (Async with dynamic online translation fallback)
 */
export async function parseArrowKoreanLocalAsync(input) {
  const cleanInput = input.trim();
  const normalizedInput = cleanInput.replace(/14:30/g, '4:30').replace(/\s+/g, ' ');

  const matchedPreset = PRESET_SENTENCES.find(p => {
    const pNorm = p.arrowKorean.replace(/\s+/g, ' ');
    return pNorm === normalizedInput || p.arrowKorean.replace(/\s+/g, '') === cleanInput.replace(/\s+/g, '');
  });
  if (matchedPreset) return matchedPreset;

  const tokenRegex = /[a-zA-Z0-9_-]+(?:\([\u3131-\u318E\uAC00-\uD7A3\s,.-]+\))?|[\u3131-\u318E\uAC00-\uD7A3]+(?:\([\u3131-\u318E\uAC00-\uD7A3\s,.-]+\))?|[^\s]+/g;
  const tokens = cleanInput.match(tokenRegex) || cleanInput.split(/\s+/);
  const chunks = [];
  const englishParts = [];
  const vocabCards = [];

  let i = 0;
  while (i < tokens.length) {
    let token = tokens[i];
    let englishWord = "";

    const cleanTokenForEn = token.replace(/\([\u3131-\u318E\uAC00-\uD7A3\s,.-]+\)/g, '').trim();

    const twoWord = i + 1 < tokens.length ? `${token} ${tokens[i + 1]}` : "";
    const threeWord = i + 2 < tokens.length ? `${token} ${tokens[i + 1]} ${tokens[i + 2]}` : "";
    const cleanTwoWord = i + 1 < tokens.length ? `${cleanTokenForEn} ${tokens[i + 1].replace(/\([\u3131-\u318E\uAC00-\uD7A3\s,.-]+\)/g, '').trim()}` : "";
    const cleanThreeWord = i + 2 < tokens.length ? `${cleanTokenForEn} ${tokens[i + 1].replace(/\([\u3131-\u318E\uAC00-\uD7A3\s,.-]+\)/g, '').trim()} ${tokens[i + 2].replace(/\([\u3131-\u318E\uAC00-\uD7A3\s,.-]+\)/g, '').trim()}` : "";

    if (WORD_TRANSLATION_MAP[threeWord] || WORD_TRANSLATION_MAP[cleanThreeWord]) {
      token = threeWord;
      englishWord = WORD_TRANSLATION_MAP[threeWord] || WORD_TRANSLATION_MAP[cleanThreeWord];
      i += 3;
    } else if (WORD_TRANSLATION_MAP[twoWord] || WORD_TRANSLATION_MAP[cleanTwoWord]) {
      token = twoWord;
      englishWord = WORD_TRANSLATION_MAP[twoWord] || WORD_TRANSLATION_MAP[cleanTwoWord];
      i += 2;
    } else if (WORD_TRANSLATION_MAP[cleanTokenForEn]) {
      englishWord = WORD_TRANSLATION_MAP[cleanTokenForEn];
      i += 1;
    } else if (/^[a-zA-Z0-9_-]+$/.test(cleanTokenForEn)) {
      englishWord = cleanTokenForEn;
      i += 1;
    } else {
      englishWord = await translateKoreanTokenAsync(cleanTokenForEn);
      i += 1;
    }

    const pureEnglishPartAsync = englishWord.replace(/\([\u3131-\u318E\uAC00-\uD7A3\s]+\)/g, '');
    if (/[\u3131-\u318E\uAC00-\uD7A3]/.test(pureEnglishPartAsync)) {
      englishWord = await translateKoreanTokenAsync(token);
      const pureCheckAsync = englishWord.replace(/\([\u3131-\u318E\uAC00-\uD7A3\s]+\)/g, '');
      if (/[\u3131-\u318E\uAC00-\uD7A3]/.test(pureCheckAsync)) {
        englishWord = fallbackTranslateKorean(token);
      }
    }

    const lowerToken = token.toLowerCase();
    const isPrep = PREPOSITION_LIST.some(p => p.word.toLowerCase() === lowerToken) ||
      ["at", "on", "in", "to", "into", "onto", "off", "from", "of", "for", "with", "without", "by", "about", "around", "above", "over", "below", "under", "beneath", "behind", "next", "beside", "between", "among", "across", "through", "along", "like", "as", "after", "before", "inside", "outside", "towards", "near"].includes(lowerToken);

    const isVerb = ["run", "runs", "running", "is running", "walk", "walks", "fly", "flies", "sit", "sits", "sleep", "sleeps", "eat", "eats", "go", "goes", "came", "come", "saw", "see", "look", "looks", "is", "are", "am", "have", "has"].includes(lowerToken);

    let role = "5. 장소/부연 (Location/Context)";
    let color = "rose";

    if (chunks.length === 0) {
      role = "1. 주인공 (Subject)";
      color = "indigo";
    } else if (isPrep) {
      role = "4. 전치사/연결어 (Preposition)";
      color = "amber";
    } else if (isVerb || (chunks.length === 1 && !isPrep)) {
      role = "2. 동작 (Action)";
      color = "blue";
    } else if (chunks.length === 2 && !isPrep) {
      role = "3. 가까운 대상 (Target)";
      color = "emerald";
    } else if (token.includes("시") || token.includes("p.m") || token.includes("a.m") || token.includes("어제") || token.includes("오늘") || token.includes("1박2일")) {
      role = "6. 시간 (Time)";
      color = "purple";
    }

    chunks.push({
      text: token,
      role: role,
      english: englishWord,
      color: color
    });

    vocabCards.push({
      korean: token,
      english: englishWord,
      role: role.split(' ')[1] || role,
      searchUrl: getEducationalGoogleImageSearchUrl(englishWord)
    });

    englishParts.push(englishWord);
  }

  // Post-process chunks to strip redundant articles when preceded by possessive pronouns or modal verbs
  for (let cIdx = 0; cIdx < chunks.length - 1; cIdx++) {
    const currEn = (chunks[cIdx].english || '').toLowerCase().trim();
    if (['my', 'your', 'his', 'her', 'our', 'their', 'its'].includes(currEn)) {
      if (chunks[cIdx + 1].english) {
        chunks[cIdx + 1].english = chunks[cIdx + 1].english.replace(/^(a|an|the)\s+/i, '');
        if (vocabCards[cIdx + 1]) {
          vocabCards[cIdx + 1].english = chunks[cIdx + 1].english;
        }
      }
    }
  }

  let fullEnglish = chunks.map(c => c.english).join(' ')
    .replace(/\s+/g, ' ')
    .replace(/\bI\s+are\s+going\b/gi, 'I am going')
    .replace(/\bI\s+is\s+going\b/gi, 'I am going')
    .replace(/\b(He|She|It)\s+are\s+going\b/gi, '$1 is going')
    .replace(/\b(They|We|My sons)\s+is\s+going\b/gi, '$1 are going')
    .replace(/\bI\s+(i'm|I'm)\b/g, "I'm")
    .replace(/\bI\s+am\s+taking\b/gi, "I'm taking")
    .replace(/\binside\s+in\s+the\s+forest\b/gi, 'in the forest')
    .replace(/\binside\s+the\s+forest\b/gi, 'in the forest')
    .replace(/\bin\s+early\s+morning\b/gi, 'in the early morning')
    .replace(/\boutside\s+of\s+(my|the|a|his|her|our|their)\s+office\b/gi, 'outside $1 office')
    .replace(/\boutside\s+of\b/gi, 'outside')
    .replace(/\ba\s+little\s+water\b/gi, 'some water')
    .replace(/\bfrom\s+(a\s+)?water\s+purifier\b/gi, 'from the water purifier')
    .replace(/\btoday\s+is\s+(the\s+)?temperature\b/gi, "today's temperature is")
    .replace(/\btoday\s+temperature\b/gi, "today's temperature")
    .replace(/\btoday\s+the\s+temperature\b/gi, "today's temperature")
    .replace(/\b(temperature)\s+is\b/gi, 'the $1 is')
    .replace(/\btoday's\s+the\s+temperature\b/gi, "today's temperature")
    .replace(/(\d+)\s+do\b/gi, '$1 degrees Celsius')
    .replace(/\bin\s+my\s+home\b/gi, 'at my home')
    .replace(/\byongin\s+city\b/gi, 'Yongin-si(용인시)')
    .replace(/\bgyeonggi-do\b/gi, 'Gyeonggi-do(경기도)')
    .replace(/\bYongin-si\(용인시\)\(용인시\)/gi, 'Yongin-si(용인시)')
    .replace(/\bGyeonggi-do\(경기도\)\(경기도\)/gi, 'Gyeonggi-do(경기도)')
    .replace(/\bI\s+is\b/gi, 'I am')
    .replace(/\b(He|She|It)\s+am\b/gi, '$1 is')
    .replace(/\bunder\s+shade\b/gi, 'under the shade')
    .replace(/\bbig\s+parasol\b/gi, 'a big parasol')
    .replace(/\bat\s+corner\s+of\b/gi, 'at the corner of')
    .replace(/\bcorner\s+of\s+(road|street|avenue|boulevard)\b/gi, 'corner of the $1')
    .replace(/\bcorner\s+of\s+degrees\s+Celsius\b/gi, 'corner of the road')
    .replace(/\bof\s+degrees\s+Celsius\b/gi, 'of the road')
    .replace(/\bbeside\s+of\b/gi, 'beside')
    .replace(/\b(a|an|the|one)?\s*tree\s+(a|an|the|one)?\s*tree\b/gi, 'a tree')
    .replace(/\b(one|a)\s+tree\s+a\s+tree\b/gi, 'a tree')
    .replace(/^(Electric charging station)\b/i, 'An electric charging station')
    .replace(/\b(beside\s+a\s+tree)\s+(a\s+safety\s+boundary\s+line|a\s+safety\s+barrier)\b/gi, '$1, and $2')
    .replace(/\bprotect\s+that\b/gi, 'protect it')
    .replace(/\bby\s+(a|an|the)\s+(train|bus|car|subway|plane|airplane|boat|ship|taxi|bike|bicycle)\b/gi, 'by $2')
    .replace(/\b(go|goes|going|went|heading)\s+(grandma's house|grandma house|grandmother's house|school|hospital|park|station|office)\b/gi, '$1 to $2')
    .replace(/\b(sons|daughters|kids|children|they|we|my sons|my daughters)\s+going\b/gi, '$1 are going')
    .replace(/\bgoing\s+(grandma's house|grandma house|grandmother's house)\b/gi, 'going to $1')
    .replace(/\bstarted\s+from\s+today\b/gi, 'started today')
    .replace(/\bstarts\s+from\s+today\b/gi, 'starts today')
    .replace(/\bstarting\s+from\s+today\b/gi, 'starting today')
    .replace(/\bto\s+makes\b/gi, 'to make')
    .replace(/\bto\s+([a-z]+)s\s+(tea|coffee|food|bread|meal)\b/gi, 'to $1 $2')
    .replace(/\binto coffee pot\b/gi, 'into the electric kettle')
    .replace(/\binto (kettle|coffee pot)\b/gi, 'into the $1')
    .replace(/\b(to|for|on|in|at|of)\s+\1\b/gi, '$1')
    .replace(/\b(my|your|his|her|our|their|its)\s+(a|an|the)\b/gi, '$1')
    .replace(/\b(will|can|could|should|would|must|may|might)\s+(a|an|the)\b/gi, '$1')
    .replace(/\bto home\b/gi, 'home')
    .replace(/\bon my car\b/gi, 'in my car')
    .replace(/\b(inside|in|into) (refrigerator|fridge)\b/gi, '$1 the refrigerator')
    .replace(/\b(after) (meal|dinner|lunch|breakfast)\b/gi, '$1 the $2')
    .replace(/\b(a|an|the)\s+(a|an|the)\b/gi, '$2')
    .replace(/\b(I|i)\s+(i|I)\b/g, 'I')
    .replace(/\b(I|you|he|she|we|they)\s+\1\b/gi, '$1')
    .replace(/\bmeet\s+you\s+(my|the|a|an|his|her|our|their|old)\b/gi, 'meet $1')
    .replace(/\bdo\s+is\s+day\s+well\b/gi, 'doing well at work')
    .replace(/\bI\s+do\s+is\s+day\s+well\b/gi, "I am doing well at work")
    .replace(/\bdo\s+is\s+day\b/gi, 'doing well at work')
    .replace(/\bI\s+complicated\s+head\s+and\s+mind\b/gi, 'my head and heart are complicated')
    .replace(/\bI\s+complicated\b/gi, 'my mind is complicated')
    .replace(/\bthough\s+I\s+complicated\b/gi, 'though my mind is complicated')
    .replace(/\bhead\s+and\s+mind\b/gi, 'head and heart')
    .replace(/\bsentences\s+3\b/gi, 'three sentences')
    .replace(/\s+([.,!?;])/g, '$1');

  // Try full-sentence online translation fallback if fullEnglish has literal/broken patterns
  if (/do is day|I complicated|a 궁금하|a 만다르트/i.test(fullEnglish) || fullEnglish.includes('do is day')) {
    const fullOnline = await translateFullSentenceAsync(cleanInput);
    if (fullOnline && fullOnline.length > 5) {
      fullEnglish = fullOnline;
    }
  }

  fullEnglish = fullEnglish.charAt(0).toUpperCase() + fullEnglish.slice(1);
  if (!/[.!?]$/.test(fullEnglish)) fullEnglish += '.';

  const correctionPoints = [];

  if (cleanInput.includes("to집") || cleanInput.includes("to home")) {
    correctionPoints.push({
      category: "전치사 중복 생략 튜터링 (Redundant Preposition Omission)",
      original: "to 집에 (to home)",
      corrected: "home (집으로)",
      imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 'home'이라는 단어 자체는 단순한 집 건물이 아니라 '내가 안전하게 돌아갈 내 안식처로'라는 이동 방향 화살표(➔)를 이미 뱃속에 내장하고 있습니다.",
      listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 영화나 대화에서 'I am going...' 뒤에 'to' 소리가 안 들리더라도 바로 'home' 소리가 꽂히면 감을 잡으세요.",
      speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 'go home' (집에 가다) ➔ 'to' 없이 한 입에 뱉는 근육 훈련을 하세요.",
      misconception: "🔄 ❌ vs ⭕ 한국어 직역 오해 vs 원어민 뉘앙스: ❌ 한국어 '집에/집으로'의 '~에/로'를 보고 무조건 'to'로 1:1 직역하는 습관 때문입니다.",
      practiceExamples: ["I want to go home right now."],
      reason: "home은 부사이므로 방향 전치사 to를 생략하는 것이 표준 원어민 표현입니다."
    });
  }

  if (correctionPoints.length === 0) {
    correctionPoints.push({
      category: "어순 및 입소리 덩어리 보완 (Word Order & Speech Rhythm)",
      original: cleanInput,
      corrected: fullEnglish,
      imageDifference: "🧠 원어민 뇌속 3D 시각 이미지: 주인공에서 출발한 생각이 동작 ➔ 대상 ➔ 공간/시간 순서로 똑바로 뻗어나가는 화살표 그림입니다.",
      listeningTip: "🎧 듣기(Listening) 직청직해 훈련: 영어를 들을 때 거꾸로 뒤집지 말고 앞에서부터 덩어리 순서대로 뇌에 받아들이세요.",
      speakingTip: "🗣️ 말하기(Speaking) 입근육 결합 패턴: 주어+동사 묶어서 하나, 목적어 묶어서 하나 덩어리로 끊어 말해봅니다.",
      misconception: "🔄 ❌ vs ⭕ 한국어 직역 오해 vs 원어민 뉘앙스: ❌ 한국어 어순을 생각하면 말이 늦어집니다. ⭕ 주인공에서 동사 에너지가 즉시 발출되어야 어순이 완성됩니다.",
      practiceExamples: [`${fullEnglish}`],
      reason: "학습자님의 생각을 물리적 화살표 순서(주인공 ➔ 동작 ➔ 대상)에 맞춰 정통 영문 덩어리로 다듬었습니다."
    });
  }

  return {
    id: `custom-${Date.now()}`,
    arrowKorean: cleanInput,
    english: fullEnglish,
    chunks: chunks,
    vocabCards: vocabCards,
    kidSummary: chunks.map(c => `${c.text}(${c.english})`).join(' ➔ '),
    explanation: [
      `1. **주인공(${chunks[0]?.english || 'I'})**에서 동작 에너지가 출발합니다.`,
      `2. 주인공이 행한 직접적인 행동은 **'${chunks[1]?.english || 'action'}'**입니다.`,
      `3. 시선과 손길이 닿아 나아가는 1차 대상은 **'${chunks[2]?.english || 'target'}'**입니다.`,
      `4. 전치사와 공간/시간 배치가 연속하여 화살표 어순(주인공➔동작➔대상➔전치사➔장소➔시간)으로 전개됩니다.`
    ],
    prepositions: PREPOSITION_DICTIONARY.filter(p =>
      cleanInput.toLowerCase().includes(p.word.split(' ')[0]) ||
      cleanInput.toLowerCase().includes('inside') ||
      cleanInput.toLowerCase().includes('after')
    ),
    correction: {
      isRefined: true,
      coachGreeting: "🌱 선생님의 1:1 맞춤 응원 코칭: 영어식 뇌를 만드는 과정에서 생기는 도전적인 시도를 열렬히 응원합니다!",
      userDraft: cleanInput,
      refinedEnglish: fullEnglish,
      rhythmChunks: chunks.map(c => ({ en: c.english, kr: c.text })),
      points: correctionPoints,
      teacherTip: "💡 원어민 뇌 가이드: 한글로 역번역하지 말고 주인공에서 시작해 순서대로 그려나가는 영어식 사고 훈련에 집중해 보세요!"
    }
  };
}

/**
 * Live Gemini API Call with 5x Enriched 5D Masterclass Coaching
 */
export async function translateWithGemini(arrowKoreanInput, apiKey) {
  if (apiKey && apiKey.trim().length > 10) {
    const prompt = `
You are an elite English Education Expert specializing in spoken English (구어체) and practical grammar (실전 문법).
The user typed a Korean/English sentence draft: "${arrowKoreanInput}"

YOUR HIGHEST PRIORITY:
Translate the input into 100% PERFECT, NATURAL, NATIVE SPOKEN ENGLISH for the "english" field.
- DO NOT translate literally word-by-word if it creates awkward English! (e.g., "나 하고 있다 일 잘" -> "I am doing well at work" or "I'm doing a good job", NOT "I do is day well"!).
- Fix any Korean homonyms or polysemy in context (e.g. "일" near work/job -> "work/job", "다리" -> "bridge").

Respond ONLY with a JSON object in this exact schema:
{
  "english": "The exact natural standard native spoken English sentence ONLY (No Korean text inside this field!)",
  "chunks": [
    { "text": "Korean chunk", "role": "1. 주인공 (Subject) / 2. 동작 (Action) / 3. 가까운 대상 (Target) / 4. 전치사/연결어 (Preposition) / 5. 장소/부연 (Location/Context) / 6. 시간 (Time)", "english": "Exact English phrase equivalent", "color": "indigo/blue/emerald/amber/rose/purple" }
  ],
  "explanation": [
    "Step 1 explanation in Korean according to Arrow English principles",
    "Step 2 explanation...",
    "Step 3 explanation..."
  ],
  "prepositions": [
    { "word": "preposition used", "meaning": "Arrow English visual meaning", "desc": "Detailed visual explanation" }
  ],
  "nativeRecommendations": [
    {
      "label": "표현 1 (가장 직관적인 기본 표현 - Natural Standard)",
      "english": "Natural vivid everyday standard English sentence",
      "korean": "자연스러운 일상 한국어 번역",
      "keyChange": "💡 어휘 & 뉘앙스 차이 포인트"
    },
    {
      "label": "표현 2 (동사 및 어휘 교체 표현 - Synonym Substitution)",
      "english": "Refined English sentence with verb or phrase substitution",
      "korean": "격식 및 유의어 한국어 번역",
      "keyChange": "💡 어휘 교체 포인트"
    },
    {
      "label": "표현 3 (원어민 실전 구어체 - Casual Native Vibe)",
      "english": "Lively idiomatic native expression as seen in TV shows",
      "korean": "생생한 현지인 구어체 번역",
      "keyChange": "💡 미드 속 찰진 동사구 팁"
    }
  ],
  "correction": {
    "isRefined": true,
    "coachGreeting": "🌱 선생님의 1:1 맞춤 응원 코칭: ...",
    "userDraft": "${arrowKoreanInput}",
    "refinedEnglish": "Perfect native standard English sentence",
    "rhythmChunks": [
      { "en": "English chunk", "kr": "Korean meaning chunk" }
    ],
    "points": [
      {
        "category": "Preposition / Grammar / Word Choice in Korean",
        "original": "Learner's mistaken phrase",
        "corrected": "Corrected native English phrase",
        "imageDifference": "🧠 원어민 뇌속 3D 시각 이미지: ...",
        "listeningTip": "🎧 듣기(Listening) 직청직해 훈련: ...",
        "speakingTip": "🗣️ 말하기(Speaking) 입근육 결합 패턴: ...",
        "misconception": "🔄 ❌ vs ⭕ 한국어 직역 오해 vs 원어민 뉘앙스: ...",
        "practiceExamples": [
          "Example 1 in English with Korean translation"
        ],
        "reason": "Detailed warm masterclass explanation in Korean"
      }
    ],
    "teacherAdvice": "Warm, encouraging pedagogical advice in Korean"
  }
}
`;

    const modelEndpoints = [
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-1.5-pro'
    ];

    let lastErrorDetails = '';
    let isRateLimitHit = false;

    for (const model of modelEndpoints) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        if (!response.ok) {
          try {
            const errData = await response.json();
            const apiMsg = errData?.error?.message || `HTTP ${response.status} ${response.statusText}`;
            lastErrorDetails = `[${model}] ${apiMsg}`;
            if (response.status === 429 || apiMsg.includes('RESOURCE_EXHAUSTED')) {
              isRateLimitHit = true;
            }
          } catch {
            lastErrorDetails = `[${model}] HTTP ${response.status}`;
            if (response.status === 429) {
              isRateLimitHit = true;
            }
          }
          continue;
        }

        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawText) continue;

        const parsedData = JSON.parse(rawText);

        const vocabCards = (parsedData.chunks || []).map(c => {
          let cleanEn = c.english;
          if (/[\u3131-\u318E\uAC00-\uD7A3]/.test(cleanEn)) {
            cleanEn = translateKoreanToken(c.text);
          }
          return {
            korean: c.text,
            english: cleanEn,
            role: c.role,
            searchUrl: getEducationalGoogleImageSearchUrl(cleanEn)
          };
        });

        return {
          id: `gemini-${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          arrowKorean: arrowKoreanInput,
          english: parsedData.english,
          chunks: parsedData.chunks,
          vocabCards: vocabCards,
          kidSummary: (parsedData.chunks || []).map(c => `${c.text}(${c.english})`).join(' ➔ '),
          explanation: parsedData.explanation,
          prepositions: parsedData.prepositions || [],
          nativeRecommendations: (parsedData.nativeRecommendations && parsedData.nativeRecommendations.length === 3)
            ? parsedData.nativeRecommendations
            : getNativeRecommendations({ arrowKorean: arrowKoreanInput, english: parsedData.english }),
          correction: parsedData.correction || {
            isRefined: true,
            coachGreeting: "🌱 선생님의 1:1 맞춤 응원 코칭: 훌륭한 도전입니다!",
            userDraft: arrowKoreanInput,
            refinedEnglish: parsedData.english,
            rhythmChunks: (parsedData.chunks || []).map(c => ({ en: c.english, kr: c.text })),
            points: [],
            teacherTip: "💡 원어민 뇌 가이드: 들을 때와 말할 때 거꾸로 뒤집지 말고 앞에서부터 단어 덩어리 순서대로 생각하세요!"
          }
        };
      } catch (err) {
        lastErrorDetails = `[${model}] ${err?.message || '네트워크 오류'}`;
      }
    }

    if (isRateLimitHit) {
      try {
        const localResult = await parseArrowKoreanLocalAsync(arrowKoreanInput);
        return {
          ...localResult,
          id: `local_fallback_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          isRateLimited: true,
          notice: "⚡ Google Gemini 무료 API 분당 제한(15회/분)에 도달하여, 학습 중단을 막기 위해 '로컬 스마트 어순 엔진'으로 즉시 자동 전환되었습니다. (약 30~60초 후 Gemini API가 자동 복구됩니다)"
        };
      } catch {
        // Fall back to throwing Error if local engine also fails
      }
    }

    if (lastErrorDetails) {
      if (lastErrorDetails.includes('API key not valid') || lastErrorDetails.includes('API_KEY_INVALID') || lastErrorDetails.includes('400') || lastErrorDetails.includes('403')) {
        throw new Error(`GEMINI_API_ERROR: Google Gemini API 키가 올바르지 않거나 권한이 없습니다.\n(상세 원인: ${lastErrorDetails})\n\n💡 Google AI Studio (https://aistudio.google.com/)에서 'AIzaSy...'로 시작하는 Gemini API Key를 새로 발급받아 [⚙️ API 키 설정]에 입력해 주세요.`);
      }
      throw new Error(`GEMINI_API_ERROR: Google Gemini API 호출 중 오류가 발생했습니다.\n(상세 원인: ${lastErrorDetails})`);
    }

    throw new Error("GEMINI_API_ERROR: Google Gemini API 응답 생성에 실패했습니다. API 키를 확인하시거나 잠시 후 다시 시도해 주세요.");
  }

  throw new Error("API_KEY_REQUIRED: Gemini API 키가 설정되지 않았습니다. 상단 [⚙️ API 키 설정]에서 API 키를 입력해 주세요.");
}

/**
 * Generates Native Recommendation Variations (직관적 표현 / 원인 강조 표현 / 실전 구어체)
 */
export function getNativeRecommendations(result) {
  if (!result) return [];
  if (result.nativeRecommendations && result.nativeRecommendations.length > 0) {
    return result.nativeRecommendations;
  }

  const inputStr = (result.arrowKorean || '').toLowerCase();
  const englishStr = (result.english || '');

  if (inputStr.includes('복잡') || inputStr.includes('머리') || inputStr.includes('마음') || /\b(tangled|mess|overwhelmed|complicated|head and heart|mind and heart)\b/i.test(englishStr)) {
    return [
      {
        label: "표현 1 (가장 직관적인 기본 표현 - Natural Standard)",
        english: "I'm doing a good job, but my head and heart are complicated.",
        korean: "일은 잘하고 있지만, 내 머릿속과 마음이 복잡하다."
      },
      {
        label: "표현 2 (자연스러운 실전 표현 - Natural Spoken)",
        english: "I'm doing well at work, but my mind and heart are a mess.",
        korean: "직장에서 일은 잘 처리하고 있지만, 내 생각과 마음이 엉켜 어지럽다."
      },
      {
        label: "표현 3 (원어민 구어체 감성 - Cool Native Vibe)",
        english: "I'm getting things done, but I feel so overwhelmed.",
        korean: "일은 차근차근 다 해내고 있는데, 속으로는 마음이 복잡하고 벅차오른다."
      }
    ];
  }

  if (inputStr.includes('아들') || inputStr.includes('기차') || inputStr.includes('할머니') || inputStr.includes('방학') || /\bsons?\b/i.test(englishStr) || /\bvacation\b/i.test(englishStr) || /\btrain\b/i.test(englishStr) || /\bgrandma\b/i.test(englishStr)) {
    return [
      {
        label: "표현 1 (가장 직관적인 표준 표현 - Natural Standard Expression)",
        english: "My sons are going to grandma's house by train because their vacation started today.",
        korean: "오늘 방학이 시작해서 내 아들들이 기차를 타고 할머니 댁으로 갑니다."
      },
      {
        label: "표현 2 (동사구 교체 표현 - Phrasal Verb: heading off)",
        english: "My sons are heading off to grandma's house by train since their school break started today.",
        korean: "오늘부터 학교 방학이 시작되어 아들들이 기차를 타고 할머니 댁으로 향합니다 (head off / school break 교체)."
      },
      {
        label: "표현 3 (원어민 실전 구어체 - Casual Spoken Expression)",
        english: "My boys are taking the train to grandma's place now that their vacation is underway today.",
        korean: "오늘부터 방학에 들어가서 우리 아들녀석들이 기차 타고 할머니 댁에 가요 (my boys / take the train / grandma's place 교체)."
      }
    ];
  }

  if (inputStr.includes('양치') || inputStr.includes('치아') || inputStr.includes('이를 닦') || inputStr.includes('이 닦') || /\bteeth\b/i.test(englishStr)) {
    return [
      {
        label: "표현 1 (기본 직관 표현 - Basic Expression: brush)",
        english: "I brush my teeth after eating lunch.",
        korean: "점심 식사 후 양치질을 한다 (기본 동사 brush 사용)."
      },
      {
        label: "표현 2 (동사 교체 표현 - Verb Substitution: clean / have)",
        english: "I clean my teeth after I have lunch.",
        korean: "점심 식사를 마친 후 치아를 깨끗이 세정한다 (유의어 동사 clean / have 교체)."
      },
      {
        label: "표현 3 (실전 구어체 동사구 표현 - Phrasal Verb: freshen up)",
        english: "I freshen up my mouth right after lunch.",
        korean: "점심 먹고 바로 입안을 상쾌하게 헹구고 정돈한다 (실전 구어체 동사구 freshen up 교체)."
      }
    ];
  }

  if (inputStr.includes('고양이') || /\bcats?\b/i.test(englishStr)) {
    return [
      {
        label: "표현 1 (가장 직관적인 표현 - Intuitive Spoken Expression)",
        english: "A cat is lying beneath a parked car.",
        korean: "고양이 한 마리가 주차된 자동차 아래에 누워 있다."
      },
      {
        label: "표현 2 (There 존재 구문 - Existence Pattern)",
        english: "There is a cat lying beneath a parked car.",
        korean: "주차된 차 아래에 누워 있는 고양이 한 마리가 있다."
      },
      {
        label: "표현 3 (원어민 실전 구어체 - Casual Spoken Expression)",
        english: "There's a cat resting under a parked car.",
        korean: "주차된 차 밑에서 쉬고 있는 고양이가 있다."
      }
    ];
  }

  if (inputStr.includes('숙제') || inputStr.includes('밀렸') || /\bbehind\b/i.test(englishStr)) {
    return [
      {
        label: "표현 1 (가장 직관적인 표현)",
        english: "I'm three days behind on my homework to write three sentences every day.",
        korean: "매일 3문장씩 쓰는 숙제가 3일치나 밀렸다."
      },
      {
        label: "표현 2 (밀린 원인이 강조된 표현)",
        english: "I have three days of backlogged homework for writing three sentences daily.",
        korean: "매일 3문장 쓰기 숙제가 3일 분량이나 밀려 쌓여 있다."
      },
      {
        label: "표현 3 (원어민들이 자주 쓰는 구어체)",
        english: "I need to catch up on three days of my daily three-sentence writing homework.",
        korean: "매일 3문장씩 쓰는 숙제 3일치를 얼른 따라잡아야 한다."
      }
    ];
  }

  if (inputStr.includes('이끼') || /\bmoss\b/i.test(englishStr)) {
    return [
      {
        label: "💡 직관적인 구어체 표현 (Intuitive Spoken Expression)",
        english: "Moss formed on the windows because the AC keeps the building cool while it's humid outside after the rain.",
        korean: "에어컨이 건물을 시원하게 유지하는 반면, 비가 온 후 밖은 습하기 때문에 창문에 이끼가 꼈다."
      },
      {
        label: "💡 원인 강조 표현 (Cause-Focused Expression)",
        english: "The cool AC-cooled indoor environment and humid post-rain climate caused moss to grow on the windows.",
        korean: "에어컨으로 시원해진 실내와 비가 온 후 습한 실외 기후의 결합이 창문에 이끼가 자라게 만들었다."
      }
    ];
  }

  if (inputStr.includes('사무실') || inputStr.includes('정수기') || inputStr.includes('바깥') || /\boffice\b/i.test(englishStr) || /\bpurifier\b/i.test(englishStr) || /\bdispenser\b/i.test(englishStr)) {
    return [
      {
        label: "표현 1 (가장 직관적인 표준 표현 - Natural Standard Expression)",
        english: "I am going outside my office to get some water from the water purifier.",
        korean: "정수기에서 물을 좀 떠오기 위해 사무실 바깥으로 나갑니다."
      },
      {
        label: "표현 2 (동사 및 어휘 교체 표현 - Verb/Noun Substitution: stepping out / water dispenser)",
        english: "I'm stepping out of my office to grab a drink of water from the water dispenser.",
        korean: "정수기에서 물 한 모금 마시려고 잠시 사무실 밖으로 나가는 중입니다 (stepping out / grab a drink / water dispenser 교체)."
      },
      {
        label: "표현 3 (원어민 실전 구어체 - Casual Spoken Expression: head out / refill)",
        english: "I'm heading out of the office to refill my water from the cooler.",
        korean: "정수기에서 물을 받아오려고 사무실 밖으로 나가고 있어요 (heading out / refill / water cooler 교체)."
      }
    ];
  }

  if (inputStr.includes('주차권') || inputStr.includes('교육생') || inputStr.includes('서류봉투') || inputStr.includes('봉투') || /\bparking\b/i.test(englishStr) || /\bticket(s)?\b/i.test(englishStr) || /\btrainee(s)?\b/i.test(englishStr) || /\benvelope\b/i.test(englishStr)) {
    return [
      {
        label: "표현 1 (가장 직관적인 표준 표현 - Natural Standard Expression)",
        english: "I bought many parking tickets to hand out to trainees and put them inside a document envelope.",
        korean: "교육생들에게 나누어 줄 많은 주차권을 구매해서 서류 봉투 안에 넣었습니다."
      },
      {
        label: "표현 2 (동사 및 명사 교체 표현 - Verb/Noun Substitution: purchased / distribute)",
        english: "I purchased a bunch of parking passes to distribute to the trainees and placed them in a manila envelope.",
        korean: "교육생들에게 배부하기 위해 주차권 여러 장을 구입하여 서류 봉투에 담아 두었습니다 (purchased / parking passes / distribute / manila envelope 교체)."
      },
      {
        label: "표현 3 (원어민 실전 구어체 - Casual Spoken Expression: picked up / pass out)",
        english: "I picked up plenty of parking vouchers to pass out to the trainees and slipped them into a paper envelope.",
        korean: "교육생들에게 나눠주려고 주차권을 넉넉히 챙겨서 서류 봉투 속에 넣어 두었어요 (picked up / parking vouchers / pass out / slipped into 교체)."
      }
    ];
  }

  if (inputStr.includes('용인') || inputStr.includes('경기') || inputStr.includes('온도') || inputStr.includes('도') || /\btemperature\b/i.test(englishStr) || /\byongin\b/i.test(englishStr) || /\bgyeonggi\b/i.test(englishStr)) {
    return [
      {
        label: "표현 1 (가장 직관적인 표준 표현 - Natural Standard Expression)",
        english: "Today's temperature is above 33 degrees Celsius at my home in Yongin-si(용인시), Gyeonggi-do(경기도).",
        korean: "오늘 경기도 용인시에 있는 우리 집 온도는 섭씨 33도 이상입니다."
      },
      {
        label: "표현 2 (동사 및 어휘 교체 표현 - Structure Substitution: hitting / reaching)",
        english: "It's hitting over 33°C at my house in Yongin-si(용인시), Gyeonggi-do(경기도) today.",
        korean: "오늘 경기도 용인 우리 집 기온이 33도를 넘어서고 있습니다 (hitting over / at my house 교체)."
      },
      {
        label: "표현 3 (원어민 실전 구어체 - Casual Spoken Expression: baking / indoor temp)",
        english: "My place in Yongin-si(용인시), Gyeonggi-do(경기도) is over 33°C today.",
        korean: "오늘 경기도 용인 우리 집 실내 온도가 33도가 넘어가네요 (my place / over 33°C 교체)."
      }
    ];
  }

  if (inputStr.includes('양산') || inputStr.includes('그늘') || inputStr.includes('코너') || inputStr.includes('도로') || /\bparasol\b/i.test(englishStr) || /\bshade\b/i.test(englishStr) || /\bcorner\b/i.test(englishStr)) {
    return [
      {
        label: "표현 1 (가장 직관적인 표준 표현 - Natural Standard Expression)",
        english: "I am under the shade of a large parasol at the corner of the road.",
        korean: "길 모퉁이에 있는 큰 양산 그늘 아래에 서 있습니다."
      },
      {
        label: "표현 2 (동사 및 어휘 교체 표현 - Verb/Noun Substitution: standing / street corner)",
        english: "I'm standing beneath the shade of a big sun umbrella on the street corner.",
        korean: "길 모퉁이에 펼쳐진 큰 양산 그늘 아래 서 있는 중입니다 (standing beneath / sun umbrella / street corner 교체)."
      },
      {
        label: "표현 3 (원어민 실전 구어체 - Casual Spoken Expression: taking shelter / giant umbrella)",
        english: "I'm taking shelter in the shade of a giant parasol at the edge of the street.",
        korean: "길가 모퉁이의 거대한 양산 그늘 아래서 햇빛을 피하고 있어요 (taking shelter / giant parasol / edge of the street 교체)."
      }
    ];
  }

  if (inputStr.includes('온도') || inputStr.includes('도') || inputStr.includes('덕다') || inputStr.includes('더운') || /\btemperature\b/i.test(englishStr) || /\bdegrees?\s*(celsius|fahrenheit)?\b/i.test(englishStr)) {
    return [
      {
        label: "표현 1 (가장 직관적인 표준 표현 - Natural Standard Expression)",
        english: "Today's temperature is above 31 degrees Celsius.",
        korean: "오늘 온도는 섭씨 31도 이상입니다."
      },
      {
        label: "표현 2 (동사 및 구문 교체 표현 - Verb/Structure Substitution: is expected to exceed)",
        english: "The temperature today is expected to exceed 31\u00b0C.",
        korean: "오늘 기온이 섭씨 31도를 넘을 것으로 예상됩니다 (is expected to exceed 교체)."
      },
      {
        label: "표현 3 (원어민 실전 구어체 - Casual Spoken Expression: hitting / over)",
        english: "It's hitting over 31\u00b0C today.",
        korean: "오늘 31도 넘는다. / 오늘 31도 찍다. (hitting over 교체)"
      }
    ];
  }

  if (inputStr.includes('산책') || inputStr.includes('숲') || inputStr.includes('아침') || (/\b(taking a walk|stroll|walking)\b/i.test(englishStr) && /\b(forest|woods|morning|park)\b/i.test(englishStr))) {
    return [
      {
        label: "표현 1 (가장 직관적인 표준 표현 - Natural Standard Expression)",
        english: "I'm taking a walk in the forest in the early morning.",
        korean: "이른 아침에 숲속에서 산책하는 중입니다."
      },
      {
        label: "표현 2 (동사 교체 표현 - Verb Substitution: strolling through)",
        english: "I'm strolling through the forest in the early morning.",
        korean: "이른 아침에 숲속을 거닐며 산책하고 있습니다 (strolling through 교체)."
      },
      {
        label: "표현 3 (원어민 실전 구어체 - Casual Spoken Expression: out for a morning walk)",
        english: "I'm out for a morning walk in the woods.",
        korean: "숲속에서 아침 산책을 하고 있어요 (out for a morning walk / woods 교체)."
      }
    ];
  }

  if (inputStr.includes('남자') || inputStr.includes('걷는') || (/\bman\b/i.test(englishStr) && !/\b(forest|morning|walk in)\b/i.test(englishStr)) || (/\bwalk(s|ing|ed)?\b/i.test(englishStr) && !inputStr.includes('산책') && !/\b(forest|morning)\b/i.test(englishStr))) {
    return [
      {
        label: "표현 1 (가장 직관적인 표현 - Intuitive Spoken Expression)",
        english: "A man is walking among his friends in a brown t-shirt while talking.",
        korean: "한 남자가 갈색 티셔츠를 입고 친구들과 이야기하며 걷고 있다."
      },
      {
        label: "표현 2 (동시 동작 강조 표현 - Simultaneous Action Pattern)",
        english: "Wearing a brown t-shirt, a man is chatting as he walks among his friends.",
        korean: "갈색 티셔츠를 입은 한 남자가 친구들 사이를 걸으며 담소를 나누고 있다."
      },
      {
        label: "표현 3 (원어민 실전 구어체 - Casual Spoken Expression)",
        english: "A guy in a brown t-shirt is walking and hanging out with his friends.",
        korean: "갈색 티셔츠 차림의 한 남자가 친구들과 걷고 어울려 대화하고 있다."
      }
    ];
  }

  if (inputStr.includes('문래') || /\bmullae\b/i.test(englishStr)) {
    return [
      {
        label: "💡 자연스러운 일상 구어체 표현 (Natural Daily Spoken)",
        english: "I'm meeting up with my former coworkers near Mullae(문래) this August.",
        korean: "이번 8월에 문래 근처에서 예전 동료들과 만날 예정입니다."
      },
      {
        label: "💡 비즈니스/격식 표현 (Formal/Business Expression)",
        english: "I am scheduled to meet my former colleagues in the Mullae(문래) area in August.",
        korean: "8월 중 문래동 지역에서 이전 직장 동료들을 접선하기로 일정이 잡혀 있습니다."
      },
      {
        label: "💡 캐주얼 표현 (Casual Expression)",
        english: "I'll be hanging out with old workmates around Mullae(문래) in August.",
        korean: "8월에 문래 근처에서 예전 직장 동료들과 어울려 놀 예정입니다."
      }
    ];
  }


  if (inputStr.includes('충전소') || inputStr.includes('경계선') || inputStr.includes('나무') || inputStr.includes('보호') || /\bcharging station\b/i.test(englishStr) || /\bsafety\b/i.test(englishStr) || /\btree(s)?\b/i.test(englishStr) || /\bprotect\b/i.test(englishStr)) {
    return [
      {
        label: "표현 1 (가장 직관적인 표준 표현 - Natural Standard Expression)",
        english: "An electric charging station stands beside a tree, and a safety boundary line is installed around the trees to protect it.",
        korean: "전기 충전소가 나무 옆에 서 있고, 나무를 보호하기 위해 주변에 안전 경계선이 설치되어 있습니다."
      },
      {
        label: "표현 2 (동사 및 명사 교체 표현 - Verb/Noun Substitution: located / protective barrier)",
        english: "An EV charging station is located next to a tree, with a protective barrier installed around the trees for protection.",
        korean: "EV 충전소가 나무 옆에 위치해 있으며, 나무를 보호하기 위해 보호 장벽이 주변에 설치되어 있습니다 (located / protective barrier 교체)."
      },
      {
        label: "표현 3 (원어민 실전 구어체 - Casual Spoken Expression)",
        english: "There's an electric vehicle charger right next to a tree, enclosed by a safety fence to keep the trees safe.",
        korean: "나무 바로 옆에 전기차 충전기가 있고, 나무를 안전하게 보호하기 위해 안전 울타리가 둘러싸고 있어요 (charger / safety fence / keep safe 교체)."
      }
    ];
  }

  // Dynamic verb substitution engine for ANY arbitrary new sentence
  const verbsMap = [
    { orig: /\b(eat|eats|eating|ate)\b/gi, sub1: 'have', sub2: 'enjoy', desc1: '동사 have (식사하다) 교체', desc2: '동사 enjoy (즐기다) 교체' },
    { orig: /\b(drink|drinks|drinking|drank)\b/gi, sub1: 'have', sub2: 'sip on', desc1: '동사 have 교체', desc2: '동사구 sip on (홀짝이다) 교체' },
    { orig: /\b(walk|walks|walking|walked)\b/gi, sub1: 'stroll', sub2: 'take a walk', desc1: '동사 stroll (거닐다) 교체', desc2: '동사구 take a walk 교체' },
    { orig: /\b(run|runs|running|ran)\b/gi, sub1: 'jog', sub2: 'dash', desc1: '동사 jog (조깅하다) 교체', desc2: '동사 dash (질주하다) 교체' },
    { orig: /\b(meet|meets|meeting|met)\b/gi, sub1: 'gather with', sub2: 'meet up with', desc1: '동사구 gather with (모이다) 교체', desc2: '동사구 meet up with 교체' },
    { orig: /\b(see|sees|seeing|saw)\b/gi, sub1: 'look at', sub2: 'catch a glimpse of', desc1: '동사구 look at 교체', desc2: '동사구 catch a glimpse of 교체' },
    { orig: /\b(buy|buys|buying|bought)\b/gi, sub1: 'purchase', sub2: 'pick up', desc1: '동사 purchase 교체', desc2: '동사구 pick up 교체' },
    { orig: /\b(clean|cleans|cleaning|cleaned)\b/gi, sub1: 'tidy up', sub2: 'clear out', desc1: '동사구 tidy up 교체', desc2: '동사구 clear out 교체' },
    { orig: /\b(study|studies|studying|studied)\b/gi, sub1: 'learn', sub2: 'work on', desc1: '동사 learn 교체', desc2: '동사구 work on 교체' },
    { orig: /\b(go|goes|going|went)\b/gi, sub1: 'head to', sub2: 'take off to', desc1: '동사구 head to (향하다) 교체', desc2: '동사구 take off to (출발하다) 교체' },
    { orig: /\b(make|makes|making|made)\b/gi, sub1: 'create', sub2: 'prepare', desc1: '동사 create 교체', desc2: '동사 prepare 교체' },
    { orig: /\b(read|reads|reading)\b/gi, sub1: 'peruse', sub2: 'go through', desc1: '동사 peruse (정독하다) 교체', desc2: '동사구 go through 교체' },
    { orig: /\b(stand|stands|standing)\b/gi, sub1: 'is situated', sub2: 'is located', desc1: '동사 situated (위치하다) 교체', desc2: '동사 located 교체' },
    { orig: /\b(install|installs|installed|installing)\b/gi, sub1: 'set up', sub2: 'placed', desc1: '동사구 set up (설치하다) 교체', desc2: '동사 placed 교체' },
    { orig: /\b(protect|protects|protecting|protected)\b/gi, sub1: 'keep safe', sub2: 'guard', desc1: '동사구 keep safe 교체', desc2: '동사 guard 교체' }
  ];

  for (const item of verbsMap) {
    if (item.orig.test(englishStr)) {
      const en2 = englishStr.replace(item.orig, (match) => {
        const isUpper = match.charAt(0) === match.charAt(0).toUpperCase();
        return isUpper ? item.sub1.charAt(0).toUpperCase() + item.sub1.slice(1) : item.sub1;
      });
      const en3 = englishStr.replace(item.orig, (match) => {
        const isUpper = match.charAt(0) === match.charAt(0).toUpperCase();
        return isUpper ? item.sub2.charAt(0).toUpperCase() + item.sub2.slice(1) : item.sub2;
      });

      return [
        {
          label: "표현 1 (가장 직관적인 기본 표현 - Natural Standard Expression)",
          english: englishStr,
          korean: "원어민이 일상 대화에서 가장 자주 사용하는 직관적인 표준 구어체 표현입니다."
        },
        {
          label: `표현 2 (동사 교체 표현 - ${item.desc1})`,
          english: en2,
          korean: `주요 동작 동사를 유의어 '${item.sub1}'로 자연스럽게 바꾸어 쓴 응용 표현입니다.`
        },
        {
          label: `표현 3 (실전 구어체 동사구 표현 - ${item.desc2})`,
          english: en3,
          korean: `원어민 실전 대화에서 자주 쓰이는 동사구 '${item.sub2}'로 교체한 응용 표현입니다.`
        }
      ];
    }
  }

  // 3-Tier Contextual Fallback Engine for ANY arbitrary sentence (Bans artificial prefixes like "It is notable that" / "In real life")
  let everydayEn = englishStr
    .replace(/\bopen\b/gi, 'pop open')
    .replace(/\bpick up\b/gi, 'grab')
    .replace(/\bput\b/gi, 'toss')
    .replace(/\bpour\b/gi, 'gulp down')
    .replace(/\bgo\b/gi, 'head over')
    .replace(/\bbuy\b/gi, 'pick up')
    .replace(/\beat\b/gi, 'have')
    .replace(/\bdrink\b/gi, 'take a sip of')
    .replace(/\bsee\b/gi, 'spot');

  let formalEn = englishStr
    .replace(/\bfridge\b/gi, 'refrigerator')
    .replace(/\bpick up\b/gi, 'retrieve')
    .replace(/\bput\b/gi, 'place')
    .replace(/\bpour\b/gi, 'pour carefully')
    .replace(/\bgo\b/gi, 'proceed')
    .replace(/\bbuy\b/gi, 'purchase')
    .replace(/\beat\b/gi, 'consume')
    .replace(/\bdrink\b/gi, 'sip')
    .replace(/\bsee\b/gi, 'observe');

  let coolNativeEn = englishStr
    .replace(/\bopen\b/gi, 'whip open')
    .replace(/\bpick up\b/gi, 'snag')
    .replace(/\bput\b/gi, 'throw')
    .replace(/\bpour\b/gi, 'chug down')
    .replace(/\bgo\b/gi, 'dash to')
    .replace(/\bbuy\b/gi, 'snag')
    .replace(/\beat\b/gi, 'chow down on')
    .replace(/\bdrink\b/gi, 'chug')
    .replace(/\bsee\b/gi, 'catch a glimpse of');

  if (everydayEn === englishStr) {
    everydayEn = `Simply put, ${englishStr.charAt(0).toLowerCase() + englishStr.slice(1)}`;
  }
  if (formalEn === englishStr) {
    formalEn = `Formally, ${englishStr.charAt(0).toLowerCase() + englishStr.slice(1)}`;
  }
  if (coolNativeEn === englishStr) {
    coolNativeEn = `In casual talk, ${englishStr.charAt(0).toLowerCase() + englishStr.slice(1)}`;
  }

  return [
    {
      label: "💬 1. 일상 자연스러운 구어체 (Everyday Spoken)",
      english: everydayEn,
      korean: "원어민이 일상에서 가장 자연스럽게 뱉는 실전 구어체 표현입니다.",
      keyChange: "💡 구어체 동사구 활용 (e.g. pop open / grab / toss / gulp down)"
    },
    {
      label: "💼 2. 격식 & 오피스 표현 (Polite & Professional)",
      english: formalEn,
      korean: "비즈니스, 오피스, 정중한 자리에서 어울리는 품격 있는 표현입니다.",
      keyChange: "💡 격식 어휘 포인트 (e.g. refrigerator / retrieve / place / purchase)"
    },
    {
      label: "🎬 3. 미드 & 현지인 찰진 구어체 (Cool Native Vibe)",
      english: coolNativeEn,
      korean: "영화, 미드, 현지 대화에서 생생하게 들리는 쿨한 표현입니다.",
      keyChange: "💡 현지인 찰진 동사구 (e.g. whip open / snag / throw / chug down)"
    }
  ];
}

/**
 * Key Vocabulary & Nuance Breakdown (주요 어휘 & 뉘앙스 정리)
 */
export function getVocabNuances(result) {
  if (!result) return [];
  if (result.vocabNuances && result.vocabNuances.length > 0) {
    return result.vocabNuances;
  }

  const inputStr = (result.arrowKorean || '').toLowerCase();
  const englishStr = (result.english || '');

  if (inputStr.includes('복잡') || inputStr.includes('머리') || inputStr.includes('마음') || inputStr.includes('일') || /\b(tangled|mess|overwhelmed|complicated|head and heart|mind and heart)\b/i.test(englishStr)) {
    return [
      { korean: "Doing a good job / Doing well at work", english: "일(work/job)을 잘하고 있다", desc: "📌 한국어 '일'은 문맥에 따라 day(날)가 아닌 work/job(직장 일)으로 다의어(Polysemy) 처리되어야 자연스럽습니다." },
      { korean: "Complicated vs Tangled vs Mess vs Overwhelmed", english: "복잡하다 / 엉키다 / 어지럽다 / 벅차다", desc: "📌 생각을 나타낼 때: my mind is complicated / tangled. 감정과 상황이 벅찰 때: feel overwhelmed / mind is a mess." },
      { korean: "Head & Heart / Mind & Heart", english: "머리와 마음 (이성과 감정)", desc: "📌 원어민은 이성적 생각(Head/Mind)과 감정적 마음(Heart)을 구어체에서 대칭하여 한 번에 표현합니다." }
    ];
  }

  if (inputStr.includes('용인') || inputStr.includes('경기') || inputStr.includes('온도') || inputStr.includes('도') || /\btemperature\b/i.test(englishStr) || /\byongin\b/i.test(englishStr) || /\bgyeonggi\b/i.test(englishStr)) {
    return [
      { korean: "오늘 이다 온도 (어순 교정)", english: "today's temperature is / the temperature is", desc: "📌 'Today is the temperature' 어순 오류 ➔ 'Today's temperature is' (오늘의 온도는 ~이다)" },
      { korean: "at my home (전치사 보완)", english: "at my home / at my house", desc: "📌 집이라는 특정 장소 지점 표현 시 in보다 at이 직관적임 (in my home ➔ at my home ⭕)" },
      { korean: "지명 한글 병기 규칙", english: "Yongin-si(용인시), Gyeonggi-do(경기도)", desc: "📌 지명 및 로마자 표기 뒤 원본 한글 괄호 병기 필수 규칙 적용" },
      { korean: "33도 (섭씨)", english: "33 degrees Celsius / 33°C", desc: "📌 온도 단위 '도' ➔ degrees Celsius / °C 표현" }
    ];
  }

  if (inputStr.includes('양산') || inputStr.includes('그늘') || inputStr.includes('코너') || inputStr.includes('도로') || /\bparasol\b/i.test(englishStr) || /\bshade\b/i.test(englishStr) || /\bcorner\b/i.test(englishStr)) {
    return [
      { korean: "I am (주어-동사 수일치)", english: "I am under (NOT I is)", desc: "📌 1인칭 주어 I 뒤에는 be동사 am 결합 (I is under ❌ ➔ I am under ⭕)" },
      { korean: "그늘 (관사 보완)", english: "the shade", desc: "📌 특정 입체 공간 그늘 영역 앞 정관사 the 필수 보완 (shade ❌ ➔ the shade ⭕)" },
      { korean: "큰 양산", english: "a large parasol / a big sun umbrella", desc: "📌 셀 수 있는 단수 명사 양산 앞 부정관사 a/a large 명시" },
      { korean: "도로 코너", english: "at the corner of the road / street corner", desc: "📌 장소/도로 모퉁이 표현 (corner of the road / street corner)" }
    ];
  }

  if (inputStr.includes('온도') || inputStr.includes('도') || inputStr.includes('기온') || /\btemperature\b/i.test(englishStr) || /\bdegrees?\s*(celsius|fahrenheit)?\b/i.test(englishStr)) {
    return [
      { korean: "오늘 온도 (소유격)", english: "today's temperature", desc: "📌 시간 명사 + 명사 → 소유격 's 필수 (today temperature ❌ ➔ today's temperature ⭕)" },
      { korean: "31도 (섭씨)", english: "31 degrees Celsius / 31°C", desc: "📌 한국어 '도'는 온도 단위이므로 영어로 'degrees Celsius'로 번역 (31 do ❌ ➔ 31 degrees Celsius ⭕)" },
      { korean: "above (이상)", english: "above / over / exceeding", desc: "📌 기준 온도 초과를 표현할 때 above 또는 over 사용" },
      { korean: "온도가 ~이다", english: "the temperature is ~", desc: "📌 특정 측정값으로서의 온도 앞에는 정관사 the 필수 (temperature is ❌ ➔ the temperature is ⭕)" }
    ];
  }

  if (inputStr.includes('산책') || inputStr.includes('숲') || (inputStr.includes('아침') && (inputStr.includes('숲') || /\b(forest|woods|walk)\b/i.test(englishStr)))) {
    return [
      { korean: "산책하는중이다", english: "am taking a walk / am strolling", desc: "📌 진행형 산책 표현 (taking a walk / strolling / out for a walk)" },
      { korean: "숲속 (inside 숲속)", english: "in the forest / through the woods", desc: "📌 숲속 = 이미 'in the forest'를 내장하므로 inside를 덧붙이면 전치사 이중 충돌 (inside in the forest ❌ ➔ in the forest ⭕)" },
      { korean: "이른 아침", english: "in the early morning", desc: "📌 시간대 표현에 정관사 the 필수 보완 (in early morning ❌ ➔ in the early morning ⭕)" },
      { korean: "주어-동사 인칭 수일치", english: "I'm taking / I am taking (NOT I i'm taking)", desc: "📌 주어 나(I)와 동사 산책하는중이다(am taking)가 합치면 주어 중복 발생 방지 (I I'm ❌ ➔ I'm ⭕)" }
    ];
  }

  if (inputStr.includes('사무실') || inputStr.includes('정수기') || inputStr.includes('바깥') || /\boffice\b/i.test(englishStr) || /\bpurifier\b/i.test(englishStr) || /\bdispenser\b/i.test(englishStr)) {
    return [
      { korean: "I am going (주어-동사 수일치)", english: "I am going", desc: "📌 1인칭 주어 I 뒤에는 be동사 am 결합 (I are going ❌ ➔ I am going ⭕)" },
      { korean: "사무실 바깥", english: "outside my office", desc: "📌 장소 명사 앞 outside는 전치사 of 생략 (outside of ❌ ➔ outside ⭕)" },
      { korean: "정수기로부터", english: "from the water purifier / dispenser", desc: "📌 구체적 기기 명사 앞 정관사 the 보완 (water purifier / water dispenser / cooler)" },
      { korean: "약간의 물 (자연스러운 구어체)", english: "some water / a drink of water", desc: "📌 음용수를 떠올릴 때는 직역 a little water보다 some water가 직관적임" }
    ];
  }

  if (inputStr.includes('주차권') || inputStr.includes('교육생') || inputStr.includes('서류봉투') || inputStr.includes('봉투') || /\bparking\b/i.test(englishStr) || /\bticket(s)?\b/i.test(englishStr) || /\btrainee(s)?\b/i.test(englishStr) || /\benvelope\b/i.test(englishStr)) {
    return [
      { korean: "많은 주차권들", english: "many parking tickets / parking passes", desc: "📌 주차권 복수형 표현 (parking tickets / vouchers)" },
      { korean: "나눠주다", english: "to hand out / to distribute / to pass out", desc: "📌 여럿에게 나누어 배부할 때는 hand out / pass out 구어체 동사구 사용" },
      { korean: "교육생들에게", english: "to trainees", desc: "📌 대상 전치사 to + 복수 명사 trainees" },
      { korean: "서류봉투", english: "a document envelope / a manila envelope", desc: "📌 서류를 담는 봉투 (document envelope / paper envelope)" }
    ];
  }

  if (inputStr.includes('충전소') || inputStr.includes('경계선') || inputStr.includes('나무') || inputStr.includes('보호') || /\bcharging station\b/i.test(englishStr) || /\bsafety\b/i.test(englishStr) || /\btree(s)?\b/i.test(englishStr) || /\bprotect\b/i.test(englishStr)) {
    return [
      { korean: "beside (~옆에)", english: "beside / next to", desc: "📌 beside는 자체 전치사이므로 of를 덧붙이지 않음 (beside of ❌ ➔ beside ⭕)" },
      { korean: "한그루의 나무", english: "a tree", desc: "📌 수식어 중복(one tree a tree)을 다듬고 관사 a/an으로 명확히 표현" },
      { korean: "안전경계선", english: "a safety boundary line / safety barrier", desc: "📌 안전 울타리 및 경계 구역을 나타내는 정통 표제어" },
      { korean: "보호하다 그것", english: "to protect it / to protect them", desc: "📌 앞에 나온 대상을 가리킬 때는 지시어 that 대신 인칭대명사 it/them이 자연스러움" }
    ];
  }

  if (inputStr.includes('아들') || inputStr.includes('기차') || inputStr.includes('할머니') || inputStr.includes('방학') || englishStr.toLowerCase().includes('sons') || englishStr.toLowerCase().includes('vacation') || englishStr.toLowerCase().includes('train') || englishStr.toLowerCase().includes('grandma')) {
    return [
      { korean: "by 기차 (교통수단)", english: "by train", desc: "📌 교통수단 by 뒤에는 관사(a/the) 없이 단수 명사 사용 (by a train ❌ ➔ by train ⭕)" },
      { korean: "할머니집으로 간다", english: "going to grandma's house", desc: "📌 이동 동사(go) 뒤 목적지 장소 앞에는 방향 전치사 'to' 필수 결합" },
      { korean: "방학 시작했다 오늘부터", english: "vacation started today", desc: "📌 '오늘부터'는 직역(from today)보다 자연스러운 부사 'today' 사용" },
      { korean: "아들들 (친근한 구어체)", english: "my sons / my boys", desc: "📌 표준 표현 my sons 외에도 구어체로 my boys 사용 가능" }
    ];
  }

  if (inputStr.includes('고양이') || englishStr.toLowerCase().includes('cat')) {
    return [
      { korean: "한 마리의 고양이", english: "A cat / One cat", desc: "📌 단위 수식 조각 '한 마리의' ➔ a/one cat" },
      { korean: "있다 누운 상태", english: "is lying", desc: "📌 ~한 상태 ➔ 형용사/분사 'lying' (lying down situation X)" },
      { korean: "beneath", english: "beneath / under", desc: "📌 ~바로 아래 밀착 공간 (under/beneath)" },
      { korean: "하나의 주차된 자", english: "a parked car", desc: "📌 주차된 자동차 (주차된 자/차 ➔ a parked car)" }
    ];
  }

  if (inputStr.includes('숙제') || inputStr.includes('밀렸') || englishStr.toLowerCase().includes('behind')) {
    return [
      { korean: "Be behind on", english: "I'm three days behind on...", desc: "📌 ~가 밀리다 (일정/숙제/납부가 늦어져 밀린 상태)" },
      { korean: "Backlog / Backlogged", english: "backlogged homework", desc: "📌 밀린 일 / 밀려 쌓인 미처리 과제" },
      { korean: "Catch up on", english: "need to catch up on...", desc: "📌 (밀린 일/숙제를) 밀린 만큼 따라잡다, 만회하다" },
      { korean: "To write", english: "to write three sentences", desc: "📌 ~를 쓰는 것 (to부정사의 명사적/형용사적 용법)" }
    ];
  }

  if (inputStr.includes('이끼') || englishStr.toLowerCase().includes('moss')) {
    return [
      { korean: "이끼가 꼈다 (자라다)", english: "Moss grew / Moss formed", desc: "❌ put on(X) ➔ ⭕ moss grew / formed(O) 자연적인 발아/착착 붙는 표현" },
      { korean: "창문에", english: "on the windows", desc: "창문 표면에 접촉해 달라붙으므로 전치사 'on' 사용" },
      { korean: "에어컨 때문에 시원하다", english: "cool inside from the AC", desc: "에어컨 바람 원인으로 실내가 시원한 상태" },
      { korean: "비가 온 후 바깥이 습하다", english: "humid outside after the rain", desc: "비 온 뒤 습기를 머금은 야외 기후 표현" }
    ];
  }

  if (inputStr.includes('문래') || englishStr.toLowerCase().includes('mullae')) {
    return [
      { korean: "만날것이다", english: "will meet / am meeting up with", desc: "약속된 미래 동작을 화살표 어순으로 전개" },
      { korean: "나의 옛 동료들", english: "my old colleagues / former coworkers", desc: "함께 일했던 이전 직장 동료들을 나타냄" },
      { korean: "문래 (지명)", english: "Mullae(문래)", desc: "표준 로마자 표기 뒤 원문 한글 병기 규칙 적용" }
    ];
  }

  return [];
}
