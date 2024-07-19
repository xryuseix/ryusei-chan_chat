"use client";

import { useEffect, useState } from "react";
import { client } from "@api/client";

export default function AdminPage() {
  const [name, setName] = useState<string>();

  useEffect(() => {
    client.api.hello
      .$get()
      .then((res) => res.json())
      .then((json) => setName(json.name));
  }, []);

  return <p>{typeof name !== "undefined" ? `Hello ${name}!` : "Loading..."}</p>;
}
