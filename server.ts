import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Helper to get Gemini Client lazily
function getGeminiAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health Check API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "PharmaPulse MR Reporting API" });
});

// AI DCR Note Parser Endpoint
app.post("/api/gemini/parse-dcr-voice", async (req, res) => {
  try {
    const { rawNote } = req.body;
    if (!rawNote || typeof rawNote !== "string") {
      res.status(400).json({ error: "rawNote text is required" });
      return;
    }

    const ai = getGeminiAI();
    if (!ai) {
      // Intelligent mock fallback if key is missing
      res.json({
        doctorName: "Dr. A. K. Sharma",
        speciality: "Cardiologist",
        visitType: "Core Visit",
        brandsPromoted: ["Cardia-50 (Losartan)", "NeuroVibe (Methylcobalamin)"],
        samplesGiven: [
          { brand: "Cardia-50", quantity: 5, batchNo: "C50-2026A" },
          { brand: "NeuroVibe", quantity: 3, batchNo: "NV-2026B" }
        ],
        pobValue: 4500,
        doctorFeedback: "Doctor showed strong interest in Cardia-50 renal protection data. Agreed to prescribe for 10 new patients this week.",
        agreedNextVisit: "2026-08-05",
        keyTakeaway: "High potential for Cardia-50 conversion. Follow up on clinical trial reprint."
      });
      return;
    }

    const prompt = `You are an expert AI field assistant for a Medical Representative in a pharmaceutical company.
Extract and structure the following raw field notes taken by the MR after a visit:

Raw Field Note: "${rawNote}"

Extract into JSON format with the following keys:
- doctorName: string (guessed or extracted name)
- speciality: string (e.g., Cardiologist, Physician, Orthopedic, Gynecologist, Pediatrician)
- visitType: string ("Core Visit", "Non-Core", or "Joint Visit with ASM")
- brandsPromoted: array of strings (brands mentioned)
- samplesGiven: array of objects with { brand: string, quantity: number, batchNo: string }
- pobValue: number (Product Order Booking value in currency, 0 if none)
- doctorFeedback: string (concise summary of doctor's response/objections/commitments)
- agreedNextVisit: string (date YYYY-MM-DD or estimated timeframe)
- keyTakeaway: string (1 sentence strategic advice for MR for next call)

Return ONLY valid JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error in parse-dcr-voice:", error);
    res.status(500).json({ error: error.message || "Failed to process DCR note" });
  }
});

// AI Doctor Pitch & Objection Handling Generator
app.post("/api/gemini/doctor-pitch", async (req, res) => {
  try {
    const { doctorName, speciality, doctorClass, keyBrand, pastFeedback } = req.body;

    const ai = getGeminiAI();
    if (!ai) {
      res.json({
        openingHook: `Good morning ${doctorName || 'Doctor'}. In light of your active ${speciality || 'clinical'} practice, I wanted to highlight the latest 24-hour BP control trial data for ${keyBrand || 'Cardia-50'}.`,
        keyScientificPoints: [
          "Demonstrates 28% superior renal protection in diabetic hypertensive patients.",
          "Smooth 24-hour trough-to-peak ratio minimizing early morning BP spikes.",
          "High patient compliance due to once-daily ultra-small tablet size."
        ],
        objectionHandling: [
          { objection: "Patient cost concern", response: "Highlight our patient assistance savings card and 30-day extended trial pack." },
          { objection: "Existing competitor preference", response: "Share head-to-head trial showing faster target SBP attainment within 2 weeks." }
        ],
        sampleCallToAction: "Doctor, may I leave 5 sample packs for your next 5 mild-to-moderate hypertensive patients this week?"
      });
      return;
    }

    const prompt = `You are a Senior Pharmaceutical Product Manager and AI Sales Coach for Medical Representatives.
Generate a high-impact call strategy and detailing pitch for a doctor visit:

Doctor Name: ${doctorName || "Dr. Partner"}
Speciality: ${speciality || "General Physician"}
Doctor Class: ${doctorClass || "A+"}
Target Brand: ${keyBrand || "Cardia-50"}
Past Notes/Feedback: ${pastFeedback || "Prescribes competitor brand regularly, sensitive to efficacy data"}

Return JSON with:
- openingHook: string (30-second compelling opening line)
- keyScientificPoints: array of 3 bullet strings (clinical USPs)
- objectionHandling: array of objects { objection: string, response: string }
- sampleCallToAction: string (persuasive closing statement asking for prescription commitment and leaving sample strips)

Return ONLY valid JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error in doctor-pitch:", error);
    res.status(500).json({ error: error.message || "Failed to generate doctor pitch" });
  }
});

// AI Territory & Sales Strategy Insights
app.post("/api/gemini/territory-insights", async (req, res) => {
  try {
    const { totalCalls, targetCalls, pobTotal, topBrands, competitorActivity, lapsedDoctorCount } = req.body;

    const ai = getGeminiAI();
    if (!ai) {
      res.json({
        healthScore: 88,
        summary: "Strong call coverage in Central Beat, but 14% gap in Class A+ Doctor visit frequency.",
        strengths: [
          "Cardia-50 POB order conversion increased by +18% this month.",
          "Chemist RCPA audit coverage reached 92% in key hospital zones."
        ],
        gapsAndRisks: [
          `${lapsedDoctorCount || 5} Class A Doctors have not been visited in >21 days.`,
          "Competitor CardioVas-50 is aggressively stocking chemist shelves with 12% extra scheme discount."
        ],
        actionPlan: [
          "Schedule joint visits with ASM for top 3 lapsed Class A+ Cardiologists in Metro North.",
          "Conduct Chemist POB drive with 10+1 promotional schemes for NeuroVibe.",
          "Prioritize E-Detailing slides on renal outcome data during next 10 visits."
        ]
      });
      return;
    }

    const prompt = `You are an AI Sales Strategy Consultant for Pharmaceutical Field Force Operations.
Analyze the following MR Monthly Territory Performance metrics and generate strategic actionable insights:

- Total Calls Completed: ${totalCalls} / ${targetCalls} Target
- Total Product Order Booking (POB): ₹${pobTotal}
- Top Performing Brands: ${JSON.stringify(topBrands || [])}
- Chemist RCPA Competitor Activity: ${competitorActivity || "Competitors offering aggressive trade discounts"}
- Lapsed Class A/A+ Doctors (>21 days no visit): ${lapsedDoctorCount}

Return JSON with:
- healthScore: number (0-100 overall territory health score)
- summary: string (2-sentence performance summary)
- strengths: array of 2 bullet strings
- gapsAndRisks: array of 2 bullet strings
- actionPlan: array of 3 priority action items for the MR this week

Return ONLY valid JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error in territory-insights:", error);
    res.status(500).json({ error: error.message || "Failed to generate territory insights" });
  }
});

// Vite Middleware or Production Static Serve
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PharmaPulse MR Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
