export default function StarRating({ rating, size = "sm" }) {
  const starSize = size === "sm" ? "text-xs" : "text-sm";
  return (
    <span className={`inline-flex items-center gap-0.5 ${starSize}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= Math.round(rating) ? "text-star" : "text-stone-300"}
        >
          ★
        </span>
      ))}
    </span>
  );
}