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
const TestModalOnePage = () => <div>Test Modal Page #1</div>
const TestModalTwoPage = () => <div>Test Modal Page #2</div>

const config = {
  path: "/",
  Component: IndexPage,
  routes: [
    {path: "about", Component: AboutPage, routes: [
      {path: "alex", Component: AboutAlexPage, routes: [
        {path: "test/modal", Component: TestModalTwoPage, modal: true},
        {path: "test/:uuid", Component: TestModalOnePage, modal: true},
      ]},
    ]},
    {path: "*", Component: NotFoundPage},
  ]
}

describe("<ModalSwitch />", () => {
  test("renders index page", () => {
    const wrapper = setup("/", config)
    expect(wrapper.find(IndexPage)).toHaveLength(1)
  })
  test("renders the correct route, even when there are additional nested routes", () => {
    const wrapper = setup("/about/alex", config)
    expect(wrapper.find(AboutAlexPage)).toHaveLength(1)
    expect(wrapper.find(AboutPage)).toHaveLength(0)
    expect(wrapper.find(TestModalTwoPage)).toHaveLength(0)
    expect(wrapper.find(TestModalOnePage)).toHaveLength(0)
    expect(wrapper.find(NotFoundPage)).toHaveLength(0)
  })
  test("renders only one modal when using keywords and a static url path with a common prefix", () => {
    const wrapper = setup("/about/alex/test/keyword", config)
    expect(wrapper.find(AboutAlexPage)).toHaveLength(1)
    expect(wrapper.find(TestModalOnePage)).toHaveLength(1)
    expect(wrapper.find(TestModalTwoPage)).toHaveLength(0)
  })
  test("renders the correct route static path route even with a keyword route that share a common prefix", () => {
    const wrapper = setup("/about/alex/test/modal", config)
    expect(wrapper.find(AboutAlexPage)).toHaveLength(1)
    expect(wrapper.find(TestModalOnePage)).toHaveLength(0)
    expect(wrapper.find(TestModalTwoPage)).toHaveLength(1)
  })
})
