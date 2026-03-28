import { Router } from "express";
import { parseDevice } from "../lib/device.js";

const router = Router();

async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  const ids = [
    process.env.TELEGRAM_USER_ID_1,
    process.env.TELEGRAM_USER_ID_2,
    process.env.TELEGRAM_USER_ID_3,
  ].filter(Boolean);

  for (const chatId of ids) {
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

router.post("/notify", async (req, res) => {
  const { source } = req.body as { source?: string };
  if (!source) {
    res.status(400).json({ error: "source required" });
    return;
  }

  const device = parseDevice(req.headers["user-agent"]);
  const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Ashgabat" });

  const icons: Record<string, string> = {
    Telegram: "✈️",
    TikTok: "🎵",
    IMO: "💬",
  };
  const icon = icons[source] ?? "🔗";

  const text = `${device}

${icon} <b>SOSIAL MEDIA KLINKI</b>

👆 Müşderi <b>${source}</b> düwmesine basdy

🕐 ${timestamp}`;

  sendTelegram(text).catch(() => {});
  res.json({ ok: true });
});

export default router;
