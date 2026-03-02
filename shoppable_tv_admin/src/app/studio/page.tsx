"use client"

import { useState } from "react"
import { Check, Info, LayoutTemplate, Shirt, User, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const shows = [
    { id: "s1", name: "Kızılcık Şerbeti" },
    { id: "s2", name: "Yalı Çapkını" },
    { id: "s3", name: "Bahar" },
]

const actors = [
    { id: "a1", name: "Doğa (Sıla T.)" },
    { id: "a2", name: "Fatih (Doğukan G.)" },
    { id: "a3", name: "Kıvılcım (Evrim A.)" },
    { id: "a4", name: "Seyran (Afra S.)" },
]

const products = [
    { id: "p1", name: "Vakko İpek Eşarp" },
    { id: "p2", name: "Zara Keten Gömlek" },
    { id: "p3", name: "Beymen Club Ceket" },
    { id: "p4", name: "Mango Pantolon" },
    { id: "p5", name: "Nike Air Jordan" },
]

// Mock Active Matches
const initialMatches = [
    { id: 101, actor: "Doğa (Sıla T.)", product: "Vakko İpek Eşarp", time: "2 dk önce" },
]

export default function StudioPage() {
    const { toast } = useToast()

    const [selectedShow, setSelectedShow] = useState<string>("")
    const [selectedActor, setSelectedActor] = useState<string>("")
    const [selectedProduct, setSelectedProduct] = useState<string>("")

    const [matches, setMatches] = useState(initialMatches)

    const handleMatch = () => {
        if (!selectedShow || !selectedActor || !selectedProduct) {
            toast({
                variant: "destructive",
                title: "Eksik Seçim",
                description: "Lütfen Dizi, Oyuncu ve Ürün seçimlerini tamamlayın.",
            })
            return
        }

        const actorName = actors.find(a => a.id === selectedActor)?.name
        const productName = products.find(p => p.id === selectedProduct)?.name

        const newMatch = {
            id: Date.now(),
            actor: actorName!,
            product: productName!,
            time: "Şimdi"
        }

        setMatches([newMatch, ...matches])

        // Reset selection partially or keep for speed? Let's keep show, reset others for flow.
        setSelectedProduct("")
        // setSelectedActor("") // Keeps actor if mapping multiple items for same actor

        toast({
            title: "Eşleşme Başarılı! 🎉",
            description: `${actorName} ile ${productName} bağlandı.`,
            action: <Check className="h-5 w-5 text-green-500" />,
        })
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <LayoutTemplate className="h-8 w-8 text-primary" />
                        Eşleştirme Stüdyosu
                    </h2>
                    <p className="text-muted-foreground mt-1">Sahneleri analiz et ve ürünleri anında bağla.</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 h-full">
                {/* Left Column: Show Selection & Scene Viewer (8 cols) */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
                    {/* Show Selector */}
                    <div className="w-64">
                        <Select value={selectedShow} onValueChange={setSelectedShow}>
                            <SelectTrigger className="bg-surface border-border">
                                <SelectValue placeholder="Dizi Seçin..." />
                            </SelectTrigger>
                            <SelectContent>
                                {shows.map((s) => (
                                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Scene Viewer */}
                    <div className="flex-1 rounded-xl border border-border bg-surface/50 relative overflow-hidden group flex items-center justify-center">
                        {selectedShow ? (
                            <>
                                {/* Placeholder Image simulating video frame */}
                                <div className="absolute inset-0 bg-zinc-900/50 flex items-center justify-center">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {/* Random placeholder from Unsplash based on show logic (simulated) */}
                                    <img
                                        src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1200"
                                        alt="Scene Frame"
                                        className="w-full h-full object-cover opacity-80"
                                    />

                                    {/* Overlay Controls */}
                                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                        <div className="space-y-1">
                                            <div className="text-xs font-mono text-white/70 bg-black/50 px-2 py-1 rounded">TIMECODE: 00:14:23:05</div>
                                            <h3 className="text-xl font-bold text-white drop-shadow-md">S14 / BÖLÜM 45</h3>
                                        </div>
                                        <Button variant="outline" className="bg-black/50 border-white/20 text-white hover:bg-white/10 backdrop-blur-md">
                                            Kare Yakala
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center space-y-3 p-10">
                                <div className="h-20 w-20 rounded-full bg-surface-hover mx-auto flex items-center justify-center mb-4">
                                    <Film className="h-10 w-10 text-muted-foreground/50" />
                                </div>
                                <h3 className="text-lg font-medium text-muted-foreground">Bir Dizi Seçin</h3>
                                <p className="text-sm text-muted-foreground/50 max-w-sm mx-auto">
                                    Eşleştirme yapmak için sol üstteki menüden çalışmak istediğiniz yapımı seçin.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Mapping Tools (4 cols) */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm flex flex-col gap-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Eşleştirme Aracı</h3>

                            {/* Actor Select */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Oyuncu</label>
                                <Select value={selectedActor} onValueChange={setSelectedActor}>
                                    <SelectTrigger className="h-12 bg-background border-border">
                                        <SelectValue placeholder="Kimi etiketliyorsun?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {actors.map((a) => (
                                            <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Product Select */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Ürün</label>
                                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                                    <SelectTrigger className="h-12 bg-background border-border">
                                        <SelectValue placeholder="Hangi ürünü giyiyor?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {products.map((p) => (
                                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                size="lg"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2 font-bold text-md"
                                onClick={handleMatch}
                                disabled={!selectedShow}
                            >
                                EŞLEŞTİR VE KAYDET
                            </Button>
                        </div>
                    </div>

                    {/* Active Matches Feed */}
                    <div className="flex-1 rounded-xl border border-border bg-surface overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-border bg-muted/20">
                            <h3 className="text-sm font-medium">Aktif Eşleşmeler</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {matches.map((match) => (
                                <div key={match.id} className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border/50 animate-in slide-in-from-right-5 hover:border-primary/30 transition-colors group cursor-pointer">
                                    <div className="h-10 w-10 rounded-full bg-surface-hover flex items-center justify-center shrink-0 border border-border">
                                        <Shirt className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">{match.product}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <User className="h-3 w-3 text-muted-foreground" />
                                            <p className="text-xs text-muted-foreground truncate">{match.actor}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{match.time}</span>
                                </div>
                            ))}
                            {matches.length === 0 && (
                                <div className="text-center py-10 text-muted-foreground text-sm">
                                    Henüz eşleşme yok.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
