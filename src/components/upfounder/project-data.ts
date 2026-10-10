import coast from "@/assets/coast.jpg";
import interior from "@/assets/interior.jpg";
import cat from "@/assets/cat.jpg";
export const projects = [
  {
    id: "mochi",
    name: "Mochi · Cat portfolio",
    category: "Personal website",
    edited: "2 hours ago",
    kind: "cat",
    image: cat,
    favorite: true,
  },
  {
    id: "studio",
    name: "Forma · Interior studio",
    category: "Business website",
    edited: "Yesterday",
    kind: "interior",
    image: interior,
    favorite: true,
  },
  {
    id: "coast",
    name: "Somewhere · Travel journal",
    category: "Travel website",
    edited: "2 days ago",
    kind: "coast",
    image: coast,
    favorite: false,
  },
  {
    id: "flow",
    name: "Flowboard · Task manager",
    category: "Web application",
    edited: "3 days ago",
    kind: "app",
    image: "",
    favorite: false,
  },
  {
    id: "folio",
    name: "Alex Morgan · Portfolio",
    category: "Personal website",
    edited: "4 days ago",
    kind: "folio",
    image: "",
    favorite: true,
  },
  {
    id: "mint",
    name: "Mint · Finance dashboard",
    category: "Web application",
    edited: "Last week",
    kind: "finance",
    image: "",
    favorite: false,
  },
];
export type Project = (typeof projects)[number];
