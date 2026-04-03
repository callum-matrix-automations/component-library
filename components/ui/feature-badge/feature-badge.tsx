// Dependencies: (none — pure React + Tailwind)
// Source: dirt-to-keys

interface FeatureBadgeProps {
  text: string;
  variant?: 'default' | 'popular' | 'new';
}

export default function FeatureBadge({ text, variant = 'default' }: FeatureBadgeProps) {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    popular: 'bg-orange-100 text-orange-700 border-orange-300',
    new: 'bg-blue-100 text-blue-700 border-blue-300'
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${variantStyles[variant]}`}
    >
      {text}
    </span>
  );
}
