import type { FunctionComponent, SVGAttributes } from "react";

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: FunctionComponent<SVGAttributes<SVGElement>>;
  authOnly?: boolean; // Add authOnly prop to restrict access to the sidebar item. If true, only authenticated users will see the item.
}
