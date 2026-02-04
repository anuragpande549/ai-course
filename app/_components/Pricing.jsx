"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    description: "Perfect for hobbyists and casual learners.",
    price: { monthly: 0, yearly: 0 },
    features: [
      "Generate 3 Courses / Month",
      "Basic Gemini AI Model",
      "Standard Video Curation",
      "Public Community Access",
      "Ad-supported Dashboard",
    ],
    cta: "Start for Free",
    popular: false,
  },
  {
    name: "Pro Learner",
    description: "For serious students who want to master skills fast.",
    price: { monthly: 15, yearly: 144 }, // 144/12 = 12 per month
    features: [
      "Unlimited Course Generation",
      "Advanced Gemini 1.5 Pro Model",
      "Ad-Free Experience",
      "Export to PDF & Markdown",
      "Priority Video Processing",
      "Quizzes & Progress Tracking",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Team",
    description: "Collaborate and share knowledge with your team.",
    price: { monthly: 49, yearly: 470 },
    features: [
      "Everything in Pro",
      "Up to 5 User Seats",
      "Shared Workspace",
      "Admin Analytics Dashboard",
      "Custom Branding (White-label)",
      "24/7 Priority Support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-white py-24 sm:py-32 relative overflow-hidden">
        
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-indigo-50 blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] rounded-full bg-blue-50 blur-3xl opacity-50" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Invest in your knowledge
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the plan that fits your learning pace. Cancel anytime.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="mt-16 flex justify-center">
          <div className="relative flex items-center rounded-full bg-gray-100 p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative z-10 rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                !isAnnual ? "text-white" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative z-10 rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                isAnnual ? "text-white" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Yearly
              <span className="absolute -top-3 -right-6 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-600 ring-1 ring-green-600/20">
                -20%
              </span>
            </button>
            
            {/* Sliding Background Pill */}
            <div
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-indigo-600 transition-transform duration-300 ${
                isAnnual ? "translate-x-full" : "translate-x-0"
              }`}
            />
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col justify-between rounded-3xl p-8 shadow-xl ring-1 transition-transform hover:-translate-y-2 ${
                plan.popular
                  ? "bg-gray-900 text-white ring-gray-900 scale-105 z-10"
                  : "bg-white text-gray-900 ring-gray-200"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-indigo-500 px-3 py-1 text-center text-sm font-semibold text-white shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className={`text-lg font-semibold leading-8 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                </div>
                
                <p className={`mt-4 text-sm leading-6 ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight">
                    ${isAnnual 
                        ? Math.round(plan.price.yearly / 12) 
                        : plan.price.monthly}
                  </span>
                  <span className={`text-sm font-semibold leading-6 ${plan.popular ? 'text-gray-400' : 'text-gray-600'}`}>
                    /month
                  </span>
                </p>
                {isAnnual && plan.price.monthly > 0 && (
                    <p className={`mt-1 text-xs ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                        Billed ${plan.price.yearly} yearly
                    </p>
                )}

                <ul role="list" className={`mt-8 space-y-3 text-sm leading-6 ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className={`h-6 w-5 flex-none ${plan.popular ? 'text-indigo-400' : 'text-indigo-600'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#"
                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  plan.popular
                    ? "bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline-indigo-500 shadow-lg shadow-indigo-500/20"
                    : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 focus-visible:outline-indigo-600"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  );
}

export default Pricing;