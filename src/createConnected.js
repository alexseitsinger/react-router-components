import { createToggledComponent } from "./createToggledComponent"
import { createRedirectedComponent } from "./createRedirectedComponent"


/**
 * Wrapper for creating components using connect and target state.
 *
 * @param {object} props
 * @param {function} props.connect
 * The connect method to use
 * @param {string} props.path
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
 *   path: "authentication.isAuthenticated",
 * })
 *
 * export const config = {
 *   path: "/",
 *   Component: connected.toggled({
 *     anonymous: LandingPage,
 *     authenticated: HomePage,
 *   }),
 *   routes: [
 *     {
 *       path: "about",
 *       Component: connected.redirected({
 *         component: AboutPage,
 *       }),
 *     },
 *   ]
 * }
 */
export function createConnected({ connect, path }) {
  return {
    redirected: ({ url = "/", component }) => {
      return createRedirectedComponent({
        connect,
        path,
        component,
        url,
      })
    },
    toggled: ({ authenticated, anonymous }) => {
      return createToggledComponent({
        connect,
        path,
        components: {
          authenticated: authenticated,
          anonymous: anonymous,
        },
      })
    },
  }
}
