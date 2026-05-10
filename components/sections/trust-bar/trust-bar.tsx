// Dependencies: react-fast-marquee, framer-motion

import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';

export interface TrustBarPartner {
  name: string;
  logo: string;
}

interface PartnerLogoProps {
  partner: TrustBarPartner;
  height?: number;
}

function PartnerLogo({ partner, height = 48 }: PartnerLogoProps) {
  return (
    <motion.img
      src={partner.logo}
      alt={partner.name}
      className="object-contain grayscale opacity-60"
      style={{ height }}
      whileHover={{
        filter: 'grayscale(0%)',
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
    />
  );
}

interface TrustBarProps {
  heading?: string;
  partners: TrustBarPartner[];
  speed?: number;
  logoHeight?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export default function TrustBar({
  heading,
  partners,
  speed = 24,
  logoHeight = 48,
  pauseOnHover = false,
  className = '',
}: TrustBarProps) {
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className={`py-8 overflow-hidden ${className}`}>
      {heading && (
        <p className="text-center mb-6 text-sm font-bold">{heading}</p>
      )}
      <div className="flex justify-center">
        <div className="relative w-full max-w-5xl">
          <Marquee speed={speed} gradient={false} pauseOnHover={pauseOnHover}>
            {duplicatedPartners.map((partner, index) => (
              <div key={`${partner.name}-${index}`} className="mx-6">
                <PartnerLogo partner={partner} height={logoHeight} />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
