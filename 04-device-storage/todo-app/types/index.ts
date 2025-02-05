export interface Todo {
  id: string;
  text: string;
}

export interface TodoItemProps {
  id: string;
  text: string;
  onDeleteItem: (id: string) => void;
}

export interface TodoInputModalProps {
  isVisible: boolean;
  onAddTodo: (text: string) => void;
  onCancel: () => void;
} 