import { Link } from "react-router";

type RouterLinKProps = {
  children: React.ReactNode;
  href: string;
} & React.ComponentProps<"a">;

export function RouterLink({ children, href, ...props }: RouterLinKProps) {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
}
