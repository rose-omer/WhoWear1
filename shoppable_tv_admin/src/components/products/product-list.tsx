"use client"

import { Pencil, Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface Product {
    id: string | number
    name: string
    show: string
    actor?: string
    image: string
    price?: string
    status: string
    affiliateUrl?: string
}

interface ProductListProps {
    products: Product[]
    onDelete: (id: string | number) => void
    onToggleStatus: (id: string | number) => void
}

export function ProductList({ products, onDelete, onToggleStatus }: ProductListProps) {
    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-border bg-muted/20">
                        <TableHead className="w-[80px] text-muted-foreground">Görsel</TableHead>
                        <TableHead className="text-muted-foreground">Ürün Bilgisi</TableHead>
                        <TableHead className="text-muted-foreground">İlişkiler</TableHead>
                        <TableHead className="text-muted-foreground">Fiyat</TableHead>
                        <TableHead className="text-muted-foreground">Durum</TableHead>
                        <TableHead className="text-right text-muted-foreground">İşlemler</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                            <TableCell className="font-medium">
                                <div className="h-12 w-12 rounded-lg bg-white p-1 overflow-hidden relative border border-border">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-foreground">{product.name}</span>
                                    <a href={product.affiliateUrl || "#"} className="text-xs text-primary hover:underline flex items-center gap-1 mt-0.5">
                                        Linke Git <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <span className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary ring-1 ring-inset ring-secondary/20 w-fit">
                                        {product.show}
                                    </span>
                                    {product.actor && (
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                                            {product.actor}
                                        </span>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="text-foreground font-medium">{product.price}</TableCell>
                            <TableCell>
                                <div
                                    onClick={() => onToggleStatus(product.id)}
                                    className={cn(
                                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer select-none transition-all active:scale-95 border",
                                        product.status === "Yayında"
                                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
                                            : "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20"
                                    )}
                                >
                                    <span className={cn("h-1.5 w-1.5 rounded-full", product.status === "Yayında" ? "bg-emerald-500" : "bg-amber-500")}></span>
                                    {product.status}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                                        onClick={() => onDelete(product.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {products.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                Henüz ürün eklenmemiş. Yukarıdaki formu kullanarak ilk ürünü ekleyin.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
