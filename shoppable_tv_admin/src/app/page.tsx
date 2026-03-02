import { StatCard } from "@/components/dashboard/stat-card";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentMatchesTable } from "@/components/dashboard/recent-matches";
import { Activity, CreditCard, Film, Users } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Platform performansını ve satış verilerini izleyin.</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
            Rapor İndir
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Toplam Tıklama"
          value="45,231"
          icon={Activity}
          trend="+20.1% geçen aydan"
          trendUp={true}
        />
        <StatCard
          title="Aktif Diziler"
          value="12"
          icon={Film}
          trend="+2 yeni"
          trendUp={true}
          className="border-l-4 border-l-secondary/50" // Luxury touch
        />
        <StatCard
          title="Yönlendirilen Satışlar"
          value="₺124,500"
          icon={CreditCard}
          trend="+15%"
          trendUp={true}
        />
        <StatCard
          title="En Popüler Oyuncu"
          value="Doğa (Sıla T.)"
          icon={Users}
          trend="🔥 Trending"
          trendUp={true}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart Column (4/7) */}
        <div className="col-span-4 rounded-xl border border-border bg-surface shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-medium text-foreground">Haftalık Etkileşim</h3>
            <p className="text-sm text-muted-foreground">Kullanıcıların ürün tıklama ve görüntüleme oranları.</p>
          </div>
          <div className="pl-2 pr-6 pb-6">
            <OverviewChart />
          </div>
        </div>

        {/* Table Column (3/7) */}
        <div className="col-span-3 rounded-xl border border-border bg-surface shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border bg-surface">
            <h3 className="text-lg font-medium text-foreground">Son Eşleşmeler</h3>
            <p className="text-sm text-muted-foreground">Yapay zeka tarafından tespit edilen sahneler.</p>
          </div>
          <div className="flex-1 overflow-auto">
            <RecentMatchesTable />
          </div>
        </div>
      </div>
    </div>
  );
}
