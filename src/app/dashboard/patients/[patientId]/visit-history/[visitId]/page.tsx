const page = ({ params: { visitId } }: { params: { visitId: string } }) => {
  console.log(visitId);
  return <div>{JSON.stringify(visitId)}</div>;
};
export default page;
