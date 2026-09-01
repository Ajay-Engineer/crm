const {
  PutCommand,
  GetCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
  BatchWriteCommand,
  ScanCommand,
} = require('@aws-sdk/lib-dynamodb');
const { ddbDocClient, TABLE_NAME } = require('../config/dynamoClient');

class DynamoModel {
  static formatPK(orgId) {
    return `ORG#${orgId || 'default'}`;
  }

  static formatSK(type, id) {
    return `${type.toUpperCase()}#${id}`;
  }

  static async putItem(orgId, type, id, data) {
    const now = new Date().toISOString();
    const item = {
      PK: this.formatPK(orgId),
      SK: this.formatSK(type, id),
      id,
      entityType: type,
      orgId: orgId || 'default',
      GSI1PK: `ORG#${orgId || 'default'}#TYPE#${type}`,
      GSI1SK: `UPDATED#${now}`,
      createdAt: data.createdAt || now,
      updatedAt: now,
      ...data,
    };

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
    });

    await ddbDocClient.send(command);
    return item;
  }

  static async getItem(orgId, type, id) {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: this.formatPK(orgId),
        SK: this.formatSK(type, id),
      },
    });

    const res = await ddbDocClient.send(command);
    return res.Item || null;
  }

  static async queryByType(orgId, type) {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :skPrefix)',
      ExpressionAttributeValues: {
        ':pk': this.formatPK(orgId),
        ':skPrefix': `${type.toUpperCase()}#`,
      },
    });

    const res = await ddbDocClient.send(command);
    return res.Items || [];
  }

  static async updateItem(orgId, type, id, updates) {
    const current = await this.getItem(orgId, type, id);
    if (!current) {
      throw new Error(`Item ${type}#${id} not found`);
    }

    const updated = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString(),
      GSI1SK: `UPDATED#${new Date().toISOString()}`,
    };

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: updated,
    });

    await ddbDocClient.send(command);
    return updated;
  }

  static async deleteItem(orgId, type, id) {
    const command = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: this.formatPK(orgId),
        SK: this.formatSK(type, id),
      },
    });

    await ddbDocClient.send(command);
    return { success: true, id };
  }

  static async batchPut(items) {
    if (!items || items.length === 0) return;
    
    // DynamoDB batchWrite handles max 25 items per chunk
    const chunks = [];
    for (let i = 0; i < items.length; i += 25) {
      chunks.push(items.slice(i, i + 25));
    }

    for (const chunk of chunks) {
      const putRequests = chunk.map((item) => ({
        PutRequest: {
          Item: {
            PK: this.formatPK(item.orgId),
            SK: this.formatSK(item.entityType, item.id),
            GSI1PK: `ORG#${item.orgId || 'default'}#TYPE#${item.entityType}`,
            GSI1SK: `UPDATED#${item.updatedAt || new Date().toISOString()}`,
            ...item,
          },
        },
      }));

      const command = new BatchWriteCommand({
        RequestItems: {
          [TABLE_NAME]: putRequests,
        },
      });

      await ddbDocClient.send(command);
    }
  }

  static async scanAll(orgId) {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': this.formatPK(orgId),
      },
    });

    const res = await ddbDocClient.send(command);
    return res.Items || [];
  }
}

module.exports = DynamoModel;
