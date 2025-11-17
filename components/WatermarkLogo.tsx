import Logo from './Logo';

export default function WatermarkLogo() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none z-0 overflow-hidden">
      <div className="blur-[1px] scale-[0.8] sm:scale-[0.9] md:scale-[1.0]">
        <Logo width={600} variant="dark" />
      </div>
    </div>
  );
}

