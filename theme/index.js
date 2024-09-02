const pallete = [
    {
        // orange
        text: '#f97316',
        bgColor: opacity=> `rgba(251, 146, 60, ${opacity})`,
    },
    {
        // red
        text: '#ef4444',
        bgColor: opacity=> `rgba(239, 68, 68, ${opacity})`,
    },
    {
        // yellow
        text: '#eab308',
        bgColor: opacity=> `rgba(234, 179, 8, ${opacity})`,
    },
    {
        // green
        text: '#22c55e',
        bgColor: opacity=> `rgba(34, 197, 94, ${opacity})`,
    },
    {
        // blue
        text: '#3b82f6',
        bgColor: opacity=> `rgba(59, 130, 246, ${opacity})`,
    },
    {
        // indigo
        text: '#6366f1',
        bgColor: opacity=> `rgba(99, 102, 241, ${opacity})`,
    },
    {
        // purple
        text: '#a855f7',
        bgColor: opacity=> `rgba(168, 85, 247, ${opacity})`,
    },
    {
        // pink
        text: '#ec4899',
        bgColor: opacity=> `rgba(236, 72, 153, ${opacity})`,
    },
    {
        // neutral
        text: '#94a3b8',
        bgColor: opacity=> `rgba(148, 163, 184, ${opacity})`,
    },
]

export const themeColors ={
    ...pallete[1]
}