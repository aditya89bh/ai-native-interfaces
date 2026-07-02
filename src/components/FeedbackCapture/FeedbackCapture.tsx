import { useId, useState } from "react";
import type { ReactNode } from "react";
import { semanticStatus } from "../../tokens";
import { cn } from "../../utils/cn";

export interface FeedbackValue {
  /** Selected rating, or null if none chosen. */
  rating: number | null;
  /** Selected category, or null if none chosen. */
  category: string | null;
  /** Free-text correction. */
  correction: string;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5"
      fill={filled ? semanticStatus.warning : "none"}
      stroke={filled ? semanticStatus.warning : "#cbd5e1"}
      strokeWidth="1.5"
    >
      <path d="M10 1.8l2.5 5.1 5.6.8-4 4 1 5.6-5-2.6-5 2.6 1-5.6-4-4 5.6-.8z" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none"
      fill="none"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <path
        d="M14 8a6 6 0 0 0-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export interface FeedbackCaptureProps {
  /** Panel title. */
  title?: string;
  /** Supporting description. */
  description?: ReactNode;
  /** Maximum star rating. Set to 0 to hide the rating control. */
  maxRating?: number;
  /** Label for the rating control. */
  ratingLabel?: string;
  /** Category options. When empty, the category control is hidden. */
  categories?: string[];
  /** Label for the category control. */
  categoryLabel?: string;
  /** Label for the correction field. */
  correctionLabel?: string;
  /** Placeholder for the correction field. */
  correctionPlaceholder?: string;
  /** Label for the submit button. */
  submitLabel?: string;
  /** Called with the feedback when submitted. */
  onSubmit: (feedback: FeedbackValue) => void;
  /** Whether a submission is in progress. */
  submitting?: boolean;
  /** Whether the feedback has been submitted (shows a confirmation). */
  submitted?: boolean;
  /** Confirmation message shown once submitted. */
  submittedMessage?: ReactNode;
  /** Disables all controls. */
  disabled?: boolean;
  /** Additional classes appended to the root element. */
  className?: string;
}

/**
 * FeedbackCapture
 *
 * Collects human feedback on AI output: a star rating, a category, and a
 * free-text correction. Presentational only — it manages its own form state
 * and hands the values to `onSubmit`; it never sends anything itself.
 *
 * @example
 * ```tsx
 * <FeedbackCapture
 *   categories={["Incorrect", "Incomplete", "Unsafe", "Other"]}
 *   onSubmit={(feedback) => save(feedback)}
 * />
 * ```
 */
export function FeedbackCapture({
  title = "Share feedback",
  description,
  maxRating = 5,
  ratingLabel = "Rating",
  categories = [],
  categoryLabel = "Category",
  correctionLabel = "What should change?",
  correctionPlaceholder = "Describe the correction…",
  submitLabel = "Submit feedback",
  onSubmit,
  submitting = false,
  submitted = false,
  submittedMessage = "Thanks for your feedback.",
  disabled = false,
  className,
}: FeedbackCaptureProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");
  const [correction, setCorrection] = useState<string>("");
  const ratingGroupId = useId();
  const categoryId = useId();
  const correctionId = useId();

  const controlsDisabled = disabled || submitting;

  if (submitted) {
    return (
      <section
        aria-label={title}
        className={cn(
          "rounded-card border border-slate-200 bg-white p-4 shadow-elevation dark:border-slate-700 dark:bg-slate-900",
          className,
        )}
      >
        <p
          role="status"
          className="flex items-center gap-2 text-sm font-medium"
          style={{ color: semanticStatus.success }}
        >
          <span aria-hidden="true">✓</span>
          {submittedMessage}
        </p>
      </section>
    );
  }

  const handleSubmit = () => {
    onSubmit({
      rating,
      category: category === "" ? null : category,
      correction,
    });
  };

  return (
    <section
      aria-label={title}
      aria-busy={submitting}
      className={cn(
        "rounded-card border border-slate-200 bg-white p-4 shadow-elevation dark:border-slate-700 dark:bg-slate-900",
        className,
      )}
    >
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      {description != null ? (
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {description}
        </p>
      ) : null}

      <div className="mt-3 space-y-3">
        {maxRating > 0 ? (
          <fieldset disabled={controlsDisabled}>
            <legend className="mb-1 text-xs font-medium text-slate-700 dark:text-slate-200">
              {ratingLabel}
            </legend>
            <div className="flex items-center gap-1">
              {Array.from({ length: maxRating }, (_, index) => index + 1).map(
                (n) => (
                  <label
                    key={n}
                    className="cursor-pointer rounded focus-within:ring-2 focus-within:ring-slate-500"
                  >
                    <input
                      type="radio"
                      name={ratingGroupId}
                      value={n}
                      checked={rating === n}
                      onChange={() => setRating(n)}
                      className="sr-only"
                    />
                    <StarIcon filled={rating !== null && n <= rating} />
                    <span className="sr-only">
                      {n} star{n > 1 ? "s" : ""}
                    </span>
                  </label>
                ),
              )}
            </div>
          </fieldset>
        ) : null}

        {categories.length > 0 ? (
          <div>
            <label
              htmlFor={categoryId}
              className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200"
            >
              {categoryLabel}
            </label>
            <select
              id={categoryId}
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              disabled={controlsDisabled}
              className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="">Select a category…</option>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div>
          <label
            htmlFor={correctionId}
            className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200"
          >
            {correctionLabel}
          </label>
          <textarea
            id={correctionId}
            value={correction}
            onChange={(event) => setCorrection(event.target.value)}
            placeholder={correctionPlaceholder}
            disabled={controlsDisabled}
            rows={3}
            className="w-full resize-y rounded-md border border-slate-300 px-2.5 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={controlsDisabled}
            className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-1 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900"
          >
            {submitting ? <Spinner /> : null}
            {submitLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
