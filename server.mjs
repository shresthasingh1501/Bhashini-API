import express from 'express';
import bhashini from 'bhashini-translation';

const app = express();
const port = 3000; // or any other port you prefer
// Increase the maximum request body size
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Initialize Bhashini with your authentication details
bhashini.auth("ipwpNI5NedpvExBQk0Rnp3ZVZrjfho065rGXql_Kr85NAmgnKOIGg0uKlic4IwWL", "7fb267e2817549a08395ff1c1a507e72", "19b5bb01f7-62f4-4f15-b44b-70d239346aba");

// Middleware to parse JSON requests
app.use(express.json());

// Route for ASR (Automatic Speech Recognition)
app.post('/asr', async (req, res) => {
  const { sourceLang, base64Audio } = req.body;
  try {
    const result = await bhashini.asr(sourceLang, base64Audio);
    res.json({ text: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for NMT (Neural Machine Translation)
app.post('/nmt', async (req, res) => {
  const { sourceLang, targetLang, text } = req.body;
  try {
    const result = await bhashini.nmt(sourceLang, targetLang, text);
    res.json({ translatedText: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Route for TTS (Text to Speech)
app.post('/tts', async (req, res) => {
  const { sourceLang, text, gender } = req.body;
  try {
    const result = await bhashini.tts(sourceLang, text, gender);
    res.json({ audioBase64: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for ASR + NMT (Speech to Text Translation)
app.post('/asr_nmt', async (req, res) => {
  const { sourceLang, targetLang, base64Audio } = req.body;
  try {
    const result = await bhashini.asr_nmt(sourceLang, targetLang, base64Audio);
    res.json({ translatedText: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for NMT + TTS (Text Translation to Speech)
app.post('/nmt_tts', async (req, res) => {
  const { sourceLang, targetLang, text, gender } = req.body;
  try {
    const result = await bhashini.nmt_tts(sourceLang, targetLang, text, gender);
    res.json({ audioBase64: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for ASR + NMT + TTS (Speech to Speech Translation)
app.post('/asr_nmt_tts', async (req, res) => {
  const { sourceLang, targetLang, base64Audio, gender } = req.body;
  try {
    const result = await bhashini.asr_nmt_tts(sourceLang, targetLang, base64Audio, gender);
    res.json({ audioBase64: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ... Add routes for other Bhashini functions as needed

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
