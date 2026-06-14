type TagProps = {
  label: string;
  variant?: 'default' | 'level' | 'category';
};

const levelColors: Record<string, string> = {
  intro: 'bg-sky-100 text-sky-700',
  basic: 'bg-green-100 text-green-700',
  intermediate: 'bg-violet-100 text-violet-700',
  advanced: 'bg-orange-100 text-orange-700',
  field: 'bg-rose-100 text-rose-700',
};

export default function Tag({ label, variant = 'default' }: TagProps) {
  const base = 'inline-block text-xs font-medium px-2 py-0.5 rounded-full';
  if (variant === 'default') {
    return (
      <span className={`${base} bg-gray-100 text-gray-500`}>#{label}</span>
    );
  }
  const color = levelColors[label] ?? 'bg-gray-100 text-gray-600';
  return <span className={`${base} ${color}`}>{label}</span>;
}
