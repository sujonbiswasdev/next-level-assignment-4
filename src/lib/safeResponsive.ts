export const safeData = (response: any, defaultValue: any = null) => {
  try {
    if (!response) return defaultValue;
    const res = response.data ?? response;
    if (res?.success !== undefined) {
      return res.data ?? defaultValue;
    }

    if (res?.result !== undefined) {
      return res.result ?? defaultValue;
    }

    if (Array.isArray(res) || typeof res === "object") {
      return res ?? defaultValue;
    }

    return defaultValue;
  } catch (err) {
    console.error("safeData parse error:", err);
    return defaultValue;
  }
};