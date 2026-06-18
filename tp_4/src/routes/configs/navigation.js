import { router } from "..";
// porque aca usas router?
export const routes = router
  .getRoutes()
  .filter((route) => route.meta && route.meta.menu)
  .sort((a, b) => a.meta.orden - b.meta.orden);