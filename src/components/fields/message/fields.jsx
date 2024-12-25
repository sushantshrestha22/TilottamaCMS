export const messageFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "designation",
    label: "Designation",
    type: "select",
    options: [
      { label: "Principal", value: "principal" },
      { label: "Managing Director", value: "managing_director" },
      { label: "Executive Chairman", value: "executive_chairman" },
    ],
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
  },
  {
    name: "image",
    label: "Image",
    type: "file",
  },
];
