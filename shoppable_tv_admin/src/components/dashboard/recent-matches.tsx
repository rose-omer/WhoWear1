import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const matches = [
    {
        show: "Kızılcık Şerbeti",
        actor: "Doğa (Sıla T.)",
        product: "Vakko İpek Eşarp",
        status: "Active",
        date: "2 dk önce",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        show: "Bahar",
        actor: "Bahar (Demet E.)",
        product: "Zara Keten Gömlek",
        status: "Active",
        date: "15 dk önce",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        show: "Yalı Çapkını",
        actor: "Ferit (Mert R.)",
        product: "Beymen Club Ceket",
        status: "Review",
        date: "1 saat önce",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        show: "İnci Taneleri",
        actor: "Dilber (Hazar E.)",
        product: "Pull & Bear Elbise",
        status: "Active",
        date: "3 saat önce",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
];

export function RecentMatchesTable() {
    return (
        <div className="w-full">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-surface/50 border-b border-border">
                    <tr>
                        <th className="px-6 py-3 font-medium">Dizi & Oyuncu</th>
                        <th className="px-6 py-3 font-medium">Ürün</th>
                        <th className="px-6 py-3 font-medium">Durum</th>
                        <th className="px-6 py-3 font-medium text-right">İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match, index) => (
                        <tr key={index} className="bg-surface border-b border-border hover:bg-surface-hover transition-colors">
                            <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-zinc-800 overflow-hidden">
                                    {/* Placeholder image logic needed if using Next/Image, strict img for mock */}
                                    <img src={match.image} alt={match.actor} className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-foreground">{match.show}</div>
                                    <div className="text-xs text-muted-foreground">{match.actor}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">
                                {match.product}
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={cn(
                                        "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                        match.status === "Active"
                                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                            : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                    )}
                                >
                                    {match.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-muted-foreground hover:text-foreground">
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
