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
module.exports = {
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#252525",
          800: "#333333",
          500: "#6B7280",
          400: "#9CA3AF",
          300: "#D1D5DB"
        },
        green: {
          900: "#0D3231",
          500: "#10B981"
        },
        indigo: {
          600: "#4F46E5",
          500: "#4338CA"
        },
        blue: {
          600: "#2563EB",
          500: "#3B82F6"
        },
        red: {
          600: "#EC4C47",
          500: "#F97316"
        }
      }
    }
  },
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")]
};
