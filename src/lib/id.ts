export function makeId(prefix = "skill") {
  const rnd = Math.random().toString(16).slice(2);
  return `${prefix}_${Date.now()}_${rnd}`;
}
