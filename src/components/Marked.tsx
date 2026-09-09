/*
  Renders text where **wrapped bits** get a hand drawn highlight behind them.
*/
export default function Marked({
  text,
  className = "",
  markClass = "mark",
}: {
  text: string;
  className?: string;
  markClass?: string;
}) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <span className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className={`${markClass} font-semibold`}>
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
