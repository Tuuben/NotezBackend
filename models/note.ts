export interface Note {
  [index: string]: number | string | boolean | undefined;
  id: number;
  content?: string;
  location?: number;
  selected?: boolean;
}
