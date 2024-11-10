import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type IssueStatus = 'open' | 'in-progress' | 'resolved';
export type IssuePriority = 'low' | 'medium' | 'high';
export type IssueType = 'defect' | 'observation' | 'rfi' | 'safety';

export interface IssueComment {
  id: string;
  content: string;
  createdAt: Date;
  createdBy: string;
}

export interface Issue {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  type: IssueType;
  assignedTo?: string;
  dueDate?: Date;
  createdAt: Date;
  createdBy: string;
  images: string[];
  comments: IssueComment[];
  pdfId: string;
  pageNumber: number;
  cost?: number;
  tags: string[];
}

interface IssueStore {
  issues: Issue[];
  selectedIssue: Issue | null;
  filter: {
    status?: IssueStatus;
    priority?: IssuePriority;
    type?: IssueType;
    assignedTo?: string;
    tags?: string[];
  };
  addIssue: (issue: Omit<Issue, 'id' | 'createdAt' | 'comments'>) => void;
  updateIssue: (id: string, updates: Partial<Issue>) => void;
  selectIssue: (issue: Issue | null) => void;
  deleteIssue: (id: string) => void;
  addComment: (issueId: string, content: string, createdBy: string) => void;
  setFilter: (filter: IssueStore['filter']) => void;
  getFilteredIssues: () => Issue[];
}

export const useIssueStore = create<IssueStore>((set, get) => ({
  issues: [],
  selectedIssue: null,
  filter: {},

  addIssue: (issue) =>
    set((state) => ({
      issues: [
        ...state.issues,
        {
          ...issue,
          id: uuidv4(),
          createdAt: new Date(),
          comments: [],
          tags: [],
        },
      ],
    })),

  updateIssue: (id, updates) =>
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === id ? { ...issue, ...updates } : issue
      ),
      selectedIssue:
        state.selectedIssue?.id === id
          ? { ...state.selectedIssue, ...updates }
          : state.selectedIssue,
    })),

  selectIssue: (issue) => set({ selectedIssue: issue }),

  deleteIssue: (id) =>
    set((state) => ({
      issues: state.issues.filter((issue) => issue.id !== id),
      selectedIssue: state.selectedIssue?.id === id ? null : state.selectedIssue,
    })),

  addComment: (issueId, content, createdBy) =>
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === issueId
          ? {
              ...issue,
              comments: [
                ...issue.comments,
                {
                  id: uuidv4(),
                  content,
                  createdAt: new Date(),
                  createdBy,
                },
              ],
            }
          : issue
      ),
    })),

  setFilter: (filter) => set({ filter }),

  getFilteredIssues: () => {
    const { issues, filter } = get();
    return issues.filter((issue) => {
      if (filter.status && issue.status !== filter.status) return false;
      if (filter.priority && issue.priority !== filter.priority) return false;
      if (filter.type && issue.type !== filter.type) return false;
      if (filter.assignedTo && issue.assignedTo !== filter.assignedTo)
        return false;
      if (
        filter.tags &&
        filter.tags.length > 0 &&
        !filter.tags.every((tag) => issue.tags.includes(tag))
      )
        return false;
      return true;
    });
  },
}));