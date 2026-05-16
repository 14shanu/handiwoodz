import { API } from "@/lib/constants/api";

export async function strapiGet<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T[]> {
  const url = new URL(endpoint);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: API.REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(`Strapi error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return json.data as T[];
}

export async function strapiGetOne<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T | undefined> {
  const url = new URL(endpoint);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: API.REVALIDATE },
  });

  if (!res.ok) return undefined;

  const json = await res.json();
  if (!json.data || (Array.isArray(json.data) && json.data.length === 0)) return undefined;
  return Array.isArray(json.data) ? json.data[0] as T : json.data as T;
}

export async function strapiPost<T>(
  endpoint: string,
  data: Record<string, unknown>
): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: { message: "Request failed" } }));
    throw new Error(error?.error?.message || "Request failed");
  }

  const json = await res.json();
  return json.data as T;
}

export { API };
