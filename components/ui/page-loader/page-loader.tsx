// Dependencies: (none — pure React + Tailwind)
// Source: dirt-to-keys

interface PageLoaderProps {
  /** Loading text displayed below spinner */
  text?: string;
  /** CSS color for the spinner */
  spinnerColor?: string;
  /** Background color */
  backgroundColor?: string;
}

export default function PageLoader({
  text = 'Loading...',
  spinnerColor = '#c2994e',
  backgroundColor = '#faf9f6',
}: PageLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor }}>
      <div className="text-center">
        <div
          className="w-12 h-12 mx-auto mb-4 rounded-full border-4 animate-spin"
          style={{
            borderColor: `${spinnerColor}33`,
            borderTopColor: spinnerColor,
          }}
        />
        <p className="text-sm text-gray-500">{text}</p>
      </div>
    </div>
  );
}
