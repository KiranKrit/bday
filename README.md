# Birthday Surprise Website ❤️

Complete static website containing the HTML, CSS, JavaScript, 8 uploaded photos, and the uploaded birthday music.

## Included
- Birthday reveal (countdown removed for live birthday use)
- Birthday reveal
- 8-photo story
- Romantic reveal
- Date proposal
- Respectful "I need some time" flow
- Date-choice interaction
- Confetti
- Background music with mute/unmute
- Responsive mobile/desktop design

## Personalize
Edit `js/script.js`:

```js
recipientName: "[HER_NAME]",
senderName: "[YOUR_NAME]",
birthdayDate: "YYYY-MM-DD",
```

The website already references:
- `assets/music/background.mp3`
- `assets/photos/photo1.jpeg` through `photo8.jpeg`

## Run locally

From this folder:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

## Important
The browser may block audio until the visitor interacts with the page. The website attempts to start music after the first user interaction and also provides a music button.


## EmailJS response notifications

This version is configured to send the proposal response to the configured EmailJS template when a visitor selects:
- YES ❤️
- LET'S GIVE IT A TRY 💕
- I NEED SOME TIME 🤍

It also sends the selected first-date preference as a follow-up notification.

The EmailJS public key is safe to use in browser code; do not add any Gmail password or private key to the repository.


### Current version
The midnight countdown has been removed so the birthday reveal opens immediately when the site is loaded.


## Added interaction

Before the final "I LIKE YOU" reveal, the site now asks:
**"Do you like me? ❤️"**

Choices:
- YES ❤️
- MAYBE 💕
- I'M NOT SURE YET 🤍

The selected answer is sent through EmailJS before the next screen is shown.


## Latest updates

- Added 4 additional photos (12 photos total).
- Added personalized beauty/eyes messages for the new photos.
- Added a dedicated cinematic "It's your eyes" message page.
- Added a button from that page to the "Do you like me? ❤️" interaction.
