const journey = document.querySelector("#journey");
const findPopoButton = document.querySelector("#findPopoButton");
const screenButtons = document.querySelectorAll("[data-screen]");
const clueObjects = Array.from(document.querySelectorAll(".clue-object"));
const clueOrbit = document.querySelector(".clue-orbit");
const clueWindow = document.querySelector(".clue-window");
const clueScreen = document.querySelector(".clue-screen");
const playerTurntable = document.querySelector("#playerTurntable");
const musicTitle = document.querySelector("#musicTitle");
const musicDesc = document.querySelector("#musicDesc");
const lyricPanel = document.querySelector("#lyricPanel");
const lyricMain = document.querySelector("#lyricMain");
const lyricAccent = document.querySelector("#lyricAccent");
const generatedLyric = document.querySelector("#generatedLyric");
const playerIcon = document.querySelector(".player-icon");
const playerStatus = document.querySelector(".player-status");
const playerCover = document.querySelector("#playerCover");
const coverCircularText = document.querySelector("#coverCircularText");
const clueChat = document.querySelector("#clueChat");
const clueChatInput = document.querySelector("#clueChatInput");
const chatConversation = document.querySelector("#chatConversation");
const chatConversationList = document.querySelector("#chatConversationList");
const polaroids = Array.from(document.querySelectorAll(".polaroid"));
const polaroidWall = document.querySelector(".polaroid-wall");
const photoPositionCurrent = document.querySelector("#photoPositionCurrent");
const photoPositionTotal = document.querySelector("#photoPositionTotal");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const closeLightbox = document.querySelector("#closeLightbox");
const heroVideo = document.querySelector(".hero-video");
const heroReveal = document.querySelector("#heroReveal");
const photoScreen = document.querySelector(".photo-screen");
const photoBackgroundVideo = document.querySelector(".photo-background-video");
const xiaohongshuLink = document.querySelector("#xiaohongshuLink");
const pageLoader = document.querySelector("#pageLoader");
const loaderProgressBar = document.querySelector("#loaderProgressBar");
const loaderProgressText = document.querySelector("#loaderProgressText");
const heroLogoImage = document.querySelector(".hero-logo img");
const screens = document.querySelectorAll(".screen");
const mobileQuery = window.matchMedia("(max-width: 900px)");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const lyricTypeSettings = {
  cursorBlinkDuration: 800,
  pauseDuration: 2200,
  typingSpeed: 90,
  deletingSpeed: 70,
};
let lyricTypeToken = 0;
let lyricTypeCompletedAt = 0;

const musicMap = {
  vinyl: {
    title: "浪人的…",
    artist: "张震岳",
    audio: "assets/audio/vinyl.mp3",
    lrc: "assets/audio/vinyl.lrc",
    cover: "assets/covers/vinyl.jpg",
    glow: ["rgba(42, 241, 231, 0.48)", "rgba(255, 91, 189, 0.26)", "rgba(255, 211, 106, 0.24)"],
    desc: "像黑胶唱针落下后的第一秒，适合 POPO 从唱片里醒来。",
    lyrics: ["这是你爱上我的，教会我的"],
    accent: "music",
  },
  headphone: {
    title: "BIRDS OF A FEATHER",
    artist: "Billie Eilish",
    audio: "assets/audio/headphone.mp3",
    lrc: "assets/audio/headphone.lrc",
    cover: "assets/covers/headphone.webp",
    glow: ["rgba(120, 255, 88, 0.48)", "rgba(42, 241, 231, 0.2)", "rgba(238, 231, 205, 0.2)"],
    desc: "戴上耳机后出现的柔软节拍，像 POPO 躲在午后的风里。",
    lyrics: ["把耳机戴上，世界就慢慢靠近"],
    accent: "signal",
  },
  pool: {
    title: "1234567",
    artist: "陈绮贞",
    audio: "assets/audio/pool.mp3",
    lrc: "assets/audio/pool.lrc",
    cover: "assets/covers/pool.webp",
    glow: ["rgba(255, 211, 106, 0.5)", "rgba(42, 241, 231, 0.24)", "rgba(77, 176, 255, 0.22)"],
    desc: "清亮、轻快、有水波的节奏，适合 POPO 在泳池边摇摆。",
    lyrics: ["夏天把节拍藏进透明水面"],
    accent: "summer",
  },
  city: {
    title: "程艾影",
    artist: "赵雷",
    audio: "assets/audio/city.mp3",
    lrc: "assets/audio/city.lrc",
    cover: "assets/covers/city.webp",
    glow: ["rgba(255, 91, 189, 0.46)", "rgba(42, 241, 231, 0.28)", "rgba(154, 124, 255, 0.24)"],
    desc: "霓虹广告牌之间的高能律动，像 POPO 穿过城市时留下的信号。",
    lyrics: ["霓虹闪过，城市替我记得你"],
    accent: "neon",
  },
  walkman: {
    title: "直来直往",
    artist: "孙燕姿",
    audio: "assets/audio/walkman.mp3",
    lrc: "assets/audio/walkman.lrc",
    cover: "assets/covers/walkman.webp",
    glow: ["rgba(255, 213, 54, 0.54)", "rgba(120, 255, 88, 0.18)", "rgba(255, 139, 50, 0.22)"],
    desc: "一点复古磁带感，一点夏日弹跳，像 POPO 偷偷按下播放键。",
    lyrics: ["按下播放键，旧时光开始发亮"],
    accent: "play",
  },
  cassette: {
    title: "爱情万岁",
    artist: "五月天",
    audio: "assets/audio/cassette.mp3",
    lrc: "assets/audio/cassette.lrc",
    cover: "assets/covers/cassette.webp",
    glow: ["rgba(77, 176, 255, 0.48)", "rgba(255, 91, 189, 0.22)", "rgba(154, 124, 255, 0.22)"],
    desc: "带着卧室录音的轻微沙沙声，像 POPO 留在旧磁带里的暗号。",
    lyrics: ["气泡升起的时候，心跳也在混音"],
    accent: "loop",
  },
  speaker: {
    title: "暗涌",
    artist: "王菲",
    audio: "assets/audio/speaker.mp3",
    lrc: "assets/audio/speaker.lrc",
    cover: "assets/covers/speaker.jpg",
    glow: ["rgba(42, 241, 231, 0.44)", "rgba(77, 176, 255, 0.24)", "rgba(120, 255, 88, 0.18)"],
    desc: "温暖低频从角落扩散开来，像 POPO 正在远处调高音量。",
    lyrics: ["远处的低频，刚好推开夜色"],
    accent: "jam",
  },
};

const baseAngles = [90, 66, 40, 114, 140, 164, 16];
const baseRotations = [0, 10, 9, -7, -8, -4, 8];
const orbitRadius = { x: 680, y: 282 };
const centerAngle = 90;
const playerExitDuration = 620;

let activeClueIndex = clueObjects.findIndex((item) => item.classList.contains("active"));
if (activeClueIndex < 0) activeClueIndex = 0;
let selectionToken = 0;
let currentCarouselRotation = 0;
let currentClue = musicMap[clueObjects[activeClueIndex]?.dataset.clue] ?? musicMap.vinyl;
let activePhotoIndex = 0;
let photoAutoplayTimer = 0;
let photoWheelLocked = false;
let photoGuideStartTimer = 0;
let photoGuideTimer = 0;
let photoGuideIndex = 1;
let conversationReplyToken = 0;
const clueAudio = new Audio();
clueAudio.preload = "metadata";
let activeLyrics = [];
let activeLyricIndex = -1;
let lyricLoadToken = 0;
const lyricCache = new Map();
let synthAudioContext = null;
let synthAudioNodes = [];
let usingSyntheticAudio = false;
let photoAssetsLoaded = false;

function initializePageLoader() {
  if (!pageLoader) {
    document.documentElement.classList.remove("is-loading");
    return;
  }

  const startedAt = performance.now();
  const completed = new Set();
  const weights = {
    document: 15,
    styles: 15,
    logo: 20,
    poster: 15,
    video: 35,
  };
  let displayedProgress = 0;
  let targetProgress = 0;
  let finished = false;

  const renderProgress = () => {
    displayedProgress += (targetProgress - displayedProgress) * 0.14;
    if (targetProgress === 100 && 100 - displayedProgress < 0.35) displayedProgress = 100;
    const rounded = Math.round(displayedProgress);
    loaderProgressBar?.style.setProperty("transform", `scaleX(${displayedProgress / 100})`);
    if (loaderProgressText) loaderProgressText.textContent = `${rounded}%`;
    if (!finished || displayedProgress < 100) window.requestAnimationFrame(renderProgress);
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    targetProgress = 100;
    const remainingDelay = Math.max(0, 900 - (performance.now() - startedAt));
    window.setTimeout(() => {
      loaderProgressBar?.style.setProperty("transform", "scaleX(1)");
      if (loaderProgressText) loaderProgressText.textContent = "100%";
      pageLoader.classList.add("is-complete");
      document.documentElement.classList.remove("is-loading");
      window.setTimeout(() => pageLoader.remove(), 760);
    }, remainingDelay + 240);
  };

  const completeTask = (name) => {
    if (completed.has(name)) return;
    completed.add(name);
    targetProgress = Object.entries(weights).reduce(
      (sum, [task, weight]) => sum + (completed.has(task) ? weight : 0),
      0,
    );
    if (completed.size === Object.keys(weights).length) finish();
  };

  window.requestAnimationFrame(renderProgress);
  completeTask("styles");

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => completeTask("document"), { once: true });
  } else {
    completeTask("document");
  }

  if (!heroLogoImage || heroLogoImage.complete) {
    completeTask("logo");
  } else {
    heroLogoImage.addEventListener("load", () => completeTask("logo"), { once: true });
    heroLogoImage.addEventListener("error", () => completeTask("logo"), { once: true });
  }

  const posterPreload = new Image();
  posterPreload.addEventListener("load", () => completeTask("poster"), { once: true });
  posterPreload.addEventListener("error", () => completeTask("poster"), { once: true });
  posterPreload.src = heroVideo?.poster || "assets/posters/pool.png";

  if (!heroVideo || heroVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    completeTask("video");
  } else {
    heroVideo.addEventListener("loadeddata", () => completeTask("video"), { once: true });
    heroVideo.addEventListener("error", () => completeTask("video"), { once: true });
  }

  window.setTimeout(() => {
    Object.keys(weights).forEach(completeTask);
  }, 6500);
}

function loadPhotoAssets() {
  if (photoAssetsLoaded) return;
  photoAssetsLoaded = true;

  polaroids.forEach((card) => {
    const image = card.querySelector("img[data-src]");
    if (!image) return;
    image.src = image.dataset.src;
    image.removeAttribute("data-src");
    image.decoding = "async";
  });

  const source = photoBackgroundVideo?.querySelector("source[data-src]");
  if (source) {
    source.src = source.dataset.src;
    source.removeAttribute("data-src");
    photoBackgroundVideo.load();
  }
}

function unlockSyntheticAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  synthAudioContext ??= new AudioContextClass();
  synthAudioContext.resume().catch(() => {});
}

function stopSyntheticAudio() {
  const now = synthAudioContext?.currentTime ?? 0;

  synthAudioNodes.forEach(({ oscillator, gain }) => {
    try {
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      oscillator.stop(now + 0.14);
    } catch {}
  });

  synthAudioNodes = [];
  usingSyntheticAudio = false;
}

async function playSyntheticClue() {
  stopSyntheticAudio();

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return false;

  synthAudioContext ??= new AudioContextClass();
  await synthAudioContext.resume();

  const now = synthAudioContext.currentTime;
  const roots = [110, 130.81, 146.83, 164.81, 174.61, 196, 220];
  const root = roots[Math.max(0, activeClueIndex) % roots.length];
  const voices = [
    { ratio: 1, volume: 0.035, type: "sine" },
    { ratio: 1.5, volume: 0.018, type: "triangle" },
    { ratio: 2, volume: 0.009, type: "sine" },
  ];

  synthAudioNodes = voices.map((voice, index) => {
    const oscillator = synthAudioContext.createOscillator();
    const gain = synthAudioContext.createGain();
    const filter = synthAudioContext.createBiquadFilter();

    oscillator.type = voice.type;
    oscillator.frequency.value = root * voice.ratio;
    oscillator.detune.value = index === 1 ? 5 : index === 2 ? -7 : 0;
    filter.type = "lowpass";
    filter.frequency.value = 900 + activeClueIndex * 130;
    filter.Q.value = 0.7;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(voice.volume, now + 0.22);

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(synthAudioContext.destination);
    oscillator.start(now);

    return { oscillator, gain };
  });

  usingSyntheticAudio = true;
  return true;
}

function splitRevealText(element, startDelay = 0, options = {}) {
  if (!element || (element.dataset.splitDone === "true" && !options.force)) return 0;

  const text = options.text ?? element.textContent;
  const chars = Array.from(text);
  element.textContent = "";
  element.classList.add("rb-text");
  chars.forEach((char, index) => {
    const span = document.createElement("span");
    span.className = char === " " ? "char space" : "char";
    span.style.setProperty("--delay", `${startDelay + index * (options.step ?? 34)}ms`);
    span.textContent = char === " " ? "\u00a0" : char;
    element.appendChild(span);
  });
  element.dataset.splitDone = "true";

  return chars.length;
}

function revealSplitText(element, className = "rb-visible") {
  if (!element) return;

  element.classList.remove(className);
  element.offsetWidth;
  element.classList.add(className);
}

function setSplitText(element, text, startDelay = 0, options = {}) {
  splitRevealText(element, startDelay, { ...options, text, force: true });
  revealSplitText(element);
}

function prepareBlurText(element, startDelay = 0, step = 46) {
  if (!element) return;

  const text = element.textContent;
  element.textContent = "";
  element.classList.add("blur-text");

  Array.from(text).forEach((character, index) => {
    const span = document.createElement("span");
    span.className = character === " " ? "blur-char space" : "blur-char";
    span.style.setProperty("--blur-delay", `${startDelay + index * step}ms`);
    span.textContent = character === " " ? "\u00a0" : character;
    element.appendChild(span);
  });
}

function replayClueBlurText() {
  const copy = document.querySelector(".clue-center");
  if (!copy) return;

  copy.classList.remove("is-blur-visible");
  void copy.offsetWidth;
  copy.classList.add("is-blur-visible");
}

function waitForTypewriter(duration, token) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(token === lyricTypeToken), duration);
  });
}

async function clearTypedLyric({ respectPause = false } = {}) {
  if (!lyricMain) return;

  const token = ++lyricTypeToken;
  lyricMain.classList.add("is-text-type");

  if (reducedMotionQuery.matches) {
    lyricMain.textContent = "";
    return;
  }

  if (respectPause && lyricTypeCompletedAt) {
    const remainingPause = Math.max(
      0,
      lyricTypeSettings.pauseDuration - (performance.now() - lyricTypeCompletedAt),
    );
    if (remainingPause && !(await waitForTypewriter(remainingPause, token))) return;
  }

  while (lyricMain.textContent.length) {
    lyricMain.textContent = Array.from(lyricMain.textContent).slice(0, -1).join("");
    if (!(await waitForTypewriter(lyricTypeSettings.deletingSpeed, token))) return;
  }
}

async function typeLyric(text, { deleteCurrent = false } = {}) {
  if (!lyricMain) return;

  if (deleteCurrent) await clearTypedLyric();

  const token = ++lyricTypeToken;
  const nextText = `“${text}”`;
  lyricMain.classList.add("is-text-type");
  lyricMain.style.setProperty(
    "--cursor-blink-duration",
    `${lyricTypeSettings.cursorBlinkDuration}ms`,
  );
  lyricMain.setAttribute("aria-label", nextText);
  lyricMain.textContent = "";

  if (reducedMotionQuery.matches) {
    lyricMain.textContent = nextText;
    lyricTypeCompletedAt = performance.now();
    return;
  }

  for (const character of Array.from(nextText)) {
    lyricMain.textContent += character;
    if (!(await waitForTypewriter(lyricTypeSettings.typingSpeed, token))) return;
  }

  lyricTypeCompletedAt = performance.now();
}

const titleCharCount = splitRevealText(document.querySelector(".hero-title"), 0);
splitRevealText(document.querySelector(".hero-subtitle"), 260 + titleCharCount * 24);

document.querySelectorAll(".glass-player p, .clue-object strong").forEach((element, index) => {
  splitRevealText(element, index * 32, { step: 24 });
  revealSplitText(element);
});

prepareBlurText(document.querySelector(".clue-center h1"), 0, 54);
prepareBlurText(document.querySelector(".clue-center p"), 180, 24);
replayClueBlurText();

function revealHeroIntro() {
  heroReveal?.classList.add("is-revealed");
  heroReveal?.setAttribute("aria-hidden", "false");
}

revealHeroIntro();
heroVideo?.play?.().catch(() => {});

function revealPhotoScreen() {
  loadPhotoAssets();
  photoScreen?.classList.add("is-photo-visible");
  photoBackgroundVideo?.play?.().catch(() => {});
  renderPhotoCarousel();
  window.clearTimeout(photoGuideStartTimer);
  photoGuideStartTimer = window.setTimeout(
    playPhotoDiscoveryGuide,
    reducedMotionQuery.matches ? 80 : mobileQuery.matches ? 460 : 920,
  );
  startPhotoAutoplay();
}

function photoLayoutFor(offset) {
  const compact = window.matchMedia("(max-width: 560px)").matches;
  const step = compact ? 204 : 314;
  const distance = Math.abs(offset);
  const direction = Math.sign(offset);

  if (distance === 0) {
    return { y: 0, z: 100, rx: 0, scale: 1, opacity: 1, blur: 0 };
  }

  if (distance === 1) {
    return {
      y: direction * step,
      z: compact ? -95 : -120,
      rx: direction * -58,
      scale: compact ? 0.86 : 0.88,
      opacity: 0.56,
      blur: 1.2,
    };
  }

  return {
    y: direction * step * 1.72,
    z: -290,
    rx: direction * -72,
    scale: 0.72,
    opacity: 0.06,
    blur: 4.5,
  };
}

function renderPhotoCarousel() {
  const count = polaroids.length;
  if (!count) return;

  polaroids.forEach((card, index) => {
    let offset = index - activePhotoIndex;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;

    const layout = photoLayoutFor(offset);
    card.classList.remove("is-tilting");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--tilt-scale", "1");
    card.style.setProperty("--gallery-y", `${layout.y}px`);
    card.style.setProperty("--gallery-z", `${layout.z}px`);
    card.style.setProperty("--gallery-rx", `${layout.rx}deg`);
    card.style.setProperty("--gallery-scale", layout.scale);
    card.style.setProperty("--gallery-opacity", layout.opacity);
    card.style.setProperty("--gallery-blur", `${layout.blur}px`);
    card.style.zIndex = String(10 - Math.abs(offset));
    card.classList.toggle("is-active", offset === 0);
    card.setAttribute("aria-current", offset === 0 ? "true" : "false");
    card.tabIndex = offset === 0 ? 0 : -1;
  });

  if (photoPositionCurrent) {
    photoPositionCurrent.textContent = String(activePhotoIndex + 1).padStart(2, "0");
  }
  if (photoPositionTotal) {
    photoPositionTotal.textContent = String(count).padStart(2, "0");
  }
}

function dismissPhotoDiscoveryGuide() {
  window.clearTimeout(photoGuideStartTimer);
  window.clearTimeout(photoGuideTimer);
  photoGuideStartTimer = 0;
  photoGuideTimer = 0;
  polaroids.forEach((card) => card.classList.remove("is-photo-previewing"));
}

function playPhotoDiscoveryGuide() {
  if (!polaroidWall || polaroids.length < 2) return;

  dismissPhotoDiscoveryGuide();
  const candidates = polaroids.filter((_, index) => index !== activePhotoIndex);
  const previewCard = candidates[photoGuideIndex % candidates.length];
  photoGuideIndex = (photoGuideIndex + 1) % Math.max(candidates.length, 1);
  if (!previewCard) return;

  void previewCard.offsetWidth;
  previewCard.classList.add("is-photo-previewing");
  photoGuideTimer = window.setTimeout(() => {
    previewCard.classList.remove("is-photo-previewing");
  }, reducedMotionQuery.matches ? 80 : 1500);
}

function setActivePhoto(index) {
  if (!polaroids.length) return;
  activePhotoIndex = (index + polaroids.length) % polaroids.length;
  renderPhotoCarousel();
}

function stopPhotoAutoplay() {
  window.clearInterval(photoAutoplayTimer);
  photoAutoplayTimer = 0;
}

function startPhotoAutoplay() {
  stopPhotoAutoplay();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  photoAutoplayTimer = window.setInterval(() => setActivePhoto(activePhotoIndex + 1), 4200);
}

function goToScreen(index) {
  if (index === 2) revealPhotoScreen();
  if (index === 1) {
    let selectedObject = clueObjects.find((object) => object.classList.contains("active"));
    if (!selectedObject && clueObjects[0]) {
      activeClueIndex = 0;
      currentClue = musicMap[clueObjects[0].dataset.clue] ?? musicMap.vinyl;
      clueObjects[0].classList.add("active");
      selectedObject = clueObjects[0];
      currentCarouselRotation = targetRotationFor(0);
      applyOrbit(currentCarouselRotation);
      updateCopy(currentClue);
      updateGlow(currentClue);
      syncAudioSource(currentClue);
    }
    selectedObject?.classList.add("active");
    replayClueBlurText();
  }

  if (mobileQuery.matches) {
    screens[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  journey?.style.setProperty("--journey-x", `-${index * 100}vw`);
}

function ripple(button) {
  if (!button) return;

  button.classList.remove("is-rippling");
  window.requestAnimationFrame(() => button.classList.add("is-rippling"));
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function normalizeAngle(angle) {
  return ((angle + 180) % 360) - 180;
}

function shortestDelta(from, to) {
  return normalizeAngle(to - from);
}

function presentationFor(angle, baseRotation) {
  const distance = Math.abs(normalizeAngle(angle - centerAngle));
  const visibleStart = 44;
  const visibleEnd = 74;
  const fadeProgress = Math.min(Math.max((distance - visibleStart) / (visibleEnd - visibleStart), 0), 1);
  const depth = Math.min(distance / visibleEnd, 1);
  const side = angle < centerAngle ? 1 : -1;
  const edgeFade = 1 - easeInOutCubic(fadeProgress);
  const opacity = distance <= visibleStart ? 1 - depth * 0.16 : edgeFade * 0.58;
  const scale = distance <= visibleStart ? 1.2 - depth * 0.16 : 0.66 + edgeFade * 0.3;

  return {
    rotate: baseRotation + side * depth * 8,
    scale,
    opacity: Math.max(opacity, 0),
    interactive: opacity > 0.28,
  };
}

function orbitValue(index, rotation) {
  const angle = baseAngles[index] + rotation;
  const rad = (angle * Math.PI) / 180;
  const presentation = presentationFor(angle, baseRotations[index]);

  return {
    angle,
    x: Math.cos(rad) * orbitRadius.x,
    y: -Math.sin(rad) * orbitRadius.y,
    ...presentation,
  };
}

function setObjectOrbit(object, value) {
  object.style.setProperty("--arc-x", `${value.x.toFixed(2)}px`);
  object.style.setProperty("--arc-y", `${value.y.toFixed(2)}px`);
  object.style.setProperty("--r", `${value.rotate.toFixed(2)}deg`);
  object.style.setProperty("--arc-scale", value.scale.toFixed(3));
  object.style.setProperty("--arc-opacity", value.opacity.toFixed(3));
  object.style.setProperty("--arc-events", value.interactive ? "auto" : "none");
  object.dataset.angle = String(value.angle);
}

function applyOrbit(rotation) {
  clueObjects.forEach((object, index) => setObjectOrbit(object, orbitValue(index, rotation)));
}

function targetRotationFor(index) {
  return centerAngle - baseAngles[index];
}

function animateCarouselTo(selectedIndex, token) {
  const targetRotation = targetRotationFor(selectedIndex);
  const startRotation = currentCarouselRotation;
  const delta = shortestDelta(startRotation, targetRotation);
  const duration = 1100;
  const startedAt = performance.now();

  clueOrbit?.classList.add("is-orbiting");

  return new Promise((resolve) => {
    function tick(now) {
      if (token !== selectionToken) {
        clueOrbit?.classList.remove("is-orbiting");
        resolve();
        return;
      }

      const progress = Math.min((now - startedAt) / duration, 1);
      const rotation = startRotation + delta * easeInOutCubic(progress);
      applyOrbit(rotation);

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      } else {
        currentCarouselRotation = targetRotation;
        applyOrbit(currentCarouselRotation);
        clueOrbit?.classList.remove("is-orbiting");
        resolve();
      }
    }

    window.requestAnimationFrame(tick);
  });
}

function parseLrc(source) {
  const entries = [];
  const timestampPattern = /\[(\d{1,2}):(\d{2})(?:[.:](\d{1,3}))?\]/g;

  source.split(/\r?\n/).forEach((line) => {
    const stamps = Array.from(line.matchAll(timestampPattern));
    if (!stamps.length) return;

    const text = line.replace(timestampPattern, "").trim();
    if (!text) return;

    stamps.forEach((stamp) => {
      const fraction = (stamp[3] ?? "0").padEnd(3, "0").slice(0, 3);
      entries.push({
        time: Number(stamp[1]) * 60 + Number(stamp[2]) + Number(fraction) / 1000,
        text,
      });
    });
  });

  return entries.sort((a, b) => a.time - b.time);
}

function setCurvedLyricLine(text) {
  if (!generatedLyric) return;

  generatedLyric.textContent = text || "";
  generatedLyric.dataset.text = text || "";
  const characterCount = Math.max(Array.from(text || "").length, 1);
  const generateDuration = Math.min(1.8, Math.max(0.72, characterCount * 0.055));
  generatedLyric.style.setProperty("--lyric-steps", characterCount);
  generatedLyric.style.setProperty("--lyric-generate-duration", `${generateDuration}s`);
  generatedLyric.style.setProperty("--lyric-glitch-delay", `${generateDuration + 0.18}s`);
  generatedLyric.classList.remove("is-generating");
  generatedLyric.offsetWidth;
  generatedLyric.classList.add("is-generating");
}

function buildLyricIntro(clue = currentClue) {
  if (!clue) return "";

  const spacer = "　　　";
  return `${clue.title} / ${clue.artist}`;
}

async function loadLyrics(clue) {
  const token = ++lyricLoadToken;
  activeLyrics = [];
  activeLyricIndex = -1;
  setCurvedLyricLine("");

  if (!clue?.lrc) return;

  try {
    let lyrics = lyricCache.get(clue.lrc);
    if (!lyrics) {
      const response = await fetch(clue.lrc);
      if (!response.ok) throw new Error(`LRC ${response.status}`);
      lyrics = parseLrc(await response.text());
      lyricCache.set(clue.lrc, lyrics);
    }

    if (token !== lyricLoadToken || clue !== currentClue) return;
    activeLyrics = lyrics;
    if (activeLyrics.length) {
      activeLyricIndex = -1;
      setCurvedLyricLine(buildLyricIntro(clue));
    }
    syncLyricToTime(clueAudio.currentTime, true);
  } catch {
    if (token !== lyricLoadToken) return;
    activeLyrics = [];
    setCurvedLyricLine("");
  }
}

function syncLyricToTime(time, force = false) {
  if (!activeLyrics.length) return;

  let low = 0;
  let high = activeLyrics.length - 1;
  let match = -1;

  while (low <= high) {
    const middle = (low + high) >> 1;
    if (activeLyrics[middle].time <= time + 0.08) {
      match = middle;
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }

  if (match < 0) {
    if (force || activeLyricIndex !== -1) {
      setCurvedLyricLine(buildLyricIntro());
    }
    activeLyricIndex = -1;
    return;
  }
  if (!force && match === activeLyricIndex) return;
  activeLyricIndex = match;
  setCurvedLyricLine(activeLyrics[match].text);
}

function updateCopy(clue) {
  setSplitText(musicTitle, clue.title, 0, { step: 24 });
  setSplitText(musicDesc, clue.artist, 120, { step: 18 });
  setSplitText(lyricMain, `“${clue.lyrics?.[0] ?? ""}”`, 0, { step: 30 });
  setSplitText(lyricAccent, clue.accent, 260, { step: 36 });
  if (playerCover && clue.cover) playerCover.src = clue.cover;
  if (coverCircularText) {
    const circularLabel = `${clue.title} · ${clue.artist} · `;
    coverCircularText.textContent = circularLabel.repeat(2);
    coverCircularText.closest("text")?.style.setProperty(
      "font-size",
      circularLabel.length > 28 ? "7px" : circularLabel.length > 20 ? "7.8px" : "8.6px",
    );
  }
  setCurvedLyricLine("");
  loadLyrics(clue);
}

function updateGlow(clue) {
  if (!clueScreen || !clue?.glow) return;

  clueScreen.style.setProperty("--clue-glow", clue.glow[0]);
  clueScreen.style.setProperty("--clue-glow-soft", clue.glow[1] ?? clue.glow[0]);
  clueScreen.style.setProperty("--clue-glow-accent", clue.glow[2] ?? clue.glow[1] ?? clue.glow[0]);
}

function syncAudioSource(clue) {
  if (!clue?.audio) return false;

  const source = new URL(clue.audio, window.location.href).href;
  if (clueAudio.src !== source) {
    clueAudio.pause();
    clueAudio.src = source;
    clueAudio.load();
  }

  playerTurntable?.classList.remove("is-audio-missing");
  if (playerStatus) playerStatus.title = "";
  return true;
}

function setPlayback(isPlaying) {
  if (!isPlaying) {
    clueAudio.pause();
    stopSyntheticAudio();
  }
  playerTurntable?.classList.toggle("is-playing", isPlaying);
  lyricPanel?.classList.toggle("is-visible", isPlaying);
  lyricPanel?.classList.toggle("is-preview", !isPlaying);
  lyricPanel?.classList.remove("is-exiting");
  playerIcon?.setAttribute("aria-pressed", String(isPlaying));
  if (isPlaying) {
    typeLyric(currentClue.lyrics?.[0] ?? "", { deleteCurrent: true });
    syncLyricToTime(clueAudio.currentTime, true);
  }
  playerIcon?.setAttribute("aria-label", isPlaying ? "暂停当前歌曲" : "播放当前歌曲");
}

async function playCurrentClue() {
  if (!syncAudioSource(currentClue)) return;

  try {
    await clueAudio.play();
    usingSyntheticAudio = false;
    setPlayback(true);
  } catch {
    const fallbackStarted = await playSyntheticClue();
    if (fallbackStarted) {
      playerTurntable?.classList.remove("is-audio-missing");
      if (playerStatus) playerStatus.title = "Demo audio";
      setPlayback(true);
      return;
    }
    setPlayback(false);
    playerTurntable?.classList.add("is-audio-missing");
    if (playerStatus) playerStatus.title = "音频资源待补充";
  }
}

async function swapPlayerAndLyric(clue, hasPrevious, token) {
  if (hasPrevious) {
    playerTurntable?.classList.add("is-exiting");
    lyricPanel?.classList.add("is-exiting");
    lyricPanel?.classList.remove("is-visible", "is-preview");
    await wait(playerExitDuration);
  }

  if (token !== selectionToken) return;

  playerTurntable?.classList.remove("is-visible", "is-exiting");
  lyricPanel?.classList.remove("is-visible", "is-preview", "is-exiting");
  updateCopy(clue);
  setPlayback(false);
  clueAudio.currentTime = 0;
  syncAudioSource(clue);

  lyricPanel?.offsetWidth;
  playerTurntable?.offsetWidth;

  window.requestAnimationFrame(() => {
    if (token !== selectionToken) return;
    playerTurntable?.classList.add("is-visible");
  });
}

function setActiveClue(object) {
  const selectedIndex = clueObjects.indexOf(object);
  const clue = musicMap[object.dataset.clue];

  if (!clue || selectedIndex < 0) return;

  clueOrbit?.classList.add("has-user-selection");
  const token = ++selectionToken;
  const hasPrevious = playerTurntable?.classList.contains("is-visible") || lyricPanel?.classList.contains("is-visible");
  currentClue = clue;
  setPlayback(false);
  clueAudio.currentTime = 0;
  updateGlow(clue);

  clueObjects.forEach((item) => item.classList.remove("active"));
  activeClueIndex = selectedIndex;

  animateCarouselTo(selectedIndex, token).then(() => {
    if (token === selectionToken) object.classList.add("active");
  });

  swapPlayerAndLyric(clue, hasPrevious, token);
}

findPopoButton?.addEventListener("click", () => {
  ripple(findPopoButton);
  goToScreen(1);
});

screenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    ripple(button);
    goToScreen(Number(button.dataset.screen));
  });
});

playerIcon?.addEventListener("click", () => {
  unlockSyntheticAudio();

  if (!playerTurntable?.classList.contains("is-visible")) {
    playerTurntable?.classList.add("is-visible");
    updateCopy(currentClue);
  }

  if (playerTurntable?.classList.contains("is-playing")) {
    setPlayback(false);
  } else {
    playCurrentClue();
  }
});

clueAudio.addEventListener("ended", () => setPlayback(false));
clueAudio.addEventListener("timeupdate", () => syncLyricToTime(clueAudio.currentTime));
clueAudio.addEventListener("seeked", () => syncLyricToTime(clueAudio.currentTime, true));
clueAudio.addEventListener("loadedmetadata", () => syncLyricToTime(clueAudio.currentTime, true));
clueAudio.addEventListener("error", () => {
  if (usingSyntheticAudio) return;
  setPlayback(false);
  playerTurntable?.classList.add("is-audio-missing");
  if (playerStatus) playerStatus.title = "音频资源待补充";
});

function appendConversationMessage(role, text, extraClass = "") {
  if (!chatConversation || !chatConversationList) return null;

  chatConversation.classList.add("is-open");
  const row = document.createElement("div");
  row.className = `conversation-row is-${role}${extraClass ? ` ${extraClass}` : ""}`;
  const bubble = document.createElement("div");
  bubble.className = "conversation-bubble";

  if (role === "popo" && !extraClass.includes("is-typing")) {
    bubble.classList.add("has-flip-words");
    Array.from(text).forEach((character, index) => {
      const span = document.createElement("span");
      span.className = character === " " ? "flip-word-char is-space" : "flip-word-char";
      span.style.setProperty("--flip-delay", `${index * 24}ms`);
      span.textContent = character === " " ? "\u00a0" : character;
      bubble.appendChild(span);
    });
  } else {
    bubble.textContent = text;
  }

  row.appendChild(bubble);
  chatConversationList.appendChild(row);
  chatConversationList.scrollTo({
    top: chatConversationList.scrollHeight,
    behavior: reducedMotionQuery.matches ? "auto" : "smooth",
  });
  return row;
}

function localPopoReply(text) {
  const activeKey = clueObjects[activeClueIndex]?.dataset.clue;
  const clueReplies = {
    vinyl: "唱针落下的时候，我好像就在旋律的另一面。",
    headphone: "戴上耳机，也许能听见我靠近的方向。",
    pool: "水面晃了一下，那可能是我留下的节拍。",
    city: "霓虹闪过的街角，藏着我经过的影子。",
    walkman: "按下播放键，旧时光会替我回答你。",
    cassette: "磁带转动时，别错过夹在噪声里的线索。",
    speaker: "跟着低频往前走，我可能就在不远处。",
  };

  if (/(你好|嗨|hello|hi\b)/i.test(text)) return "嗨，我好像在附近听见你了。";
  if (/(在哪|哪里|位置|where)/i.test(text)) return "跟着正在发光的线索找我吧。";
  if (/(音乐|歌曲|播放|声音|music|song|play)/i.test(text)) return "试试听听当前物件留下的声音。";
  if (/(照片|相机|photo|camera)/i.test(text)) return "照片的边缘，也许藏着我经过的时间。";
  if (/(喜欢|爱|想你|miss|love)/i.test(text)) return "这句话我收到了，先把它藏进这段旋律里。";
  if (/popo/i.test(text)) return "你叫到我的名字了。再靠近一条线索吧。";
  if (activeKey && clueReplies[activeKey]) return clueReplies[activeKey];

  const fallbacks = ["我收到你的消息了。", "再靠近一点，也许就能找到我。", "这也是一条新的线索。"];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

async function replyToConversation(text) {
  const token = ++conversationReplyToken;
  const typingRow = appendConversationMessage("popo", "•••", "is-typing");
  await wait(reducedMotionQuery.matches ? 80 : 720 + Math.random() * 480);

  if (token !== conversationReplyToken) {
    typingRow?.remove();
    return;
  }

  typingRow?.remove();
  appendConversationMessage("popo", localPopoReply(text));
}

clueChat?.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = clueChatInput?.value.trim();
  if (!text) {
    clueChatInput?.focus();
    return;
  }

  window.setTimeout(
    () => appendConversationMessage("user", text),
    reducedMotionQuery.matches ? 0 : 80,
  );
  window.setTimeout(
    () => replyToConversation(text),
    reducedMotionQuery.matches ? 10 : 260,
  );
  clueChat.classList.remove("is-sending");
  void clueChat.offsetWidth;
  clueChat.classList.add("is-sending");
  window.setTimeout(() => clueChat.classList.remove("is-sending"), 420);
  clueChat.reset();
  clueChatInput?.focus();
});

clueObjects.forEach((object) => {
  object.addEventListener("click", () => setActiveClue(object));
});

polaroids.forEach((card) => {
  const resetTilt = () => {
    card.classList.remove("is-tilting");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--tilt-scale", "1");
  };

  card.addEventListener("pointermove", (event) => {
    if (
      event.pointerType === "touch" ||
      mobileQuery.matches ||
      reducedMotionQuery.matches
    ) {
      resetTilt();
      return;
    }

    const bounds = card.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    const rotateAmplitude = 28;
    const rotateX = (0.5 - y) * rotateAmplitude * 2;
    const rotateY = (x - 0.5) * rotateAmplitude * 2;
    const hoverScale = card.classList.contains("is-active") ? 1.35 : 1.08;

    card.classList.add("is-tilting");
    card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
    card.style.setProperty("--tilt-scale", hoverScale);
  });

  card.addEventListener("pointerleave", resetTilt);
  card.addEventListener("pointercancel", resetTilt);
  card.addEventListener("blur", resetTilt);

  card.addEventListener("click", () => {
    dismissPhotoDiscoveryGuide();
    const cardIndex = Number(card.dataset.photoIndex);
    if (cardIndex !== activePhotoIndex) {
      setActivePhoto(cardIndex);
      startPhotoAutoplay();
      return;
    }

    const image = card.querySelector("img");
    if (!lightbox || !lightboxImage || !image) return;

    lightboxImage.src = card.dataset.poster;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

polaroidWall?.addEventListener("mouseenter", stopPhotoAutoplay);
polaroidWall?.addEventListener("mouseleave", startPhotoAutoplay);
polaroidWall?.addEventListener("focusin", stopPhotoAutoplay);
polaroidWall?.addEventListener("focusout", startPhotoAutoplay);

polaroidWall?.addEventListener("wheel", (event) => {
  event.preventDefault();
  dismissPhotoDiscoveryGuide();
  if (photoWheelLocked || Math.abs(event.deltaY) < 4) return;
  photoWheelLocked = true;
  setActivePhoto(activePhotoIndex + (event.deltaY > 0 ? 1 : -1));
  window.setTimeout(() => {
    photoWheelLocked = false;
  }, 720);
}, { passive: false });

polaroidWall?.addEventListener("keydown", (event) => {
  if (!["ArrowUp", "ArrowDown"].includes(event.key)) return;
  event.preventDefault();
  dismissPhotoDiscoveryGuide();
  setActivePhoto(activePhotoIndex + (event.key === "ArrowDown" ? 1 : -1));
});

window.addEventListener("resize", renderPhotoCarousel);

function closePreview() {
  lightbox?.classList.remove("is-open");
  lightbox?.setAttribute("aria-hidden", "true");
  if (lightboxImage) lightboxImage.src = "";
}

closeLightbox?.addEventListener("click", closePreview);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closePreview();
});

xiaohongshuLink?.addEventListener("click", (event) => {
  event.preventDefault();
  const action = xiaohongshuLink.closest(".social-action");
  action?.classList.remove("is-showing-message");
  action?.offsetWidth;
  action?.classList.add("is-showing-message");
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePreview();
});

const resetJourney = () => journey?.style.removeProperty("--journey-x");

if (typeof mobileQuery.addEventListener === "function") {
  mobileQuery.addEventListener("change", resetJourney);
} else if (typeof mobileQuery.addListener === "function") {
  mobileQuery.addListener(resetJourney);
}

if ("IntersectionObserver" in window && photoScreen) {
  const photoObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0.28)) {
        revealPhotoScreen();
        photoObserver.disconnect();
      }
    },
    { threshold: [0.28] },
  );
  photoObserver.observe(photoScreen);
}

initializePageLoader();
currentCarouselRotation = targetRotationFor(activeClueIndex);
applyOrbit(currentCarouselRotation);
renderPhotoCarousel();
if (clueObjects[activeClueIndex]) {
  clueObjects[activeClueIndex].classList.add("active");
  currentClue = musicMap[clueObjects[activeClueIndex].dataset.clue];
  updateCopy(currentClue);
  updateGlow(currentClue);
  syncAudioSource(currentClue);
}

const initialScreen = {
  "#clues": 1,
  "#photos": 2,
}[window.location.hash];

if (initialScreen !== undefined) {
  window.requestAnimationFrame(() => goToScreen(initialScreen));
}
