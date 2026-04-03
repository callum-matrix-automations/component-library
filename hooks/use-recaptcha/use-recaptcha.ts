// Dependencies: (none — uses Google reCAPTCHA v3 script loaded externally)
// Source: dirt-to-keys

import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook for Google reCAPTCHA v3
 *
 * @param siteKey - Your reCAPTCHA v3 site key
 * @returns Object with executeRecaptcha function and isLoaded state
 *
 * @example
 * const { executeRecaptcha, isLoaded } = useRecaptcha('your-site-key');
 * const token = await executeRecaptcha('form_submit');
 */
export const useRecaptcha = (siteKey: string) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkRecaptchaReady = () => {
      if ((window as any).grecaptcha?.ready) {
        (window as any).grecaptcha.ready(() => {
          setIsLoaded(true);
        });
      } else {
        setTimeout(checkRecaptchaReady, 100);
      }
    };

    checkRecaptchaReady();
  }, []);

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string | null> => {
      let attempts = 0;
      while (!isLoaded && attempts < 30) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }

      if (!(window as any).grecaptcha?.execute) {
        return null;
      }

      try {
        const token = await (window as any).grecaptcha.execute(siteKey, { action });
        return token;
      } catch {
        return null;
      }
    },
    [isLoaded, siteKey]
  );

  return { executeRecaptcha, isLoaded };
};
