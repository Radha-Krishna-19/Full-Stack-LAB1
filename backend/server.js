require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Fake in-memory DB (no real MongoDB needed for demo)
let fakeDB = {}; // { childId: { completed: ['A', 'B'] } }

const app = express();
app.use(cors());
app.use(express.json());

console.log('🚀 Starting KidsLearn Backend...');

app.get('/api/progress/:childId', (req, res) => {
  const childId = req.params.childId;
  const data = fakeDB[childId] || { childId, completed: [] };
  console.log(`📥 GET progress for ${childId}:`, data.completed);
  res.json(data);
});

app.post('/api/progress/:childId', (req, res) => {
  const childId = req.params.childId;
  const { completed } = req.body;
  fakeDB[childId] = { childId, completed };
  console.log(`💾 SAVED progress for ${childId}:`, completed);
  res.json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running perfectly on http://localhost:${PORT}`);
  console.log('Test it: Visit http://localhost:5000/api/progress/radhaDemo');
});
