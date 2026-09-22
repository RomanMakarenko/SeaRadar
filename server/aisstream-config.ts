export function getAISStreamApiKey(): string | null {
  const value = process.env.AISSTREAM_API_KEY?.trim();

  return value || null;
}
