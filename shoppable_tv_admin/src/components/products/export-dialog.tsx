"use client"

import { useState, useEffect } from "react"
import { Copy, Check, Download, FileJson } from "lucide-react"
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

export function ExportDialog() {
    const { toast } = useToast()
    const [jsonOutput, setJsonOutput] = useState("")
    const [copied, setCopied] = useState(false)

    // Generate JSON on mount (or when dialog opens)
    const generateData = () => {
        if (typeof window === "undefined") return

        try {
            // 1. Read Raw Data
            const showsRaw = JSON.parse(window.localStorage.getItem("shows-storage") || "[]")
            const productsRaw = JSON.parse(window.localStorage.getItem("products-storage") || "[]")

            // 2. Map Shows
            const shows = showsRaw.map((s: any) => ({
                id: `show_${s.id}`,
                name: s.name,
                posterUrl: s.image,
                description: s.description || ""
            }))

            // 3. Generate Dummy Episodes (One per show for simplicity)
            const episodes = shows.map((s: any) => ({
                id: `ep_${s.id}_01`,
                showId: s.id,
                episodeNumber: 1,
                title: "Sezon Finali",
                airDate: new Date().toISOString().split('T')[0],
                sceneImageUrl: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=640"
            }))

            // 4. Generate Outfits & Products
            // Group products by (Show + Actor) to create Outfits
            const outfitsMap = new Map()
            const products = []

            productsRaw.forEach((p: any) => {
                // Try to find matching show ID by name or ID
                const showStr = p.show
                const matchingShow = shows.find((s: any) => s.name === showStr || s.id === `show_${showStr}`)
                const showId = matchingShow ? matchingShow.id : `show_unknown`
                const episodeId = `ep_${showId}_01` // Link to our dummy episode

                const actorName = p.actor || "Pelin (Buçe B. K.)" // Fallback
                const outfitKey = `${episodeId}_${actorName}`

                if (!outfitsMap.has(outfitKey)) {
                    outfitsMap.set(outfitKey, {
                        id: `outfit_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
                        episodeId: episodeId,
                        actorName: actorName,
                        actorImageUrl: "https://randomuser.me/api/portraits/women/44.jpg", // Mock
                        sceneTimestamp: "12:45"
                    })
                }
                const outfit = outfitsMap.get(outfitKey)

                // Process Price
                const priceStr = p.price?.replace(/[^0-9,.]/g, '').replace(',', '.') || "0"
                const price = parseFloat(priceStr)

                products.push({
                    id: `prod_${p.id}`,
                    outfitId: outfit.id,
                    productName: p.name,
                    brand: "Unknown", // Admin doesn't have brand yet
                    price: price,
                    currency: "TRY",
                    productImageUrl: p.image,
                    affiliateUrl: p.affiliateUrl || "#"
                })
            })

            const outfits = Array.from(outfitsMap.values())

            // 5. Final Structure
            const exportData = {
                shows,
                episodes,
                outfits,
                products
            }

            setJsonOutput(JSON.stringify(exportData, null, 2))

        } catch (e) {
            console.error("Export Error:", e)
            setJsonOutput(JSON.stringify({ error: "Veri oluşturulurken hata oluştu." }))
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonOutput)
        setCopied(true)
        toast({ title: "Kopyalandı", description: "JSON verisi panoya kopyalandı." })
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Dialog onOpenChange={(open) => { if (open) generateData() }}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-dashed">
                    <FileJson className="h-4 w-4" />
                    JSON Çıktısı Al
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] bg-background">
                <DialogHeader>
                    <DialogTitle>Veri Senkronizasyon (Flutter Export)</DialogTitle>
                    <DialogDescription>
                        Aşağıdaki JSON verisini kopyalayıp mobil projendeki <code>mock_data.json</code> dosyasına yapıştırabilirsin.
                    </DialogDescription>
                </DialogHeader>

                <div className="relative mt-4 rounded-md bg-muted p-4">
                    <div className="absolute right-4 top-4">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 hover:bg-background/50"
                            onClick={handleCopy}
                        >
                            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                    <pre className="h-[400px] w-full overflow-auto rounded text-xs font-mono text-foreground/80 scrollbar-thin scrollbar-thumb-border">
                        {jsonOutput}
                    </pre>
                </div>
            </DialogContent>
        </Dialog>
    )
}
