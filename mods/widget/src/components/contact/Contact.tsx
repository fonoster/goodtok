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
import { Field, Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { CloseIcon } from "../icons/CloseIcon";
import { MenuContainer } from "../menu/container/MenuContainer";
import { NotificationHeader } from "../notification/NotificationStyles";
import {
  StyledButton,
  StyledTitle,
  TextAreaStyled,
  TextFieldStyled
} from "./ContactStyles";
import { z } from "zod";
import React from "react";

type ContactProps = {
  online: boolean;
  isOpen: boolean;
  onSubmit: (request: { name: string; email: string; message: string }) => void;
  onClose: () => void;
};

const validationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message is too long")
});

const formikValidationSchema = toFormikValidationSchema(validationSchema);

export const Contact: React.FC<ContactProps> = ({
  online = false,
  onClose,
  isOpen,
  onSubmit,
  ...props
}) => {
  return (
    <MenuContainer {...props} isOpen={isOpen} online={online}>
      <NotificationHeader onClick={onClose}>
        <CloseIcon />
      </NotificationHeader>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={formikValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 10px", // This sets the padding on the left and right
                maxWidth: "100%"
              }}
              {...props}
            >
              <StyledTitle
                style={{
                  marginTop: "0px"
                }}
              >
                Tell us a bit about you.
              </StyledTitle>

              <Field
                as={TextFieldStyled}
                name="name"
                placeholder="Enter your name"
                error={touched.name && !!errors.name}
                style={{
                  marginTop: "10px"
                }}
              />

              <Field
                as={TextFieldStyled}
                name="email"
                placeholder="Enter your email"
                error={touched.email && !!errors.email}
                style={{
                  marginTop: "20px"
                }}
              />

              <Field
                as={TextAreaStyled}
                name="message"
                placeholder="Enter your message"
                rows={4}
                error={touched.message && !!errors.message}
                style={{
                  marginTop: "20px"
                }}
              />

              <StyledButton
                type="submit"
                style={{
                  marginTop: "20px",
                  marginBottom: "20px"
                }}
              >
                Send
              </StyledButton>
            </div>
          </Form>
        )}
      </Formik>
    </MenuContainer>
  );
};
