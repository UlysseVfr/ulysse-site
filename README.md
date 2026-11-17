# Ulysse Vaufrey: personal site + AI chatbot

A one-page site with a chatbot that answers recruiters' questions as me, using only my profile.
Hosted on Vercel (free), AI by Groq (free tier, no credit card).

## Files

| File | Role |
|---|---|
| `index.html`, `style.css` | The showcase page |
| `chat.js` | Chat widget (suggested questions, fallback mode, 25 msgs/day per visitor) |
| `api/chat.js` | Serverless function: adds the profile + rules and calls the AI. The API key stays server-side. |
| `api/_profile.js` | **The profile: the only thing the bot knows.** Edit it to improve answers. |
| `data/faq.json` | Pre-written EN/FR answers used if the AI is down or out of quota |

## Settings (Vercel → Settings → Environment Variables)

- `AI_API_KEY`: Groq API key (required)
- `AI_MODEL`: optional, defaults to `llama-3.3-70b-versatile`. If the bot only gives fallback answers, check https://console.groq.com/docs/models and set a current model here.

Every commit to `main` redeploys the site automatically.

## Updating
- Fill in the `TODO` lines in `api/_profile.js`. Lines that still contain `TODO` are ignored by the bot.
- CV download: add a CV **without street address and phone number** as `assets/CV_Ulysse_Vaufrey.pdf`, then uncomment the button in `index.html`.
