"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";

export type DeviceType = "desktop" | "tablet" | "mobile";

interface DeviceToolbarProps {
  device: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
}

const devices: { id: DeviceType; label: string; icon: React.ComponentType<{ className?: string }>; width: number }[] = [
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

export function DeviceToolbar({ device, onDeviceChange }: DeviceToolbarProps) {
  return (
    <div className="flex items-center bg-gray-800 rounded-lg p-1 border border-gray-700">
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
                layoutId="active-device-bg"
                className="absolute inset-0 bg-gray-700 rounded-md"
                transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              />
            )}
            <Icon className="relative h-4 w-4" />
            <span className="relative hidden sm:inline">{label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
