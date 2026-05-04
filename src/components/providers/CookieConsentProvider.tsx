"use client";

import { useEffect } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

export function CookieConsentProvider() {
  useEffect(() => {
    // Delay showing the cookie consent for a smoother experience
    const timer = setTimeout(() => {
      CookieConsent.run({
      // Force user to make a choice before accessing the site
      disablePageInteraction: true,

      guiOptions: {
        consentModal: {
          layout: "box wide",
          position: "middle center",
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          position: "right",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },

      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [
              { name: /^_ga/ },
              { name: "_gid" },
            ],
          },
          services: {
            ga4: {
              label: "Google Analytics 4",
              onAccept: () => {
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("consent", "update", {
                    analytics_storage: "granted",
                  });
                }
              },
              onReject: () => {
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("consent", "update", {
                    analytics_storage: "denied",
                  });
                }
              },
            },
          },
        },
        marketing: {
          autoClear: {
            cookies: [
              { name: /^_gcl/ },
            ],
          },
          services: {
            gads: {
              label: "Google Ads",
              onAccept: () => {
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("consent", "update", {
                    ad_storage: "granted",
                    ad_user_data: "granted",
                    ad_personalization: "granted",
                  });
                }
              },
              onReject: () => {
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("consent", "update", {
                    ad_storage: "denied",
                    ad_user_data: "denied",
                    ad_personalization: "denied",
                  });
                }
              },
            },
          },
        },
      },

      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: "We Value Your Privacy",
              description:
                "We use cookies to enhance your browsing experience, provide personalized content, and analyze our traffic. Please make a selection to continue using our website.",
              acceptAllBtn: "Accept All",
              acceptNecessaryBtn: "Reject All",
              showPreferencesBtn: "Customize",
            },
            preferencesModal: {
              title: "Cookie Preferences",
              acceptAllBtn: "Accept All",
              acceptNecessaryBtn: "Reject All",
              savePreferencesBtn: "Save Preferences",
              closeIconLabel: "Close",
              sections: [
                {
                  title: "Cookie Usage",
                  description:
                    "We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose to opt-in or opt-out of each category whenever you want.",
                },
                {
                  title: "Strictly Necessary Cookies",
                  description:
                    "These cookies are essential for the website to function properly. They cannot be disabled.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analytics Cookies",
                  description:
                    "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
                  linkedCategory: "analytics",
                },
                {
                  title: "Marketing Cookies",
                  description:
                    "These cookies are used to deliver relevant ads and marketing campaigns. They track visitors across websites.",
                  linkedCategory: "marketing",
                },
                {
                  title: "More Information",
                  description:
                    'For any questions regarding our cookie policy, please <a href="#contact">contact us</a>.',
                },
              ],
            },
          },
        },
      },
    });
    }, 1500); // 1.5 second delay before showing

    return () => clearTimeout(timer);
  }, []);

  return null;
}
