import { ServiceTemplate } from '@/components/services/ServiceTemplate';
import { RefreshCw } from 'lucide-react';

export default function TradeInPage() {
  return (
    <ServiceTemplate
      title="Trade-In"
      description="Get a fair, honest value for your current vehicle. Our straightforward appraisal process gives you a clear picture with no obligation."
      heroImage="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1920&q=80"
      icon={RefreshCw}
      whoIsThisFor={[
        "Anyone looking to upgrade to a newer vehicle",
        "Owners wanting to simplify the selling process",
        "Those with a vehicle they no longer need",
        "People ending a lease with equity in their car",
        "Drivers looking to reduce monthly payments",
      ]}
      commonIssues={[
        "Lowball offers from dealers trying to maximize profit",
        "Time-consuming process of selling privately",
        "Uncertainty about true market value",
        "Hassle of coordinating sale with new purchase",
        "Questions about payoff amounts and equity",
      ]}
      howItWorks={[
        { title: "Information", description: "Tell us about your vehicle—make, model, year, mileage, and condition." },
        { title: "Appraisal", description: "We assess value based on market data and vehicle condition." },
        { title: "Offer", description: "Receive a clear, no-obligation offer you can think about." },
        { title: "Transaction", description: "Accept the offer and we handle all the paperwork." },
      ]}
      whatToExpect={[
        "Transparent valuation based on real market data",
        "No pressure to accept—take your time to decide",
        "Clear explanation of how we arrived at the value",
        "Help with payoff and title transfer",
        "Option to apply value toward a new vehicle",
      ]}
      faqs={[
        { question: "How do you determine trade-in value?", answer: "We use current market data, vehicle condition, mileage, service history, and local demand to arrive at a fair value. We'll explain our reasoning so you understand the offer." },
        { question: "What if I still owe money on my car?", answer: "No problem. We'll factor in your payoff amount. If you have equity, it goes toward your new vehicle or back to you. If you're upside down, we can discuss options." },
        { question: "Do I have to buy a car from you to trade in?", answer: "While we're happy to help you find your next vehicle, we can also discuss purchasing your car outright if that's what you prefer." },
        { question: "What condition does my car need to be in?", answer: "We accept vehicles in all conditions. Obviously, better condition means higher value, but we're transparent about how condition affects our offer." },
        { question: "How long is the trade-in offer valid?", answer: "Typically 7-14 days, depending on market conditions. We'll give you a specific timeframe with your offer." },
      ]}
    />
  );
}
