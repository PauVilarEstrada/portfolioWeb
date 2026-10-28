import React from "react";

/**
 * Minimal inline formatter for dictionary strings.
 * `**bold**` -> <strong>, `*italic*` and `__accent__` -> <em class="rt-accent">, backticks -> <code>
 */
export function rt(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\*[^*\s][^*]*\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const token = m[0];
    if (token.startsWith("**")) {
      out.push(<strong key={k++}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      out.push(<code key={k++} className="rt-code">{token.slice(1, -1)}</code>);
    } else if (token.startsWith("__")) {
      out.push(<em key={k++} className="rt-accent">{token.slice(2, -2)}</em>);
    } else {
      out.push(<em key={k++} className="rt-accent">{token.slice(1, -1)}</em>);
    }
    last = m.index + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Rich({ text, as: Tag = "p", className }: { text: string; as?: any; className?: string }) {
  return <Tag className={className}>{rt(text)}</Tag>;
}
