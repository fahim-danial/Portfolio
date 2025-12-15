export function SectionHeading({ eyebrow, title, description }) {
  return (
    <header className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p className="section-copy">{description}</p>}
    </header>
  );
}
