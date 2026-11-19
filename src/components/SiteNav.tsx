import { useEffect, useId, useRef, useState } from 'react';
import type { NavItem } from '@/data/site';

interface SiteNavProps {
  nav: NavItem[];
  cta: { label: string; href: string };
  phone: { display: string; href: string };
  currentPath: string;
}

const linkBase =
  'inline-flex min-h-11 items-center rounded-md px-3 text-base font-medium hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600';

function isActive(currentPath: string, href: string) {
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

function DesktopDropdown({ item, currentPath }: { item: NavItem; currentPath: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();

  // Only listen while open. Works for tap (pointerdown) and keyboard (Escape).
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className={`${linkBase} gap-1`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        {item.label}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="currentColor"
        >
          <path d="M5.5 7.5 10 12l4.5-4.5-1.4-1.4L10 9.2 6.9 6.1z" />
        </svg>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full left-0 z-20 mt-1 w-56 rounded-lg border border-black/10 bg-white p-1 shadow-lg"
      >
        <a href={item.href} className={`${linkBase} w-full`} onClick={() => setOpen(false)}>
          All programs
        </a>
        {item.children?.map((child) => (
          <a
            key={child.href}
            href={child.href}
            className={`${linkBase} w-full`}
            aria-current={currentPath === child.href ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {child.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SiteNav({ nav, cta, phone, currentPath }: SiteNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <>
      {/* Desktop and iPad landscape (lg+) */}
      <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
        {nav.map((item) =>
          item.children ? (
            <DesktopDropdown key={item.href} item={item} currentPath={currentPath} />
          ) : (
            <a
              key={item.href}
              href={item.href}
              className={linkBase}
              aria-current={isActive(currentPath, item.href) ? 'page' : undefined}
            >
              {item.label}
            </a>
          ),
        )}
      </nav>

      <div className="flex items-center gap-2">
        <a
          href={phone.href}
          className="hidden min-h-11 items-center px-3 text-base font-medium xl:inline-flex"
        >
          {phone.display}
        </a>
        <a
          href={cta.href}
          className="inline-flex min-h-11 items-center rounded-md bg-brand-600 px-4 text-base font-semibold text-white hover:bg-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          {cta.label}
        </a>

        {/* Phones and iPad portrait (below lg) */}
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <div
        id={menuId}
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-black/10 bg-white px-4 pt-2 pb-6 shadow-lg lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`${linkBase} w-full text-lg`}
                  aria-current={isActive(currentPath, item.href) ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
                {item.children ? (
                  <ul className="mb-1 ml-4 border-l border-black/10 pl-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          className={`${linkBase} w-full`}
                          aria-current={currentPath === child.href ? 'page' : undefined}
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        <a href={phone.href} className={`${linkBase} mt-2 w-full`}>
          Call {phone.display}
        </a>
      </div>
    </>
  );
}
