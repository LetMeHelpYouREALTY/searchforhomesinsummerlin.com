export const FUB_SYSTEM_NAME = "DrJanDuffyWebsite";

export function getFubApiKey(): string | undefined {
  const key =
    process.env.FOLLOW_UP_BOSS_API_KEY?.trim() ||
    process.env.FUB_API_KEY?.trim();
  return key || undefined;
}

export function getFubSystemKey(): string | undefined {
  const key = process.env.FUB_SYSTEM_KEY?.trim();
  return key || undefined;
}
