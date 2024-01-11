import LoginForm from "@/components/LoginForm";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-32">
      <LoginForm />
    </main>
  );
}
