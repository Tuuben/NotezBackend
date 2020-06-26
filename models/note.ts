export interface Note {
  [index: string]: number | string | boolean | undefined;
  id: string;
  content?: string;
  location?: number;
  selected?: boolean;
}
