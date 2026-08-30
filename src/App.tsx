import { Suspense, lazy, useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { LanguageProvider, useI18n } from './i18n'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './routes/Home'

/**
 * The cover is bundled with the shell because it is where most visits start;
 * everything else is split, so arriving at FIBRA does not cost the weight of
 * the atlas, the chronicles and the commission guide as well.
 */
const Atlas = lazy(() => import('./routes/Atlas').then((m) => ({ default: m.Atlas })))
const Techniques = lazy(() => import('./routes/Techniques').then((m) => ({ default: m.Techniques })))
const Artisans = lazy(() => import('./routes/Artisans').then((m) => ({ default: m.Artisans })))
const ArtisanProfile = lazy(() =>
  import('./routes/ArtisanProfile').then((m) => ({ default: m.ArtisanProfile })),
)
const Commission = lazy(() => import('./routes/Commission').then((m) => ({ default: m.Commission })))
const Credits = lazy(() => import('./routes/Credits').then((m) => ({ default: m.Credits })))
const NotFound = lazy(() => import('./routes/NotFound').then((m) => ({ default: m.NotFound })))

/**
 * Moves the reading position to the top on navigation, and moves focus with it:
 * a router that only scrolls leaves a keyboard visitor's focus on the link they
 * just followed, so the main landmark is focused too.
 *
 * Two cases must be excluded or this helper does more harm than good.
 *   - The first render. Focusing main on arrival puts the visitor past the skip
 *     link and past the whole header, so the first Tab lands in mid-page.
 *   - Any navigation made while a modal is open. The region drawer writes its
 *     open region into the URL, and resetting focus there would pull focus
 *     straight back out of the dialog that had just taken it.
 */
function RouteChange() {
  const { pathname } = useLocation()
  // Compares against the last path actually seen rather than counting mounts:
  // StrictMode invokes effects twice in development, so a "first render" flag
  // is spent by the first pass and the second pass runs the real body.
  const previous = useRef<string | null>(null)

  useEffect(() => {
    const from = previous.current
    previous.current = pathname
    if (from === null || from === pathname) return
    if (document.querySelector('[role="dialog"][aria-modal="true"]')) return

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    const main = document.getElementById('main')
    if (main) main.focus({ preventScroll: true })
  }, [pathname])

  return null
}

/** Holds the page height while a split route loads, so the footer does not
 *  jump up and then back down between navigations. */
function RouteFallback() {
  return <div className="min-h-[70svh]" aria-hidden="true" />
}

function Shell() {
  const { t } = useI18n()
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only rounded-sm bg-bordeaux px-4 py-2.5 text-sm text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
      >
        {t('skip.content')}
      </a>

      <Header />
      <RouteChange />

      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/atlas" element={<Atlas />} />
            <Route path="/atlas/:slug" element={<Atlas />} />
            <Route path="/techniques" element={<Techniques />} />
            <Route path="/gestures/:slug" element={<Techniques />} />
            <Route path="/artisans" element={<Artisans />} />
            <Route path="/artisans/:slug" element={<ArtisanProfile />} />
            <Route path="/commission" element={<Commission />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </LanguageProvider>
  )
}
