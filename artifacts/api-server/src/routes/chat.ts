import { Router, type IRouter } from "express";
import Groq from "groq-sdk";
import { SendChatMessageBody, SendChatMessageResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `Sen Ýeňil web agentliginiň akylly kömekçisisin. 
Esasan türkmen dilinde gepleşersiň, ýöne müşderi haýsy dilde ýazsa şol dilde jogap ber.
Saýt döretmek, bahalar, hyzmatlar barada soraglara jogap ber.
Mylaýym, professional we kömekçi bol.

Ýeňil barada bilmeli maglumatlar:
- Türkmenistanyň №1 web agentligi
- 3 paket hödürleýäris: START ($150~), PRO ($800~), ENTERPRISE (ylalaşyk)
- 5 dilde goldaw: Türkmen, Türk, Özbek, Rus, Iňlis
- 24 sagat tehniki goldaw
- 50+ taslama tamamlandy
- Aşgabat, Türkmenistan
- Habarlaşmak: info@yenil.com.tm

Müşderi bilen baglanyşyk gurmak üçin mähirli bol. Gysgaça ýöne peýdaly jogap ber.`;

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

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
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

  const { messages } = parsed.data;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseMessage = completion.choices[0]?.message?.content ?? "Bagyşlaň, şu wagt jogap berip bilmedim.";

    const response = SendChatMessageResponse.parse({
      message: responseMessage,
      role: "assistant",
    });

    res.json(response);
  } catch (err) {
    req.log.error({ err }, "Groq API error");
    res.status(500).json({ error: "AI service temporarily unavailable" });
  }
});

export default router;
