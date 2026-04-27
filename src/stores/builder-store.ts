import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BuilderState, BuilderAction, WidgetData, SectionData, DeviceType } from "@/types/builder";

interface BuilderStore extends BuilderState {
  // Actions
  setSections: (sections: SectionData[]) => void;
  setWidgets: (widgets: WidgetData[]) => void;
  addWidget: (widget: Omit<WidgetData, "id" | "createdAt" | "updatedAt">) => void;
  updateWidget: (id: string, updates: Partial<WidgetData>) => void;
  deleteWidget: (id: string) => void;
  moveWidget: (id: string, parentId: string | null, newOrder: number) => void;
  duplicateWidget: (id: string) => void;
  selectWidget: (id: string | null) => void;
  selectSection: (id: string | null) => void;
  setDevice: (device: DeviceType) => void;
  toggleWidgetVisibility: (id: string) => void;
  
  // History
  history: BuilderState[];
  historyIndex: number;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  addToHistory: () => void;
  
  // Draft auto-save
  lastSaved: number | null;
}

const MAX_HISTORY = 50;

function generateId(): string {
  return `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const useBuilderStore = create<BuilderStore>()(
  persist(
    (set, get) => ({
      sections: [],
      widgets: [],
      selectedWidgetId: null,
      selectedSectionId: null,
      device: "desktop",
      history: [],
      historyIndex: -1,
      canUndo: false,
      canRedo: false,
      lastSaved: null,

      setSections: (sections) => set({ sections }),
      
      setWidgets: (widgets) => set({ widgets }),

      addWidget: (widget) => {
        const newWidget: WidgetData = {
          ...widget,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => {
          const widgets = [...state.widgets, newWidget];
          return { widgets, selectedWidgetId: newWidget.id };
        });
        get().addToHistory();
      },

      updateWidget: (id, updates) => {
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id
              ? { ...w, ...updates, updatedAt: new Date().toISOString() }
              : w
          ),
        }));
        get().addToHistory();
      },

      deleteWidget: (id) => {
        set((state) => {
          // Also delete any child widgets
          const idsToDelete = new Set<string>([id]);
          const findChildren = (parentId: string) => {
            state.widgets.forEach((w) => {
              if (w.parentId === parentId) {
                idsToDelete.add(w.id);
                findChildren(w.id);
              }
            });
          };
          findChildren(id);
          
          return {
            widgets: state.widgets.filter((w) => !idsToDelete.has(w.id)),
            selectedWidgetId:
              state.selectedWidgetId === id ? null : state.selectedWidgetId,
          };
        });
        get().addToHistory();
      },

      moveWidget: (id, parentId, newOrder) => {
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, parentId: parentId || undefined, order: newOrder } : w
          ),
        }));
        get().addToHistory();
      },

      duplicateWidget: (id) => {
        const widget = get().widgets.find((w) => w.id === id);
        if (!widget) return;
        
        const newWidget: WidgetData = {
          ...widget,
          id: generateId(),
          order: widget.order + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          widgets: [...state.widgets, newWidget],
          selectedWidgetId: newWidget.id,
        }));
        get().addToHistory();
      },

      selectWidget: (id) => set({ selectedWidgetId: id, selectedSectionId: null }),
      
      selectSection: (id) => set({ selectedSectionId: id, selectedWidgetId: null }),

      setDevice: (device) => set({ device }),

      toggleWidgetVisibility: (id) => {
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, hidden: !w.hidden } : w
          ),
        }));
        get().addToHistory();
      },

      addToHistory: () => {
        set((state) => {
          const snapshot: BuilderState = {
            sections: state.sections,
            widgets: state.widgets,
            selectedWidgetId: null,
            selectedSectionId: null,
            device: state.device,
          };
          
          const newHistory = state.history.slice(0, state.historyIndex + 1);
          newHistory.push(snapshot);
          
          if (newHistory.length > MAX_HISTORY) {
            newHistory.shift();
          }
          
          return {
            history: newHistory,
            historyIndex: newHistory.length - 1,
            canUndo: newHistory.length > 1,
            canRedo: false,
          };
        });
      },

      undo: () => {
        set((state) => {
          if (state.historyIndex <= 0) return state;
          const newIndex = state.historyIndex - 1;
          const snapshot = state.history[newIndex];
          return {
            sections: snapshot.sections,
            widgets: snapshot.widgets,
            historyIndex: newIndex,
            canUndo: newIndex > 0,
            canRedo: true,
            selectedWidgetId: null,
          };
        });
      },

      redo: () => {
        set((state) => {
          if (state.historyIndex >= state.history.length - 1) return state;
          const newIndex = state.historyIndex + 1;
          const snapshot = state.history[newIndex];
          return {
            sections: snapshot.sections,
            widgets: snapshot.widgets,
            historyIndex: newIndex,
            canUndo: true,
            canRedo: newIndex < state.history.length - 1,
            selectedWidgetId: null,
          };
        });
      },
    }),
    {
      name: "builder-store",
      partialize: (state) => ({
        sections: state.sections,
        widgets: state.widgets,
        lastSaved: state.lastSaved,
      }),
    }
  )
);
