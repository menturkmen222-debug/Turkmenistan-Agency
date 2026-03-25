import { useEffect, useRef } from 'react';
import { useTrackAnalyticsEvent } from '@workspace/api-client-react';
import { useTranslation } from '@/lib/i18n';

export function useAnalytics() {
  const { mutate } = useTrackAnalyticsEvent();
  const { locale } = useTranslation();
  const sessionStartTime = useRef(Date.now());
  const pendingEvents = useRef<any[]>([]);
  const batchTimeout = useRef<NodeJS.Timeout | null>(null);

  const trackEvent = (event: string, data: Record<string, any> = {}, immediate = false) => {
    const payload = {
      event,
      locale,
      device: typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop',
      timeOnSite: Math.floor((Date.now() - sessionStartTime.current) / 1000),
      ...data
    };

    if (immediate) {
      mutate({ data: payload as any });
      return;
    }

    pendingEvents.current.push(payload);

    if (!batchTimeout.current) {
      batchTimeout.current = setTimeout(() => {
        // In a real scenario we'd send the batch, but the API expects single events 
        // per the schema we generated. So we'll fire them sequentially.
        pendingEvents.current.forEach(evt => mutate({ data: evt as any }));
        pendingEvents.current = [];
        batchTimeout.current = null;
      }, 5000);
    }
  };

  useEffect(() => {
    trackEvent('page_visit', {}, true);

    const interval = setInterval(() => {
      trackEvent('time_on_site');
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return { trackEvent };
}
