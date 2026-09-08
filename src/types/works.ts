export type WorkItem = {
  id: string;
  location?: string;
  name: string;
  thumbnail: string;
  images: string[];
};

export type WorkCategory = {
  id: string;
  label: string;
  labelJp: string;
  items: WorkItem[];
};

export type WorksData = {
  categories: WorkCategory[];
};
