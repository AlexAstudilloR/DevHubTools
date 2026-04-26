import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['es', 'en'];

export default getRequestConfig(async ({ locale }) => {
  // Si por alguna razón el locale es undefined, usamos el por defecto
  // para evitar que la aplicación se rompa con un error 500 o 404 prematuro.
  const targetLocale = locale && locales.includes(locale) ? locale : 'es';

  return {
    locale: targetLocale,
    messages: (await import(`./messages/${targetLocale}.json`)).default
  };
});
