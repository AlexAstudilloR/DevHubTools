import { getRequestConfig } from 'next-intl/server';

const locales = ['es', 'en'];
const defaultLocale = 'es';

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` is a Promise in next-intl v4
  let locale = await requestLocale;

  // Fallback to default if locale is invalid or missing
  if (!locale || !locales.includes(locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
