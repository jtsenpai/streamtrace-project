function ServiceIcon({ accent, icon }) {
  return (
    <span
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg overflow-hidden"
      style={{ backgroundColor: accent }}
      aria-hidden="true"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="white"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
    </span>
  );
}

export default ServiceIcon;
