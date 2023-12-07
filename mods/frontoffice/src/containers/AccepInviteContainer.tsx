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
import * as SDK from "@goodtok/sdk";
import { API_ENDPOINT } from "~envs";
import { useLocation } from "react-router-dom";
import { useLogger } from "~logger";
import React, { useEffect } from "react";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AcceptInviteContainer() {
  const logger = useLogger();
  const query = useQuery();
  const token = query.get("token") as string;

  useEffect(() => {
    const client = new SDK.Client({
      endpoint: API_ENDPOINT
    });
    client
      .acceptInvite(token)
      .then(() => {
        window.location.href = "/login";
      })
      .catch((err) => {
        logger.error(err);
      });
  });

  return <></>;
}

export default AcceptInviteContainer;
