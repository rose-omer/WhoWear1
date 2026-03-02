"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { ProductForm } from "@/components/products/product-form"
import { ProductList } from "@/components/products/product-list"
import { ExportDialog } from "@/components/products/export-dialog"

// Mock Initial Data (Real Images & Links v2)
const initialProducts = [
    {
        id: "1",
        name: "Mavi Çiçekli Etek",
        show: "Kızılcık Şerbeti",
        actor: "Doğa (Sıla T.)",
        image: "https://ktnimg2.mncdn.com/products/2023/07/21/2751045/6b045115-7d51-4f7d-812b-6af09d497fd9.jpg",
        affiliateUrl: "https://www.mavi.com/cicekli-etek",
        price: "₺899",
        status: "Yayında"
    },
    {
        id: "2",
        name: "Vakko Eşarp",
        show: "Kızılcık Şerbeti",
        actor: "Doğa (Sıla T.)",
        image: "https://cdn.vakko.com/mnresize/534/800/8683822294752-02.jpg?v=1751402105076",
        affiliateUrl: "https://www.vakko.com/esarp",
        price: "₺4.250",
        status: "Yayında"
    },
    {
        id: "3",
        name: "Zara Puantiyeli Elbise",
        show: "Yalı Çapkını",
        actor: "Seyran (Afra S.)",
        image: "https://static.zara.net/assets/public/b46e/ad5b/f90b4552a04a/5885ebcdcea2/04661309070-p/04661309070-p.jpg?ts=1769098886414&w=792&f=auto",
        affiliateUrl: "https://www.zara.com/tr/tr/puantiyeli-elbise-p09006066.html",
        price: "₺1.890",
        status: "Yayında"
    },
    {
        id: "4",
        name: "İpekyol Kırmızı Ceket",
        show: "Bahar",
        actor: "Bahar (Demet E.)",
        image: "https://cdn.dsmcdn.com/ty1336/product/media/images/prod/SPM/PIM/20240502/10/7b432924-4f27-3164-839e-473d7494f6c4/1_org_zoom.jpg",
        affiliateUrl: "https://www.ipekyol.com.tr/ceket",
        price: "₺5.600",
        status: "Yayında"
    },
    {
        id: "5",
        name: "Dilber Dans Elbisesi",
        show: "İnci Taneleri",
        actor: "Dilber (Hazar E.)",
        image: "https://imgrosetta.mynet.com.tr/file/18302128/18302128-1200xauto.jpg",
        affiliateUrl: "https://www.trendyol.com/dilber-elbisesi",
        price: "₺950",
        status: "Yayında"
    }
]

export default function ProductsPage() {
    const { toast } = useToast()

    // Persistent State (KEY CHANGED TO v4)
    const [products, setProducts] = useLocalStorage("products-storage-v5", initialProducts)
    const [searchQuery, setSearchQuery] = useState("")
    const [open, setOpen] = useState(false)

    // Handlers
    const handleProductAdded = (newProduct: any) => {
        setProducts([newProduct, ...products])
        setOpen(false)
    }

    const handleDelete = (id: string | number) => {
        if (confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
            setProducts(products.filter((p: any) => p.id !== id))
            toast({ title: "Silindi", description: "Ürün başarıyla kaldırıldı." })
        }
    }

    const handleToggleStatus = (id: string | number) => {
        setProducts(products.map((p: any) => {
            if (p.id === id) {
                const newStatus = p.status === "Yayında" ? "Taslak" : "Yayında"
                toast({
                    title: "Durum Değişti",
                    description: `Yeni durum: ${newStatus}`,
                    duration: 2000
                })
                return { ...p, status: newStatus }
            }
            return p
        }))
    }

    // Filter Logic
    const filteredProducts = products.filter((p: any) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.show.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Ürünler</h2>
                    <p className="text-muted-foreground mt-1">Dizi sahneleriyle eşleşen ürünleri yönetin.</p>
                </div>

                <div className="flex items-center gap-2">
                    <ExportDialog />
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                                <Plus className="mr-2 h-4 w-4" /> Yeni Ürün Ekle
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px] bg-background border-border overflow-y-auto max-h-[90vh]">
                            <DialogHeader>
                                <DialogTitle>Yeni Ürün Ekle</DialogTitle>
                                <DialogDescription>Ürün bilgilerini girin ve kaydedin.</DialogDescription>
                            </DialogHeader>
                            <div className="py-2">
                                <ProductForm onProductAdded={handleProductAdded} />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-lg border border-border">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Ürün veya dizi ara..."
                        className="pl-8 bg-background border-border"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="text-sm text-muted-foreground">
                    Toplam <strong>{filteredProducts.length}</strong> ürün
                </div>
            </div>

            {/* Product List Component */}
            <ProductList
                products={filteredProducts}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
            />
        </div>
    )
}
