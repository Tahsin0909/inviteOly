export interface IMenu {
  label: string;
  href?: string;
  children?: {
    label: string;
    href?: string;
    isButton?: boolean;
  }[];
}
