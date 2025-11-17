import { PrimaryButton } from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';

export default function Surveillance() {
  return (
    <div className="min-h-screen bg-bg-base pt-28 md:pt-32">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pb-16 md:pb-24">
        <SectionHeading sector="SECTOR: SURVEILLANCE / 03">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">Home Surveillance & Security Systems</h1>
        </SectionHeading>

        <div className="space-y-8">
          <p className="text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed">
            T.H.S. offers consultations and customized recommendations for modern home surveillance and security solutions. We help you design a layered security approach that integrates cameras, lighting, alarms, and defensive planning to support your overall home-defense strategy.
          </p>

          <Card className="px-4 md:px-6 py-4 md:py-6">
            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              <Card hover className="gap-2">
                <h3 className="text-base md:text-lg font-semibold text-white">Camera Placement Consultation</h3>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                  Strategic positioning for maximum coverage and effectiveness.
                </p>
              </Card>

              <Card hover className="gap-2">
                <h3 className="text-base md:text-lg font-semibold text-white">Blind-Spot Analysis</h3>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                  Identify and address vulnerable areas in your property's security.
                </p>
              </Card>

              <Card hover className="gap-2">
                <h3 className="text-base md:text-lg font-semibold text-white">Integration with Existing Systems</h3>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                  Seamlessly connect new security solutions with your current setup.
                </p>
              </Card>

              <Card hover className="gap-2">
                <h3 className="text-base md:text-lg font-semibold text-white">Layered Security Planning</h3>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                  Comprehensive approach combining multiple security layers for maximum protection.
                </p>
              </Card>
            </div>
          </Card>

          <div className="text-center pt-8">
            <PrimaryButton href="/contact">
              Schedule a Security Consultation
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
