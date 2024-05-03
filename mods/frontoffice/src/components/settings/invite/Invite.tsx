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
import { StyledBox, StyledTitle } from "./InviteStyles";
import { Box } from "@mui/material";
import { TextField } from "../../textfield/TextField";
import { Select } from "../../select/Select";
import { Button } from "../../button/Button";
import { Formik, Form, Field } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Role } from "../members/types";
import React from "react";

// Zod schema for validation
const validationSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(60, "Name must be less than 60 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
});

// Formik validation schema from the Zod schema
const formikValidationSchema = toFormikValidationSchema(validationSchema);

type InviteProps = {
  onInvite: (name: string, email: string, role: Role) => void;
};

export const Invite: React.FC<InviteProps> = ({ onInvite }) => {
  const [role, setRole] = React.useState(Role.MEMBER);

  const data = [
    { label: "Admin", value: Role.ADMIN },
    { label: "Member", value: Role.MEMBER }
  ];

  return (
    <Formik
      initialValues={{ name: "", email: "" }}
      validationSchema={formikValidationSchema}
      onSubmit={(values) => {
        onInvite(values.name, values.email, role);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <StyledBox>
            <StyledTitle>Invite a new member to your workspace</StyledTitle>
            <Field
              as={TextField}
              label="Name"
              name="name"
              placeholder="Name"
              error={touched.name && errors.name}
              helperText={touched.name && errors.name}
              sx={{ mt: 6, mb: 4 }}
            />

            <Field
              as={TextField}
              label="Email Address"
              name="email"
              placeholder="Email Address"
              type="email"
              error={touched.email && errors.email}
              helperText={touched.email && errors.email}
              sx={{ mb: 4 }}
            />

            <Select
              sx={{ mb: 6 }}
              label="Role"
              value={role}
              data={data}
              onChange={(event) => setRole(event.target.value as Role)}
            />

            <Box sx={{ width: 210 }}>
              <Button variant="contained" type="submit">
                Send Invite
              </Button>
            </Box>
          </StyledBox>
        </Form>
      )}
    </Formik>
  );
};
