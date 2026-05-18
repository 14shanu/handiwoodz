import { API } from "@/lib/constants/api";

export async function strapiGet<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T[]> {
  const allData: T[] = [];
  let page = 1;
  let pageCount = 1;

  do {
    const url = new URL(endpoint);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    // Only override pagination if not explicitly set by caller
    if (!params?.["pagination[pageSize]"]) {
      url.searchParams.set("pagination[pageSize]", "100");
    }
    url.searchParams.set("pagination[page]", String(page));

    const res = await fetch(url.toString(), {
      next: { revalidate: API.REVALIDATE },
    });

    if (!res.ok) {
      throw new Error(`Strapi error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const data = json.data as T[];
    allData.push(...data);

    pageCount = json.meta?.pagination?.pageCount || 1;
    page++;
  } while (page <= pageCount);

  return allData;
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
