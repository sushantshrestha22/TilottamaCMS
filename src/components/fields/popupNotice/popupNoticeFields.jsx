export const popupNoticeFields = [
  {
    name: "title",
    label: "Title",
    type: "text",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  },
  {
    name: "image",
    label: "Image",
    type: "file",
  },
];
