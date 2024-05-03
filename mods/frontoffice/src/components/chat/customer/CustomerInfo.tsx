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
import { Box, CardActions, CardContent, Typography } from "@mui/material";
import { Button } from "../../button/Button";
import { CustomerProfile, OrderItem } from "./types";
import { StyledTitle } from "../ChatPageStyles";
import { StyledLink } from "./CustomerStyles";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import React from "react";

type CustomerInfoProps = {
  profile: CustomerProfile;
  orders: OrderItem[];
};

type OrderHistoryProps = {
  orders: OrderItem[];
};

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  return (
    <Timeline position="alternate">
      {orders.map((order) => (
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body2" color="text.secondary">
              {order.name} - ${order.total}
            </Typography>
            <img src={order.imageUrl} alt={order.title} width={50} />
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export const CustomerInfo: React.FC<CustomerInfoProps> = ({
  profile,
  orders,
  ...props
}) => {
  const [showOrders, setShowOrders] = React.useState(false);

  const handleToggle = () => {
    setShowOrders(!showOrders);
  };

  return (
    <Box {...props}>
      <Box sx={{ backgroundColor: "white", width: 300, ml: 2, p: 1 }}>
        {!showOrders ? (
          <>
            <CardContent>
              {profile.birthday && (
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Birthday {profile.birthday}
                </Typography>
              )}
              <Typography variant="h5" component="div">
                {profile.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {profile.email}
                {profile.phone && (
                  <>
                    <br />
                    {profile.phone}
                  </>
                )}
              </Typography>
              <Typography variant="body2">
                {profile.note}
                <br />
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleToggle}
              >
                Order history
              </Button>
            </CardActions>
          </>
        ) : (
          <Box sx={{ height: 538 }}>
            <StyledLink href="#" onClick={handleToggle}>
              Back
            </StyledLink>
            <StyledTitle>Order history</StyledTitle>
            {orders.length === 0 && (
              <Typography variant="body2">
                No orders yet
                <br />
              </Typography>
            )}
            {orders.length > 0 && <OrderHistory orders={orders} />}
          </Box>
        )}
      </Box>
    </Box>
  );
};
