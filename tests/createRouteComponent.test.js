import React from "react"
import { MemoryRouter, StaticRouter, Switch, Route } from "react-router"

import { createRouteComponent } from "../src"

const setup = (url, config) => {
  const RouteComponent = createRouteComponent({ Switch, Route, config, report: true })
  return mount(
    <MemoryRouter initialEntries={[url]}>
      <Route component={RouteComponent} />
    </MemoryRouter>
  )
}

const Index = () => <div>Index</div>
const NotFound = () => <div>Not Found</div>
const About = () => <div>About</div>
const AboutModal = () => <div>AboutModal</div>
const Team = () => <div>Team</div>
const Alex = () => <div>Alex</div>
const Another = () => <div>Another</div>

describe("createRouteComponent", () => {
  // test that parentpaths get set correctly.
  it("renders multiple nested paths", () => {
    const wrapper = setup("/", {
      path: "/",
      Component: Index,
      routes: [
        {path: "*", component: NotFound},
        {path: "/about", component: About, routes: [
          {path: "/another", component: Another},
          {path: "/team", component: Team, routes: [
            {path: "/alex", component: Alex},
          ]},
        ]}
      ]
    })
  })
  it("renders <Index /> when URL matches", () => {
    const wrapper = setup("/", {
      path: "/",
      Component: Index,
      routes: [
        {path: "*", Component: NotFound}
      ]
    })
    expect(wrapper.find(Index)).toHaveLength(1)
  })
  it("renders <NotFound /> when URL doesn't match", () => {
    const wrapper = setup("/fdsafdsaf", {
      path: "/",
      Component: Index,
      routes: [
        {path: "*", Component: NotFound}
      ]
    })
    expect(wrapper.find(NotFound)).toHaveLength(1)
  })
  it("renders <About /> and <AboutModal /> when URL matches", () => {
    const wrapper = setup("/about/modal", {
      path: "/",
      Component: Index,
      routes: [
        {path: "/about", Component: About, routes: [
          {path: "/modal", Component: AboutModal, modal: true}
        ]},
        {path: "*", Component: NotFound},
      ]
    })
    expect(wrapper.find(About)).toHaveLength(1)
    expect(wrapper.find(AboutModal)).toHaveLength(1)
  })
  it("renders <About /> when the URL matches, despite the wildcard (*) route coming before it.", () => {
    const wrapper = setup("/about", {
      path: "/",
      Component: Index,
      routes: [
        {path: "*", Component: NotFound},
        {path: "about", Component: About},
      ]
    })
    expect(wrapper.find(About)).toHaveLength(1)
  })
})
