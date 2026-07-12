// Visual Page Builder - WordPress-Level Page Builder Component
// 
// A comprehensive drag-and-drop page builder with:
// - Drag & Drop Canvas for section management
// - Section Palette with categorized components
// - Property Panel for editing section properties
// - Toolbar with device preview, undo/redo, save
// - Full support for all field types from component registry

// Main Visual Builder Component
export { VisualBuilder } from "./index-component";
export type { 
  VisualBuilderProps, 
  DeviceType, 
  SaveStatus 
} from "./index-component";

// Sub-components
export { Canvas } from "./Canvas";
export type { CanvasProps } from "./Canvas";

export { Sidebar } from "./Sidebar";
export type { SidebarProps } from "./Sidebar";

export { Toolbar } from "./Toolbar";
export type { ToolbarProps } from "./Toolbar";

export { PropertyPanel } from "./PropertyPanel";
export type { PropertyPanelProps } from "./PropertyPanel";

export { BlockRenderer } from "./BlockRenderer";
export type { BlockRendererProps } from "./BlockRenderer";

// Legacy components for backward compatibility
export { VisualBuilder as VisualBuilderLegacy } from "./VisualBuilder";
export { ComponentPalette } from "./ComponentPalette";
export { PreviewCanvas } from "./PreviewCanvas";
export { PropertyEditor } from "./PropertyEditor";
export { DeviceToolbar } from "./DeviceToolbar";
