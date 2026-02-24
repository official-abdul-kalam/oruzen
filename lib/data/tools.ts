export interface Tool {
    id: string;
    name: string;
    description: string;
    icon: string;
    href: string;
    badge?: string;
}

export const toolsData: Tool[] = [
    {
        id: "image-compressor",
        name: "Image Compressor",
        description: "Compress images without losing quality",
        icon: "Image",
        href: "/tools/image-compressor",
        badge: "Hot"
    },
    {
        id: "mockup-editor",
        name: "Mockup Editor",
        description: "Create stunning 2D mockups instantly",
        icon: "MonitorPlay",
        href: "/tools/mockup-editor"
    },
    {
        id: "video-editor",
        name: "Video Editor",
        description: "Edit videos directly in your browser",
        icon: "Video",
        href: "/tools/video-editor",
        badge: "Beta"
    },
    {
        id: "terabox-downloader",
        name: "TeraBox Downloader",
        description: "Download from TeraBox quickly",
        icon: "Download",
        href: "/tools/terabox-downloader"
    },
    {
        id: "prompt-ocean",
        name: "Prompt Ocean",
        description: "Discover the best AI prompts",
        icon: "Waves",
        href: "/tools/prompt-ocean"
    }
];
