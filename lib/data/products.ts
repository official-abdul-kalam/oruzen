export type ProductCategory = 'software' | 'apps' | 'open-source';

export interface Product {
    id: string;
    name: string;
    tagline: string;
    description: string;
    category: ProductCategory;
    icon: string; // URL or Lucide icon name
    downloads: string;
    version: string;
    updatedAt: string;
    developer: string;
    price: 'Free' | 'Freemium' | 'Paid' | 'Open Source';
    platforms: string[];
    features: string[];
    screenshots: string[]; // Placeholders
    tags: string[];
    // Specific to specific categories
    githubUrl?: string;
    stars?: string;
    license?: string;
}

export const productsData: Product[] = [
    // --- SOFTWARE (10 Items) ---
    {
        id: "horizon-editor",
        name: "Horizon Video Editor",
        tagline: "Professional video editing made simple.",
        description: "A powerful, intuitive video editor designed for creators. Features multi-track timeline, 4K export, advanced color grading, and a massive library of built-in effects and transitions. Horizon brings studio-quality editing to your desktop without the steep learning curve.",
        category: "software",
        icon: "Video",
        downloads: "2.4M+",
        version: "2026.1.4",
        updatedAt: "Oct 15, 2026",
        developer: "Oruzen Studio",
        price: "Freemium",
        platforms: ["Windows", "macOS"],
        features: ["4K & 8K editing support", "AI-powered background removal", "Multi-cam editing", "Advanced audio mixing", "Cloud project sync"],
        screenshots: [
            "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1574717024453-354056fadbe1?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Video Editing", "Creative", "Media"]
    },
    {
        id: "neutron-code",
        name: "Neutron IDE",
        tagline: "The fastest code editor for modern web development.",
        description: "Built from the ground up for speed. Neutron IDE provides smart code completion, integrated terminal, built-in Git management, and live collaboration. It's so light it feels like a text editor, but powerful enough to replace your bulky IDE.",
        category: "software",
        icon: "Code2",
        downloads: "5.1M+",
        version: "3.2.0",
        updatedAt: "Nov 02, 2026",
        developer: "Oruzen Studio",
        price: "Free",
        platforms: ["Windows", "macOS", "Linux"],
        features: ["Sub-second startup time", "Real-time collaboration", "Integrated Rust & TS servers", "Customizable UI themes", "Extensive plugin marketplace"],
        screenshots: [
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Development", "Coding", "Productivity"]
    },
    {
        id: "nexus-design",
        name: "Nexus Design Suite",
        tagline: "Vector graphics and prototyping combined.",
        description: "Create stunning user interfaces, illustrations, and interactive prototypes all in one app. Nexus features a massive component library, variable fonts support, and seamless handoff tools for developers.",
        category: "software",
        icon: "PenTool",
        downloads: "1.2M+",
        version: "1.5.0",
        updatedAt: "Sep 28, 2026",
        developer: "Oruzen Studio",
        price: "Paid",
        platforms: ["Windows", "macOS"],
        features: ["Interactive prototyping", "Vector networking", "Auto-layout engines", "Developer handoff mode", "Local network real-time sync"],
        screenshots: [
            "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Design", "UI/UX", "Graphics"]
    },
    {
        id: "vortex-audio",
        name: "Vortex DAW",
        tagline: "Next-generation digital audio workstation.",
        description: "Produce, mix, and master music with unparalleled workflow speed. Vortex includes over 50 native plugins, a massive sample library, and AI stem separation to remix any audio file instantly.",
        category: "software",
        icon: "Music",
        downloads: "850K+",
        version: "4.0.1",
        updatedAt: "Aug 10, 2026",
        developer: "Oruzen Studio",
        price: "Freemium",
        platforms: ["Windows", "macOS"],
        features: ["AI Stem Separation", "Unlimited audio tracks", "VST3 support", "Pitch correction built-in", "Live performance mode"],
        screenshots: [
            "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1516280440502-619f72db7e01?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Audio", "Music Production", "Mixing"]
    },
    {
        id: "aegis-shield",
        name: "Aegis Antivirus",
        tagline: "Lightweight, unbreakable security.",
        description: "Protect your PC without slowing it down. Aegis uses machine learning to detect zero-day threats, ransomware behavior, and phishing attempts before they happen.",
        category: "software",
        icon: "Shield",
        downloads: "10M+",
        version: "2027.0",
        updatedAt: "Dec 01, 2026",
        developer: "Oruzen Security",
        price: "Free",
        platforms: ["Windows"],
        features: ["Zero-day threat detection", "Ransomware protection", "Silent gaming mode", "Secure browsing extension", "File shredder"],
        screenshots: [
            "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Security", "Antivirus", "Utility"]
    },
    {
        id: "lumina-photo",
        name: "Lumina Photo Editor",
        tagline: "AI-enhanced RAW photo editing.",
        description: "Bring your photos to life. Lumina handles massive RAW files with ease, offering non-destructive editing, AI sky replacement, instant portrait retouching, and batch processing.",
        category: "software",
        icon: "Image",
        downloads: "3.2M+",
        version: "2.8.5",
        updatedAt: "Oct 22, 2026",
        developer: "Oruzen Studio",
        price: "Paid",
        platforms: ["Windows", "macOS"],
        features: ["Non-destructive RAW editing", "AI Sky Replacement", "One-click portrait retouching", "Advanced masking", "Batch export"],
        screenshots: [
            "https://images.unsplash.com/photo-1551220942-feaabafc830b?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1493112255740-4f51eeb22d3e?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Photography", "Editing", "Creative"]
    },
    {
        id: "chronos-backup",
        name: "Chronos Backup",
        tagline: "Set-and-forget system backups.",
        description: "Never lose a file again. Chronos creates incremental backups of your entire system silently in the background. Restore single files or your entire OS with one click.",
        category: "software",
        icon: "HardDrive",
        downloads: "1.8M+",
        version: "5.1.0",
        updatedAt: "Jul 15, 2026",
        developer: "Oruzen Utilities",
        price: "Free",
        platforms: ["Windows"],
        features: ["Incremental system imaging", "Cloud integration", "Ransomware-proof storage", "Bootable recovery media", "Individual file restore"],
        screenshots: [
            "https://images.unsplash.com/photo-1600267185393-e158a98703de?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Utility", "Backup", "System"]
    },
    {
        id: "zenith-browser",
        name: "Zenith Browser",
        tagline: "The modern, privacy-first web browser.",
        description: "Experience the web without trackers. Zenith blocks ads and cross-site tracking by default, features a built-in VPN, and organizes your tabs into workspaces automatically.",
        category: "software",
        icon: "Globe",
        downloads: "12M+",
        version: "110.0",
        updatedAt: "Nov 28, 2026",
        developer: "Oruzen Web",
        price: "Free",
        platforms: ["Windows", "macOS", "Linux"],
        features: ["Native ad-blocking", "Built-in VPN", "Tab workspaces", "Resource sleeping", "Chrome extension support"],
        screenshots: [
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Browser", "Internet", "Privacy"]
    },
    {
        id: "omni-convert",
        name: "OmniConverter Pro",
        tagline: "Convert any file format instantly.",
        description: "A universal file converter for your desktop. Convert video, audio, images, documents, and archives without uploading them to the cloud. Process thousands of files in bulk.",
        category: "software",
        icon: "RefreshCw",
        downloads: "4.5M+",
        version: "3.0.2",
        updatedAt: "May 05, 2026",
        developer: "Oruzen Utilities",
        price: "Freemium",
        platforms: ["Windows", "macOS"],
        features: ["Over 1000+ formats supported", "Hardware acceleration", "Batch conversion", "Offline processing", "DVD/Blu-ray ripping"],
        screenshots: [
            "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Utility", "Media", "Productivity"]
    },
    {
        id: "spectra-3d",
        name: "Spectra 3D Studio",
        tagline: "Intuitive 3D modeling and rendering.",
        description: "Create breathtaking 3D art, models for games, or architectural visualizations. Spectra 3D features a real-time raytracing viewport and node-based material creation.",
        category: "software",
        icon: "Box",
        downloads: "2.1M+",
        version: "2026.2",
        updatedAt: "Dec 10, 2026",
        developer: "Oruzen Studio",
        price: "Paid",
        platforms: ["Windows"],
        features: ["Real-time raytracing", "Sculpting tools", "Physics simulations", "Node-based materials", "VR support"],
        screenshots: [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Design", "3D", "Animation"]
    },

    // --- ANDROID APPS (10 Items) ---
    {
        id: "app-focus-timer",
        name: "Zen Focus Timer",
        tagline: "Stay productive, plant digital trees.",
        description: "Use the Pomodoro technique to beat distraction. Plant a virtual tree when you start working; if you leave the app, the tree dies. Build your own forest of focus.",
        category: "apps",
        icon: "Timer",
        downloads: "10M+",
        version: "4.5.2",
        updatedAt: "Nov 12, 2026",
        developer: "Oruzen Mobile",
        price: "Free",
        platforms: ["Android"],
        features: ["Pomodoro timer", "App blocking", "Detailed analytics", "Daily rewards", "Dark mode"],
        screenshots: [
            "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Productivity", "Health", "Lifestyle"]
    },
    {
        id: "app-wallet-track",
        name: "Wallet Tracker Lite",
        tagline: "Manage your expenses effortlessly.",
        description: "Track your daily expenses, set budgets, and view beautiful charts of your spending habits. Syncs securely across all your devices.",
        category: "apps",
        icon: "Wallet",
        downloads: "5M+",
        version: "2.1.0",
        updatedAt: "Oct 05, 2026",
        developer: "Oruzen Finance",
        price: "Freemium",
        platforms: ["Android", "iOS"],
        features: ["Auto-categorization", "Receipt scanning", "Custom budgets", "Multi-currency support", "Export to CSV/PDF"],
        screenshots: [
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Finance", "Personal", "Tool"]
    },
    {
        id: "app-ai-keyboard",
        name: "TypeOS Keyboard",
        tagline: "The keyboard powered by artificial intelligence.",
        description: "Never make a typo again. TypeOS learns your writing style, suggests entire sentences, translates in real-time, and can even rewrite your emails to sound more professional.",
        category: "apps",
        icon: "Keyboard",
        downloads: "50M+",
        version: "7.0.0",
        updatedAt: "Dec 15, 2026",
        developer: "Oruzen Labs",
        price: "Free",
        platforms: ["Android"],
        features: ["AI sentence completion", "Tone rewriting", "Real-time translation", "Custom themes", "Swipe to type"],
        screenshots: [
            "https://images.unsplash.com/photo-1582845512747-e42001c95638?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1526045612212-70cb359f26b5?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Utility", "Keyboard", "AI"]
    },
    {
        id: "app-fit-coach",
        name: "Oruzen Fit Coach",
        tagline: "Your personal AI fitness trainer.",
        description: "Get personalized workout plans based on your body type, goals, and available equipment. Features video guides, rep tracking, and meal planning.",
        category: "apps",
        icon: "Activity",
        downloads: "2M+",
        version: "1.2.4",
        updatedAt: "Sep 20, 2026",
        developer: "Oruzen Health",
        price: "Paid",
        platforms: ["Android", "iOS"],
        features: ["AI workout generation", "500+ exercise videos", "Calorie tracker", "Wearable integration", "Progress photos"],
        screenshots: [
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Health", "Fitness", "Lifestyle"]
    },
    {
        id: "app-scan-pro",
        name: "DocScan Pro",
        tagline: "Turn your phone into a portable scanner.",
        description: "Scan documents, receipts, and whiteboards. Uses AI to auto-crop, enhance text readability, and perform accurate OCR text extraction in 50 languages.",
        category: "apps",
        icon: "FileText",
        downloads: "25M+",
        version: "6.3.1",
        updatedAt: "Aug 08, 2026",
        developer: "Oruzen Utilities",
        price: "Freemium",
        platforms: ["Android"],
        features: ["Auto edge detection", "OCR text extraction", "E-signatures", "Cloud backup", "PDF/Word export"],
        screenshots: [
            "https://images.unsplash.com/photo-1616401666879-11c034acdbb4?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Business", "Productivity", "Scanner"]
    },
    {
        id: "app-stellar-cam",
        name: "Stellar Camera",
        tagline: "Astrophotography made easy.",
        description: "Capture the stars with just your phone. Stellar Camera uses computational photography to stack long exposures, reducing noise and bringing out the Milky Way.",
        category: "apps",
        icon: "Camera",
        downloads: "1.5M+",
        version: "2.0.0",
        updatedAt: "Jul 22, 2026",
        developer: "Oruzen Mobile",
        price: "Paid",
        platforms: ["Android"],
        features: ["Auto-stacking", "Star tracking compensation", "RAW capture", "Manual ISO/Shutter", "Light pollution filter"],
        screenshots: [
            "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Photography", "Camera", "Tools"]
    },
    {
        id: "app-sleep-wave",
        name: "SleepWave",
        tagline: "Track sleep. Wake up refreshed.",
        description: "Analyzes your sleep cycles using your phone's microphone to listen for movement and breathing. Wakes you up gently during your lightest sleep phase.",
        category: "apps",
        icon: "Moon",
        downloads: "8M+",
        version: "3.4.5",
        updatedAt: "Feb 10, 2026",
        developer: "Oruzen Health",
        price: "Free",
        platforms: ["Android", "iOS"],
        features: ["Smart alarm", "Snore recording", "Sleep debt tracking", "Lullabies", "Dream journal"],
        screenshots: [
            "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1511295742362-92c96b124e41?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Health", "Sleep", "Lifestyle"]
    },
    {
        id: "app-language-drop",
        name: "LingoDrop",
        tagline: "Learn languages through mini-games.",
        description: "Master vocabulary in 30 languages with quick, 5-minute visual learning sessions. No typing, just swiping and matching beautiful illustrations.",
        category: "apps",
        icon: "Globe",
        downloads: "15M+",
        version: "5.1.0",
        updatedAt: "Jan 05, 2026",
        developer: "Oruzen Education",
        price: "Freemium",
        platforms: ["Android", "iOS"],
        features: ["Visual learning", "30+ languages", "Travel phrases", "Audio pronunciation", "Offline mode"],
        screenshots: [
            "https://images.unsplash.com/photo-1546410531-b4ba71c9faba?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Education", "Language", "Gaming"]
    },
    {
        id: "app-crypto-watch",
        name: "CryptoWatch App",
        tagline: "Real-time crypto portfolio tracker.",
        description: "Keep track of all your crypto assets in one place. Connects to 50+ exchanges and wallets to automatically sync your balances and calculate P&L.",
        category: "apps",
        icon: "Bitcoin",
        downloads: "3M+",
        version: "4.2.0",
        updatedAt: "Nov 30, 2026",
        developer: "Oruzen Finance",
        price: "Free",
        platforms: ["Android"],
        features: ["API exchange sync", "Wallet tracking", "Price alerts", "Detailed P&L", "Crypto news feed"],
        screenshots: [
            "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Finance", "Crypto", "Tracker"]
    },
    {
        id: "app-quick-note",
        name: "Nova Notes",
        tagline: "Beautiful, markdown-based note taking.",
        description: "A fast, minimalist note-taking app that supports full markdown, folders, tags, and bidirectional linking. Built for organizing complex thoughts on the go.",
        category: "apps",
        icon: "Edit3",
        downloads: "4M+",
        version: "2.8.0",
        updatedAt: "Oct 18, 2026",
        developer: "Oruzen Mobile",
        price: "Freemium",
        platforms: ["Android"],
        features: ["Markdown support", "Bidirectional linking", "Graph view", "E2E encryption", "Cloud sync"],
        screenshots: [
            "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Productivity", "Notes", "Writing"]
    },

    // --- OPEN SOURCE (10 Items) ---
    {
        id: "os-react-glass",
        name: "React Glass UI",
        tagline: "A beautiful glassmorphism component library for React.",
        description: "Modern UI components built with Tailwind CSS and Framer Motion. Includes 50+ pre-built, accessible components with stunning frosted glass effects.",
        category: "open-source",
        icon: "Code",
        downloads: "500K/mo",
        version: "1.2.0",
        updatedAt: "Dec 10, 2026",
        developer: "Oruzen OSS",
        price: "Open Source",
        platforms: ["Web", "React"],
        features: ["Framer Motion animations", "Tailwind CSS integration", "Accessible (a11y)", "Dark mode native", "TypeScript ready"],
        screenshots: [
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["React", "UI Library", "Frontend"],
        githubUrl: "https://github.com/oruzen/react-glass",
        stars: "12.5k",
        license: "MIT"
    },
    {
        id: "os-nexus-db",
        name: "NexusDB",
        tagline: "A fast, embedded, key-value database in Rust.",
        description: "Designed for extreme performance and low memory footprint. NexusDB provides sub-millisecond read times, making it perfect for Edge computing and IoT devices.",
        category: "open-source",
        icon: "Database",
        downloads: "1.2M/mo",
        version: "0.8.4",
        updatedAt: "Nov 22, 2026",
        developer: "Oruzen OSS",
        price: "Open Source",
        platforms: ["Rust", "Linux", "macOS"],
        features: ["Lock-free reads", "ACID transactions", "Memory mapped files", "Thread-safe", "WASM support"],
        screenshots: [
            "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Rust", "Database", "Backend"],
        githubUrl: "https://github.com/oruzen/nexus-db",
        stars: "8.2k",
        license: "Apache 2.0"
    },
    {
        id: "os-auto-deploy",
        name: "AutoDeploy CLI",
        tagline: "Zero-config deployments to any cloud.",
        description: "A single command to detect your framework, containerize your app, and deploy it to AWS, GCP, or Azure. Reduces devops overhead to zero for indie hackers.",
        category: "open-source",
        icon: "Terminal",
        downloads: "300K/mo",
        version: "2.1.0",
        updatedAt: "Oct 15, 2026",
        developer: "Oruzen Open Source",
        price: "Open Source",
        platforms: ["CLI", "Go"],
        features: ["Auto-detects React/Vue/Node/Python", "Generates optimized Dockerfiles", "Multi-cloud support", "Automated SSL", "Rollback commands"],
        screenshots: [
            "https://images.unsplash.com/photo-1629654291663-b91ad427698f?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["DevOps", "CLI", "Deployment"],
        githubUrl: "https://github.com/oruzen/autodeploy",
        stars: "5.4k",
        license: "MIT"
    },
    {
        id: "os-image-flow",
        name: "ImageFlow Node",
        tagline: "High-performance image processing pipeline.",
        description: "Resize, crop, watermark, and compress millions of images on the fly. Built on sharp, wrapped in a distributed architecture for immense scaling.",
        category: "open-source",
        icon: "Image",
        downloads: "2.1M/mo",
        version: "3.5.0",
        updatedAt: "Sep 05, 2026",
        developer: "Oruzen Media",
        price: "Open Source",
        platforms: ["Node.js", "TypeScript"],
        features: ["WebP/AVIF output", "Smart cropping", "S3 Integration", "Caching layer", "Distributed worker queues"],
        screenshots: [
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Node.js", "Media", "Images"],
        githubUrl: "https://github.com/oruzen/imageflow",
        stars: "9.1k",
        license: "MIT"
    },
    {
        id: "os-auth-spark",
        name: "AuthSpark",
        tagline: "Headless authentication server in Go.",
        description: "A complete authentication solution featuring JWTs, OAuth2 (Google, GitHub, Apple), Magic Links, and 2FA. Drop it into any architecture via Docker.",
        category: "open-source",
        icon: "Lock",
        downloads: "450K/mo",
        version: "1.0.2",
        updatedAt: "Aug 12, 2026",
        developer: "Oruzen Security",
        price: "Open Source",
        platforms: ["Go", "Docker"],
        features: ["Passwordless login", "Social OAuth", "RBAC (Role Based Access)", "Stateless JWT tokens", "Prometheus metrics"],
        screenshots: [
            "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Security", "Auth", "Go"],
        githubUrl: "https://github.com/oruzen/authspark",
        stars: "15.3k",
        license: "Apache 2.0"
    },
    {
        id: "os-tail-blocks",
        name: "TailBlocks Landing",
        tagline: "Ready-to-use marketing sections for Tailwind.",
        description: "Don't build landing pages from scratch. Just copy-paste these beautifully designed, responsive Hero, Feature, Pricing, and Footer sections into your project.",
        category: "open-source",
        icon: "Layout",
        downloads: "800K/mo",
        version: "4.0.0",
        updatedAt: "Jan 18, 2026",
        developer: "Oruzen OSS",
        price: "Open Source",
        platforms: ["HTML", "React", "Vue"],
        features: ["120+ components", "Fully responsive", "Light/Dark mode", "Next.js & Nuxt examples", "Zero dependencies"],
        screenshots: [
            "https://images.unsplash.com/photo-1507238692062-710e9641215b?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Tailwind", "Design", "CSS"],
        githubUrl: "https://github.com/oruzen/tail-blocks",
        stars: "22k",
        license: "MIT"
    },
    {
        id: "os-prompt-ocean-api",
        name: "PromptOcean API Client",
        tagline: "Official SDK for interacting with PromptOcean.",
        description: "Fetch, submit, and generate AI prompts programmatically. The official TypeScript/Node.js wrapper for the PromptOcean platform.",
        category: "open-source",
        icon: "Cpu",
        downloads: "120K/mo",
        version: "1.1.5",
        updatedAt: "Dec 01, 2026",
        developer: "Oruzen GenAI",
        price: "Open Source",
        platforms: ["TypeScript", "Node.js"],
        features: ["Fully typed (TypeScript)", "Auto-retries", "Pagination helpers", "Streaming responses", "Browser compatible"],
        screenshots: [
            "https://images.unsplash.com/photo-1555066931-bcc36558bf4a?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["API", "SDK", "AI"],
        githubUrl: "https://github.com/oruzen/promptocean-sdk",
        stars: "3.2k",
        license: "MIT"
    },
    {
        id: "os-vue-motion",
        name: "VueMotion",
        tagline: "Declarative animations for Vue 3.",
        description: "An animation library for Vue that brings the power and simplicity of Framer Motion to the Vue ecosystem. Animate presence, layouts, and gestures easily.",
        category: "open-source",
        icon: "Activity",
        downloads: "340K/mo",
        version: "2.3.0",
        updatedAt: "Nov 15, 2026",
        developer: "Oruzen Front-end",
        price: "Open Source",
        platforms: ["Vue"],
        features: ["v-motion directive", "Layout animations", "SVG path drawing", "Scroll-linked animations", "Spring physics"],
        screenshots: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Vue", "Animation", "Frontend"],
        githubUrl: "https://github.com/oruzen/vue-motion",
        stars: "6.8k",
        license: "MIT"
    },
    {
        id: "os-micro-store",
        name: "MicroStore Zustand",
        tagline: "Bear necessities for state management in React.",
        description: "A small, fast, and scalable bearbones state-management solution using simplified flux principles. Has a comfy API based on hooks, isn't boilerplatey or opinionated.",
        category: "open-source",
        icon: "Box",
        downloads: "5M/mo",
        version: "4.5.1",
        updatedAt: "Oct 20, 2026",
        developer: "Oruzen Labs",
        price: "Open Source",
        platforms: ["React", "TypeScript"],
        features: ["No boilerplate", "Render optimization", "Devtools support", "Persist middleware", "React Suspense compatibility"],
        screenshots: [
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["React", "State Management", "Hooks"],
        githubUrl: "https://github.com/oruzen/micro-store",
        stars: "35k",
        license: "MIT"
    },
    {
        id: "os-py-scrape",
        name: "PyScrape Ninja",
        tagline: "Undetectable web scraping framework for Python.",
        description: "Bypass anti-bot protections effortlessly. PyScrape Ninja uses Playwright under the hood but injects stealth plugins to mimic human behavior perfectly.",
        category: "open-source",
        icon: "Search",
        downloads: "900K/mo",
        version: "1.4.0",
        updatedAt: "Aug 02, 2026",
        developer: "Oruzen Data",
        price: "Open Source",
        platforms: ["Python"],
        features: ["Cloudflare bypass", "Auto CAPTCHA solving", "Proxy rotation built-in", "Headless/Headful modes", "Async API"],
        screenshots: [
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
        ],
        tags: ["Python", "Scraping", "Data"],
        githubUrl: "https://github.com/oruzen/pyscrape-ninja",
        stars: "11.2k",
        license: "GPL-3.0"
    },
];
