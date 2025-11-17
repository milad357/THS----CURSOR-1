import { PrimaryButton } from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function Products() {
  return (
    <div className="min-h-screen bg-bg-base pt-28 md:pt-32">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Products (Coming Soon)</h1>

          <Card className="p-8 md:p-12 max-w-2xl mx-auto">
            <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
              T.H.S. will soon offer curated products and gear recommendations tailored to home-defense and training needs. Check back soon or join our contact list to be notified when products go live.
            </p>
            <PrimaryButton href="/contact">
              Join Contact List
            </PrimaryButton>
          </Card>
        </div>
      </div>
    </div>
  );
}
