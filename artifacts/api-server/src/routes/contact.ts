import { Router, type IRouter } from "express";
import { SubmitContactFormBody, SubmitContactFormResponse } from "@workspace/api-zod";

const router: IRouter = Router();

function sanitize(str: string): string {
  return str.replace(/[<>]/g, "").trim().slice(0, 2000);
}

async function sendTelegramMessage(message: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const userId1 = process.env.TELEGRAM_USER_ID_1;
  const userId2 = process.env.TELEGRAM_USER_ID_2;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN not configured");

  const recipients = [userId1, userId2].filter(Boolean);
  for (const chatId of recipients) {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
    });
  }
}

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactFormBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.message });
    return;
  }

  const {
    name, businessName, phone, email,
    selectedTier, designStyle, message, locale,
    existingUrl, industry, contactMethod, timeline,
  } = parsed.data;

  const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Ashgabat" });

  const telegramMessage = `
🌟 <b>YENİ MÜŞDERİ HABARNAMASY</b> 🌟

👤 <b>At:</b> ${sanitize(name)}
🏢 <b>Biznes:</b> ${sanitize(businessName)}
📞 <b>Telefon:</b> ${sanitize(phone)}
📧 <b>Email:</b> ${sanitize(email)}

📦 <b>Saýlanan Paket:</b> ${selectedTier ? sanitize(selectedTier) : "Görkezilmedi"}
🎨 <b>Dizaýn Stili:</b> ${designStyle ? sanitize(designStyle) : "Görkezilmedi"}

🌐 <b>Saýt URL:</b> ${existingUrl ? sanitize(existingUrl) : "Ýok"}
🏭 <b>Pudak:</b> ${industry ? sanitize(industry) : "Görkezilmedi"}
📬 <b>Habarlaşmak ýoly:</b> ${contactMethod?.join(", ") ?? "Görkezilmedi"}
⏱️ <b>Möhlet:</b> ${timeline ? sanitize(timeline) : "Görkezilmedi"}

💬 <b>Habar:</b>
${sanitize(message)}

⏰ <b>Wagt:</b> ${timestamp}
🌍 <b>Dil:</b> ${locale ?? "tk"}
`;

  try {
    await sendTelegramMessage(telegramMessage);
    res.json(SubmitContactFormResponse.parse({ success: true, message: "Habar üstünlikli iberildi!" }));
  } catch (err) {
    req.log.error({ err }, "Failed to send Telegram message");
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
