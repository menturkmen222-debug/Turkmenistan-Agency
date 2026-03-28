/** Parse a User-Agent string into a short human-readable device label. */
export function parseDevice(ua: string | undefined): string {
  if (!ua) return "Noma'lum qurilma";

  const s = ua.toLowerCase();

  // OS detection
  let os = "Noma'lum";
  if (s.includes("iphone")) os = "iPhone";
  else if (s.includes("ipad")) os = "iPad";
  else if (s.includes("android")) {
    // Try to grab model name: Android X.X; <Model>
    const m = ua.match(/Android[^;]*;\s*([^)]+)\)/);
    os = m ? `Android (${m[1].trim()})` : "Android";
  } else if (s.includes("windows")) os = "Windows";
  else if (s.includes("mac os")) os = "macOS";
  else if (s.includes("linux")) os = "Linux";

  // Device type
  const isMobile = s.includes("mobile") || s.includes("iphone") || s.includes("android");
  const isTablet = s.includes("ipad") || (s.includes("android") && !s.includes("mobile"));
  const icon = isTablet ? "📟" : isMobile ? "📱" : "🖥️";
  const type = isTablet ? "Planşet" : isMobile ? "Telefon" : "Desktop";

  return `${icon} ${type} | ${os}`;
}
