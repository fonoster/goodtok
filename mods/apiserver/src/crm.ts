/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/goodtok
 *
 * This file is part of GoodTok
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
const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z"
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z"
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z"
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z"
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  // Add 10 more people
  {
    name: "Whitney Francis",
    email: "",
    role: "Copywriter",
    imageUrl:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
  },
  {
    name: "Leonard Krasner",
    email: "",
    role: "Senior Designer",
    imageUrl:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
  },
  {
    name: "Floyd Miles",
    email: "",
    role: "Principal Designer",
    imageUrl:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
  },
  {
    name: "Emily Selman",
    email: "",
    role: "VP, User Experience",
    imageUrl: "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
  },
  {
    name: "Kristin Watson",
    email: "",
    role: "VP, Human Resources",
    imageUrl:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
  },
  {
    name: "Emma Dorsey",
    email: "",
    role: "Senior Front-end Developer",
    imageUrl:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
  },
  {
    name: "Maria Simpson",
    email: "",
    role: "Senior Front-end Developer",
    imageUrl:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
  },
  {
    name: "Dries Vincent",
    email: "",
    role: "Business Relations",
    imageUrl:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
  }
];

export function getCustomerFromCRM(externalId: string) {
  const randomIndex = Math.floor(Math.random() * people.length);
  const person = people[randomIndex];
  return {
    id: externalId,
    name: person.name,
    avatar: person.imageUrl
  };
}
