import * as LucideIcons from "lucide-react";
import { IIconProps } from "./Icon.props";
import "./Icon.css"

export const Icon = ({ name, ...props }: IIconProps) => {
  const LucideIcon = LucideIcons[name] as React.ElementType;
  return LucideIcon ? <LucideIcon className="icon" {...props} /> : null;
};