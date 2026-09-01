# HIG AI AUTOMATION — Universal AI-Native CRM Platform

Enterprise-grade, multi-tenant Universal CRM and Business Operations OS built with **Amazon DynamoDB & AWS Lambda Serverless**, and **React 18 + Vite** frontend ready for **Firebase Hosting**.

---

## 🌟 Key Features

* **Brand Identity & Design System**: Styled strictly according to the HIG AI Automation logo palette (`#38B6FF` Electric Cyan, Deep Navy `#0B132B`, Crisp White `#FFFFFF`).
* **AWS DynamoDB Backend**: Serverless single-table schema with GSI1 indexing for multi-tenant organizations (`ap-south-1`).
* **Executive Command Center**: AI Morning Briefing, KPI Metrics, Hot Opportunities Radar, and Churn Risk Alerts.
* **Deal Pipeline**: Drag-and-drop Kanban across 5 stages with stage win probabilities and total values.
* **Lead Engine**: AI Lead Scoring (0-100), Intent Analysis, CSV export & 1-Click Deal Conversion.
* **Customer 360**: 360-degree relationship dossier with lifetime value, AI health score, linked deals, and omnichannel activity timeline.
* **Omnichannel Hub**: Unified inbox for WhatsApp, Email, SMS, Calls with AI Smart Reply Composer.
* **Workflow Automation**: Visual Trigger → Condition → Action builder with live execution simulation.
* **Universal Custom Objects Studio**: No-code dynamic schema builder for Real Estate (*Properties*), Healthcare (*Patients*), Education, etc.
* **Support Helpdesk**: Ticket SLA countdowns, priority tracking, and AI suggested solutions.
* **HIG AI Business Analyst**: Conversational LLM RAG engine answering questions on revenue, risk, and sales forecasting.
* **Analytics & Reports**: Interactive Recharts for revenue forecasts and acquisition channel attribution.
* **AWS & Firebase Deploy Center**: Live AWS connection tester, Serverless SAM template, and Firebase Hosting configuration.

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm run init-db    # Initializes DynamoDB table on AWS
npm run seed-db    # Populates initial multi-industry records
npm run dev        # Starts local API server on http://localhost:5055
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev        # Starts Vite dev server on http://localhost:3000
npm run build      # Builds production assets for Firebase Hosting
```

---

## ☁️ Deployment

### Deploy Backend to AWS Lambda
```bash
cd backend
npx serverless deploy --region ap-south-1
```

### Deploy Frontend to Firebase Hosting
```bash
cd frontend
npm run build
firebase deploy --only hosting
```

---

## 📄 License
Private Proprietary — HIG AI Automation
