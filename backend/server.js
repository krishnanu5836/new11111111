const express = require('express'); 
const app = express();              
const PORT = 8000;                 
const database = require('./Connection/mongo');
const cors = require('cors');

const authRoutes = require('./Routes/auth');
const examRoutes = require('./Routes/exam');

app.use(express.json());
app.use(cors());
database();

app.use('/api/auth', authRoutes);
app.use('/api/exam', examRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
