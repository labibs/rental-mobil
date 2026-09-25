const STORAGE_BASE =
  (process.env.INTEGRATION_PROXY_URL || "").trim() ||
  "https://integrations.emergentagent.com";
const STORAGE_URL = `${STORAGE_BASE.replace(/\/+$/, "")}/objstore/api/v1/storage`;
const EMERGENT_KEY = process.env.EMERGENT_LLM_KEY;

export const STORAGE_PREFIX = "mitra-mobil";

let storageKey: string | null = null;

async function initStorage(force = false): Promise<string> {
  if (storageKey && !force) return storageKey;

  const response = await fetch(`${STORAGE_URL}/init`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emergent_key: EMERGENT_KEY }),
  });

  if (!response.ok) {
    throw new Error(`Storage init gagal (${response.status})`);
  }

  const data = (await response.json()) as { storage_key: string };
  storageKey = data.storage_key;
  return storageKey;
}

async function withStorageRetry<T>(
  operation: (key: string) => Promise<Response>,
  parse: (response: Response) => Promise<T>,
): Promise<T> {
  let key = await initStorage();
  let response = await operation(key);

  if (response.status === 404) {
    key = await initStorage(true);
    response = await operation(key);
  }

  if (!response.ok) {
    throw new Error(`Storage request gagal (${response.status})`);
  }

  return parse(response);
}

export async function putObject(
  path: string,
  data: Buffer,
  contentType: string,
): Promise<{ path: string; size: number }> {
  return withStorageRetry(
    (key) =>
      fetch(`${STORAGE_URL}/objects/${path}`, {
        method: "PUT",
        headers: { "X-Storage-Key": key, "Content-Type": contentType },
        body: new Uint8Array(data),
      }),
    (response) => response.json() as Promise<{ path: string; size: number }>,
  );
}

export async function getObject(
  path: string,
): Promise<{ data: Buffer; contentType: string }> {
  return withStorageRetry(
    (key) =>
      fetch(`${STORAGE_URL}/objects/${path}`, {
        headers: { "X-Storage-Key": key },
      }),
    async (response) => ({
      data: Buffer.from(await response.arrayBuffer()),
      contentType:
        response.headers.get("Content-Type") || "application/octet-stream",
    }),
  );
}
