export default function RagResult({ data }: { data: any }) {
  if (!data) return null;
  return (
    <pre className="whitespace-pre-wrap border rounded p-3 bg-white overflow-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
