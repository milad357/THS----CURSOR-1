import CTAInlineBar from '@/components/ui/CTAInlineBar';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';

export default function About() {
  return (
    <div className="min-h-screen bg-bg-base pt-28 md:pt-32">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pb-16 md:pb-24">
        <SectionHeading sector="SECTOR: MISSION BRIEFING / 04">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">Our Mission</h1>
        </SectionHeading>

        <div className="space-y-6 text-text-secondary leading-relaxed max-w-2xl">
          <p className="text-base md:text-lg">
            Tactical Home Solutions exists to give everyday Americans the confidence, skills, and knowledge to protect themselves and their families when seconds matter and help may be far away. Our mission is simple: <strong className="text-text-primary">build capable, prepared, and empowered households through realistic training, clear education, and proven defensive principles.</strong>
          </p>

          <p>
            We believe in responsible self-reliance, disciplined preparedness, and the rights protected under the Constitution — including the Second Amendment. Our training is designed for every background, body type, experience level, and household.
          </p>

          <Card className="border-l-4 border-accent-red my-8 rounded-r-xl">
            <p className="text-base md:text-lg font-semibold text-white mb-4">Most people don't know:</p>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex items-start">
                <span className="text-accent-red mr-3">•</span>
                <span>When they are legally justified in using force</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-red mr-3">•</span>
                <span>How self-defense laws actually work in their state</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-red mr-3">•</span>
                <span>What to do during a break-in or home invasion</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-red mr-3">•</span>
                <span>What type of firearm or defensive tool fits their home layout</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-red mr-3">•</span>
                <span>How to build a real emergency plan beyond "call 911"</span>
              </li>
            </ul>
          </Card>

          <p className="text-xl font-semibold text-white">
            We fix that.
          </p>

          <p>
            Our team includes professionals from the <strong className="text-text-primary">U.S. Military, Law Enforcement, Executive Protection, Private Security</strong>, and <strong className="text-text-primary">Certified Firearms Instructors</strong>. We teach clear, no-nonsense skills that apply in real-world high-stress moments — not theory, not fantasy, not internet myths.
          </p>

          <p>
            Preparation doesn't eliminate danger, but the right mindset and training can give you the <strong className="text-text-primary">confidence to act when it counts</strong>. Whether you're a first-time firearm owner or an experienced shooter, our goal is to help you develop a practical defensive plan and the ability to execute it under pressure.
          </p>

          <Card className="rounded-2xl p-8 my-12 text-center">
            <p className="text-2xl font-bold text-white mb-2">Your home. Your family. Your responsibility.</p>
            <p className="text-xl text-text-secondary">We help you be ready.</p>
          </Card>

          <div className="mt-8">
            <CTAInlineBar
              title="Ready to get started?"
              description="Call or text 818-825-3104 to discuss your training needs."
              phone="8188253104"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

