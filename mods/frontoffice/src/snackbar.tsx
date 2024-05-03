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
import { Slide } from "@mui/material";
import React, { createContext, useContext, useState, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type SnackbarContextType = {
  showSnackbar: (message: string) => void;
  showErrorSnackbar: (message: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

function SlideTransition(props: any) {
  return <Slide {...props} direction="up" />;
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
}

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showSnackbar = useCallback((newMessage: string) => {
    // Clear any existing error message
    setErrorMessage(null);
    setMessage(newMessage);
  }, []);

  const showErrorSnackbar = useCallback((newMessage: string) => {
    // Clear any existing message
    setMessage(null);
    setErrorMessage(newMessage);
  }, []);

  const handleClose = () => {
    setMessage(null);
    setErrorMessage(null);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, showErrorSnackbar }}>
      {children}
      {/* Regular snackbar */}
      <Snackbar
        open={message != null}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        message={message}
      />
      {/* Error snackbar with Alert */}
      <Snackbar
        open={errorMessage != null}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
