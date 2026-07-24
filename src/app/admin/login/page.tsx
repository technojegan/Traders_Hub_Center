import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Logo } from "@/components/site/logo";
import { LoginForm } from "@/components/admin/login-form";
import { clientConfig } from "@/lib/client-config";

export default function AdminLoginPage() {
  if (!clientConfig.requireAdminAuth) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-4">
      <Logo />
      <div className="thc-glass thc-gold-border w-full max-w-sm rounded-2xl p-8">
        <h1 className="font-heading text-xl font-bold">Admin Login</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to manage signals and view performance analytics.
        </p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
