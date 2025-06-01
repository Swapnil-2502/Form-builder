import { FormField } from "../slices/formBuilderSlice";

export const contactUsTemplate: FormField[] = [
  {
    id: "name-field",
    type: "Text",
    label: "Full Name",
    required: true,
  },
  {
    id: "email-field",
    type: "Email",
    label: "Email Address",
    required: true,
  },
  {
    id: "Phone-field",
    type: "Number",
    label: "Phone Number",
    required: false,
  },
  {
    id: "message-field",
    type: "Text",
    label: "Your Message",
    required: true,
  }
];
