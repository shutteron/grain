type SectionTitleProps = {
  children: React.ReactNode;
  sub?: string;
};

export default function SectionTitle({ children, sub }: SectionTitleProps) {
  return (
    <div className="mb-7">
      <h1
        className="text-2xl font-bold tracking-tight leading-tight"
        style={{ color: '#171717' }}
      >
        {children}
      </h1>
      {sub && (
        <p className="text-[11px] font-medium mt-1.5" style={{ color: '#7A7168' }}>
          {sub}
        </p>
      )}
    </div>
  );
}
