# Ink & Soul Tattoo Studio Website

A modern, mobile-first tattoo studio website built with React, TailwindCSS, and Framer Motion. This project showcases a professional tattoo studio with artist profiles, portfolio gallery, booking system, and blog functionality.

## 🎨 Features

### Core Features
- **Responsive Design**: Mobile-first approach with beautiful desktop experience
- **Dark Mode**: Elegant dark theme optimized for tattoo studio aesthetics
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Modern UI/UX**: Clean, professional design with excellent user experience

### Pages & Functionality
1. **Homepage**
   - Hero section with CTA "Book Your Tattoo"
   - Tattoo styles showcase with filter buttons
   - Scrolling testimonial carousel
   - Instagram feed integration (mock data)

2. **Artist Profiles**
   - Card layout with artist information
   - Specialization tags and experience details
   - "Book Now" functionality
   - Search and filter capabilities

3. **Portfolio/Gallery**
   - Responsive grid gallery
   - Filters by style, color, and artist
   - Image modal with zoom and navigation
   - Keyboard navigation support

4. **Booking System**
   - Comprehensive booking form
   - Artist selection and scheduling
   - Image upload for reference
   - Confirmation modal

5. **Blog Section**
   - Tattoo care articles and guides
   - Category filtering
   - Search functionality
   - SEO-friendly structure

6. **Contact Page**
   - Contact form with validation
   - Studio information
   - FAQ section
   - Map placeholder

### Technical Features
- **React Router**: Client-side routing
- **TailwindCSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Lucide React**: Beautiful icons
- **Responsive Design**: Mobile-first approach
- **Lazy Loading**: Optimized image loading
- **Form Validation**: Client-side validation
- **Mock Data**: Comprehensive JSON data structure

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tattoo-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
tattoo-website/
│── public/
│   └── index.html              # Main HTML file
│
│── src/
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.jsx         # Navigation component
│   │   ├── Footer.jsx         # Footer component
│   │   ├── HeroSection.jsx    # Hero section
│   │   ├── TattooCard.jsx     # Tattoo gallery card
│   │   ├── ArtistCard.jsx     # Artist profile card
│   │   ├── TestimonialCarousel.jsx # Customer reviews
│   │   ├── BookingForm.jsx    # Booking form
│   │   └── BlogCard.jsx       # Blog post card
│   │
│   ├── pages/                 # Page-level components
│   │   ├── Home.jsx           # Homepage
│   │   ├── Artists.jsx        # Artists page
│   │   ├── Portfolio.jsx      # Portfolio gallery
│   │   ├── Booking.jsx        # Booking page
│   │   ├── Blog.jsx           # Blog page
│   │   └── Contact.jsx        # Contact page
│   │
│   ├── data/                  # Mock JSON data
│   │   ├── artists.js         # Artist information
│   │   ├── tattoos.js         # Tattoo gallery data
│   │   ├── testimonials.js    # Customer testimonials
│   │   └── blogPosts.js       # Blog articles
│   │
│   ├── App.jsx                # Main app with routes
│   ├── main.jsx               # Entry point
│   └── index.css              # Tailwind styles
│
├── tailwind.config.js         # TailwindCSS configuration
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## 🎯 Key Components

### Navigation
- Fixed navbar with smooth scrolling
- Mobile-responsive hamburger menu
- Active page highlighting
- Dark/light theme toggle

### Hero Section
- Full-screen hero with background image
- Animated text and CTA buttons
- Statistics display
- Scroll indicator

### Portfolio Gallery
- Responsive grid layout
- Advanced filtering system
- Image modal with zoom
- Keyboard navigation (arrow keys, escape)

### Booking System
- Multi-step form with validation
- Artist selection
- Date/time picker
- Image upload functionality
- Confirmation modal

### Testimonials
- Auto-scrolling carousel
- Touch/swipe support
- Navigation controls
- Customer photos and ratings

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (#d946ef to #a21caf)
- **Dark**: Custom dark palette (#0f172a to #64748b)
- **Accent**: Various accent colors for different elements

### Typography
- **Display Font**: Playfair Display (headings)
- **Body Font**: Inter (body text)
- **Responsive**: Scalable typography system

### Components
- **Cards**: Consistent card design with hover effects
- **Buttons**: Primary and secondary button styles
- **Forms**: Styled form inputs with validation
- **Modals**: Overlay modals with animations

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Customization

### Adding New Artists
Edit `src/data/artists.js` to add new artist profiles:
```javascript
{
  id: 7,
  name: "New Artist",
  image: "artist-image-url",
  bio: "Artist description",
  experience: 5,
  specializations: ["Style1", "Style2"],
  // ... other properties
}
```

### Adding New Tattoos
Edit `src/data/tattoos.js` to add new tattoo images:
```javascript
{
  id: 13,
  title: "New Tattoo",
  image: "tattoo-image-url",
  style: "Style",
  artist: "Artist Name",
  // ... other properties
}
```

### Styling Customization
Modify `tailwind.config.js` to customize:
- Colors
- Fonts
- Animations
- Spacing

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions:
- Email: info@inkandsoul.com
- Phone: (123) 456-7890
- Visit: 123 Tattoo Street, Art District, CA 90210

---

**Built with ❤️ using React, TailwindCSS, and Framer Motion**
