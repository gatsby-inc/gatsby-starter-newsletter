import * as React from "react"
import { render } from "@testing-library/react"
import { describe, test } from "@jest/globals"
import Layout from "../components/layout"

describe("Layout", () => {
  test("Renders Layout component", () => {
    render(<Layout title={"Gatsby Newsletter"} location={"/newsletter"} />)
  })
})
