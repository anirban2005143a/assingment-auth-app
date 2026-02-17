# 🚀 Quick Start Guide - Auth Dashboard

## Prerequisites
- Node.js 16+ installed
- MongoDB instance running (local or Atlas)
- Git (optional)

---

## ⚙️ Setup Instructions

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with the following:
VITE_REACT_BACKEND_URL=http://localhost:5000
DB_CONNECT=mongodb://localhost:27017/auth-dashboard
JWT_SECRET=your_super_secret_key_change_this_in_production

# Start development server
npm run dev
```

**Backend running on**: `http://localhost:5000`

---

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file with:
VITE_REACT_BACKEND_URL=http://localhost:5000

# Start development server
npm run dev
```

**Frontend running on**: `http://localhost:5174` (or next available port)

---

## 📱 Usage

### 1. Create Account
- Go to `/signup`
- Fill in your details
- Account created and auto-logged in

### 2. Access Dashboard
- View your profile with stats
- See all your notes

### 3. Create First Note
- Click "New Note" button
- Fill in title, description
- Select category and priority
- Add tags (optional)
- Click "Create Note"

### 4. Manage Notes
- **Search**: Type in search box (searches title, description, tags)
- **Filter**: Use dropdowns to filter by category, priority, or status
- **Edit**: Click edit icon on any note
- **Delete**: Click trash icon to remove
- **Complete**: Click checkmark to mark as done

---

## 🔗 API Base URL

All API requests use: `http://localhost:5000/api`

Example:
```javascript
// Create note
POST http://localhost:5000/api/notes
Headers: Authorization: Bearer <your_jwt_token>
Body: { title, description, category, priority, tags }
```

---

## 🎨 Features at a Glance

✅ **Authentication**
- Signup with validation
- Login with JWT
- Secure logout
- Profile display

✅ **CRUD Operations**
- Create notes with categories and priority
- Read all notes or individual notes
- Update note details
- Delete notes
- Mark notes as complete

✅ **Search & Filter**
- Real-time search
- Filter by category (personal, work, urgent, idea, other)
- Filter by priority (low, medium, high)
- Filter by status (pending, completed)

✅ **Beautiful UI**
- Dark theme with slate colors
- Gradient backgrounds
- Responsive design
- Smooth animations with GSAP

✅ **Animations**
- Profile section fade-in
- Note card hover effects
- Modal transitions
- Staggered grid animations

---

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Ensure backend is running on port 5000
- Check .env VITE_REACT_BACKEND_URL

### "JWT Error"
- Login again to get fresh token
- Clear localStorage and refresh

### "Note not found"
- Refresh the page
- Ensure you're logged in
- Check browser DevTools console

### "MongoDB connection failed"
- Verify MongoDB is running
- Check connection string in .env
- For MongoDB Atlas: ensure IP is whitelisted

### "CORS Error"
- Check backend CORS configuration
- Verify frontend URL matches CORS allowlist

---

## 📝 Environment Variables

### Backend (.env)
```
DB_CONNECT=mongodb://localhost:27017/auth-dashboard
JWT_SECRET=your_jwt_secret_key
VITE_REACT_BACKEND_URL=http://localhost:5000
NODE_ENV=development
PORT=5000
```

### Frontend (.env)
```
VITE_REACT_BACKEND_URL=http://localhost:5000
```

---

## 🏗️ Project Structure

```
auth-dashboard/
├── backend/                    # Node.js + Express server
│   ├── controllers/           # Business logic
│   ├── model/                 # MongoDB schemas
│   ├── routers/               # API endpoints
│   ├── services/              # Database operations
│   ├── middlewares/           # Auth middleware
│   ├── app.js                 # Express app
│   └── server.js              # Entry point
│
└── frontend/                   # React + Vite app
    ├── src/
    │   ├── pages/             # Auth pages + Dashboard
    │   ├── components/        # Reusable components
    │   ├── Context/           # State management
    │   └── utils/             # Helper functions
    ├── public/                # Static files
    └── index.html             # Main HTML
```

---

## 📦 npm Scripts

### Backend
```bash
npm run dev          # Start dev server with nodemon
npm start            # Start production server
```

### Frontend
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🔐 Security Notes

1. **Never commit .env files** - Add to .gitignore
2. **JWT_SECRET**: Use strong, unique secret in production
3. **Database URL**: Use environment variables, not hardcoded
4. **HTTPS**: Use in production (not http)
5. **Token expiry**: Currently 24h, adjust as needed
6. **CORS**: Configure for your domain only

---

## 📚 Next Steps

After setup:
1. Create an account
2. Create 5-10 notes with different categories
3. Try searching and filtering
4. Test mark complete functionality
5. Edit and delete notes
6. Explore the beautiful dark UI
7. Check browser console to see smooth animations

---

## 🎯 Tips & Tricks

- **Search is real-time**: No need to press Enter
- **Multiple filters work together**: Combine category + priority + status
- **Tags help with search**: Add specific tags for better searching
- **Priority indicators**: ⚠️ = High, ⚡ = Medium, ✓ = Low
- **Quick view profile stats**: See total, completed, and pending notes at top

---

## 💾 Saving Backups

```bash
# Export MongoDB
mongodump --db auth-dashboard --out ./backup

# Import MongoDB
mongorestore --db auth-dashboard ./backup/auth-dashboard
```

---

## ✨ Enjoy!

Your auth dashboard is now ready to use. Create some awesome notes and experience smooth animations! 🎉

For more details, check `FEATURES.md` in the project root.
