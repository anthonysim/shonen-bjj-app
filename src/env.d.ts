declare namespace App {
  interface Locals {
    /** Breadcrumb trail (including Home) set by BaseLayout and shown by Hero. */
    breadcrumbs?: import('@/lib/structured-data').BreadcrumbItem[];
  }
}
