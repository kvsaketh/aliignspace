"use client";

/**
 * Toolbar Component - Top Toolbar for Visual Builder
 * 
 * Features:
 * - Device preview toggle (desktop/tablet/mobile)
 * - Undo/Redo buttons
 * - Save button with status indicator
 * - Preview in new tab button
 * - Page title display
 */

import { motion } from "framer-motion";
import {
  X,
  Save,
  Undo2,
  Redo2,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  Loader2,
  Check,
  AlertCircle,
  ChevronLeft,
  ExternalLink,
  MoreHorizontal,
  History,
  Download,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DeviceType, SaveStatus } from "./index";

export interface ToolbarProps {
  pageTitle: string;
  device: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
  onSave: () => void;
  onPreview: () => void;
  onClose: () => void;
  saveStatus: SaveStatus;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

const devices: {
  id: DeviceType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  width: number;
}[] = [
  {
    id: "desktop",
    label: "Desktop",
    icon: Monitor,
    width: 100,
  },
  {
    id: "tablet",
    label: "Tablet",
    icon: Tablet,
    width: 768,
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: Smartphone,
    width: 375,
  },
];

export function Toolbar({
  pageTitle,
  device,
  onDeviceChange,
  onSave,
  onPreview,
  onClose,
  saveStatus,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: ToolbarProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
      {/* Left: Close and Title */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
          title="Close builder"
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-terracotta-500 to-terracotta-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-semibold text-sm">Visual Builder</h1>
            <p className="text-xs text-gray-500 truncate max-w-[150px] lg:max-w-[250px]">
              {pageTitle}
            </p>
          </div>
        </div>
      </div>

      {/* Center: Device Toolbar */}
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center bg-gray-800 rounded-lg p-1 border border-gray-700">
          {devices.map(({ id, label, icon: Icon }) => {
            const isActive = device === id;

            return (
              <motion.button
                key={id}
                onClick={() => onDeviceChange(id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-device-bg-toolbar"
                    className="absolute inset-0 bg-gray-700 rounded-md"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative hidden lg:inline">{label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile device selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
              {device === "desktop" && <Monitor className="h-4 w-4" />}
              {device === "tablet" && <Tablet className="h-4 w-4" />}
              {device === "mobile" && <Smartphone className="h-4 w-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="bg-gray-800 border-gray-700">
            {devices.map(({ id, label, icon: Icon }) => (
              <DropdownMenuItem
                key={id}
                onClick={() => onDeviceChange(id)}
                className={cn(
                  "text-gray-300 focus:text-white focus:bg-gray-700 cursor-pointer",
                  device === id && "bg-terracotta-500/20 text-terracotta-400"
                )}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <div className="hidden sm:flex items-center gap-1 mr-2 pr-2 border-r border-gray-700">
          <Button
            variant="ghost"
            size="icon"
            onClick={onUndo}
            disabled={!canUndo}
            className="text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRedo}
            disabled={!canRedo}
            className="text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Preview Button */}
        <Button
          variant="outline"
          onClick={onPreview}
          className="hidden sm:flex border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>

        {/* Save Button with Status */}
        <Button
          onClick={onSave}
          disabled={saveStatus === "saving"}
          className={cn(
            "relative",
            saveStatus === "error"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-terracotta-500 hover:bg-terracotta-600",
            "text-white"
          )}
        >
          {saveStatus === "saving" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : saveStatus === "saved" ? (
            <Check className="mr-2 h-4 w-4" />
          ) : saveStatus === "error" ? (
            <AlertCircle className="mr-2 h-4 w-4" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {saveStatus === "saving"
              ? "Saving..."
              : saveStatus === "saved"
              ? "Saved"
              : saveStatus === "error"
              ? "Error"
              : "Save"}
          </span>
          <span className="sm:hidden">
            {saveStatus === "saving" ? "..." : "Save"}
          </span>
        </Button>

        {/* More Actions Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 w-48">
            <DropdownMenuItem
              onClick={onPreview}
              className="text-gray-300 focus:text-white focus:bg-gray-700 cursor-pointer sm:hidden"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Page
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700 sm:hidden" />
            <DropdownMenuItem
              onClick={onUndo}
              disabled={!canUndo}
              className="text-gray-300 focus:text-white focus:bg-gray-700 cursor-pointer sm:hidden disabled:opacity-50"
            >
              <Undo2 className="h-4 w-4 mr-2" />
              Undo
              <span className="ml-auto text-xs text-gray-500">Ctrl+Z</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onRedo}
              disabled={!canRedo}
              className="text-gray-300 focus:text-white focus:bg-gray-700 cursor-pointer sm:hidden disabled:opacity-50"
            >
              <Redo2 className="h-4 w-4 mr-2" />
              Redo
              <span className="ml-auto text-xs text-gray-500">Ctrl+Shift+Z</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem
              className="text-gray-300 focus:text-white focus:bg-gray-700 cursor-pointer"
              onClick={() => {
                // Export functionality would go here
                console.log("Export page");
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Page
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-gray-300 focus:text-white focus:bg-gray-700 cursor-pointer"
              onClick={() => {
                // Import functionality would go here
                console.log("Import page");
              }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Page
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem
              className="text-gray-300 focus:text-white focus:bg-gray-700 cursor-pointer"
              onClick={onClose}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Exit Builder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Toolbar;
