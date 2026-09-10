import { en } from "./en";
import { es } from "./es";
function paths(o: any, p = ""): string[] {
  if (Array.isArray(o)) return o.flatMap((v, i) => paths(v, `${p}[${i}]`));
  if (o && typeof o === "object") return Object.keys(o).flatMap(k => paths(o[k], p ? `${p}.${k}` : k));
  return [p];
}
const a = paths(en), b = paths(es);
console.log("EN:", a.length, "ES:", b.length);
console.log("missing in ES:", a.filter(x => !b.includes(x)));
console.log("extra in ES:", b.filter(x => !a.includes(x)));
