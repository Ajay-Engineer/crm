const DynamoModel = require('../models/dynamoModel');
const { rawClient, TABLE_NAME, region } = require('../config/dynamoClient');
const { DescribeTableCommand } = require('@aws-sdk/client-dynamodb');

exports.getSettings = async (req, res) => {
  try {
    const org = await DynamoModel.getItem(req.orgId, 'organization', req.orgId);
    res.json({
      success: true,
      data: org || {
        id: req.orgId,
        name: 'HIG AI Automation Enterprise',
        branding: {
          primaryColor: '#38B6FF',
          secondaryColor: '#0284C7',
          darkColor: '#0B132B',
          logoUrl: '/logo.png',
          brandName: 'HIG AI AUTOMATION',
        },
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updated = await DynamoModel.putItem(req.orgId, 'organization', req.orgId, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.testAWSConnection = async (req, res) => {
  try {
    const describeRes = await rawClient.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
    res.json({
      success: true,
      status: 'CONNECTED',
      provider: 'Amazon Web Services (AWS)',
      region: region,
      database: 'Amazon DynamoDB (Serverless On-Demand)',
      tableName: TABLE_NAME,
      tableStatus: describeRes.Table.TableStatus,
      itemCount: describeRes.Table.ItemCount || 0,
      tableSizeBytes: describeRes.Table.TableSizeBytes || 0,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 'ERROR',
      error: err.message,
      region,
    });
  }
};
