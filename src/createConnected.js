import { createToggledComponent } from "./createToggledComponent"
import { createRedirectedComponent } from "./createRedirectedComponent"


/**
 * Wrapper for creating components using connect and target state.
 *
 * @param {object} props
 * @param {function} props.connect
 * The connect method to use
 * @param {string} props.target
 * The target state to connect to.
 *
 * @return {object}
 * A set of methods that use the connect and target state passed.
 *
 * @example
 * // routes.js
 * import { createConnected } from "@alexseitsinger/react-router-components"
 *
 * import { HomePage } from "pages/home"
 * import { LandingPage} from "pages/landing"
 * import { AboutPage } from "pages/about"
 *
 * const connected = createConnected({
 *   connect,
 *   target: "core.authentication.isAuthenticated",
 * })
 *
 * export const config = {
 *   path: "/",
 *   Component: connected.toggled({
 *     Anonymous: LandingPage,
 *     Authenticated: HomePage,
 *   }),
 *   routes: [
 *     {
 *       path: "about",
 *       Component: connected.redirected({
 *         url: "/",
 *         Component: AboutPage,
 *       }),
 *     },
 *   ]
 * }
 */
export function createConnected({ connect, target }) {
  return {
    redirected: ({ url = "/", Component }) => {
      return createRedirectedComponent({
        connect,
        target,
        Component,
        url,
      })
    },
    toggled: ({ Authenticated, Anonymous }) => {
      return createToggledComponent({
        connect,
        target,
        components: {
          Authenticated,
          Anonymous,
        }
      })
    },
  }
}
