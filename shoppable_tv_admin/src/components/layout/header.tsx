import { Search, Bell, User } from "lucide-react";

export function Header() {
    return (
        <header className="h-16 border-b border-border bg-surface/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10 w-full">
            <div className="flex-1 max-w-xl">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Dizi, oyuncu veya ürün ara..."
                        className="pl-10 h-10 w-full rounded-full bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-full hover:bg-surface-hover text-muted-foreground hover:text-foreground transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary border-2 border-surface"></span>
                </button>

                <div className="h-9 w-9 rounded-full bg-surface-hover flex items-center justify-center border border-border">
                    <User className="h-4 w-4 text-foreground" />
                </div>
            </div>
        </header>
    );
}
