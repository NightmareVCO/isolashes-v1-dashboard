export default function PackageIcon(properties: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-package"
      {...properties}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
      <path d="M12 12l8 -4.5" />
      <path d="M12 12l0 9" />
      <path d="M12 12l-8 -4.5" />
      <path d="M16 5.25l-8 4.5" />
    </svg>
  );
}
