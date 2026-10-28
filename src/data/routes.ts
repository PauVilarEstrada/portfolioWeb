import type { Dict } from "../i18n/en";

const PAGE_KEYS: Record<string, keyof Dict["nav"]> = {
  "/": "home",
  "/projects": "work",
  "/experience": "experience",
  "/contact": "contact",
};

export const PROJECT_ROUTE_KEYS: Record<string, keyof Dict["projects"]> = {
  "/projects/tactiq360": "tactiq",
  "/projects/ultimusdefensor": "ultimus",
  "/projects/nbavision": "nba",
  "/projects/mindflow": "mindflow",
  "/projects/kdd": "kdd",
  "/projects/pacman": "pacman",
  "/projects/flappybird": "flappy",
};

/** Human name of a route, used by the page-transition curtain. */
export function routeTitle(pathname: string, t: Dict): string {
  const project = PROJECT_ROUTE_KEYS[pathname];
  if (project) return t.projects[project].short;
  const page = PAGE_KEYS[pathname];
  return page ? t.nav[page] : t.notFound.title;
}
