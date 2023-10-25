export interface Poem {
  poem_id: number;
  poem_name: string;
  poet: string;
  source: string;
  line: string;
  availability: number;
  metaphore: string;
  year: number;
  meaning: string;
  type: string;

}

export interface Author {
  name: string;
}

export interface Year {
  year: string;
}

export interface PoemName {
  title: string;
}

export interface returnContent {
  key: string;
  doc_count: number;
}
