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
import React, { createContext, useContext, ReactNode } from "react";
import log from "loglevel";

// Set default log level
log.setLevel("info");

interface LoggerProviderProps {
  children: ReactNode; // This specifies that children is of ReactNode type
}

const LoggerContext = createContext(log);

export const useLogger = () => {
  const logger = useContext(LoggerContext);
  if (!logger) {
    throw new Error("useLogger must be used within a LoggerProvider");
  }
  return logger;
};

export const LoggerProvider = ({ children }: LoggerProviderProps) => {
  return (
    <LoggerContext.Provider value={log}>{children}</LoggerContext.Provider>
  );
};
