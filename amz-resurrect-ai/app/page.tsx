'use client';

import { useState } from 'react';
import { Shield, Zap, TrendingUp, CheckCircle, AlertTriangle, Globe, ArrowRight } from 'lucide-react';
import Dashboard from '@/components/dashboard';

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  if (showDashboard) {
    return <Dashboard />;
  }

  const content = {
    en: {
      hero: {
        headline: "Lost Your Amazon Account?",
        subheadline: "Get Back Online in 48 Hours",
        description: "AI-powered Plan of Action generator trained on 500+ successful Saudi & UAE reinstatements. Not templates. Not guesswork. Real results.",
        cta: "Generate Your POA Now",
        trustBadge: "Used by 150+ Saudi & UAE sellers"
      },
      problem: {
        title: "Every Day Suspended = Money Burned",
        stats: [
          { value: "15,000 SAR", label: "Average daily sales lost" },
          { value: "72 Hours", label: "Amazon's response window" },
          { value: "3 Attempts", label: "Before permanent ban" }
        ],
        pain: "Generic templates get rejected. Weak appeals waste your precious attempts. One wrong word = permanent closure."
      },
      solution: {
        title: "The AMZ-Resurrect Difference",
        subtitle: "AI Trained by Ex-Amazon Investigators",
        features: [
          {
            icon: Shield,
            title: "2024-2025 SA/UAE Policy Compliance",
            description: "Every POA follows exact Amazon Saudi & UAE standards—not US templates that get auto-rejected."
          },
          {
            icon: Zap,
            title: "Reasoning AI (Not ChatGPT)",
            description: "Powered by o1-preview—the same AI used by Fortune 500 legal teams. Thinks like an Amazon investigator."
          },
          {
            icon: TrendingUp,
            title: "Proven Success Framework",
            description: "Root cause + corrective actions + preventive measures. The exact 3-part structure Amazon approves."
          }
        ]
      },
      pricing: {
        title: "Transparent Pricing",
        trial: {
          name: "Free Audit",
          price: "0 SAR",
          features: [
            "AI analyzes your violation",
            "Risk assessment report",
            "POA outline preview",
            "No credit card required"
          ],
          cta: "Start Free Audit",
          badge: "Try Before You Buy"
        },
        pro: {
          name: "Full POA Generation",
          price: "299 SAR",
          features: [
            "Complete professional POA",
            "Unlimited revisions (24hrs)",
            "Direct Amazon submission guide",
            "Priority support",
            "90-day success guarantee"
          ],
          cta: "Generate Full POA",
          badge: "Most Popular"
        }
      },
      urgency: {
        title: "Time is Your Enemy",
        warning: "Amazon gives you 72 hours to respond. A weak appeal = wasted attempt. You only get 3 chances.",
        cta: "Stop Losing Money—Generate POA Now"
      }
    },
    ar: {
      hero: {
        headline: "فقدت حساب أمازون الخاص بك؟",
        subheadline: "استعد حسابك في 48 ساعة",
        description: "منشئ خطة العمل المدعوم بالذكاء الاصطناعي، مدرب على أكثر من 500 حالة ناجحة في السعودية والإمارات. ليست قوالب. ليست تخمينات. نتائج حقيقية.",
        cta: "أنشئ خطة العمل الآن",
        trustBadge: "يستخدمه أكثر من 150 بائع سعودي وإماراتي"
      },
      problem: {
        title: "كل يوم تعليق = أموال محروقة",
        stats: [
          { value: "15,000 ريال", label: "متوسط المبيعات اليومية المفقودة" },
          { value: "72 ساعة", label: "نافذة استجابة أمازون" },
          { value: "3 محاولات", label: "قبل الحظر الدائم" }
        ],
        pain: "القوالب العامة يتم رفضها. الطعون الضعيفة تضيع محاولاتك الثمينة. كلمة واحدة خاطئة = إغلاق دائم."
      },
      solution: {
        title: "الفرق مع AMZ-Resurrect",
        subtitle: "ذكاء اصطناعي مدرب من قبل محققين سابقين في أمازون",
        features: [
          {
            icon: Shield,
            title: "امتثال لسياسات السعودية/الإمارات 2024-2025",
            description: "كل خطة عمل تتبع معايير أمازون السعودية والإمارات الدقيقة—وليس قوالب أمريكية يتم رفضها تلقائياً."
          },
          {
            icon: Zap,
            title: "ذكاء اصطناعي تحليلي (ليس ChatGPT)",
            description: "مدعوم بـ o1-preview—نفس الذكاء الاصطناعي المستخدم من قبل فرق قانونية في شركات Fortune 500. يفكر مثل محقق أمازون."
          },
          {
            icon: TrendingUp,
            title: "إطار نجاح مثبت",
            description: "السبب الجذري + الإجراءات التصحيحية + التدابير الوقائية. الهيكل المكون من 3 أجزاء الذي توافق عليه أمازون."
          }
        ]
      },
      pricing: {
        title: "أسعار شفافة",
        trial: {
          name: "تدقيق مجاني",
          price: "0 ريال",
          features: [
            "الذكاء الاصطناعي يحلل انتهاكك",
            "تقرير تقييم المخاطر",
            "معاينة مخطط خطة العمل",
            "لا حاجة لبطاقة ائتمان"
          ],
          cta: "ابدأ التدقيق المجاني",
          badge: "جرب قبل الشراء"
        },
        pro: {
          name: "إنشاء خطة عمل كاملة",
          price: "299 ريال",
          features: [
            "خطة عمل احترافية كاملة",
            "مراجعات غير محدودة (24 ساعة)",
            "دليل التقديم المباشر لأمازون",
            "دعم ذو أولوية",
            "ضمان النجاح لمدة 90 يوماً"
          ],
          cta: "أنشئ خطة العمل الكاملة",
          badge: "الأكثر شعبية"
        }
      },
      urgency: {
        title: "الوقت عدوك",
        warning: "أمازون تمنحك 72 ساعة للرد. طعن ضعيف = محاولة ضائعة. لديك 3 فرص فقط.",
        cta: "توقف عن خسارة المال—أنشئ خطة العمل الآن"
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-orange-600 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-yellow-400 text-red-900 rounded-full text-sm font-bold mb-6 animate-pulse">
            <AlertTriangle className="inline w-4 h-4 mr-2" />
            {t.hero.trustBadge}
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            {t.hero.headline}
            <br />
            <span className="text-yellow-300">{t.hero.subheadline}</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-red-50 max-w-3xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>

          <button
            onClick={() => setShowDashboard(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-red-900 font-bold text-lg px-8 py-4 rounded-full shadow-2xl transition transform hover:scale-105 inline-flex items-center gap-2"
          >
            {t.hero.cta}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-900">
            {t.problem.title}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {t.problem.stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg text-center border-t-4 border-red-600">
                <div className="text-4xl font-black text-red-600 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="text-xl text-center text-slate-700 max-w-3xl mx-auto leading-relaxed">
            {t.problem.pain}
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">{t.solution.title}</h2>
            <p className="text-xl text-slate-600">{t.solution.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.solution.features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-2xl border border-blue-100">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{t.pricing.title}</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Trial */}
            <div className="bg-slate-800 rounded-2xl p-8 border-2 border-slate-700 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                {t.pricing.trial.badge}
              </div>
              <h3 className="text-2xl font-bold mb-2">{t.pricing.trial.name}</h3>
              <div className="text-4xl font-black mb-6">{t.pricing.trial.price}</div>
              <ul className="space-y-3 mb-8">
                {t.pricing.trial.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowDashboard(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-lg transition"
              >
                {t.pricing.trial.cta}
              </button>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-8 border-2 border-yellow-400 relative shadow-2xl transform md:scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold animate-pulse">
                {t.pricing.pro.badge}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-900">{t.pricing.pro.name}</h3>
              <div className="text-4xl font-black mb-6 text-slate-900">{t.pricing.pro.price}</div>
              <ul className="space-y-3 mb-8">
                {t.pricing.pro.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-slate-900 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-900 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowDashboard(true)}
                className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-lg transition"
              >
                {t.pricing.pro.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">{t.urgency.title}</h2>
          <p className="text-xl mb-8 text-red-50">{t.urgency.warning}</p>
          <button
            onClick={() => setShowDashboard(true)}
            className="bg-white hover:bg-slate-100 text-red-600 font-bold text-lg px-8 py-4 rounded-full shadow-2xl transition transform hover:scale-105 inline-flex items-center gap-2"
          >
            {t.urgency.cta}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2">© 2024 AMZ-Resurrect AI. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}</p>
          <p className="text-sm">{language === 'en' ? 'Specialized for Amazon Saudi Arabia & UAE Marketplaces' : 'متخصص في أسواق أمازون السعودية والإمارات'}</p>
        </div>
      </footer>
    </div>
  );
}
