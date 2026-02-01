"use client";
import {
  Target,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Star,
} from "lucide-react";
import Image from "next/image";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import Link from "next/link";

export default function AboutSection() {
  const stats = [
    { number: 500, label: "Medical Representatives Trained", suffix: "+" },
    { number: 98, label: "Success Rate", suffix: "%" },
    { number: 50, label: "Pharmaceutical Companies", suffix: "+" },
    { number: 24, label: "Expert Support", suffix: "/7" },
  ];

  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description:
        "We focus on measurable outcomes that directly impact your sales performance and career growth.",
    },
    {
      icon: Users,
      title: "Expert-Led Training",
      description:
        "Learn from industry veterans with decades of pharmaceutical sales experience and proven track records.",
    },
    {
      icon: Award,
      title: "Excellence Standard",
      description:
        "Our training programs meet the highest industry standards and are continuously updated with latest trends.",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description:
        "Accelerate your professional development with strategies that position you as a top performer in your field.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      {/* Header Section */}
      <div className="text-center mb-16 mt-20">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight mx-auto">
          Transforming <span className="text-blue-700">Pharmaceutical</span>{" "}
          <br />
          <span className="text-emerald-600">Sales Excellence</span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
          At TopRep, we believe that exceptional pharmaceutical sales
          professionals are made, not born. Our mission is to empower medical
          representatives with the knowledge, skills, and confidence they need
          to excel in today&apos;s competitive healthcare landscape.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-blue-800 mb-2">
              <CountUp
                end={stat.number}
                duration={3}
                suffix={stat.suffix}
                enableScrollSpy
              />
              {/* {stat.number} */}
            </div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-20 mt-16 md:mt-28 lg:mt-44">
        {/* Left Content */}
        <div className="flex-1">
          <div className="">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our <span className="text-emerald-600">Story</span>
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Founded by industry veterans who understood the challenges
                facing modern medical representatives, TopRep was born from a
                simple observation: traditional sales training wasn&apos;t
                meeting the unique demands of pharmaceutical sales.
              </p>

              <p>
                We recognized that successful medical representatives need more
                than generic sales techniques. They need specialized knowledge
                about healthcare systems, regulatory environments, and the
                complex decision-making processes of healthcare professionals.
              </p>

              <p>
                Today, TopRep stands as the premier destination for
                pharmaceutical sales training, combining cutting-edge video
                content with practical, real-world strategies that deliver
                measurable results.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-700">
                  Evidence-based training methodologies
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-700">
                  Continuous curriculum updates and improvements
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-700">
                  Personalized learning paths for different experience levels
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Right Content */}
        <div className="flex-1">
          <Image
            src="/story.jpg"
            alt="about"
            width={500}
            height={500}
            className="size-full "
          />
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16 mb-20 mt-16 md:mt-28 lg:mt-44">
        <div className="flex-1">
          <Image
            src="/mission.jpg"
            alt="about"
            width={500}
            height={500}
            className="size-full "
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-700">Mission</span>
          </h2>

          <div className="text-lg text-gray-700 leading-relaxed mb-8">
            <p className="mb-6">
              We exist to bridge the gap between potential and performance in
              pharmaceutical sales. Every medical representative deserves access
              to world-class training that not only improves their sales results
              but also enhances patient outcomes through better healthcare
              professional relationships.
            </p>

            <p>
              Our comprehensive approach combines theoretical knowledge with
              practical application, ensuring that every learner can immediately
              implement what they&apos;ve learned in real-world situations.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16 mt-16 md:mt-28 lg:mt-44">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 lg:text-center mb-4">
          Our <span className="text-emerald-600">Core Values</span>
        </h2>
        <p className="text-xl text-gray-600 lg:text-center mb-12 max-w-3xl mx-auto">
          These principles guide everything we do and shape the experience of
          every learner who joins the TopRep community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div key={index} className="lg:text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-full flex items-center justify-center lg:mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="text-center my-32">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Ready to <span className="text-blue-700">Transform</span> Your{" "}
          <span className="text-emerald-600">Career?</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Join thousands of successful medical representatives who have elevated
          their careers with TopRep&apos;s expert-led training programs.
        </p>
        <Link
          href="/contact"
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
        >
          {/* <Star className="w-5 h-5" /> */}
          Start Your Journey Today
        </Link>
      </div>
    </div>
  );
}
