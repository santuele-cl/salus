import { getDrugs } from "@/actions/drugs";

export default async function page() {
  // const drugs = await getDrugs();
  const drugs = await fetch("/api/test", { method: "GET" });

  return <div>{JSON.stringify(drugs)}</div>;
}
