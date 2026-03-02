"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart, CartesianGrid } from "recharts"
import { ArrowUpRight, TrendingUp, DollarSign, Users, MousePointerClick } from "lucide-react"
import { cn } from "@/lib/utils"

// Helper to generate random data for "live" feel
const generateWeeklyData = () => {
    const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"]
    return days.map(day => ({
        name: day,
        clicks: Math.floor(Math.random() * 5000) + 2000,
        sales: Math.floor(Math.random() * 50) + 10,
    }))
}

const generateSalesData = () => {
    return [
        { name: "Kızılcık Şerbeti", sales: Math.floor(Math.random() * 150000) + 50000 },
        { name: "Yalı Çapkını", sales: Math.floor(Math.random() * 120000) + 40000 },
        { name: "Bahar", sales: Math.floor(Math.random() * 100000) + 30000 },
        { name: "İnci Taneleri", sales: Math.floor(Math.random() * 80000) + 20000 },
        { name: "Sandık Kokusu", sales: Math.floor(Math.random() * 60000) + 10000 },
    ].sort((a, b) => b.sales - a.sales)
}

const topProducts = [
    { name: "Vakko Eşarp", revenue: "₺245.000", show: "Kızılcık Şerbeti" },
    { name: "Zara Gömlek", revenue: "₺128.400", show: "Bahar" },
    { name: "Beymen Ceket", revenue: "₺98.200", show: "Yalı Çapkını" },
    { name: "Mango Pantolon", revenue: "₺76.500", show: "Sandık Kokusu" },
    { name: "Nike Air Jordan", revenue: "₺54.000", show: "Kızılcık Şerbeti" },
]

const topActors = [
    { name: "Doğa (Sıla T.)", engagement: "98%", show: "Kızılcık Şerbeti" },
    { name: "Seyran (Afra S.)", engagement: "95%", show: "Yalı Çapkını" },
    { name: "Bahar (Demet E.)", engagement: "92%", show: "Bahar" },
    { name: "Dilber (Hazar E.)", engagement: "88%", show: "İnci Taneleri" },
    { name: "Fatih (Doğukan G.)", engagement: "85%", show: "Kızılcık Şerbeti" },
]

export default function AnalyticsPage() {
    const [weeklyData, setWeeklyData] = useState<any[]>([])
    const [salesData, setSalesData] = useState<any[]>([])

    useEffect(() => {
        // Initial fetch
        setWeeklyData(generateWeeklyData())
        setSalesData(generateSalesData())

        // Simulate live updates every 5 seconds? Maybe too distracting.
        // Let's just set on mount for now as per "app starts" requirement.
    }, [])

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Analizler</h2>
                    <p className="text-muted-foreground mt-1">Platform performans metrikleri ve satış raporları.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-surface px-3 py-1 rounded-full border border-border">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Canlı Veri Akışı
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Clicks (Area Chart) */}
                <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                                <MousePointerClick className="h-5 w-5 text-primary" />
                                Haftalık Tıklama
                            </h3>
                            <p className="text-sm text-muted-foreground">Son 7 günlük ürün detay görüntülemeleri.</p>
                        </div>
                        <div className="text-2xl font-bold text-foreground">
                            {weeklyData.reduce((acc, curr) => acc + curr.clicks, 0).toLocaleString()}
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weeklyData}>
                                <defs>
                                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#E50914" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                                    itemStyle={{ color: '#E50914' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="clicks"
                                    stroke="#E50914"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorClicks)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sales by Show (Bar Chart) */}
                <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-secondary" />
                                En Çok Satan Diziler
                            </h3>
                            <p className="text-sm text-muted-foreground">Yönlendirilen toplam satış hacmi.</p>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={true} vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    stroke="#888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    width={100}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                                />
                                <Bar dataKey="sales" fill="#D4AF37" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Top Lists Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Products */}
                <div className="rounded-xl border border-border bg-surface overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-border bg-muted/20 flex justify-between items-center">
                        <h3 className="font-medium text-foreground flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            En Çok Kazandıran 5 Ürün
                        </h3>
                        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">Tümünü Gör</Button>
                    </div>
                    <div className="p-4 space-y-4">
                        {topProducts.map((item, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-hover text-xs font-bold text-muted-foreground border border-border">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.show}</p>
                                    </div>
                                </div>
                                <div className="text-sm font-bold text-primary group-hover:scale-105 transition-transform">
                                    {item.revenue}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Actors */}
                <div className="rounded-xl border border-border bg-surface overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-border bg-muted/20 flex justify-between items-center">
                        <h3 className="font-medium text-foreground flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            En Popüler 5 Oyuncu
                        </h3>
                        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">Tümünü Gör</Button>
                    </div>
                    <div className="p-4 space-y-4">
                        {topActors.map((item, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-hover text-xs font-bold text-muted-foreground border border-border">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.show}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="h-1.5 w-16 bg-surface-hover rounded-full overflow-hidden">
                                        <div className="h-full bg-secondary" style={{ width: item.engagement }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-secondary">{item.engagement}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Button({ variant, size, className, children }: any) {
    return <button className={cn("px-3 py-1 rounded hover:bg-white/5 transition-colors", className)}>{children}</button>
}
