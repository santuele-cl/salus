export default function DrugNotFound({
  params,
}: {
  params: { drugId: string };
}) {
  return (
    <div>
      DrugNotFound <span>Cannot find drug with id of {params?.drugId}</span>
    </div>
  );
}
