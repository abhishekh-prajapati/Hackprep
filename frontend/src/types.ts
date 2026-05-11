export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  columnId: string;
  content: string;
  priority: Priority;
  reactions: number;
  hasLiked?: boolean;
  assignee?: string;
  isNew?: boolean;
  isEdited?: boolean;
  tags?: string[];
}

export interface Column {
  id: string;
  title: string;
  accentColor?: string;
}
