const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRouter = require('./routes/api');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API routes at /api/v1 and /api
app.use('/api/v1', apiRouter);
app.use('/api', apiRouter);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    message: '🚀 HIG AI Automation Universal CRM Backend is running with AWS DynamoDB.',
    status: 'ONLINE',
    region: process.env.AWS_REGION || 'ap-south-1',
    docs: '/api/v1/health',
  });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🤖 HIG AI AUTOMATION CRM BACKEND RUNNING`);
    console.log(`📡 Server: http://localhost:${PORT}`);
    console.log(`☁️  AWS DynamoDB Region: ${process.env.AWS_REGION || 'ap-south-1'}`);
    console.log(`🗄️  Table: ${process.env.DYNAMODB_TABLE_NAME || 'HIG_CRM_MAIN'}`);
    console.log(`====================================================`);
  });
}

module.exports = app;
