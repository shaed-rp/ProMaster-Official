'use client';

import { useEffect } from 'react';

/**
 * Google Translate Widget Component
 * Adds the Google Translate widget to the page
 */
export default function GTranslate() {
  useEffect(() => {
    let scriptElement: HTMLScriptElement | null = null;
    let translateElement: HTMLElement | null = null;

    // Add Google Translate script
    const addScript = () => {
      // Check if script already exists
      const existingScript = document.getElementById('google-translate-script');
      if (existingScript) {
        return;
      }

      scriptElement = document.createElement('script');
      scriptElement.id = 'google-translate-script';
      scriptElement.type = 'text/javascript';
      scriptElement.src =
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      scriptElement.async = true;
      
      if (document.body) {
        document.body.appendChild(scriptElement);
      }
    };

    // Initialize Google Translate
    const initTranslate = () => {
      // @ts-ignore - Google Translate API
      window.googleTranslateElementInit = () => {
        try {
          // @ts-ignore - Google Translate API
          if (window.google && window.google.translate) {
            // @ts-ignore - Google Translate API
            const TranslateElement = window.google.translate.TranslateElement;
            // @ts-ignore - Google Translate API
            new TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,es,fr,de,it,pt,zh-CN,ja,ko',
                // @ts-ignore - Google Translate API
                layout: TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
              },
              'google_translate_element'
            );
          }
        } catch (error) {
          console.error('Error initializing Google Translate:', error);
        }
      };
    };

    // Wait for body to be available
    if (document.body) {
      addScript();
      initTranslate();
    } else {
      // If body isn't ready, wait for it
      const bodyCheck = setInterval(() => {
        if (document.body) {
          clearInterval(bodyCheck);
          addScript();
          initTranslate();
        }
      }, 100);

      // Cleanup interval if component unmounts before body is ready
      return () => {
        clearInterval(bodyCheck);
      };
    }

    // Cleanup function
    return () => {
      try {
        // Safely remove the script if it still exists and has a parent
        if (scriptElement && scriptElement.parentNode) {
          scriptElement.parentNode.removeChild(scriptElement);
        }
        
        // Clean up the translate element container
        translateElement = document.getElementById('google_translate_element');
        if (translateElement && translateElement.parentNode) {
          // Clear the inner HTML to remove Google Translate's injected elements
          translateElement.innerHTML = '';
        }

        // Clean up the global callback
        // @ts-ignore
        if (window.googleTranslateElementInit) {
          // @ts-ignore
          delete window.googleTranslateElementInit;
        }
      } catch (error) {
        // Silently handle any cleanup errors
        console.warn('Error during Google Translate cleanup:', error);
      }
    };
  }, []);

  return <div id='google_translate_element'></div>;
}

