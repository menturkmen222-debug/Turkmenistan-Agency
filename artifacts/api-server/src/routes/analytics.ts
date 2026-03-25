import { Router, type IRouter } from "express";
import { TrackAnalyticsEventBody, TrackAnalyticsEventResponse } from "@workspace/api-zod";

const router: IRouter = Router();

// Only these events are forwarded to Telegram — everything else is silently accepted but dropped
const TELEGRAM_EVENTS = new Set(["contact_form_submit", "ai_chat_opened"]);

async function sendTelegramAnalytics(message: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const userId1 = process.env.TELEGRAM_USER_ID_1;
  if (!token || !userId1) return;
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: userId1, text: message, parse_mode: "HTML" }),
    });
  } catch {
    // Silently fail
  }
}

router.post("/analytics", async (req, res) => {
  const parsed = TrackAnalyticsEventBody.safeParse(req.body);
  if (!parsed.success) {
    res.json({ success: false });
    return;
  }

  const { event, section, locale, device, timeOnSite } = parsed.data;
  const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Ashgabat" });

  if (TELEGRAM_EVENTS.has(event)) {
    const emoji = event === "contact_form_submit" ? "📋" : "🤖";
    const label = event === "contact_form_submit" ? "Form Iberildi" : "AI Chat Açyldy";
    await sendTelegramAnalytics(
      `${emoji} <b>${label}</b>\n🕐 ${timestamp}\n📱 Enjam: ${device ?? "?"}\n🌍 Dil: ${locale ?? "?"}\n⏱️ Saýtda: ${timeOnSite ?? 0}s${section ? `\n👁️ Bölüm: ${section}` : ""}`
    );
  }

  res.json(TrackAnalyticsEventResponse.parse({ success: true }));
});

export default router;
