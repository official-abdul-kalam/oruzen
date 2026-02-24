export interface StudentProject {
    id: string;
    name: string;
    tagline: string;
    description: string;
    category: 'react' | 'python' | 'html-css' | 'nextjs' | 'node';
    techStack: string[];
    features: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    githubUrl: string;
    demoUrl?: string;
    downloads: string;
    setupCommands: string[];
}

export const studentProjectsData: StudentProject[] = [
    {
        id: "weather-dashboard-react",
        name: "Real-time Weather Dashboard",
        tagline: "A beautiful weather app fetching data from OpenWeather API.",
        description: "Perfect for college assignments. This React project demonstrates API integration, state management, and modern UI design using Tailwind CSS. It features location search, 5-day forecasts, and dynamic backgrounds based on the weather condition.",
        category: "react",
        techStack: ["React", "Tailwind CSS", "Axios", "OpenWeather API"],
        features: [
            "Real-time weather data fetching",
            "5-day forecast with intuitive charts",
            "Search functionality by city name",
            "Responsive glassmorphism design"
        ],
        difficulty: "Beginner",
        githubUrl: "https://github.com/oruzen/weather-dashboard",
        demoUrl: "https://weather.oruzen.com",
        downloads: "12.4k",
        setupCommands: [
            "git clone https://github.com/oruzen/weather-dashboard.git",
            "cd weather-dashboard",
            "npm install",
            "npm start"
        ]
    },
    {
        id: "ecommerce-django-python",
        name: "Full-Stack E-Commerce Store",
        tagline: "A complete online store built with Python and Django.",
        description: "An impressive final-year college project. Includes a fully functional shopping cart, user authentication, product catalog, payment gateway integration (Stripe test mode), and an admin dashboard for inventory management.",
        category: "python",
        techStack: ["Python", "Django", "SQLite", "Bootstrap", "Stripe"],
        features: [
            "Secure user authentication system",
            "Dynamic shopping cart and checkout flow",
            "Stripe payment gateway integration",
            "Admin panel to manage orders and products"
        ],
        difficulty: "Advanced",
        githubUrl: "https://github.com/oruzen/ecommerce-django",
        downloads: "8.1k",
        setupCommands: [
            "git clone https://github.com/oruzen/ecommerce-django.git",
            "cd ecommerce-django",
            "python -m venv venv",
            "source venv/bin/activate",
            "pip install -r requirements.txt",
            "python manage.py runserver"
        ]
    },
    {
        id: "portfolio-html-css-js",
        name: "Animated Developer Portfolio",
        tagline: "A stunning, responsive portfolio template using pure HTML/CSS/JS.",
        description: "Need a personal website fast? This template uses 0 frameworks. It's incredibly lightweight, features smooth scroll animations, a dark mode toggle, and a working contact form using Formspree. Ideal for first-year web dev projects.",
        category: "html-css",
        techStack: ["HTML5", "CSS3", "Vanilla JS"],
        features: [
            "Zero dependencies, blazing fast load times",
            "Built-in Dark/Light theme toggle",
            "Smooth scrolling and reveal animations",
            "Functional contact form without backend"
        ],
        difficulty: "Beginner",
        githubUrl: "https://github.com/oruzen/animated-portfolio",
        demoUrl: "https://portfolio.oruzen.com",
        downloads: "25.2k",
        setupCommands: [
            "git clone https://github.com/oruzen/animated-portfolio.git",
            "cd animated-portfolio",
            "open index.html # Works directly in browser without server!"
        ]
    },
    {
        id: "ai-prompt-generator-nextjs",
        name: "AI Prompt Generator SEO App",
        tagline: "A Next.js application that uses OpenAI to generate SEO-optimized content.",
        description: "A very modern project showing integration with AI models. Users input a topic, and the app generates blog titles, meta descriptions, and keywords. Built on the Next.js App Router with server actions.",
        category: "nextjs",
        techStack: ["Next.js 14", "React", "OpenAI API", "Tailwind CSS"],
        features: [
            "Next.js App Router implementation",
            "Server-side rendering for SEO",
            "OpenAI API integration for text generation",
            "Rate limiting and error handling"
        ],
        difficulty: "Intermediate",
        githubUrl: "https://github.com/oruzen/ai-prompt-gen",
        downloads: "5.4k",
        setupCommands: [
            "git clone https://github.com/oruzen/ai-prompt-gen.git",
            "cd ai-prompt-gen",
            "npm install",
            "echo 'OPENAI_API_KEY=your_key_here' > .env.local",
            "npm run dev"
        ]
    },
    {
        id: "chat-app-nodejs-socketio",
        name: "Real-time Chat Application",
        tagline: "A WhatsApp clone showing real-time websockets with Node.js.",
        description: "The classic real-time project. It uses Socket.io to establish a persistent connection between clients and the server. Features include public rooms, private messaging, 'typing' indicators, and message history stored in MongoDB.",
        category: "node",
        techStack: ["Node.js", "Express", "Socket.io", "MongoDB", "Vanilla JS"],
        features: [
            "Real-time bidirectional communication",
            "Room-based chat channels",
            "Online user status tracking",
            "Persistent chat history with MongoDB"
        ],
        difficulty: "Intermediate",
        githubUrl: "https://github.com/oruzen/realtime-chat",
        downloads: "15.7k",
        setupCommands: [
            "git clone https://github.com/oruzen/realtime-chat.git",
            "cd realtime-chat",
            "npm install",
            "npm run dev"
        ]
    },
    {
        id: "expense-tracker-react",
        name: "Personal Expense Tracker",
        tagline: "Manage finances with this React app using LocalStorage.",
        description: "A great intermediate project that teaches CRUD operations. Users can add incomes and expenses, view a categorized pie chart of their spending, and data persists across sessions using the browser's LocalStorage.",
        category: "react",
        techStack: ["React", "Chart.js", "Context API", "CSS Modules"],
        features: [
            "Full CRUD functionality for transactions",
            "Interactive charts for expense visualization",
            "State management with React Context API",
            "No database required (LocalStorage)"
        ],
        difficulty: "Intermediate",
        githubUrl: "https://github.com/oruzen/expense-tracker",
        demoUrl: "https://expenses.oruzen.com",
        downloads: "9.3k",
        setupCommands: [
            "git clone https://github.com/oruzen/expense-tracker.git",
            "cd expense-tracker",
            "npm install",
            "npm start"
        ]
    },
    {
        id: "machine-learning-iris",
        name: "Iris Flower Classification Model",
        tagline: "A beginner-friendly Machine Learning project in Python.",
        description: "Your first step into AI and ML. This Jupyter Notebook uses the famous Iris dataset to train a classification model using scikit-learn. Includes data visualization, model training, and accuracy evaluation.",
        category: "python",
        techStack: ["Python", "scikit-learn", "Pandas", "Matplotlib", "Jupyter"],
        features: [
            "Exploratory Data Analysis (EDA) with visualizations",
            "Implementation of K-Nearest Neighbors (KNN) algorithm",
            "Model training and testing splits",
            "Confusion matrix and accuracy scoring"
        ],
        difficulty: "Beginner",
        githubUrl: "https://github.com/oruzen/ml-iris-classification",
        downloads: "18.9k",
        setupCommands: [
            "git clone https://github.com/oruzen/ml-iris-classification.git",
            "cd ml-iris-classification",
            "pip install jupyter pandas scikit-learn matplotlib",
            "jupyter notebook iris_classification.ipynb"
        ]
    },
    {
        id: "netflix-clone-html-css",
        name: "Netflix Landing Page Clone",
        tagline: "A pixel-perfect UI clone of Netflix using HTML and CSS.",
        description: "A brilliant project to show off your CSS skills. This is a responsive, pixel-perfect clone of the Netflix homepage. It includes the hero section accordion FAQs, and uses CSS Grid and Flexbox extensively.",
        category: "html-css",
        techStack: ["HTML5", "CSS3"],
        features: [
            "Pixel-perfect UI replication",
            "Fully mobile responsive layout",
            "CSS Grid and Flexbox mastery",
            "Custom CSS animations for accordions"
        ],
        difficulty: "Beginner",
        githubUrl: "https://github.com/oruzen/netflix-clone",
        demoUrl: "https://netflix-clone.oruzen.com",
        downloads: "32.1k",
        setupCommands: [
            "git clone https://github.com/oruzen/netflix-clone.git",
            "cd netflix-clone",
            "open index.html"
        ]
    }
];
