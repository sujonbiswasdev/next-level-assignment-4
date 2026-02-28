import { env } from "@/env"

const api_url=env.API_URL


export const providerService = {
  getprovidermeals: async (id: string) => {
    try {
      const response = await fetch(
        `${api_url}/api/providers/${id}`
      );

      const body = await response.json();

      if (!response.ok) {
        throw new Error(
          `Error fetching provider meals: ${response.statusText}`
        );
      }

      console.log("FULL RESPONSE:", body);

      return {
        data: body.result,
      };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
  getAllProviderUser: async () => {
    try {
      const response = await fetch(`${api_url}/api/providers`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `Error fetching provider meals: ${response.statusText}`
        );
      }

      return data
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
};