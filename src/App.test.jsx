import React from "react";
import TestRenderer from "react-test-renderer";
import App from "./App";

describe("Componente App", () => {
    it("renderiza correctamente", () => {
        const tree = TestRenderer.create(<App />).toJSON();
        expect(tree).toBeTruthy();
    });
});
