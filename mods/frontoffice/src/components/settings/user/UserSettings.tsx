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
import { Box } from "@mui/material";
import { TextField } from "../../textfield/TextField";
import { Button } from "../../button/Button";
import { Formik, Form, Field } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  StyledAvatar,
  StyledBox,
  UserSettingsTitle
} from "./UserSettingsStyles";
import React from "react";

// Zod schema for validation
const validationSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(60, "Name must be less than 60 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(255, "Password must be less than 255 characters")
    .optional()
});

// Formik validation schema from the Zod schema
const formikValidationSchema = toFormikValidationSchema(validationSchema);

type UserSettingsProps = {
  initialName: string;
  email: string;
  avatarUrl?: string;
  onSave: (name: string, password: string) => void;
};

export const UserSettings: React.FC<UserSettingsProps> = ({
  initialName,
  email,
  avatarUrl,
  onSave
}) => {
  return (
    <Formik
      initialValues={{ name: initialName, password: "" }}
      validationSchema={formikValidationSchema}
      onSubmit={(values) => {
        onSave(values.name, values.password);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Box>
            <UserSettingsTitle>Personal Settings</UserSettingsTitle>
            <StyledBox>
              <Field
                as={TextField}
                label="Name"
                name="name"
                placeholder="Name"
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
              />

              <TextField label="Email Address" value={email} readonly />

              <Field
                as={TextField}
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                error={touched.password && errors.password}
                helperText={touched.password && errors.password}
              />

              <StyledAvatar
                alt={initialName || "Avatar"}
                src={avatarUrl}
                onClick={() => window.open("https://gravatar.com", "_blank")}
              />
            </StyledBox>

            <Box sx={{ width: 206, mt: 5 }}>
              <Button type="submit">Save changes</Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
