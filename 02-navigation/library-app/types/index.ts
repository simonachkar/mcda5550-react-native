export interface Category {
  id: string;
  title: string;
  color: string;
}

export interface CategoryTileProps {
  title: string;
  color: string;
  onPress: () => void;
}

export interface Book {
  id: string;
  name: string;
  author: string;
  image: string;
  category: string[];
}

export interface BookItemProps {
  book: Book;
} 