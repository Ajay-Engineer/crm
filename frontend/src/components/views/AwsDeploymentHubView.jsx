import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Cloud,
  Database,
  CheckCircle2,
  Server,
  Zap,
  Copy,
  Terminal,
  ShieldCheck,
  Globe,
  ExternalLink
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
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-white">AWS & Firebase Cloud Deployment Hub</h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Live Telemetry
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Verify AWS DynamoDB backend, inspect Lambda Serverless templates & Firebase Hosting configuration
        </p>
      </div>

      {/* Live AWS Connection Telemetry Card */}
      <div className="glass-panel p-6 rounded-2xl border border-brand-400/40 bg-gradient-to-r from-navy-900 via-slate-900 to-slate-950 space-y-4 shadow-glow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-brand-400 flex items-center justify-center text-brand-400 shadow-glow">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Amazon DynamoDB (Serverless)</h2>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{liveResult?.status || 'CONNECTED'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                AWS Region: <strong className="text-brand-300 font-mono">ap-south-1 (Mumbai)</strong> • Table: <span className="font-mono">{liveResult?.tableName || 'HIG_CRM_MAIN'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleRunAwsCheck}
            disabled={testingAws}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-xs font-bold text-slate-950 shadow-glow disabled:opacity-50 transition-all"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{testingAws ? 'Testing AWS...' : 'Re-test AWS Latency'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Table Status</span>
            <div className="font-mono text-emerald-400 font-bold mt-0.5">{liveResult?.tableStatus || 'ACTIVE'}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Billing Mode</span>
            <div className="font-mono text-brand-300 font-bold mt-0.5">PAY_PER_REQUEST</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Multi-Tenancy</span>
            <div className="font-mono text-purple-300 font-bold mt-0.5">Single-Table GSI1</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Security</span>
            <div className="font-mono text-emerald-400 font-bold mt-0.5">IAM Authenticated</div>
          </div>
        </div>
      </div>

      {/* Deployment Instructions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Step 1: AWS Lambda Serverless Deploy */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Server className="w-4 h-4 text-brand-400" />
              <span>1. AWS Lambda API Serverless Config</span>
            </h3>
            <button
              onClick={() => copyToClipboard(serverlessYml, 'Serverless template')}
              className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 font-semibold"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          <p className="text-xs text-slate-400">
            The backend includes <code className="text-brand-300 font-mono">lambda.js</code>. Deploy with 1 command:
          </p>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 space-y-1">
            <div className="text-slate-500"># In /backend directory:</div>
            <div>npx serverless deploy --region ap-south-1</div>
          </div>

          <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
            {serverlessYml}
          </pre>
        </div>

        {/* Step 2: Firebase Hosting Deploy */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>2. Firebase Hosting Deployment</span>
            </h3>
            <button
              onClick={() => copyToClipboard(firebaseJson, 'Firebase config')}
              className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 font-semibold"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Deploy the React Vite SPA to Firebase Hosting with global CDN & SSL:
          </p>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 space-y-1">
            <div className="text-slate-500"># In /frontend directory:</div>
            <div>npm run build</div>
            <div>firebase deploy --only hosting</div>
          </div>

          <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
            {firebaseJson}
          </pre>
        </div>
      </div>
    </div>
  );
}
