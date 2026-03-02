"use client"

import { useState } from "react"
import { Plus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useLocalStorage } from "@/hooks/use-local-storage"

// Mock Initial Data (Real Landscape Images 1920x1080)
const initialShows = [
    {
        id: 1,
        name: "Kızılcık Şerbeti",
        image: "https://im.showtv.com.tr/2025/09/03/ver1756923814/3819734_1920x1080.jpg",
        description: "İki farklı kültürdeki ailenin çocuklarının evliliği.",
        status: "Yayında"
    },
    {
        id: 2,
        name: "Yalı Çapkını",
        image: "https://image.tmdb.org/t/p/original/aBzchfhuZj8JSp3ZGyynoe8hNgu.jpg",
        description: "Gaziantep'ten İstanbul'a uzanan bir aşk hikayesi.",
        status: "Yayında"
    },
    {
        id: 3,
        name: "Bahar",
        image: "https://mo.ciner.com.tr/showtv/iu/1258x630/bahar.jpg?v=1768983188",
        description: "Hayata tutunmaya çalışan bir kadının hikayesi.",
        status: "Yayında"
    },
    {
        id: 4,
        name: "İnci Taneleri",
        image: "https://tr.web.img4.acsta.net/r_654_368/img/c4/08/c40836dc1cd1f9d073d91d73c182951c.png",
        description: "Yıllar sonra cezaevinden çıkan Azem'in hikayesi.",
        status: "Yayında"
    },
    {
        id: 5,
        name: "Sandık Kokusu",
        image: "https://mo.ciner.com.tr/showtv/iu/1920x1080_5/sandik-kokusu.jpg?v=1768983242",
        description: "Anne-kız çatışması ve geçmişin sırları.",
        status: "Yayında"
    }
]

export default function ShowsPage() {
    // FORCE REFRESH: Changed key to v3 (User updated URLs)
    const [shows, setShows] = useLocalStorage("shows-storage-v3", initialShows)
    const [open, setOpen] = useState(false)

    // Form State
    const [newShow, setNewShow] = useState({ name: "", image: "", description: "" })

    const handleAddShow = () => {
        if (!newShow.name) return // Basic validation

        setShows([
            ...shows,
            {
                id: shows.length + 1,
                ...newShow,
                status: "Taslak" // Default status
            }
        ])
        setNewShow({ name: "", image: "", description: "" })
        setOpen(false)
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Diziler</h2>
                    <p className="text-muted-foreground mt-1">Platformdaki aktif dizileri yönetin.</p>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Plus className="mr-2 h-4 w-4" /> Yeni Dizi Ekle
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-surface border-border">
                        <DialogHeader>
                            <DialogTitle>Yeni Dizi Ekle</DialogTitle>
                            <DialogDescription>
                                Dizi detaylarını girin. Kaydettikten sonra listeye eklenecektir.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Dizi Adı
                                </Label>
                                <Input
                                    id="name"
                                    value={newShow.name}
                                    onChange={(e) => setNewShow({ ...newShow, name: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="image" className="text-right">
                                    Poster URL
                                </Label>
                                <Input
                                    id="image"
                                    value={newShow.image}
                                    onChange={(e) => setNewShow({ ...newShow, image: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>

                            {/* Image Preview */}
                            {newShow.image && (
                                <div className="col-span-4 flex justify-center">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={newShow.image}
                                        alt="Preview"
                                        className="h-32 w-auto rounded-md object-contain border border-border"
                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="desc" className="text-right">
                                    Açıklama
                                </Label>
                                <Input
                                    id="desc"
                                    value={newShow.description}
                                    onChange={(e) => setNewShow({ ...newShow, description: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddShow}>Kaydet</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border border-border bg-surface overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-b border-border">
                            <TableHead className="w-[120px] text-muted-foreground">Görsel</TableHead>
                            <TableHead className="text-muted-foreground">Dizi Adı</TableHead>
                            <TableHead className="text-muted-foreground">Açıklama</TableHead>
                            <TableHead className="text-muted-foreground">Durum</TableHead>
                            <TableHead className="text-right text-muted-foreground">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {shows.map((show) => (
                            <TableRow key={show.id} className="border-b border-border hover:bg-surface-hover/50">
                                <TableCell className="font-medium">
                                    <div className="h-16 w-28 rounded bg-muted overflow-hidden relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={show.image || "https://placehold.co/100x150?text=No+Img"}
                                            alt={show.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="font-semibold text-foreground">{show.name}</TableCell>
                                <TableCell className="text-muted-foreground max-w-xs truncate">{show.description}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                                        {show.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
