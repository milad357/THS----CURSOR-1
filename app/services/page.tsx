import Link from 'next/link';
import { PrimaryButton } from '@/components/ui/Button';
import CTAInlineBar from '@/components/ui/CTAInlineBar';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import MetaLabel from '@/components/ui/MetaLabel';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Services() {
  return (
    <div className="min-h-screen bg-bg-base pt-28 md:pt-32">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="text-center mb-12">
          <SectionHeading sector="SECTOR: TRAINING SERVICES / 02">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">Training Services</h1>
          </SectionHeading>
          <p className="text-text-secondary max-w-2xl mx-auto">Professional tactical training for home defense</p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {/* Service 1: In-Home Practical Defense Assessment */}
          <Card className="border-b border-neutral-800/60 pb-6 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">In-Home Practical Defense Assessment</h2>
                <p className="text-sm text-text-muted font-medium">Full walk-through and evaluation of your home, tailored to your specific layout and family.</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-2xl font-bold text-accent-red">$299</p>
                <p className="text-sm text-text-muted">3.5 hours</p>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 mt-2">
              <li>Entry points, blind spots, and choke points</li>
              <li>Safe room identification</li>
              <li>Family emergency plan</li>
              <li>Strengths & vulnerabilities</li>
              <li>Recommended defensive tools and placement</li>
              <li>Personalized training roadmap</li>
            </ul>
            <div className="flex justify-between mt-4 pt-3 border-t border-neutral-800/80">
              <MetaLabel>LEVEL: ALL LEVELS</MetaLabel>
              <MetaLabel>DURATION: 3.5 HRS</MetaLabel>
            </div>
          </Card>

          {/* Service 2: Force-on-Force Training */}
          <Card className="border-b border-neutral-800/60 pb-6 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Force-on-Force Training</h2>
                <p className="text-sm text-text-muted font-medium">Realistic scenario-based training using non-lethal tools to simulate stress, movement, and decision-making.</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-2xl font-bold text-accent-red">$499</p>
                <p className="text-sm text-text-muted">4.5 hours</p>
                <p className="text-xs text-text-muted">In-home or outdoor</p>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 mt-2">
              <li>Home-invasion scenarios</li>
              <li>Decision-making under pressure</li>
              <li>Threat identification and prioritization</li>
              <li>Communication & movement with family members</li>
              <li>Stress inoculation drills</li>
            </ul>
            <div className="flex justify-between mt-4 pt-3 border-t border-neutral-800/80">
              <MetaLabel>LEVEL: INTERMEDIATE–ADVANCED</MetaLabel>
              <MetaLabel>DURATION: 4.5 HRS</MetaLabel>
            </div>
          </Card>

          {/* Service 3: Firearms Training */}
          <Card className="border-b border-neutral-800/60 pb-6 rounded-2xl gap-4">
            <h2 className="text-xl font-semibold text-white">Firearms Training</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* 3A: Live Fire */}
              <Card variant="elevated" hover={false} className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-semibold text-white">Live Fire (Range)</h3>
                  <div className="text-right">
                    <p className="text-lg font-bold text-accent-red">$99/hr</p>
                    <p className="text-xs text-text-muted">2-hour minimum</p>
                  </div>
                </div>
                <p className="text-xs text-text-muted">Fundamentals, accuracy, recoil control, and defensive application.</p>
                <ul className="list-disc list-inside text-xs text-text-secondary space-y-1">
                  <li>Safety fundamentals</li>
                  <li>Grip, stance, trigger control</li>
                  <li>Defensive shooting basics</li>
                  <li>Reloads and basic malfunctions</li>
                </ul>
              </Card>

              {/* 3B: Dry Fire */}
              <Card variant="elevated" hover={false} className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-semibold text-white">At-Home Non-Firing / Dry-Fire Training</h3>
                  <div className="text-right">
                    <p className="text-lg font-bold text-accent-red">$74.99/hr</p>
                    <p className="text-xs text-text-muted">2-hour minimum</p>
                  </div>
                </div>
                <p className="text-xs text-text-muted">Skill-building without live ammo, ideal for beginners and safety-focused sessions.</p>
                <ul className="list-disc list-inside text-xs text-text-secondary space-y-1">
                  <li>Safe handling and manipulation</li>
                  <li>Drawing, presentation, and re-holstering (if applicable)</li>
                  <li>Dry-fire drills</li>
                  <li>Home-defense setup and positioning guidance</li>
                </ul>
              </Card>
            </div>
            <div className="flex justify-between mt-4 pt-3 border-t border-neutral-800/80">
              <MetaLabel>LEVEL: BEGINNER–INTERMEDIATE</MetaLabel>
              <MetaLabel>DURATION: VARIABLE</MetaLabel>
            </div>
          </Card>

          {/* Service 4: Certifications */}
          <Card className="border-b border-neutral-800/60 pb-6 rounded-2xl gap-4">
            <h2 className="text-xl font-semibold text-white">Certifications (NRA)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-text-muted mb-3">Offerings:</p>
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                  <li>Range Safety Officer (RSO)</li>
                  <li>Pistol Certification</li>
                  <li>Rifle Certification</li>
                  <li>Shotgun Certification</li>
                </ul>
              </div>
              <Card variant="elevated" hover={false} className="p-4">
                <p className="text-sm text-text-secondary">
                  <strong className="text-white">Group Class Minimum:</strong> 10 students
                </p>
                <p className="text-xs text-text-muted mt-2">
                  Group certification classes are scheduled based on demand and availability.
                </p>
              </Card>
            </div>
          </Card>

          {/* Service 5: Range Day Group Classes */}
          <Card className="border-b border-neutral-800/60 pb-6 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Range Day Group Classes</h2>
                <p className="text-sm text-text-muted font-medium">Split classroom/range day format</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-2xl font-bold text-accent-red">$250/person</p>
                <p className="text-sm text-text-muted">7.5 hours</p>
                <p className="text-xs text-text-muted">8–10 minimum participants</p>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 mt-2">
              <li>Safety fundamentals</li>
              <li>Defensive shooting drills</li>
              <li>Movement and target transitions</li>
              <li>Basic weapon retention concepts</li>
            </ul>
            <div className="flex justify-between mt-4 pt-3 border-t border-neutral-800/80">
              <MetaLabel>LEVEL: ALL LEVELS</MetaLabel>
              <MetaLabel>DURATION: 7.5 HRS</MetaLabel>
            </div>
          </Card>

          {/* Service 6: Punch / Kick / Move / Shoot */}
          <Card className="border-b border-neutral-800/60 pb-6 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Punch / Kick / Move / Shoot</h2>
                <p className="text-sm text-text-muted font-medium">Intermediate to Advanced shooters only</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-2xl font-bold text-accent-red">$349/person</p>
                <p className="text-sm text-text-muted">4 hours</p>
                <p className="text-xs text-text-muted">Range</p>
              </div>
            </div>
            <Alert variant="destructive" className="mb-4">
              <AlertDescription className="text-sm font-semibold">
                Requirements: Must already be safe and proficient with live-fire fundamentals. This course is not for beginners.
              </AlertDescription>
            </Alert>
            <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 mt-2">
              <li>Physical exertion drills (push-ups / calisthenics as warm-up stressors)</li>
              <li>Striking pad work (punch and kick through pads)</li>
              <li>Close-quarters movement to your firearm</li>
              <li>Live-fire drills under fatigue and stress</li>
              <li>Static and movement shooting stations</li>
            </ul>
            <div className="flex justify-between mt-4 pt-3 border-t border-neutral-800/80">
              <MetaLabel>LEVEL: ADVANCED</MetaLabel>
              <MetaLabel>DURATION: 4 HRS</MetaLabel>
            </div>
          </Card>

          {/* CTA Section */}
          <div className="text-center pt-8">
            <PrimaryButton href="/contact">
              Book Training
            </PrimaryButton>
          </div>

          {/* Call Widget */}
          <div className="mt-12">
            <CTAInlineBar
              title="Have questions about training?"
              description="Call or text 818-825-3104 and we'll help you pick the right course."
              phone="8188253104"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
