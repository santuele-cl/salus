"use client";
export default function TestErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <div>{JSON.stringify(error.message)}</div>;
}
