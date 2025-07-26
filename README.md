# QuickAI - Premium AI Content Creation Platform

![QuickAI Logo](client/public/favicon.svg)

**QuickAI** is a powerful, all-in-one AI-powered content creation platform that streamlines your workflow with cutting-edge artificial intelligence technology. From writing articles to generating images and editing them professionally, QuickAI empowers creators, marketers, and professionals to produce high-quality content effortlessly.

## 🌟 Features

### 🤖 AI Writing Tools
- **AI Article Writer** - Generate high-quality, engaging articles on any topic
- **Blog Title Generator** - Create catchy, SEO-optimized blog titles with AI
- **Resume Reviewer** - Get AI-powered feedback to improve your resume

### 🎨 AI Image Tools
- **AI Image Generation** - Create stunning visuals from text descriptions
- **Background Removal** - Remove backgrounds from images seamlessly
- **Object Removal** - Erase unwanted objects from photos intelligently

### 🔥 Platform Features
- **Dark/Light Mode** - Elegant theme switching with system preference detection
- **User Authentication** - Secure login with Clerk authentication
- **Community Sharing** - Share and discover AI-generated content
- **Testimonials & Reviews** - User feedback and rating system
- **Responsive Design** - Optimized for all devices and screen sizes
- **Premium Plans** - Free tier with premium upgrade options

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS 4** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Clerk** - Authentication and user management
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful toast notifications
- **React Markdown** - Markdown rendering
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **OpenAI API** - AI content generation (Gemini 2.0 Flash)
- **Cloudinary** - Image processing and storage
- **Neon Database** - Serverless PostgreSQL
- **Clerk Express** - Backend authentication
- **Multer** - File upload handling
- **PDF Parse** - Resume parsing functionality

### Deployment
- **Vercel** - Frontend and backend deployment
- **Serverless** - Scalable cloud infrastructure

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Clone the Repository
```bash
git clone https://github.com/sourya001/Ai_Task.git
cd QuickAI
```

### Setup Client (Frontend)
```bash
cd client
npm install
```

### Setup Server (Backend)
```bash
cd ../server
npm install
```

### Environment Variables

#### Client (.env)
```env
VITE_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_DEMO_VIDEO_URL=your_demo_video_url
```

#### Server (.env)
```env
# Database
DATABASE_URL=your_neon_database_url

# AI Services
GEMINI_API_KEY=your_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key

# Authentication
CLERK_SECRET_KEY=your_clerk_secret_key

# Image Processing
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email (Optional)
EMAIL_SERVICE_CONFIG=your_email_config

# Client URL
CLIENT_URL=https://your-frontend-domain.vercel.app
```

## 🏃‍♂️ Running the Application

### Development Mode

#### Start the Backend Server
```bash
cd server
npm run server
```

#### Start the Frontend Development Server
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

### Production Build
```bash
# Build frontend
cd client
npm run build

# Start production server
cd ../server
npm start
```

## 🎯 Usage

### For Content Creators
1. **Sign up/Login** using Clerk authentication
2. **Choose an AI tool** from the dashboard
3. **Generate content** with customizable parameters
4. **Download or share** your creations
5. **Upgrade to Premium** for unlimited access

### For Developers
1. **Fork the repository**
2. **Set up environment variables**
3. **Install dependencies**
4. **Start development servers**
5. **Make your changes**
6. **Submit a pull request**

## 🔐 API Endpoints

### AI Generation
- `POST /api/ai/generate-article` - Generate articles
- `POST /api/ai/generate-blog-title` - Generate blog titles
- `POST /api/ai/generate-image` - Generate images
- `POST /api/ai/remove-image-background` - Remove backgrounds
- `POST /api/ai/remove-image-object` - Remove objects
- `POST /api/ai/resume-review` - Review resumes

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/update` - Update user information

### Testimonials
- `GET /api/testimonials/public` - Get public testimonials
- `POST /api/testimonials/create` - Create testimonial

## 📁 Project Structure

```
QuickAI/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── contexts/      # React contexts
│   │   ├── assets/        # Images and icons
│   │   └── utils/         # Utility functions
│   ├── package.json
│   └── vite.config.js
├── server/                # Backend Node.js application
│   ├── controllers/       # Request handlers
│   ├── routes/           # API routes
│   ├── middlewares/      # Custom middleware
│   ├── configs/          # Configuration files
│   ├── package.json
│   └── server.js
└── README.md
```

## 🌐 Demo

Visit our live demo: [QuickAI Live Demo](https://quickai.vercel.app)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

- **Documentation**: [Wiki](https://github.com/sourya001/Ai_Task/wiki)
- **Issues**: [GitHub Issues](https://github.com/sourya001/Ai_Task/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sourya001/Ai_Task/discussions)
- **Email**: support@quickai.com

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for AI capabilities
- [Clerk](https://clerk.dev) for authentication
- [Cloudinary](https://cloudinary.com) for image processing
- [Vercel](https://vercel.com) for deployment
- [Neon](https://neon.tech) for database services

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/sourya001/Ai_Task?style=social)
![GitHub forks](https://img.shields.io/github/forks/sourya001/Ai_Task?style=social)
![GitHub issues](https://img.shields.io/github/issues/sourya001/Ai_Task)
![GitHub license](https://img.shields.io/github/license/sourya001/Ai_Task)

---

**Built with ❤️ by the QuickAI Team**

*Elevating content creation with AI technology*
