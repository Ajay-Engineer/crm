const { CreateTableCommand, DescribeTableCommand } = require('@aws-sdk/client-dynamodb');
const { rawClient, TABLE_NAME } = require('../config/dynamoClient');

async function initializeTable() {
  console.log(`Checking if DynamoDB table "${TABLE_NAME}" exists in AWS region...`);
  
  try {
    const describeRes = await rawClient.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
    console.log(`✅ Table "${TABLE_NAME}" already exists! Status: ${describeRes.Table.TableStatus}`);
    return;
  } catch (err) {
    if (err.name !== 'ResourceNotFoundException') {
      console.error('Error checking table:', err.message);
      // If permission or other issue, log details
      if (err.name === 'UnrecognizedClientException' || err.name === 'AccessDeniedException') {
        console.error('AWS Credentials Authentication failed. Please check IAM keys.');
      }
      throw err;
    }
    console.log(`Table "${TABLE_NAME}" does not exist yet. Creating table on AWS DynamoDB...`);
  }

  const params = {
    TableName: TABLE_NAME,
    BillingMode: 'PAY_PER_REQUEST', // Serverless on-demand pricing
    AttributeDefinitions: [
      { AttributeName: 'PK', AttributeType: 'S' },
      { AttributeName: 'SK', AttributeType: 'S' },
      { AttributeName: 'GSI1PK', AttributeType: 'S' },
      { AttributeName: 'GSI1SK', AttributeType: 'S' },
    ],
    KeySchema: [
      { AttributeName: 'PK', KeyType: 'HASH' },
      { AttributeName: 'SK', KeyType: 'RANGE' },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'GSI1',
        KeySchema: [
          { AttributeName: 'GSI1PK', KeyType: 'HASH' },
          { AttributeName: 'GSI1SK', KeyType: 'RANGE' },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
      },
    ],
  };

  try {
    const res = await rawClient.send(new CreateTableCommand(params));
    console.log(`🚀 Successfully created DynamoDB Table "${TABLE_NAME}"!`);
    console.log(`Status: ${res.TableDescription.TableStatus}`);
  } catch (createErr) {
    console.error('Failed to create DynamoDB table:', createErr);
    throw createErr;
  }
}

if (require.main === module) {
  initializeTable()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { initializeTable };
