export const studentCouncilFields = [
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
      {
        value: "President",
        label: "President",
      },
      {
        value: "Vice-President",
        label: "Vice President",
      },
      {
        value: "Secretary",
        label: "Secretary",
      },
      {
        value: "Joint-Secretary",
        label: "Joint Secretary",
      },
      {
        value: "Treasurer",
        label: "Treasurer",
      },
      {
        value: "Member",
        label: "Member",
      },
    ],
  },
  {
    name: "batch",
    label: "Batch",
    type: "text",
  },

  {
    name: "image",
    label: "Image",
    type: "file",
  },
];
