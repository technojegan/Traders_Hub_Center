import { AddSignalForm } from "@/components/admin/add-signal-form";

export default function AddSignalPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">Add New Signal</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Paste the raw message and hit Parse, or use the manual form. Nothing saves until you
          confirm.
        </p>
      </div>
      <AddSignalForm />
    </div>
  );
}
