# Toggled Component

## Description

A component factory that creates a component that toggles which component it renders by a redux state.

## Installation

```
npm i --save @alexseitsinger/toggled-component
```

## Usage

```javascript
import React from "react"
import { Router, Route } from "react-router"
import { Provider, createStore } from "react-redux"
import { createToggledComponent } from "@alexseitsinger/toggled-component"

import LandingPage from "./pages/landing"
import HomePage from "./pages/home"
import NotFoundPage from "./pages/not-found"

// Create the store
const store = createStore({})

// Create the toggled component
const ToggledIndex = createToggledComponent({
    reducer: {
        name: "auth",
        key: "isAutnenticated",
    },
    components: {
        anonymous: LandingPage,
        authenticated: HomePage,
    }
})

// Use the toggled component for a route.
function App(props){
  return (
    <Provider store={store}>
      <Router>
        <Route path={"/"} exact component={ToggledIndex} />
        <Route path={"*"} component={NotFoundPage} />
      </Router>
    </Provider>
  )
}
```
