declare namespace App {
  interface Locals {
    /** Breadcrumb trail (including Home) set by BaseLayout and shown by Hero. */
    breadcrumbs?: import('@/lib/structured-data').BreadcrumbItem[];
  }
}

interface ImportMetaEnv {
  /** Resend API key for lead emails (server only) */
  readonly RESEND_API_KEY?: string;
  /** Inbox that receives free-class requests */
  readonly LEAD_TO_EMAIL?: string;
  /** Verified Resend sender, e.g. "Shonen Jiu Jitsu <leads@shonenjiujitsu.com>" */
  readonly LEAD_FROM_EMAIL?: string;
  /** Cloudflare Turnstile secret (optional; enables the check when set) */
  readonly TURNSTILE_SECRET_KEY?: string;
  /** Cloudflare Turnstile site key (optional; shows the widget when set) */
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}
