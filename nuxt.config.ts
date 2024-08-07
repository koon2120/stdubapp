export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["@nuxtjs/supabase"],
  experimental: {
    defaults: {
      nuxtLink: {
        activeClass: "active",
      },
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "th",
      },
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
          integrity:
            "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH",
          crossorigin: "anonymous",
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Noto+Sans+Thai:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
          integrity:
            "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz",
          crossorigin: "anonymous",
        },
        {
          src: "https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"
        },
        {
          type: "application/ld+json",
          innerHTML: {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ST Dub Team App",
            url: "https://app.nornedb.online/",
          },
        },
      ],
      bodyAttrs: {
        "data-bs-theme": "dark",
      },
    },
  },

  css: ["~/assets/css/global.css"],

  runtimeConfig: {
    public: {
      SiteName: "ST Dub Team App",
      SiteDescription: "รวมแอปต่างๆ ของ ST Dub Team",
      SiteOgImage: "/images/stdubapp-thumnail.png"
    }
  },
  supabase: {
    redirectOptions: {
      login: '/auth/signin',
      callback: '/auth/confirm',
      include: undefined,
      exclude: ['/auth/*'],
      cookieRedirect: false,
    }
  },
});