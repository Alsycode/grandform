const styles: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Confirmed: "bg-green-100 text-green-700",
  Hidden: "bg-gray-100 text-gray-600",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function Badge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
