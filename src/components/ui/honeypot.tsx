// Hidden field that people never see or fill; bots that auto-fill every input reveal themselves.
// The contact API silently drops any submission where it has a value.
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

/** Reads the honeypot value from a submitted form. */
export const honeypotValue = (form: EventTarget | null) =>
  form instanceof HTMLFormElement ? String(new FormData(form).get("website") ?? "") : "";
