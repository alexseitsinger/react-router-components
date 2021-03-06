import React from "react"
import { MemoryRouter, StaticRouter, Switch, Route } from "react-router"

import { createModalSwitch } from "../src"

const setup = (url, config) => {
  const ModalSwitch = createModalSwitch({ Switch, Route, config, report: true })
  return mount(
    <MemoryRouter initialEntries={[url]}>
      <Route component={ModalSwitch} />
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
const Test = () => <div>Test</div>
const Aside = () => <div>Aside</div>

describe("createModalSwitch", () => {
  // test that parentpaths get set correctly.
  // add test for duplicate pathnmames being added.
  it("renders multiple nested paths", () => {
    console.log(Index.name)

    const wrapper = setup("/", {
      path: "/",
      Component: Index,
      routes: [
        {path: "*", Component: NotFound},
        {path: "/about", Component: About, routes: [
          {path: "/another", Component: Another},
          {path: "/team", Component: Team, routes: [
            {path: "/alex", Component: Alex},
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
  it("renders correct component for nested modals.", () => {
    const wrapper = setup("/about/team/alex", {
      path: "/",
      Component: Index,
      routes: [
        {path: "about", Component: About, routes: [
          {path: "team", Component: Team, modal: true, routes: [
            {path: "alex", Component: Alex, modal: true},
          ]}
        ]},
      ]
    })
    expect(wrapper.find(About)).toHaveLength(1)
    expect(wrapper.find(Alex)).toHaveLength(1)
  })
  it("generated correct paths for deeply nested routes.", () => {
    const wrapper = setup("/about/team/alex/another/test", {
      path: "/",
      Component: Index,
      routes: [
        {path: "aside", Component: Aside},
        {path: "about", Component: About, routes: [
          {path: "team", Component: Team, routes: [
            {path: "alex", Component: Alex, routes: [
              {path: "another", Component: Another, modal: true, routes: [
                {path: "test", Component: Test, modal: true},
              ]}
            ]},
          ]}
        ]},
      ]
    })
    expect(wrapper.find(Alex)).toHaveLength(1)
    expect(wrapper.find(Test)).toHaveLength(1)
  })

})
