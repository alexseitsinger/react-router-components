import React from "react"
import { MemoryRouter, Switch, Route } from "react-router"

import { ModalSwitch } from "../src"

function setup(url, config) {
  return mount(
    <MemoryRouter initialEntries={[url]}>
      <ModalSwitch
        Switch={Switch}
        Route={Route}
        config={config}
        report={true}
      />
    </MemoryRouter>
  )
}

const IndexPage = () => <div>Index</div>
const AboutPage = () => <div>About</div>
const AboutAlexPage = () => <div>AboutAlex</div>
const NotFoundPage = () => <div>NotFound</div>

const config = {
  path: "/",
  Component: IndexPage,
  routes: [
    {path: "about", Component: AboutPage, routes: [
      {path: "alex", Component: AboutAlexPage, modal: true},
    ]},
    {path: "*", Component: NotFoundPage},
  ]
}

describe("<ModalSwitch />", () => {
  it("renders", () => {
    const wrapper = setup("/", config)
    expect(wrapper.find(IndexPage)).toHaveLength(1)
  })
})
