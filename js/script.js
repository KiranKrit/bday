/*
  PERSONALIZATION
  ----------------
  Replace these values. Put your photos in assets/photos/.
  The countdown has been removed because the birthday surprise is now live.
*/
const CONFIG = {
  recipientName: "Kiran",
  senderName: "Kritagya",

  birthdayMessage:
    "I hope this year brings you happiness, beautiful moments, new adventures, and countless reasons to smile.",

  musicFile: "assets/music/background.mp3",
  secondMusicFile: "assets/music/second-song.mp3",

  photoStory: [
    {
      image: "assets/photos/photo1.jpeg",
      caption: "A little sunshine by the water.",
      message: "Some pictures just make you stop for a second and smile."
    },
    {
      image: "assets/photos/photo2.jpeg",
      caption: "A softer little moment.",
      message: "And then there are moments that feel warm without even trying."
    },
    {
      image: "assets/photos/photo3.jpeg",
      caption: "One of those quiet smiles.",
      message: "I think your smile has a way of making ordinary moments feel special."
    },
    {
      image: "assets/photos/photo4.jpeg",
      caption: "A tiny bit of attitude.",
      message: "Somehow, even your simplest expressions have a way of staying in my mind."
    },
    {
      image: "assets/photos/photo5.jpeg",
      caption: "A moment worth keeping.",
      message: "Maybe I notice these little things because you have become a little more special to me."
    },
    {
      image: "assets/photos/photo6.jpeg",
      caption: "A beautiful day.",
      message: "You look genuinely happy here, and that is something I hope you have a lot more of."
    },
    {
      image: "assets/photos/photo7.jpeg",
      caption: "Just you being you.",
      message: "No big reason. I just really like this picture of you."
    },
    {
      image: "assets/photos/photo8.jpeg",
      caption: "And now for the honest part...",
      message: "After all these pictures, maybe it is time I finally tell you what I have been thinking."
    },
    {
      image: "assets/photos/photo9.jpeg",
      caption: "Some people don't even have to try.",
      message: "You know what I like about this picture? You aren't trying too hard to look beautiful… you just are. ❤️ There's something so effortlessly beautiful about you, and somehow I keep coming back to this picture."
    },
    {
      image: "assets/photos/photo10.jpeg",
      caption: "Okay… that wink was unfair. 😄",
      message: "That little wink definitely deserves a warning. 😂❤️ But honestly, it's your eyes that caught me here. They have this playful little spark that makes your smile even more beautiful."
    },
    {
      image: "assets/photos/photo11.jpeg",
      caption: "There is something beautiful about this moment.",
      message: "I really like this one. Maybe because you're not looking at the camera, you're just being yourself. And those eyes… there's something about them that feels so calm and beautiful. I could look at this picture for a little too long. ❤️"
    },
    {
      image: "assets/photos/photo12.jpeg",
      caption: "And then there's this one…",
      message: "I don't know how you manage to look this beautiful in such a simple moment. Your smile is beautiful, but your eyes are what I notice first. There's something about them that stays in my mind even after I've stopped looking at the picture. ❤️"
    }
  ]
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const screens = {
  birthdayScreen: $("#birthdayScreen"),
  photoScreen: $("#photoScreen"),
  storyScreen: $("#storyScreen"),
  revealScreen: $("#revealScreen"),
  eyesScreen: $("#eyesScreen"),
  likeQuestionScreen: $("#likeQuestionScreen"),
  proposalScreen: $("#proposalScreen"),
  positiveScreen: $("#positiveScreen"),
  timeScreen: $("#timeScreen"),
  finalScreen: $("#finalScreen")
};

let photoIndex = 0;
let musicStarted = false;
let currentMusic = "first";

// EmailJS configuration
const EMAIL_CONFIG = {
  serviceId: "service_cmtlorb",
  templateId: "utslwzc"
};

let finalResponse = {
  likeAnswer: null,
  dateAnswer: null,
  datePreference: null
};

let finalEmailSent = false;

function personalize() {
  $$("[data-recipient]").forEach(el => el.textContent = CONFIG.recipientName);
  $$("[data-sender]").forEach(el => el.textContent = CONFIG.senderName);
  $("[data-birthday-message]").textContent = CONFIG.birthdayMessage;
  document.title = `A Little Something For ${CONFIG.recipientName} ❤️`;
}

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startBirthday() {
  startMusic();
  celebrate();
  showScreen("birthdayScreen");
}

function loadPhoto() {
  const photos = CONFIG.photoStory.filter(p => p.image);
  if (!photos.length) {
    showScreen("storyScreen");
    return;
  }

  const item = photos[photoIndex % photos.length];
  $("#storyImage").src = item.image;
  $("#storyImage").alt = item.caption || "Birthday memory";
  $("#photoCounter").textContent =
    `MEMORY ${String(photoIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
  $("#photoCaption").textContent = item.caption || "";
  $("#photoMessage").textContent = item.message || "";
}

function nextPhoto() {
  const photos = CONFIG.photoStory.filter(p => p.image);
  photoIndex += 1;

  if (photoIndex >= photos.length) {
    showScreen("storyScreen");
    return;
  }
  loadPhoto();
}

function startMusic() {
  if (musicStarted) return;
  const audio = $("#backgroundMusic");
  audio.src = CONFIG.musicFile;
  audio.volume = 0.35;
  audio.play().then(() => {
    musicStarted = true;
    $("#musicToggle").textContent = "🔊";
  }).catch(() => {
    // Browser may require another user gesture; music button remains available.
  });
}

function startSecondMusic() {
  const audio = $("#backgroundMusic");
  audio.pause();
  audio.currentTime = 0;
  audio.src = CONFIG.secondMusicFile;
  audio.volume = 0.35;
  currentMusic = "second";
  audio.play().then(() => {
    musicStarted = true;
    $("#musicToggle").textContent = "🔊";
  }).catch(() => {
    // The transition is triggered by a user click, but some browsers may still block playback.
  });
}

function resetToFirstMusic() {
  const audio = $("#backgroundMusic");
  audio.pause();
  audio.currentTime = 0;
  audio.src = CONFIG.musicFile;
  currentMusic = "first";
  audio.volume = 0.35;
}

function toggleMusic() {
  const audio = $("#backgroundMusic");
  const expectedFile = currentMusic === "second" ? CONFIG.secondMusicFile : CONFIG.musicFile;
  if (!audio.src || !audio.src.endsWith(expectedFile)) audio.src = expectedFile;

  if (audio.paused) {
    audio.play().then(() => {
      musicStarted = true;
      $("#musicToggle").textContent = "🔊";
    }).catch(() => {});
  } else {
    audio.pause();
    $("#musicToggle").textContent = "🔇";
  }
}

function celebrate() {
  const burst = document.querySelector(".birthday-burst");
  burst.animate(
    [{ opacity: 0 }, { opacity: 1 }, { opacity: .7 }],
    { duration: 1400, easing: "ease-out" }
  );

  for (let i = 0; i < 90; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDelay = `${Math.random() * .9}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.background = `hsl(${Math.random() * 360} 65% 75%)`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

function createParticles() {
  const container = $("#particles");
  for (let i = 0; i < 34; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${10 + Math.random() * 18}s`;
    p.style.animationDelay = `${-Math.random() * 18}s`;
    p.style.opacity = `${.15 + Math.random() * .45}`;
    container.appendChild(p);
  }
}


async function sendFinalResponse() {
  if (finalEmailSent) return true;

  const now = new Date();
  const time = now.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });

  const templateParams = {
    event: "FINAL RESPONSE",
    response: finalResponse.likeAnswer || "Not answered",
    time,
    message: [
      `Do you like me? ${finalResponse.likeAnswer || "Not answered"}`,
      `Date proposal? ${finalResponse.dateAnswer || "Not answered"}`,
      `Date preference? ${finalResponse.datePreference || "Not answered"}`
    ].join("\n")
  };

  try {
    await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams
    );
    finalEmailSent = true;
    console.log("Final birthday response email sent successfully.");
    return true;
  } catch (error) {
    console.error("EmailJS failed:", error);
    return false;
  }
}

function bindEvents() {
  $$(".next-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      startMusic();
      if (btn.dataset.next === "photoScreen") {
        photoIndex = 0;
        loadPhoto();
        showScreen("photoScreen");
      }
    });
  });

  $("#nextPhoto").addEventListener("click", nextPhoto);

  $("#revealLike").addEventListener("click", () => showScreen("eyesScreen"));

  $("#eyesContinueBtn").addEventListener("click", () => showScreen("revealScreen"));

  // The first music track changes to Song 2 when she reaches the question.
  $("#openProposal").addEventListener("click", () => {
    startSecondMusic();
    showScreen("likeQuestionScreen");
  });

  $("#likeYesBtn").addEventListener("click", () => {
    finalResponse.likeAnswer = "YES ❤️";
    showScreen("proposalScreen");
  });

  $("#likeMaybeBtn").addEventListener("click", () => {
    finalResponse.likeAnswer = "MAYBE 💕";
    showScreen("proposalScreen");
  });

  $("#likeTimeBtn").addEventListener("click", async () => {
    finalResponse.likeAnswer = "I'M NOT SURE YET 🤍";
    await sendFinalResponse();
    showScreen("timeScreen");
  });

  $("#yesBtn").addEventListener("click", () => {
    finalResponse.dateAnswer = "YES ❤️";
    celebrate();
    showScreen("positiveScreen");
  });

  $("#tryBtn").addEventListener("click", () => {
    finalResponse.dateAnswer = "LET'S GIVE IT A TRY 💕";
    celebrate();
    showScreen("positiveScreen");
  });

  $("#timeBtn").addEventListener("click", async () => {
    finalResponse.dateAnswer = "I NEED SOME TIME 🤍";
    await sendFinalResponse();
    showScreen("timeScreen");
  });

  $$(".date-options button").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".date-options button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      finalResponse.datePreference = btn.dataset.date;
      $("#dateChoice").textContent = `${btn.dataset.date} it is. ❤️`;
      $("#finishPositive").classList.remove("hidden");
    });
  });

  $("#finishPositive").addEventListener("click", async () => {
    await sendFinalResponse();
    showScreen("finalScreen");
  });

  $(".finish-btn").addEventListener("click", () => showScreen("finalScreen"));

  $("#replayBtn").addEventListener("click", () => {
    photoIndex = 0;
    finalResponse = {
      likeAnswer: null,
      dateAnswer: null,
      datePreference: null
    };
    finalEmailSent = false;
    $$(".date-options button").forEach(b => b.classList.remove("selected"));
    $("#dateChoice").textContent = "";
    $("#finishPositive").classList.add("hidden");
    resetToFirstMusic();
    musicStarted = false;
    startMusic();
    showScreen("birthdayScreen");
  });

  $("#musicToggle").addEventListener("click", toggleMusic);
}

personalize();
createParticles();
bindEvents();
