import React from "react";
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Price: React.FC = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      priceLabel: "Free",
      subtitle: "/ month",
      description: "A simple starter plan for individuals and small teams to get started.",
      features: ["1 organization", "3 templates", "Basic reporting", "Email support"],
    },
    {
      name: "Premium Monthly",
      priceLabel: "$10",
      subtitle: "/ month",
      badge: "🔥 Most popular",
      description: "For teams that need more automation, templates and analytics.",
      features: [
        "Multiple organizations",
        "All templates",
        "Advanced reporting",
        "Priority support",
        "API access",
      ],
    },
    {
      name: "Premium Yearly",
      priceLabel: "$100",
      subtitle: "/ month",
      description: "For teams that need more automation, templates and analytics.",
      features: [
        "Multiple organizations",
        "All templates",
        "Advanced reporting",
        "Priority support",
        "API access",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-10 px-4 md:px-28 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:space-y-4 mb-4 md:mb-12">
          <h2 className="font-extrabold text-3xl md:text-4xl">Pricing designed for scale</h2>
          <p className="text-sm md:text-base text-gray-500">Just straight-forward pricing that aligns with your business goals.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="w-full border border-gray-200 rounded-xl p-5 flex flex-col justify-between gap-8 transition-all duration-300 bg-white hover:shadow-lg hover:scale-105 hover:border-orange-500">
              <div className="space-y-6">
                <div className="flex flex-col gap-4">
                  <div className="text-orange-500 font-medium flex items-start justify-between">
                    <small>{plan.name}</small>
                    {plan.badge ? <div className="bg-[#FFF7F0] rounded-3xl text-xs px-3 py-1">{plan.badge}</div> : null}
                  </div>

                  <p className="font-bold text-3xl text-gray-900">
                    {plan.priceLabel} <span className="text-sm text-gray-400 font-medium">{plan.subtitle}</span>
                  </p>
                </div>

                <div className="text-gray-500 leading-6 font-medium text-sm">{plan.description}</div>

                <hr />

                <div className="text-sm space-y-4">
                  {plan.features.map((f, i) => (
                    <div key={i} className="text-gray-700 flex items-center gap-3">
                      <span className="text-green-500 w-5 h-5 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4" />
                      </span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => navigate('/signup')}
                className="rounded-md cursor-pointer px-5 py-3 bg-[#FFF7F0] text-orange-500 font-medium text-center w-full hover:bg-orange-500 hover:text-white transition-colors"
              >
                Explore all features
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Price;
