export interface Award {
  frontmatter: {
    date: string;
  };
  id: string;
  html: string;
}

export interface Book {
  authors: string;
  date: string;
  publisher: Publisher;
  title: string;
  url?: string;
}

export interface BookChapter {
  authors: string;
  book: Partial<Book>;
  date: string;
  pages?: string;
  title: string;
}

export interface Conference {
  date?: string;
  location: string;
  title: string;
}

export interface ConferenceProceeding {
  authors: string;
  conference: Conference;
  date: string;
  title: string;
  url?: string;
}

export type EditedVolume = Book;

export interface Education {
  degree: string;
  source: string;
  url?: string;
  year: string;
}

export interface JournalArticle {
  authors: string;
  date: string;
  publication: Publication;
  title: string;
  url?: string;
}

export interface OtherPublication {
  authors: string;
  date: string;
  publication: Publication;
  title: string;
  url?: string;
}

export interface OrganizedPanel {
  authors: string;
  date: string;
  extra: string;
  location: string;
  title: string;
}

export interface ProfessionalAppointment {
  date: string;
  title: string;
  organization: {
    title: string;
    url?: string;
  };
}

export interface Publication {
  doi?: string;
  edition?: string;
  pages?: string;
  title: string;
  url?: string;
}

export interface Publisher {
  location: string;
  title: string;
}
