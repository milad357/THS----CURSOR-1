export default function Disclaimer() {
  return (
    <section className="mt-12 border-t border-white/10 pt-6">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-[11px] md:text-xs text-text-muted leading-relaxed text-center md:text-left space-y-3">
          <p>
            Tactical Home Solutions ("T.H.S.") provides educational training based on hypothetical home-defense scenarios. T.H.S. does not provide legal advice, does not encourage violence, and is not responsible for how any individual applies concepts outside a controlled training environment.
          </p>
          
          <p>
            For any real emergency, <strong className="text-text-primary">dial 911 immediately</strong>.
          </p>
          
          <p>
            All users are responsible for understanding their local, state, and federal laws regarding self-defense, home defense, and firearm ownership. Laws vary by state, and improper actions may result in criminal or civil liability.
          </p>
          
          <p>
            By using this site or participating in training, you agree that T.H.S. is not liable for misuse, misapplication of training, or unlawful actions.
          </p>
          
          <p>
            <span className="text-text-secondary underline cursor-pointer hover:text-text-primary transition-colors">
              Full Terms & Conditions available upon request.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

