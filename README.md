# Birthday Surprise Website ❤️

Final static GitHub Pages project.

- Recipient: Kiran
- Sender: Kritagya
- 12 photos
- Countdown removed
- Song 1: `assets/music/background.mp3`
- Song 2: `assets/music/second-song.mp3` (starts at “Do you like me?”)
- Flow: Birthday → 12 photos → story → eyes message → I LIKE YOU → Do you like me? → date proposal → first-date choice → final screen
- EmailJS sends **one final email only** after the interaction is complete (or immediately when a path ends with “I'm not sure yet” / “I need some time”).
- Replay clears the previous response and allows a fresh final submission.

## EmailJS template

Service ID and Template ID are configured in `js/script.js`.

Use these template variables:

```text
💕 Birthday Surprise — Final Response

Someone has responded to your birthday surprise website.

Event: {{event}}

Response: {{response}}

Time: {{time}}

Message:
{{message}}

---
Birthday Surprise Website
```

The final message contains the complete journey, for example:

```text
Do you like me? YES ❤️
Date proposal? LET'S GIVE IT A TRY 💕
Date preference? Coffee ☕
```
