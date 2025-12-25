# AMZ-Resurrect AI 🚀

**AI-Powered Amazon Account Reinstatement SaaS for Saudi Arabia & UAE Marketplaces**

A specialized SaaS platform that generates professional Plans of Action (POA) for suspended Amazon sellers in KSA/UAE using advanced AI reasoning.

---

## 🎯 **What This Does**

AMZ-Resurrect AI helps suspended Amazon sellers get their accounts reinstated by:
1. Analyzing their specific violation case
2. Generating a professional, policy-compliant Plan of Action
3. Following 2024-2025 Amazon SA/UAE standards (not generic US templates)
4. Using AI trained on successful reinstatement cases

---

## 🛠️ **Tech Stack**

- **Frontend:** Next.js 15 (App Router), React, Tailwind CSS, Lucide Icons
- **Backend:** Next.js API Routes (Edge Runtime)
- **Database:** Supabase (PostgreSQL)
- **AI:** OpenAI API (GPT-4o) with custom reasoning prompts
- **Deployment:** Vercel

---

## 📦 **Project Structure**

```
amz-resurrect-ai/
├── app/
│   ├── page.tsx                    # Bilingual landing page (EN/AR)
│   └── api/
│       └── generate-appeal/
│           └── route.ts            # POA generation API
├── components/
│   └── dashboard.tsx               # Main form & preview UI
├── lib/
│   └── supabase.ts                 # Supabase client & types
├── supabase-schema.sql             # Database schema
├── GROWTH_STRATEGY.md              # 7-day growth hacking plan
└── .env.local                      # Environment variables
```

---

## 🚀 **Quick Start**

### 1. **Install Dependencies**

```bash
npm install
```

### 2. **Set Up Environment Variables**

Edit `.env.local` with your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

### 3. **Set Up Supabase Database**

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Run the SQL commands from `supabase-schema.sql`

This creates:
- `profiles` table (user data & subscription status)
- `appeals` table (POA generation history)
- Row-level security policies
- Indexes for performance

### 4. **Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 **Features**

### Landing Page
- **Bilingual:** Full English & Arabic translations
- **Conversion-focused copy:** High-stakes messaging about lost daily sales
- **Pricing transparency:** Free audit + 299 SAR full POA
- **Urgency elements:** 72-hour countdown, limited attempts messaging

### Dashboard
- **Smart Form:** Collects seller name, ASIN, violation type, root cause
- **Live Streaming:** Real-time POA generation with streaming response
- **Professional Preview:** Clean, paper-like preview of generated POA
- **Copy to Clipboard:** One-click copy for submission to Amazon

### API Route (`/api/generate-appeal`)
- **Edge Runtime:** Fast, globally distributed
- **Hidden System Prompt:** Forces AI to act as Ex-Amazon Investigator
- **Context-Aware:** Includes marketplace-specific guidance (SA vs AE)
- **Streaming Response:** Progressive loading for better UX

---

## 🧠 **How the AI Works**

The core logic is in `app/api/generate-appeal/route.ts`:

1. **System Prompt:** A detailed prompt that forces GPT-4o to think like an Amazon Account Health investigator
2. **User Input:** Seller's story, violation type, ASIN, marketplace
3. **AI Output:** Structured POA with:
   - Root Cause Analysis
   - Immediate Corrective Actions
   - Long-Term Preventive Measures

The prompt emphasizes:
- 2024-2025 policy compliance
- Saudi/UAE market specifics
- Accountability (no excuses)
- Concrete, measurable actions
- Professional business tone

---

## 💾 **Database Schema**

### `profiles` Table
```sql
id              UUID (PK)
email           VARCHAR (unique)
full_name       VARCHAR
subscription_status  VARCHAR (trial/pro/cancelled)
trial_used      BOOLEAN
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### `appeals` Table
```sql
id              UUID (PK)
user_id         UUID (FK -> profiles)
seller_name     VARCHAR
asin            VARCHAR
violation_type  VARCHAR
root_cause_input TEXT
generated_poa   TEXT
status          VARCHAR (pending/generated/submitted/approved/rejected)
marketplace     VARCHAR (SA/AE)
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

---

## 📈 **Growth Strategy**

See `GROWTH_STRATEGY.md` for a complete 7-day plan to acquire your first 10 customers, including:
- Facebook group targeting
- WhatsApp community outreach
- Micro-influencer partnerships
- Direct DM templates (English + Arabic)
- Retargeting strategies

---

## 🔐 **Security Features**

- **Row-Level Security (RLS):** Users can only access their own data
- **Edge Runtime:** API routes run on Vercel Edge for security & performance
- **Environment Variables:** All secrets stored securely in `.env.local`
- **No API Key Exposure:** OpenAI key stays server-side only

---

## 🌍 **Deployment to Vercel**

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: GitHub Integration
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables in Vercel project settings
4. Deploy

**Environment Variables to Set in Vercel:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`

---

## 💰 **Monetization Strategy**

### Pricing Tiers
1. **Free Audit (Lead Magnet)**
   - AI analyzes violation
   - Shows POA outline preview
   - Builds trust before purchase

2. **Pro Plan: 299 SAR**
   - Full POA generation
   - Unlimited revisions (24 hours)
   - Submission guide
   - Priority support

### Revenue Projections
- **10 customers/week** × 299 SAR = 2,990 SAR/week
- **Monthly:** ~12,000 SAR (assuming 40 customers/month)
- **With 20% conversion on 200 leads/month** = 40 customers

---

## 🎯 **Target Market**

### Primary Audience
- Amazon FBA sellers in Saudi Arabia & UAE
- Suspended accounts (IP infringement, counterfeit, inauthenticity)
- Desperate for fast reinstatement (high intent)
- Losing 10,000-20,000 SAR/AED daily in sales

### Pain Points
1. Generic US templates get auto-rejected
2. Don't understand SA/UAE-specific policies
3. Fear of wasting their 3 appeal attempts
4. No time to research (72-hour deadline)

---

## 🛠️ **Future Enhancements**

- [ ] User authentication (Supabase Auth)
- [ ] Payment integration (Stripe/Tap Payments for MENA)
- [ ] Email notifications (Resend/SendGrid)
- [ ] POA revision history
- [ ] Success rate tracking
- [ ] Admin dashboard for support team
- [ ] Multi-language support (add Hindi, Urdu)
- [ ] WhatsApp Business API integration for support

---

## 📞 **Support**

For questions or issues:
- Email: support@amz-resurrect.ai (update with real email)
- WhatsApp: +966-XXX-XXX-XXX (update with real number)

---

## 📄 **License**

Proprietary. All rights reserved.

---

## 🙏 **Credits**

Built with:
- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [OpenAI](https://openai.com)
- [Vercel](https://vercel.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

---

**Let's help Saudi & UAE sellers get back to business! 🚀**
