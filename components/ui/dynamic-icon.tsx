"use client"

import { 
  Orbit, 
  Hotel, 
  Waves, 
  Sun, 
  BookOpen, 
  GraduationCap, 
  Feather, 
  Bot,
  Clapperboard,
  LucideProps 
} from "lucide-react"

const ICON_MAP = {
  Orbit,
  Hotel,
  Waves,
  Sun,
  BookOpen,
  GraduationCap,
  Feather,
  Bot,
  Clapperboard
}

export type IconName = keyof typeof ICON_MAP

interface DynamicIconProps extends LucideProps {
  name: string
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = ICON_MAP[name as IconName]
  
  if (!Icon) {
    return null
  }

  return <Icon {...props} />
}
