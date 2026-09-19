import { describe, expect, it } from 'vitest';
import { localeMetadata, screenMetadata } from './metadata';

describe('locale metadata', () => {
  it('titles the document in the locale of the page', () => {
    expect(localeMetadata('en').title).toBe('Anderson Begossi — Senior Mobile Developer');
    expect(localeMetadata('pt').title).toBe('Anderson Begossi — Desenvolvedor Mobile Sênior');
  });

  it('describes the site with the locale’s own bio', () => {
    expect(localeMetadata('pt').description).toMatch(/^Construo aplicativos mobile/);
  });
});

describe('screen metadata', () => {
  it('points each page at itself and at its translation (ADR 0002)', () => {
    expect(screenMetadata('en', '/about').alternates).toEqual({
      canonical: '/about/',
      languages: { en: '/about/', 'pt-BR': '/pt/about/', 'x-default': '/about/' },
    });

    expect(screenMetadata('pt', '/about').alternates).toEqual({
      canonical: '/pt/about/',
      languages: { en: '/about/', 'pt-BR': '/pt/about/', 'x-default': '/about/' },
    });
  });

  it('gives the two Home screens their own canonical URLs', () => {
    expect(screenMetadata('en', '/').alternates?.canonical).toBe('/');
    expect(screenMetadata('pt', '/').alternates?.canonical).toBe('/pt/');
  });
});
