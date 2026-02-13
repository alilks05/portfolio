// components/projectTypes.ts

export type LeftMedia =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string }
  | { type: "cad"; src: string; poster?: string; alt?: string };

  export type CaseBlock = {
    title: string;
    bullets: string[];
    leftMedia?: LeftMedia | null; // optional / can be null
    leftLabel?: string;
  };
  

export type CaseTab = {
  key: "mechanical" | "hardware" | "software";
  label: string;
  blocks: CaseBlock[];
};

export type Project = {
  id: string;
  title: string;

  // legacy optional
  longDescription?: string;

  // for photos view
  gallery?: { src: string; alt?: string }[];

  // case study
  cornerCad?: { src: string; alt?: string };
  tabs?: CaseTab[];
};
