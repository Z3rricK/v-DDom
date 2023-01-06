import createElement from "./createElement.js";
import render from "./render.js";
import insertElement from "./insert.js";


//LINK: https://dev.to/buttercubz/explained-and-created-a-simple-virtual-dom-from-scratch-5765

let myVirtualElement = createElement("div", {
    attrs: { id: "container" },
    children: [
        createElement("p", {
            attrs: { id: "text" },
            children: ["Hello World!"]
        }),
    ]
});

let element = render(myVirtualElement);
let rootElement = insertElement(element, document.querySelector("#root"));