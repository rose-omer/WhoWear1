"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
    { name: "Pzt", total: 2400 },
    { name: "Sal", total: 1398 },
    { name: "Çar", total: 9800 },
    { name: "Per", total: 3908 },
    { name: "Cum", total: 4800 },
    { name: "Cmt", total: 3800 },
    { name: "Paz", total: 4300 },
]

export function OverviewChart() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                    dx={-10}
                />
                <Tooltip
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                    itemStyle={{ color: '#E50914' }}
                    cursor={{ stroke: '#27272a', strokeWidth: 2 }}
                />
                <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#E50914"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#E50914", strokeWidth: 0 }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
