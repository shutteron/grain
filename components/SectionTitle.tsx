type SectionTitleProps = {
  children: React.ReactNode;
  sub?: string;
};

export default function SectionTitle({ children, sub }: SectionTitleProps) {
  return (
    <div className="mb-7">
      <h1
        className="text-2xl font-black tracking-tight leading-tight"
        style={{ color: '#1F1F1F' }}
      >
        {children}
      </h1>
      {sub && (
        <p className="text-[11px] font-medium mt-1" style={{ color: '#9E9E9E' }}>
          {sub}
        </p>
      )}
    </div>
  );
}
