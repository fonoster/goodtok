/* eslint-disable no-undef */
/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/goodtok
 *
 * This file is part of Goodtok
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { createRoot } from "react-dom/client";
import { StyleSheetManager } from "styled-components";
import React from "react";
import GoodtokUA from "./GoodtokUA";

class GoodtokComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const styleSlot = document.createElement("section");
    const goodtokContainer = document.createElement("div");
    goodtokContainer.className = "goodtok-container";
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");

    // Ensure the widget is always on top
    styles.textContent = `
      :host {
        position: relative;
        z-index: 999;
      }
    `;

    shadowRoot.appendChild(styles);
    shadowRoot.appendChild(styleSlot);
    shadowRoot.appendChild(goodtokContainer);

    const root = createRoot(goodtokContainer);

    root.render(
      <StyleSheetManager target={styleSlot}>
        <GoodtokUA />
      </StyleSheetManager>
    );
  }
}

export default GoodtokComponent;

window.customElements.define("goodtok-component", GoodtokComponent);
document.body.appendChild(new GoodtokComponent());
