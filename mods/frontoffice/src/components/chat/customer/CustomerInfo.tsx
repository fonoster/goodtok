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
import {
  Box,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs
} from "@mui/material";
import { CustomerProfile, OrderItem } from "./types";
import React from "react";
import { StyledTab, StyledTabs } from "./CustomerStyles";

type CustomerInfoProps = {
  profile: CustomerProfile;
  orders: OrderItem[];
};

export const CustomerInfo: React.FC<CustomerInfoProps> = ({
  profile,
  orders,
  ...props
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box {...props}>
      <StyledTabs
        sx={{ mt: 3 }}
        onChange={handleChange}
        value={value}
        aria-label="basic tabs example"
      >
        <StyledTab label="Customer Info" />
        <StyledTab label="Order History" />
      </StyledTabs>
      {value === 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Fullname</TableCell>
                <TableCell align="right">Email Address</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">Birthday</TableCell>
                <TableCell align="right">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={profile.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {profile.name}
                </TableCell>
                <TableCell align="right">{profile.email}</TableCell>
                <TableCell align="right">{profile.phone}</TableCell>
                <TableCell align="right">{profile.birthday}</TableCell>
                <TableCell align="right">{profile.notes}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {value === 1 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date Purchased</TableCell>
                <TableCell align="right">Item Name</TableCell>
                <TableCell align="right">Item ID</TableCell>
                <TableCell align="right">Photo of Item</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.createdAt}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">
                    {row.photo && <img src={row.photo} style={{ width: 40 }} />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};