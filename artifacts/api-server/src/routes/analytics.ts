import { Router, type IRouter } from "express";
import { TrackAnalyticsEventBody, TrackAnalyticsEventResponse } from "@workspace/api-zod";

const router: IRouter = Router();

interface EventBatch {
  events: Array<{
    event: string;
    section?: string;
    locale?: string;
    device?: string;
    timeOnSite?: number;
    timestamp: string;
  }>;
  lastFlush: number;
}

const batchMap = new Map<string, EventBatch>();
const BATCH_INTERVAL_MS = 10000;
const IMMEDIATE_EVENTS = new Set(["contact_form_submit", "ai_chat_opened", "ai_chat_message", "contact_form_open"]);

async function sendTelegramAnalytics(message: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const userId1 = process.env.TELEGRAM_USER_ID_1;

  if (!token || !userId1) return;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: userId1,
        text: message,
        parse_mode: "HTML",
      }),
    });
  } catch {
    // Silently fail analytics
  }
}

function formatBatchMessage(batch: EventBatch): string {
  const eventLines = batch.events
    .map((e) => `  • <b>${e.event}</b>${e.section ? ` — ${e.section}` : ""} (${e.timestamp})`)
    .join("\n");

  const firstEvent = batch.events[0];
  return `📊 <b>ANALİTİKA BATCH</b>
🌍 Dil: ${firstEvent?.locale ?? "?"}
📱 Enjam: ${firstEvent?.device ?? "?"}
⏱️ Saýtda: ${firstEvent?.timeOnSite ?? 0}s

Wakalar:
${eventLines}`;
}

function formatImmediateMessage(event: {
  event: string;
  section?: string;
  locale?: string;
  device?: string;
  timeOnSite?: number;
  timestamp: string;
}): string {
  return `📊 <b>ANALİTİKA</b> | ${event.event}
👁️ Sahypa: ${event.section ?? "—"}
🕐 Wagt: ${event.timestamp}
📱 Enjam: ${event.device ?? "?"}
🌍 Dil: ${event.locale ?? "?"}
⏱️ Saýtda: ${event.timeOnSite ?? 0}s`;
}

async function flushBatch(ip: string): Promise<void> {
  const batch = batchMap.get(ip);
  if (!batch || batch.events.length === 0) return;

  const message = formatBatchMessage(batch);
  await sendTelegramAnalytics(message);

  batch.events = [];
  batch.lastFlush = Date.now();
}

router.post("/analytics", async (req, res) => {
  const parsed = TrackAnalyticsEventBody.safeParse(req.body);
  if (!parsed.success) {
    res.json({ success: false });
    return;
  }

  const { event, section, locale, device, timeOnSite } = parsed.data;
  const ip = req.ip ?? "unknown";
  const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Ashgabat" });

  const eventData = { event, section, locale, device, timeOnSite, timestamp };

  if (IMMEDIATE_EVENTS.has(event)) {
    await sendTelegramAnalytics(formatImmediateMessage(eventData));
  } else {
    const now = Date.now();
    const batch = batchMap.get(ip) ?? { events: [], lastFlush: now };
    batch.events.push(eventData);

    if (now - batch.lastFlush >= BATCH_INTERVAL_MS && batch.events.length > 0) {
      batchMap.set(ip, batch);
      await flushBatch(ip);
    } else {
      batchMap.set(ip, batch);
    }
  }

  const response = TrackAnalyticsEventResponse.parse({ success: true });
  res.json(response);
});

export default router;
