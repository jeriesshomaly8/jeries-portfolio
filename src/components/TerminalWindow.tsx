type TerminalWindowProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function TerminalWindow({ title, children, className = "" }: TerminalWindowProps) {
  return (
    <div className={`overflow-hidden rounded-xl border border-term-line bg-term-bg ${className}`}>
      <div className="flex items-center gap-2 border-b border-term-line bg-term-panel px-4 py-2.5">
        <span aria-hidden className="size-3 rounded-full bg-[#ff5f57]" />
        <span aria-hidden className="size-3 rounded-full bg-[#febc2e]" />
        <span aria-hidden className="size-3 rounded-full bg-[#28c840]" />
        <span className="ms-2 truncate font-mono text-xs text-term-faint">{title}</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}
