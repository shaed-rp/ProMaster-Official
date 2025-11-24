/**
 * Global type definitions
 */

declare global {
  interface Window {
    dataLayer?: any[];
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: number;
            autoDisplay: boolean;
          },
          elementId: string
        ) => void;
        TranslateElement: {
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
  }
}

export {};

