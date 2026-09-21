/*
  PERSONALIZATION
  ----------------
  Replace these values. Put your photos in assets/photos/.
  The countdown has been removed because the birthday surprise is now live.
*/
const CONFIG = {
  recipientName: "[HER_NAME]",
  senderName: "[YOUR_NAME]",

  birthdayMessage:
    "I hope this year brings you happiness, beautiful moments, new adventures, and countless reasons to smile.",

  musicFile: "assets/music/background.mp3",

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
  proposalScreen: $("#proposalScreen"),
  positiveScreen: $("#positiveScreen"),
  timeScreen: $("#timeScreen"),
  finalScreen: $("#finalScreen")
};

let photoIndex = 0;
let musicStarted = false;

// EmailJS configuration
const EMAIL_CONFIG = {
  serviceId: "service_cmtlorb",
  templateId: "utslwzc"
};

let lastProposalResponse = null;

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

function toggleMusic() {
  const audio = $("#backgroundMusic");
  if (!audio.src || !audio.src.endsWith(CONFIG.musicFile)) audio.src = CONFIG.musicFile;

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


async function sendProposalResponse(response, message = "") {
  const now = new Date();
  const time = now.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });

  const templateParams = {
    response,
    time,
    message
  };

  try {
    await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams
    );
    lastProposalResponse = response;
    console.log("Birthday response email sent successfully.");
    return true;
  } catch (error) {
    console.error("EmailJS failed:", error);
    // The romantic flow should still continue even if the notification fails.
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

  $("#revealLike").addEventListener("click", () => showScreen("revealScreen"));
  $("#openProposal").addEventListener("click", () => showScreen("proposalScreen"));

  $("#yesBtn").addEventListener("click", async () => {
    await sendProposalResponse(
      "YES ❤️",
      "She selected YES and is open to going on a date."
    );
    celebrate();
    showScreen("positiveScreen");
  });

  $("#tryBtn").addEventListener("click", async () => {
    await sendProposalResponse(
      "LET'S GIVE IT A TRY 💕",
      "She selected LET'S GIVE IT A TRY."
    );
    celebrate();
    showScreen("positiveScreen");
  });

  $("#timeBtn").addEventListener("click", async () => {
    await sendProposalResponse(
      "I NEED SOME TIME 🤍",
      "She selected I NEED SOME TIME."
    );
    showScreen("timeScreen");
  });

  $$(".date-options button").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".date-options button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      $("#dateChoice").textContent = `${btn.dataset.date} it is. ❤️`;
      $("#finishPositive").classList.remove("hidden");

      // Send the selected first-date preference as a second notification.
      sendProposalResponse(
        lastProposalResponse || "Positive response",
        `First-date preference: ${btn.dataset.date}`
      );
    });
  });

  $("#finishPositive").addEventListener("click", () => showScreen("finalScreen"));
  $(".finish-btn").addEventListener("click", () => showScreen("finalScreen"));

  $("#replayBtn").addEventListener("click", () => {
    photoIndex = 0;
    showScreen("birthdayScreen");
  });

  $("#musicToggle").addEventListener("click", toggleMusic);
}

personalize();
createParticles();
bindEvents();
