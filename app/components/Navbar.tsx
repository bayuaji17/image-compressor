import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { t, i18n } = useTranslation();

  const navItems = [
    { to: "/", label: t("common.overview") },
    { to: "/compress", label: t("common.compress") },
    { to: "/convert", label: t("common.convert") },
  ];
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <NavLink
          to="/"
          className="flex items-center gap-3 text-slate-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500 text-xs font-bold text-white shadow-sm">
            IT
          </span>
          <span className="font-semibold tracking-tight">Image Tools</span>
        </NavLink>
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "text-teal-600"
                    : "text-slate-600 hover:text-slate-900",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
          <select
            value={i18n.resolvedLanguage}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="ml-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          >
            <option value="en">EN</option>
            <option value="id">ID</option>
          </select>
        </nav>
      </div>
    </header>
  );
}
