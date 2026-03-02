import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendUp, className }: StatCardProps) {
    return (
        <div className={cn("rounded-xl border border-border bg-surface p-6 shadow-sm", className)}>
            <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between pt-2">
                <div className="text-2xl font-bold text-foreground">{value}</div>
                {trend && (
                    <div
                        className={cn(
                            "text-xs font-medium px-2 py-1 rounded-full",
                            trendUp ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
                        )}
                    >
                        {trend}
                    </div>
                )}
            </div>
        </div>
    );
}
