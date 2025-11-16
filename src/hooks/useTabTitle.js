import { useEffect } from "react";

export default function useTabTitle(originalTitle, awayTitle = "Come back 😢") {
  useEffect(() => {
    // حماية من SSR (Server-Side Rendering)
    if (typeof document === 'undefined') return;

    // تعيين العنوان الأولي
    document.title = originalTitle;

    const handleVisibility = () => {
      if (document.hidden) {
        document.title = awayTitle;
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [originalTitle, awayTitle]);
}
