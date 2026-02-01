"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { getPlan, SubscriptionPlan } from "@/lib/subscription";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { data: session } = useSession();
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (plan: "basic" | "pro", amount: number) => {
    if (!session?.user?.email) {
      router.push("/auth/signin");
      return;
    }

    setIsLoading(true);

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

  const getPlanStatus = async () => {
    const email = session?.user?.email;
    if (!email) {
      return;
    }
    const plan = await getPlan(email);
    setPlan(plan);
  };

  useEffect(() => {
    getPlanStatus();
  }, [session]);

  const links = [
    "Professional Dressing and Attire",
    "Key Performance Indicators",
    "Selling Skills",
    "Relation Building",
    "Education",
    "AI",
  ];

  return (
    <header className="fixed bg-white backdrop-blur-md top-0 left-0 w-full z-50">
      <div className="container mx-auto md:px-4 px-2 flex items-center justify-between py-5">
        <Link href={"/"}>
          <div className="flex items-center justify-center lg:justify-start">
            <div className="text-4xl font-bold">
              <span className="text-blue-800">T</span>
              <span className="text-emerald-500">P</span>
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-700">
              TopRep
            </span>
          </div>
        </Link>
        <div className="hidden lg:block">
          <nav>
            <ul className="hidden lg:flex items-center justify-center  space-x-6 text-white ">
              <Link
                href="/"
                className="hover:text-primary text-black transition-all"
              >
                Home
              </Link>
              <Link
                className="hover:text-primary text-black transition-all"
                href="/about"
              >
                About Us
              </Link>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="group text-black cursor-pointer flex items-center gap-2">
                  Services
                  <ChevronDown className="h-4 w-4 transform transition-transform duration-300 group-data-[state=open]:-rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {links.map((link, index) => (
                    <DropdownMenuItem
                      key={index}
                      className="hover:bg-gray-200 py-2"
                    >
                      <Link
                        href={`/videos/${link.trim().replace(/\s+/g, "-")}`}
                      >
                        {link}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                className="hover:text-primary text-black transition-all"
                href="/contact"
              >
                Contact Us
              </Link>
            </ul>
          </nav>
        </div>
        <button
          onClick={() => {
            setShowNav(!showNav);
          }}
          className="bg-white lg:hidden px-3 py-[10px] rounded-xl cursor-pointer"
        >
          <Menu />
        </button>
        <div className=" items-center lg:gap-3 lg:flex hidden">
          <Button
            className="bg-emerald-500  hover:bg-emerald-600 border border-white uppercase text-white !py-5 !px-10 rounded-md text-sm"
            onClick={() => {
              plan?.plan === "pro" && plan?.status === "active"
                ? router.push("/calendly")
                : handleClick("pro", 9900);
            }}
          >
            Book a Consultant
          </Button>
        </div>
      </div>

      <div>
        <nav>
          <ul
            className={`fixed lg:hidden ${
              showNav ? "translate-x-0" : "translate-x-[100%]"
            } z-[100] top-0 left-0 w-full transition-all duration-300 h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-center gap-7 text-black outfit`}
          >
            <Link className=" transition-all hover:text-emerald-500" href="/">
              Home
            </Link>
            <Link
              className=" transition-all hover:text-emerald-500"
              href="/about"
            >
              About Us
            </Link>
            <div className="relative">
              {/* Trigger */}
              <button
                onClick={() => setOpen(!open)}
                className="flex mx-auto items-center gap-2 text-black cursor-pointer"
              >
                Services
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    open ? "-rotate-180" : ""
                  }`}
                />
              </button>

              {/* Menu Content */}
              {/* {open && ( */}
              <div
                className={` mt-2 w-full duration-300 text-center overflow-hidden  z-50 ${
                  open ? "h-72" : "h-0"
                }`}
              >
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={`/videos/${link.trim().replace(/\s+/g, "-")}`}
                    className="block px-4 py-2 hover:text-emerald-500 text-black transition-colors duration-200"
                    onClick={() => setOpen(false)}
                  >
                    {link}
                  </Link>
                ))}
              </div>

              {/* )} */}
            </div>
            <Link
              className=" transition-all hover:text-emerald-500"
              href="/contact"
            >
              Contact Us
            </Link>
            <Button
              className="bg-emerald-500 !my-4 hover:bg-emerald-600 border border-white uppercase text-white !py-3 !px-10 rounded-md text-sm"
              onClick={() => {
                plan?.plan === "pro" && plan?.status === "active"
                  ? router.push("/calendly")
                  : handleClick("pro", 4900);
              }}
            >
              Book a Consultant
            </Button>

            <span
              onClick={() => {
                setShowNav(!showNav);
              }}
              className="bg- z-[60] cursor-pointer lg:hidden px-3 py-[10px] rounded-xl outfit absolute top-5 right-6"
            >
              <X />
            </span>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
