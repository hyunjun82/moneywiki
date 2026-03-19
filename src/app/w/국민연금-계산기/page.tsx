import { redirect } from "next/navigation";

export const dynamic = "force-static";

export default function Page() {
  redirect("/w/%EA%B5%AD%EB%AF%BC%EC%97%B0%EA%B8%88-%EC%88%98%EB%A0%B9%EC%95%A1-%EA%B3%84%EC%82%B0%EA%B8%B0");
}
