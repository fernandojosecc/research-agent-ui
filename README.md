# AI Research Agent - Frontend

Next.js frontend for the AI Research Agent. Enter any topic and get a full structured report generated autonomously by Claude and Tavily.

## Live Demo

[![Live Demo](https://github.com/fernandojosecc/research-agent-api/blob/main/screenshot.png?raw=true)](https://research-agent-ui-pi.vercel.app)

**Live Demo:** https://research-agent-ui-pi.vercel.app  
**Backend API:** https://research-agent-api-production.up.railway.app

## Features

- Research any topic with one click
- Quick mode (3 searches ~30s) or Deep mode (7 searches ~2min)
- Animated progress steps while researching
- Structured report: summary, key findings, sections, sources
- Copy report to clipboard
- Clickable sources with links
- Mobile responsive
- Example topics to get started quickly

## Tech Stack

- **Next.js** (React framework)
- **Deployed on Vercel**
- **Communicates with FastAPI backend via REST API**
- **Pure CSS** - no external UI libraries

## How to Run Locally

```bash
git clone https://github.com/fernandojosecc/research-agent-ui.git
cd research-agent-ui
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

*Note: Requires the backend running locally too (see [research-agent-api](https://github.com/fernandojosecc/research-agent-api) repo)*

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | URL of FastAPI backend | Yes |

## Related Repository

**Backend:** https://github.com/fernandojosecc/research-agent-api

All AI logic lives in the backend - LangChain agents, Claude API, and Tavily search.

## About

**Name:** Fernando Contreras  
**Portfolio:** https://fernandocontreras.dev  
**GitHub:** https://github.com/fernandojosecc

Part of my AI engineering portfolio.
