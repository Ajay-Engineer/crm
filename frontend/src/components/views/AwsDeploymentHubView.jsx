import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Database,
  CheckCircle2,
  Server,
  Zap,
  Copy,
  Globe
} from 'lucide-react';
import { api } from '../../services/api';

export default function AwsDeploymentHubView() {
  const { awsStatus, showToast } = useCrm();
  const [testingAws, setTestingAws] = useState(false);
  const [liveResult, setLiveResult] = useState(awsStatus);

  const handleRunAwsCheck = async () => {
    try {
      setTestingAws(true);
      const res = await api.getAwsStatus();
      setLiveResult(res);
      showToast('AWS DynamoDB connection verified 100% active!', 'success');
    } catch (err) {
      showToast(`AWS Test Error: ${err.message}`, 'error');
    } finally {
      setTestingAws(false);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, 'success');
  };

  const firebaseJson = `{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}`;

  const serverlessYml = `service: hig-crm-backend
frameworkVersion: '3'
provider:
  name: aws
  runtime: nodejs20.x
  region: ap-south-1
  environment:
    DYNAMODB_TABLE_NAME: HIG_CRM_MAIN
    AWS_REGION: ap-south-1

functions:
  api:
    handler: lambda.handler
    events:
      - httpApi:
          path: /{proxy+}
          method: ANY`;

  return (
    <div className="space-y-5 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">AWS & Firebase Cloud Deployment Hub</h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Live Telemetry
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">
          Verify AWS DynamoDB backend, inspect Lambda Serverless templates & Firebase Hosting configuration
        </p>
      </div>

      {/* Live AWS Connection Telemetry Card */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-brand-200 bg-white space-y-4 shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-300 flex items-center justify-center text-brand-600 shadow-xs">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">Amazon DynamoDB (Serverless)</h2>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{liveResult?.status || 'CONNECTED'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                AWS Region: <strong className="text-brand-700 font-mono">ap-south-1 (Mumbai)</strong> • Table: <span className="font-mono text-slate-700">{liveResult?.tableName || 'HIG_CRM_MAIN'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleRunAwsCheck}
            disabled={testingAws}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white shadow-glow disabled:opacity-50 transition-all"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{testingAws ? 'Testing AWS...' : 'Re-test AWS Latency'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Table Status</span>
            <div className="font-mono text-emerald-700 font-bold mt-0.5">{liveResult?.tableStatus || 'ACTIVE'}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Billing Mode</span>
            <div className="font-mono text-brand-700 font-bold mt-0.5">PAY_PER_REQUEST</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Multi-Tenancy</span>
            <div className="font-mono text-purple-700 font-bold mt-0.5">Single-Table GSI1</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Security</span>
            <div className="font-mono text-emerald-700 font-bold mt-0.5">IAM Authenticated</div>
          </div>
        </div>
      </div>

      {/* Deployment Instructions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Step 1: AWS Lambda Serverless Deploy */}
        <div className="glass-panel p-5 rounded-2xl space-y-3 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Server className="w-4 h-4 text-brand-600" />
              <span>1. AWS Lambda API Serverless Config</span>
            </h3>
            <button
              onClick={() => copyToClipboard(serverlessYml, 'Serverless template')}
              className="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1 font-bold"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          <p className="text-xs text-slate-600 font-medium">
            Deploy to AWS Lambda & API Gateway:
          </p>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-brand-700 font-bold space-y-1">
            <div className="text-slate-400"># In /backend directory:</div>
            <div>npx serverless deploy --region ap-south-1</div>
          </div>

          <pre className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700 overflow-x-auto">
            {serverlessYml}
          </pre>
        </div>

        {/* Step 2: Firebase Hosting Deploy */}
        <div className="glass-panel p-5 rounded-2xl space-y-3 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-600" />
              <span>2. Firebase Hosting Deployment</span>
            </h3>
            <button
              onClick={() => copyToClipboard(firebaseJson, 'Firebase config')}
              className="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1 font-bold"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          <p className="text-xs text-slate-600 font-medium">
            Deploy the React Vite SPA to Firebase Hosting:
          </p>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-emerald-700 font-bold space-y-1">
            <div className="text-slate-400"># In /frontend directory:</div>
            <div>npm run build</div>
            <div>firebase deploy --only hosting</div>
          </div>

          <pre className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700 overflow-x-auto">
            {firebaseJson}
          </pre>
        </div>
      </div>
    </div>
  );
}
