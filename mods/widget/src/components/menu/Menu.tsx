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
import { MenuContainer } from "./container/MenuContainer";
import { MenuItem } from "./item/MenuItem";
import React from "react";

export type Item = {
  Icon: React.ComponentType;
  label: string;
  name: string;
  requiresOnline?: boolean;
};

type MenuContainerProps = {
  online: boolean;
  isOpen: boolean;
  data: Item[];
  onItemClicked: (name: string) => void;
  className?: string;
};

export const Menu: React.FC<MenuContainerProps> = ({
  online = false,
  isOpen = false,
  data,
  onItemClicked,
  ...props
}) => {
  const filteredData = data.filter((item) => {
    return online || !item.requiresOnline;
  });

  return (
    <MenuContainer {...props} isOpen={isOpen} online={online}>
      {filteredData.map((item, index) => (
        <MenuItem
          isTopElement={index === 0}
          onClick={function (): void {
            onItemClicked(item.name);
          }}
          key={index}
          {...item}
        />
      ))}
    </MenuContainer>
  );
};
