"use client"

import { useState } from "react"
import { AlertCircle, Plus, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// Mock Relations
const shows = [
    { id: "Kızılcık Şerbeti", name: "Kızılcık Şerbeti" },
    { id: "Bahar", name: "Bahar" },
    { id: "Yalı Çapkını", name: "Yalı Çapkını" },
    { id: "İnci Taneleri", name: "İnci Taneleri" },
    { id: "Sandık Kokusu", name: "Sandık Kokusu" }
]

const actorsByShow: Record<string, string[]> = {
    "Kızılcık Şerbeti": ["Doğa (Sıla T.)", "Fatih (Doğukan G.)", "Kıvılcım (Evrim A.)", "Ömer (Barış K.)", "Pembe (Sibel T.)"],
    "Bahar": ["Bahar (Demet E.)", "Timur (Mehmet Y.)", "Evren (Buğra G.)", "Rengin (Ecem Ö.)"],
    "Yalı Çapkını": ["Seyran (Afra S.)", "Ferit (Mert R.)", "Halis Ağa (Çetin T.)", "Suna (Beril P.)"],
    "İnci Taneleri": ["Azem (Yılmaz E.)", "Dilber (Hazar E.)", "Piraye (Selma E.)"],
    "Sandık Kokusu": ["Karsu (Özge Ö.)", "Filiz (Demet A.)", "Atilla (Metin A.)"]
}

interface ProductFormProps {
    onProductAdded: (product: any) => void
}

export function ProductForm({ onProductAdded }: ProductFormProps) {
    const { toast } = useToast()
    const [status, setStatus] = useState<"idle" | "submitting">("idle")
    const [imageError, setImageError] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        show: "",
        actor: "",
        price: "",
        image: "",
        affiliateUrl: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("submitting")

        // Validation
        if (!formData.name || !formData.show || !formData.image) {
            toast({
                variant: "destructive",
                title: "Eksik Alanlar",
                description: "Ürün adı, Dizi ve Görsel alanları zorunludur."
            })
            setStatus("idle")
            return
        }

        // Simulate API call / Processing
        setTimeout(() => {
            const newProduct = {
                id: crypto.randomUUID(), // Unique ID
                ...formData,
                status: "Taslak", // Default
                createdAt: new Date().toISOString()
            }

            onProductAdded(newProduct)

            // Success Toast
            toast({
                title: "Ürün Başarıyla Eklendi",
                description: "Envanter güncellendi.",
                action: <CheckCircle2 className="h-5 w-5 text-green-500" />
            })

            // Reset Form
            setFormData({ name: "", show: "", actor: "", price: "", image: "", affiliateUrl: "" })
            setImageError(false)
            setStatus("idle")
        }, 500)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Basic Info */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="product-name">Ürün Adı <span className="text-destructive">*</span></Label>
                        <Input
                            id="product-name"
                            placeholder="Örn: Vakko İpek Eşarp"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Dizi <span className="text-destructive">*</span></Label>
                            <Select
                                value={formData.show}
                                onValueChange={(val) => setFormData({ ...formData, show: val, actor: "" })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seçiniz" />
                                </SelectTrigger>
                                <SelectContent>
                                    {shows.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Oyuncu</Label>
                            <Select
                                value={formData.actor}
                                onValueChange={(val) => setFormData({ ...formData, actor: val })}
                                disabled={!formData.show}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={formData.show ? "Seçiniz" : "Önce Dizi"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {formData.show && actorsByShow[formData.show]?.map(a => (
                                        <SelectItem key={a} value={a}>{a}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Fiyat</Label>
                        <Input
                            placeholder="Örn: ₺3.250"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>
                </div>

                {/* Right Column: Visuals & Links */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Görsel URL <span className="text-destructive">*</span></Label>
                        <Input
                            placeholder="https://..."
                            value={formData.image}
                            onChange={(e) => {
                                setFormData({ ...formData, image: e.target.value })
                                setImageError(false)
                            }}
                        />
                        {/* Visual Preview */}
                        <div className="relative mt-2 h-40 w-full rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted/50 flex items-center justify-center overflow-hidden">
                            {formData.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className={cn("h-full w-full object-contain transition-opacity duration-300", imageError ? "opacity-0" : "opacity-100")}
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <span className="text-xs text-muted-foreground">Önizleme alanı</span>
                            )}

                            {imageError && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 text-destructive p-4 text-center">
                                    <AlertCircle className="h-6 w-6 mb-2" />
                                    <span className="text-xs font-semibold">Görsel yüklenemedi. Lütfen URL'i kontrol edin.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
                <Button type="submit" disabled={status === "submitting" || !!imageError || !formData.name}>
                    {status === "submitting" ? "Kaydediliyor..." : "Ürünü Kaydet"}
                </Button>
            </div>
        </form>
    )
}
