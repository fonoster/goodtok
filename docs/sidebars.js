/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
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
// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  sidebar: [
    "welcome",
    {
      type: 'category',
      label: 'Video Widget',
      collapsible: true,
      collapsed: false,
      items: [
        'video-widget/introduction',
        'video-widget/installation',
        'video-widget/customer-tokens'
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      collapsible: true,
      collapsed: false,
      items: [
        'contributing/guide',
        'contributing/development-environment-setup'
      ]
    },
    {
      type: 'category',
      label: 'Self Hosting',
      collapsible: true,
      collapsed: false,
      items: [
        'self-hosting/introduction',
        'self-hosting/deploy-with-docker'
      ],
    },
  ],
};

module.exports = sidebars;