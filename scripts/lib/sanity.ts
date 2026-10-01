import { createClient } from "@sanity/client";

// Write client for scripts. The token is read from SANITY_API_WRITE_TOKEN when
// it is set. In the Claude Code cloud session the token is not an env variable:
// an API credential adds the Authorization header to *.api.sanity.io requests,
// so the client is created without a token. Never put a token in code.
export function writeClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
  return createClient({
    projectId,
    dataset,
    apiVersion: "2025-02-19",
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN || undefined,
  });
}
