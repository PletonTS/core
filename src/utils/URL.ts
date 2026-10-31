export function joinURL(first: string, second: string) {
  if (first.endsWith("/")) first = first.substring(0, first.length - 1);
  if (second.startsWith("/")) second = second.substring(1, second.length);
  if (second.endsWith("/")) second = second.substring(0, second.length - 1);

  if (second.length === 0) return first;
  
  return `${first}/${second}`;
}