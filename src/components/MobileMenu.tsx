import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { NavItem } from '@/data/site';

interface MobileMenuProps {
  nav: NavItem[];
  cta: { label: string; href: string };
  phone: { display: string; href: string };
  currentPath: string;
}

const MENU_ID = 'mobile-menu';
// Must match the header's lg breakpoint, where the desktop nav takes over
const DESKTOP = '(min-width: 1024px)';
// Everything outside the header goes inert while the menu covers the page
const OUTSIDE = ['main', 'body > footer'];

function isActive(currentPath: string, href: string) {
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

/**
 * Hamburger toggle plus a full-screen menu, for phones and iPad portrait (below lg).
 * The panel is portaled to <body>: the header's backdrop-filter would otherwise trap a fixed panel
 * inside the header's own box.
 */
export default function MobileMenu({ nav, cta, phone, currentPath }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('menu-open', open);
    for (const selector of OUTSIDE) {
      document.querySelector(selector)?.toggleAttribute('inert', open);
    }
    if (!open) return;

    const focusTimer = window.setTimeout(
      () => panelRef.current?.querySelector('a')?.focus({ preventScroll: true }),
      60,
    );
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    // Rotating an iPad to landscape shows the desktop nav, so the menu has nothing left to do
    const desktop = window.matchMedia(DESKTOP);
    const onDesktop = (e: MediaQueryListEvent) => e.matches && setOpen(false);

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onDesktop);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [open]);

  const close = () => setOpen(false);
  const primary = nav;
  const programs = nav.find((item) => item.children)?.children ?? [];
  let step = 0;
  const stagger = () => ({ '--i': step++ }) as React.CSSProperties;

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle lg:hidden"
        aria-expanded={open}
        aria-controls={MENU_ID}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="menu-toggle__bars" aria-hidden="true" />
        <span className="sr-only">{open ? 'Close menu' : 'Menu'}</span>
      </button>

      {mounted
        ? createPortal(
            <div ref={panelRef} id={MENU_ID} className="mobile-menu lg:hidden" inert={!open}>
              <nav
                aria-label="Mobile"
                className="page-container flex flex-1 flex-col pt-8 pb-[calc(2rem+env(safe-area-inset-bottom))]"
              >
                <ul>
                  {primary.map((item) => (
                    <li key={item.href} className="mobile-menu__item" style={stagger()}>
                      <a
                        href={item.href}
                        onClick={close}
                        aria-current={isActive(currentPath, item.href) ? 'page' : undefined}
                        className="block py-1.5 font-display text-4xl leading-[1.15] font-light tracking-[-0.015em] text-ink aria-[current=page]:italic"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>

                {programs.length > 0 ? (
                  <>
                    <p
                      className="mobile-menu__item mt-8 border-t border-line pt-6 text-label font-medium tracking-[0.14em] text-muted uppercase"
                      style={stagger()}
                    >
                      Programs
                    </p>
                    <ul className="mt-3">
                      {programs.map((child) => (
                        <li key={child.href} className="mobile-menu__item" style={stagger()}>
                          <a
                            href={child.href}
                            onClick={close}
                            aria-current={currentPath === child.href ? 'page' : undefined}
                            className="flex min-h-11 items-center text-[1.0625rem] text-body"
                          >
                            {child.detail ? `${child.label}, ${child.detail}` : child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}

                <div className="mobile-menu__item mt-auto grid gap-3 pt-8" style={stagger()}>
                  <a
                    href={cta.href}
                    onClick={close}
                    className="site-header__cta min-h-[52px] w-full"
                  >
                    {cta.label}
                  </a>
                  <a
                    href={phone.href}
                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-card border border-line-strong text-nav font-medium tracking-[0.12em] text-ink uppercase transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                  >
                    Call {phone.display}
                  </a>
                </div>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
