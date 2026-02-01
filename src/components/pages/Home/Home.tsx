"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Play,
  Users,
  Clock,
  TrendingUp,
  Stethoscope,
  FileText,
  BarChart3,
} from "lucide-react";
import VideosSection from "./components/VideosSection";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getPlan, SubscriptionPlan } from "@/lib/subscription";

export default function Home() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  const [planId, setPlanId] = useState<string | null>(null);

  const getPlanStatus = async () => {
    const email = session?.user?.email;
    if (!email) {
      return;
    }
    const plan = await getPlan(email);
    setPlan(plan);
  };

  const handleClick = async (
    plan: "basic" | "pro",
    amount: number,
    planId: string,
  ) => {
    setPlanId(planId);
    setIsLoading(true);
    if (!session?.user?.email) {
      router.push("/auth/signin");
      return;
    }

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          plan,
          amount,
        }),
      });

      const { sessionId } = await response.json();

      if (sessionId) {
        const stripe = await import("@stripe/stripe-js").then((mod) =>
          mod.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!),
        );
        if (!stripe) {
          throw new Error("Stripe failed to initialize");
        }

        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (error) {
          console.error("Stripe error:", error);
          toast.error("Failed to redirect to payment");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPlanStatus();
  }, [session]);

  return (
    <div className="pt-20 bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header Section */}
      <header className="container mx-auto px-4 py-8 my-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center lg:text-left">
            {/* Headlines */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Unlock the Secrets to{" "}
              <span className="text-blue-700">Pharmaceutical Sales</span>{" "}
              <span className="text-emerald-600">Success</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Access expert-led video content tailored for medical
              representatives to close more deals, boost revenue, and excel in
              pharmaceutical sales.
            </p>

            <Link href={"/contact"}>
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-12 py-7 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm "
              >
                Start Your Journey Today
              </Button>
            </Link>
          </div>

          {/* Hero Visual */}
          <div className="flex-1 relative ">
            <div className="bg-white rounded-2xl h-[300px] shadow-2xl p-8 max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Expert Training
                  </h3>
                  <p className="text-sm text-gray-600">
                    Advanced Sales Techniques
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-gray-700">
                    Pharmacy-specific strategies
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-gray-700">
                    Real-world case studies
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-gray-700">
                    24/7 access to content
                  </span>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </header>

      <VideosSection />
      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Excel in Pharmaceutical Sales
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive training designed specifically for medical
            representatives at every career stage
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Play className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-blue-800">
                Exclusive Video Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                In-depth, expert-curated videos by top pharmaceutical sales
                leaders covering advanced sales strategies for the healthcare
                industry.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 ">
                <Stethoscope className="w-6 h-6 text-emerald-600 " />
              </div>
              <CardTitle className="text-emerald-700">
                Pharmacy-Specific Techniques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Actionable, real-world strategies to engage healthcare
                professionals, build trust, and drive prescription sales.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-blue-800">
                Tailored for All Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Content designed for both new and experienced medical
                representatives, from onboarding to advanced deal-closing
                techniques.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <CardTitle className="text-emerald-700">
                On-Demand Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Flexible, 24/7 access to videos, allowing users to learn at
                their own pace, anywhere, anytime.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-blue-800">
                Regularly Updated Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Stay ahead with fresh, industry-relevant strategies reflecting
                the latest trends in pharmaceutical sales.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <CardTitle className="text-emerald-700">
                Expert-Led Training
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Learn from industry veterans with proven track records in
                pharmaceutical sales and healthcare relationship building.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-800 to-emerald-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Begin Your Journey to Pharmaceutical Sales Excellence
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Begin your journey to pharmaceutical sales excellence and earn
            higher incentives. Subscribe today to unlock consistent, high-impact
            selling.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => handleClick("basic", 1000, "basic_id")}
              size="lg"
              className="bg-emerald-500 cursor-pointer hover:bg-emerald-400 text-white px-12 h-14 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading && planId === "basic_id"
                ? "Loading..."
                : "Subscribe Now for $10/Month"}
            </Button>
            {/* <Link href={"/calendly"}> */}
            <Button
              onClick={() => {
                plan?.plan === "pro" && plan?.status === "active"
                  ? router.push("/calendly")
                  : handleClick("pro", 4900, "pro_id");
              }}
              size="lg"
              variant="outline"
              className="bg-blue-500 border-0 cursor-pointer hover:bg-blue-400 text-white  px-12 h-14 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:text-white"
            >
              {isLoading && planId === "pro_id"
                ? "Loading..."
                : "Subscribe Now for $49/Month"}
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </section>

      {/* Payment Section / Footer */}
      <footer className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Subscription Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center text-blue-800">
                    Monthly Subscription - $10
                  </CardTitle>
                  <CardDescription className="text-center">
                    Full access to all video content and resources
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4 text-gray-700 mb-10">
                    <div className="grid grid-flow-col items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span>
                        Unlimited access to health and wellness resources
                      </span>
                    </div>
                    <div className="grid grid-flow-col items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span>
                        Weekly virtual sessions with certified healthcare
                        coaches
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span>Personalized nutrition and fitness plans</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span>24/7 access to a healthcare support chat</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span>Discounts on partner clinics and labs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span>Monthly progress tracking reports</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleClick("basic", 1000, "basic_id_1")}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-12  font-semibold"
                  >
                    {isLoading && planId === "basic_id_1"
                      ? "Loading..."
                      : "Subscribe Now for $10/Month"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center text-blue-800">
                    1-on-1 Strategy Consultation
                  </CardTitle>
                  <CardDescription className="text-center">
                    Personalized sales coaching session - $49/hour
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Personalized sales strategy review</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Territory optimization guidance</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Deal-closing technique coaching</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Q&A with industry experts</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Exclusive access to market trend reports</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>One-on-one mentoring sessions</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Actionable feedback on live sales calls</span>
                    </div>
                  </div>
                  {/* <Link href={"/calendly"}> */}
                  <Button
                    onClick={() => {
                      plan?.plan === "pro" && plan?.status === "active"
                        ? router.push("/calendly")
                        : handleClick("pro", 4900, "pro_id_1");
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-800 text-white h-12 font-semibold mt-8"
                  >
                    {isLoading && planId === "pro_id_1"
                      ? "Loading..."
                      : "Book a Consultant"}
                  </Button>
                  {/* </Link> */}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
