export async function getPaperVersions(): Promise<string[]> {
  try {
    const response = await fetch("https://api.papermc.io/v2/projects/paper");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.versions || [];
  } catch (error) {
    console.error("Failed to fetch Paper versions:", error);
    return [];
  }
}

export async function getVanillaVersions(): Promise<string[]> {
  try {
    const response = await fetch(
      "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json",
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.versions.map((version: { id: string }) => version.id);
  } catch (error) {
    console.error("Failed to fetch Vanilla versions:", error);
    return [];
  }
}
