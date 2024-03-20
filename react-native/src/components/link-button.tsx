import { Link } from "expo-router";
import { LinkInterface } from "@/types";

export function LinkButton(props: LinkInterface) {
  const { title, ...rest } = props;

  return (
    <Link {...rest} className="text-slate-300 text-center text-base font-body">
      {title}
    </Link>
  );
}
