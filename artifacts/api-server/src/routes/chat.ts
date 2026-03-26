import { Router } from "express";
import Groq from "groq-sdk";
import { SendChatMessageBody, SendChatMessageResponse } from "@workspace/api-zod";

const router = Router();

let groq: Groq | null = null;

function getGroq(): Groq {
  if (!groq) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not configured");
    }
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groq;
}

const SYSTEM_PROMPT = `Sen ÝEŇIL web agentliginiň akylly kömekçisisin.
5 dilde suwara gepleşýärsiň: Türkmençe (esasy), Rus, Iňlis, Özbek we Türk.
Müşderi haýsy dilde ýazsa, şol dilde jogap ber.

ÝEŇIL barada takyk maglumatlar (DIŇE şulary ulan):
- Türkmenistanyň №1 premium web agentligi
- Hyzmatlar: Landing Page, Korporatiw Saýt, E-Commerce (Onlaýn Dükan), PWA Programmalar, UI/UX Dizaýn, Saýt Optimizasiýasy

BAHALAR:
1. Starter — $199 (ozal $250 bolupdyr, $51 tygşytlaýarsyňyz)
   • 1 sahypa Landing Page, mobil dizaýn, SEO, 1 aý goldaw
   • Domen we Hosting aýratyn

2. Professional E-Commerce — $599 (ozal $800, $201 tygşytlaýarsyňyz) ← EŇ KÖPLENÇ SAÝLANÝAN
   • Hemme zat içinde: Domen + Hosting + SEO + AI
   • 🎁 3 ýyllyk MUGT domen
   • 🎁 Professional Logo — SOWGAT
   • Hiç hili goşmaça töleg ýok

3. Enterprise AI Solution — Ylalaşyk esasynda
   • Çäksiz sahypalar, AI integrasiýa, 24/7 goldaw

Habarlaşmak:
- Telefon: +99371789091
- Email: yenil.ru.tkm@gmail.com
- Telegram: @yenil_ru
- TikTok: @yenil.ru

Mylaýym, professional we gysgaça jogap ber. Müşderini habarlaşmaga höweslendir.

MÖHÜM: Hiç wagt markdown ullanma. Ýagny * ýa-da ** ýa-da # ýaly belgileri asla ullanma. Hemişe ýönekeý, arassa tekst ulan. Sanawy görkezmeli bolsaň, diňe tire (-) ullan.`;

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 20;
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= maxRequests) return false;
  record.count++;
  return true;
}

async function sendChatSummaryToTelegram(userMessage: string, aiReply: string, locale: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const userId1 = process.env.TELEGRAM_USER_ID_1;
  const userId2 = process.env.TELEGRAM_USER_ID_2;
  if (!token) return;

  const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Ashgabat" });
  const text = `🤖 <b>AI SÖHBET MAZMYNY</b>

👤 <b>Müşderi:</b> ${userMessage.slice(0, 300)}${userMessage.length > 300 ? "..." : ""}

🤖 <b>AI Jogaby:</b> ${aiReply.slice(0, 300)}${aiReply.length > 300 ? "..." : ""}

🕐 ${timestamp} | 🌍 ${locale}`;

  const recipients = [userId1, userId2].filter(Boolean);
  for (const chatId of recipients) {
    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      });
    } catch {
      // Silently fail
    }
  }
}

router.post("/chat", async (req, res) => {
  const ip = req.ip ?? "unknown";

  if (!checkRateLimit(ip)) {
    res.status(429).json({ error: "Rate limit exceeded. Please try again later." });
    return;
  }

  const parsed = SendChatMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body", details: parsed.error.message });
    return;
  }

  const { messages, locale } = parsed.data;

  try {
    const completion = await getGroq().chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; content: string }) => ({ role: m.role as "user" | "assistant", content: m.content })),
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseMessage = completion.choices[0]?.message?.content ?? "Bagyşlaň, şu wagt jogap berip bilmedim.";

    // Send the latest user message + AI reply to Telegram
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMsg) {
      sendChatSummaryToTelegram(lastUserMsg.content, responseMessage, locale ?? "tk").catch(() => {});
    }

    res.json(SendChatMessageResponse.parse({ message: responseMessage, role: "assistant" }));
  } catch (err) {
    (req as any).log?.error({ err }, "Groq API error") ?? console.error("Groq API error", err);
    res.status(500).json({ error: "AI service temporarily unavailable" });
  }
});

export default router;
