# PhishGuard AI - React Frontend

This is the modern React frontend for PhishGuard AI, featuring a beautiful dark/light theme toggle and responsive design built with Tailwind CSS.

## Features

- 🎨 **Modern UI/UX**: Clean, professional design with smooth animations
- 🌙 **Dark/Light Theme**: Toggle between themes with system preference detection
- 📱 **Responsive Design**: Works perfectly on all devices
- ⚡ **Fast Performance**: Built with Vite for optimal development experience
- 🔒 **Authentication**: Secure user login/registration system
- 🎯 **Real-time Scanning**: Instant URL phishing detection
- 📊 **Dashboard**: User statistics and scan history
- 👑 **Admin Panel**: User management for administrators

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Context API

## Prerequisites

- Node.js 16+ 
- npm or yarn
- Python backend running (see main README.md)

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Development

The frontend runs on `http://localhost:3000` and proxies API requests to the Python backend at `http://localhost:5000`.

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation with theme toggle
│   └── ...
├── contexts/           # React contexts
│   ├── AuthContext.jsx # Authentication state
│   └── ThemeContext.jsx # Dark/light theme
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Scan.jsx        # URL scanning
│   ├── Dashboard.jsx   # User dashboard
│   ├── Info.jsx        # Phishing information
│   ├── Login.jsx       # User login
│   ├── Register.jsx    # User registration
│   └── Admin.jsx       # Admin panel
├── App.jsx             # Main app component
├── main.jsx            # React entry point
└── index.css           # Global styles + Tailwind
```

### Key Components

#### Theme Toggle
- Automatic system preference detection
- Local storage persistence
- Smooth transitions between themes

#### Navigation
- Responsive mobile menu
- Active link highlighting
- User authentication status

#### Authentication
- JWT token management
- Protected routes
- User session persistence

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    // ... customize primary colors
  },
  // ... other color palettes
}
```

### Components
All components use Tailwind CSS classes and can be easily customized by modifying the CSS classes.

### Icons
Icons are from Lucide React. Replace them by importing different icons:

```javascript
import { Shield, Search, Brain } from 'lucide-react'
```

## API Integration

The frontend communicates with the Python backend through these endpoints:

- `POST /api/login` - User authentication
- `POST /api/register` - User registration  
- `POST /api/scan` - URL scanning
- `GET /api/user/profile` - User profile
- `GET /api/admin/users` - Admin user management

## Building for Production

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Serve the built files**:
   ```bash
   npm run preview
   ```

3. **Deploy**: Copy the `dist/` folder to your web server

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change the port in `vite.config.js`
2. **API connection**: Ensure the Python backend is running on port 5000
3. **Build errors**: Clear `node_modules` and reinstall dependencies

### Development Tips

- Use the browser dev tools to inspect Tailwind classes
- Check the console for API errors
- Use React DevTools for component debugging

## Contributing

1. Follow the existing code style
2. Use Tailwind CSS for styling
3. Test on both light and dark themes
4. Ensure mobile responsiveness

## License

MIT License - see main README.md for details
