"use client";

import { useRouter } from "next/navigation";

const getUsers = async () => {
  const router = useRouter();
  const users = await fetch("/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: "nothin" }),
  });
  router.push("/");
  return users;
};

export default async function Home() {
  const users = await getUsers();
  console.log(users);
  return (
    <main>
      <h1>hi</h1>
    </main>
  );
}
