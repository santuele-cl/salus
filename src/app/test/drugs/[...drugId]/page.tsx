import { getDrug } from "@/actions/drugs";
import { notFound } from "next/navigation";

export default async function TestDrugPage({
  params,
}: {
  params: { drugId: string };
}) {
  const res = await getDrug(params?.drugId ?? "");

  if (!res.data) {
    notFound();
  }

  return <div>TestDrugPage {params.drugId}</div>;
}
