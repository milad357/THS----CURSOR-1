import Link from 'next/link';
import Disclaimer from '@/components/Disclaimer';
import Logo from '@/components/Logo';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import HeroContactStrip from '@/components/HeroContactStrip';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import MetaLabel from '@/components/ui/MetaLabel';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#05070D] via-[#050B18] to-[#05060A] min-h-[70vh] flex items-center">
        {/* Background Watermark Logo with Reticle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 translate-y-8">
          {/* Reticle Circles */}
          <div className="absolute w-[500px] md:w-[600px] h-[500px] md:h-[600px] opacity-[0.03]">
            <div className="absolute inset-0 border border-white rounded-full"></div>
            <div className="absolute inset-[25%] border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white"></div>
          </div>
          {/* Animated Watermark */}
          <div className="opacity-[0.03] blur-[3px] w-[390px] md:w-[480px] rotate-slow">
            <Logo width={480} variant="dark" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pt-24 md:pt-32 pb-12 md:pb-16 text-center relative z-10 w-full">
          <SectionHeading sector="SECTOR: HOME DEFENSE / 01">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Be Ready When Seconds Matter
            </h1>
          </SectionHeading>
          
          <p className="mt-4 text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Tactical Home Solutions gives everyday Americans the skills, confidence, and plans they need to protect their homes and families when help is far away.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton href="/services">
              View Training Packages
            </PrimaryButton>
            <SecondaryButton href="/contact">
              Contact Us
            </SecondaryButton>
          </div>

          <p className="mt-5 text-xs md:text-sm text-text-muted">
            Training from U.S. Military, Law Enforcement, Executive Protection, and Certified Firearms Instructors.
          </p>

          <HeroContactStrip />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/5"></div>

      {/* Quick Pillars / Value Props */}
      <section className="bg-bg-base">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-bg-card border border-white/5 rounded-xl p-4 md:p-5 flex flex-col gap-2 shadow-[0_18px_40px_rgba(0,0,0,0.7)]/40 hover:border-white/15 hover:-translate-y-[2px] hover:shadow-[0_22px_50px_rgba(0,0,0,0.9)] transition-all duration-200">
              <h3 className="text-sm md:text-base font-semibold text-white">Real-World Scenarios</h3>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                Training based on realistic home-invasion and high-stress situations.
              </p>
            </div>

            <div className="bg-bg-card border border-white/5 rounded-xl p-4 md:p-5 flex flex-col gap-2 shadow-[0_18px_40px_rgba(0,0,0,0.7)]/40 hover:border-white/15 hover:-translate-y-[2px] hover:shadow-[0_22px_50px_rgba(0,0,0,0.9)] transition-all duration-200">
              <h3 className="text-sm md:text-base font-semibold text-white">Legal Awareness</h3>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                Understand the basics of how self-defense laws apply in your state.
              </p>
            </div>

            <div className="bg-bg-card border border-white/5 rounded-xl p-4 md:p-5 flex flex-col gap-2 shadow-[0_18px_40px_rgba(0,0,0,0.7)]/40 hover:border-white/15 hover:-translate-y-[2px] hover:shadow-[0_22px_50px_rgba(0,0,0,0.9)] transition-all duration-200">
              <h3 className="text-sm md:text-base font-semibold text-white">Home-Specific Planning</h3>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                In-home assessments that map your actual layout, not generic theory.
              </p>
            </div>

            <div className="bg-bg-card border border-white/5 rounded-xl p-4 md:p-5 flex flex-col gap-2 shadow-[0_18px_40px_rgba(0,0,0,0.7)]/40 hover:border-white/15 hover:-translate-y-[2px] hover:shadow-[0_22px_50px_rgba(0,0,0,0.9)] transition-all duration-200">
              <h3 className="text-sm md:text-base font-semibold text-white">Confidence Under Pressure</h3>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                Build the mindset and skills to act when it counts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 bg-bg-elevated">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8 md:mb-12">
            Featured Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
            <Card variant="intel" className="border-white/8">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <MetaLabel className="mb-1">SERVICE 01</MetaLabel>
              <h3 className="text-base md:text-lg font-semibold text-white">In-Home Practical Defense Assessment</h3>
              <ul className="space-y-1.5 text-sm text-text-secondary leading-relaxed">
                <li>• Full home walk-through</li>
                <li>• Entry point analysis</li>
                <li>• Personalized defense plan</li>
              </ul>
              <Link
                href="/services"
                className="inline-block text-accent-red hover:text-red-400 font-medium text-sm mt-auto transition-colors"
              >
                Learn More →
              </Link>
            </Card>

            <Card variant="intel" className="border-white/8">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <MetaLabel className="mb-1">SERVICE 02</MetaLabel>
              <h3 className="text-base md:text-lg font-semibold text-white">Force-on-Force Training</h3>
              <ul className="space-y-1.5 text-sm text-text-secondary leading-relaxed">
                <li>• Realistic scenario training</li>
                <li>• Stress inoculation drills</li>
                <li>• Decision-making under pressure</li>
              </ul>
              <Link
                href="/services"
                className="inline-block text-accent-red hover:text-red-400 font-medium text-sm mt-auto transition-colors"
              >
                Learn More →
              </Link>
            </Card>

            <Card variant="intel" className="border-white/8">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <MetaLabel className="mb-1">SERVICE 03</MetaLabel>
              <h3 className="text-base md:text-lg font-semibold text-white">Firearms Training</h3>
              <ul className="space-y-1.5 text-sm text-text-secondary leading-relaxed">
                <li>• Live fire & dry fire options</li>
                <li>• Safety fundamentals</li>
                <li>• Defensive shooting basics</li>
              </ul>
              <Link
                href="/services"
                className="inline-block text-accent-red hover:text-red-400 font-medium text-sm mt-auto transition-colors"
              >
                Learn More →
              </Link>
            </Card>

            <Card variant="intel" className="border-white/8">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <MetaLabel className="mb-1">SERVICE 04</MetaLabel>
              <h3 className="text-base md:text-lg font-semibold text-white">Punch / Kick / Move / Shoot</h3>
              <ul className="space-y-1.5 text-sm text-text-secondary leading-relaxed">
                <li>• Physical exertion drills</li>
                <li>• Close-quarters movement</li>
                <li>• Live-fire under stress</li>
              </ul>
              <Link
                href="/services"
                className="inline-block text-accent-red hover:text-red-400 font-medium text-sm mt-auto transition-colors"
              >
                Learn More →
              </Link>
            </Card>
          </div>
          
          {/* Section Divider */}
          <div className="pt-10">
            <Separator className="bg-neutral-800/60" />
          </div>
        </div>
      </section>

      {/* Mini About Section */}
      <section className="relative py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-neutral-900/60 scan-line">
        {/* Background Watermark Logo - Hidden on mobile */}
        <div className="hidden md:block absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <div className="opacity-[0.025] blur-[2px] scale-[1.2]">
            <Logo width={600} variant="dark" />
          </div>
        </div>
        
        {/* Radial Gradient / Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-900/40 pointer-events-none z-0"></div>
        
        <div className="max-w-3xl mx-auto px-4 md:px-6 relative z-10">
          <Card className="text-center max-w-3xl mx-auto px-6 py-16">
            {/* Title Label */}
            <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
              <MetaLabel className="text-red-500">
                OUR MISSION  PROTOCOL THS-01 / REV. 3.0
              </MetaLabel>
              <div className="w-2 h-2 rounded-full bg-primary pulse-soft"></div>
            </div>
            
            {/* Mission Text */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
              Tactical Home Solutions exists to give everyday Americans the confidence, skills, and knowledge to protect themselves and their families when seconds matter and help may be far away. Our mission is to build capable, prepared, and empowered households through realistic training, clear education, and proven defensive principles.
            </p>
            
            {/* CTA Button */}
            <PrimaryButton href="/about">
              About Our Mission
            </PrimaryButton>
          </Card>
        </div>
      </section>

      {/* Disclaimer Section */}
      <Disclaimer />
    </div>
  );
}

