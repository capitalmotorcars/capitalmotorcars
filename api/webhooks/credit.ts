import { applyApiCors } from "../../lib/httpCors.mjs";
import { forwardJsonToWebhook } from "../../lib/webhookForward.mjs";

const DEFAULT_UPSTREAM =
  "https://hook.eu1.make.com/jmxgdt9co9e5403vopzm8witym4kg5mv";

type Req = {
  method?: string;
  body?: unknown;
  headers?: { origin?: string; [key: string]: string | string[] | undefined };
};

type Res = {
  status: (n: number) => Res;
  setHeader: (n: string, v: string) => void;
  json: (o: object) => void;
  end: (s?: string) => void;
  send: (body: string) => void;
};

export default async function handler(req: Req, res: Res) {
  applyApiCors(
    req as Parameters<typeof applyApiCors>[0],
    res as Parameters<typeof applyApiCors>[1],
  );

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  const body = req.body as Record<string, unknown> | undefined | null;

  const requiredFields: Array<[string, string]> = [
    ["FirstName", "Missing applicant first name"],
    ["LastName", "Missing applicant last name"],
    ["Email", "Missing applicant email"],
    ["Phone", "Missing applicant phone"],
    ["Consultant", "Missing consultant selection"],
    ["ConsultantEmail", "Missing consultant email"],
  ];

  for (const [field, message] of requiredFields) {
    if (!body?.[field]) {
      return res.status(400).json({ success: false, error: message });
    }
  }

  const upstream =
    process.env.MAKE_WEBHOOK_CREDIT_URL?.trim() || DEFAULT_UPSTREAM;
  try {
    const r = await forwardJsonToWebhook(upstream, req.body);
    const text = await r.text();
    const ct = r.headers.get("content-type") ?? "application/json";
    res.status(r.status).setHeader("Content-Type", ct).send(text);
  } catch {
    res.status(502).json({ success: false, error: "Upstream error" });
  }
}
