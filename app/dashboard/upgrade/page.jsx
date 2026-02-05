"use client"

import React, { useState } from 'react'
import { Check, X, Sparkles, Zap } from 'lucide-react'

function Upgrade() {
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

    const plans = [
        {
            id: 'free',
            name: 'Free Plan',
            price: 0,
            priceYearly: 0,
            description: 'Perfect for hobbyists and testing the waters.',
            features: [
                { name: '5 Course Generations per month', included: true },
                { name: 'Basic AI Model (Fast)', included: true },
                { name: 'Standard Support', included: true },
                { name: 'PDF Uploads', included: false },
                { name: 'Export to LMS', included: false },
            ],
            buttonText: 'Current Plan',
            popular: false
        },
        {
            id: 'pro',
            name: 'Pro Creator',
            price: 19,
            priceYearly: 190, // Save money
            description: 'For serious creators who want full power.',
            features: [
                { name: 'Unlimited Course Generations', included: true },
                { name: 'Advanced AI Model (Deep Dive)', included: true },
                { name: 'Priority 24/7 Support', included: true },
                { name: 'Unlimited PDF Uploads', included: true },
                { name: 'Export to SCORM / LMS', included: true },
            ],
            buttonText: 'Upgrade Now',
            popular: true
        }
    ];

    return (
        <div className='p-6 md:px-20 lg:px-32 my-10 w-full'>
            
            {/* Header Section */}
            <div className='text-center mb-12'>
                <h2 className='text-3xl font-bold text-slate-900 mb-4'>
                    Unlock the Full Power of <span className='text-indigo-600'>NextCourse</span>
                </h2>
                <p className='text-slate-500 max-w-xl mx-auto mb-8'>
                    Generate unlimited courses, upload complex syllabi, and export your content seamlessly with our Pro plan.
                </p>

                {/* Billing Toggle */}
                <div className='flex items-center justify-center gap-3'>
                    <span className={`text-sm font-semibold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
                    <div 
                        onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                        className='w-14 h-7 bg-indigo-100 rounded-full p-1 cursor-pointer flex items-center transition-all duration-300 relative'
                    >
                        <div className={`w-5 h-5 bg-indigo-600 rounded-full shadow-md transition-all duration-300 absolute ${billingCycle === 'monthly' ? 'left-1' : 'right-1'}`}></div>
                    </div>
                    <span className={`text-sm font-semibold ${billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-500'}`}>
                        Yearly <span className='text-indigo-600 text-xs bg-indigo-50 px-2 py-0.5 rounded-full ml-1'>Save 20%</span>
                    </span>
                </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
                {plans.map((plan) => (
                    <div 
                        key={plan.id} 
                        className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col
                        ${plan.popular 
                            ? 'border-indigo-600 shadow-xl shadow-indigo-100 scale-105 bg-white z-10' 
                            : 'border-slate-200 bg-white hover:border-indigo-200 hover:shadow-lg'}`}
                    >
                        {/* Popular Badge */}
                        {plan.popular && (
                            <div className='absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1 shadow-lg'>
                                <Sparkles className='h-3 w-3' />
                                MOST POPULAR
                            </div>
                        )}

                        {/* Plan Title & Price */}
                        <div className='mb-6'>
                            <h3 className='font-bold text-lg text-slate-800'>{plan.name}</h3>
                            <div className='flex items-baseline gap-1 mt-2'>
                                <span className='text-3xl font-extrabold text-slate-900'>
                                    ${billingCycle === 'monthly' ? plan.price : Math.round(plan.priceYearly / 12)}
                                </span>
                                <span className='text-slate-500'>/month</span>
                            </div>
                            <p className='text-xs text-slate-400 mt-1'>
                                {billingCycle === 'yearly' && plan.price > 0 ? `Billed $${plan.priceYearly} yearly` : 'Billed monthly'}
                            </p>
                            <p className='text-sm text-slate-500 mt-4 leading-relaxed'>{plan.description}</p>
                        </div>

                        {/* Action Button */}
                        <button className={`w-full py-3 rounded-xl font-semibold mb-8 transition-all
                            ${plan.popular 
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' 
                                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}
                        >
                            {plan.buttonText}
                        </button>

                        {/* Features List */}
                        <div className='space-y-4 flex-1'>
                            {plan.features.map((feature, index) => (
                                <div key={index} className='flex items-center gap-3'>
                                    {feature.included ? (
                                        <div className='p-0.5 rounded-full bg-indigo-100 text-indigo-600'>
                                            <Check className='h-3 w-3' />
                                        </div>
                                    ) : (
                                        <div className='p-0.5 rounded-full bg-slate-100 text-slate-400'>
                                            <X className='h-3 w-3' />
                                        </div>
                                    )}
                                    <span className={`text-sm ${feature.included ? 'text-slate-700' : 'text-slate-400'}`}>
                                        {feature.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Trust Footer */}
            <div className='mt-16 text-center space-y-2'>
                <p className='text-sm text-slate-500'>Secure payment via Stripe. Cancel anytime.</p>
                <div className='flex justify-center gap-4 opacity-50 grayscale'>
                    {/* You can add payment logos here later */}
                </div>
            </div>
        </div>
    )
}

export default Upgrade