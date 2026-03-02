import Link from "next/link";
import { LayoutDashboard, Film, ShoppingBag, BarChart3, Settings, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard, isActive: false },
    { name: "Mapping Studio", href: "/studio", icon: LayoutTemplate, isActive: true },
    { name: "Diziler", href: "/shows", icon: Film, isActive: false },
    { name: "Ürünler", href: "/products", icon: ShoppingBag, isActive: false },
    { name: "Analizler", href: "/analytics", icon: BarChart3, isActive: false },
    { name: "Ayarlar", href: "/settings", icon: Settings, isActive: false },
];

export function Sidebar() {
    // ... rest of the component
    return (
        <div className="flex flex-col w-64 border-r border-border bg-surface h-screen fixed left-0 top-0">
            {/* ... same header ... */}
            <div className="p-6 border-b border-border/50">
                <h1 className="text-2xl font-bold text-primary tracking-tighter">DİZİ MARKET</h1>
                <p className="text-xs text-secondary tracking-[0.2em] font-medium mt-1">ADMIN PANEL</p>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                            // Logic for active state needs to be dynamic in robust apps, hardcoded slightly here for mocking specific page
                            "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
                        )}
                    // In a real app we'd use usePathname() hook to set active state dynamically
                    >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                    </Link>
                ))}
            </nav>
            {/* ... footer ... */}
            <div className="p-4 border-t border-border/50">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-surface-hover/50">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">Admin User</p>
                        <p className="text-xs text-muted-foreground truncate">admin@dizimarket.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
