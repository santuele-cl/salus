export default function page({ params }: { params: { slug: string[] } }) {
  return <div>page {JSON.stringify(params?.slug)}</div>;
}
