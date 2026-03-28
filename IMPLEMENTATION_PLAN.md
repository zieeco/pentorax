# Pentorax Monorepo Transformation Plan

Transform the current Pentorax single-page React application into a modular Django + React monorepo with full e-commerce capabilities, blog system, Supabase integration, Paystack payments, and Docker deployment.

## User Review Required

> [!IMPORTANT]
> **Breaking Changes**
> - The entire project structure will be reorganized into a monorepo format
> - Current `npm run dev` command will be replaced with `make dev`
> - Frontend will move from root to `frontend/` directory
> - All environment variables will need to be reconfigured for both frontend and backend
> - Supabase will be used for authentication instead of Django's built-in auth system

> [!WARNING]
> **Migration Impact**
> - All existing components will be moved to `frontend/src/` subdirectory
> - Current Git history will be preserved, but file paths will change
> - Development workflow will change to use Makefile commands
> - Docker containers will be required for local development

> [!CAUTION]
> **Design Decisions Requiring Confirmation**
> 1. **Django REST Framework vs Django Ninja**: Should we use DRF (more mature, larger ecosystem) or Django Ninja (faster, modern, type-safe)?
> 2. **Supabase Auth Flow**: Should Django validate Supabase JWT tokens on every request, or use a session-based approach after initial auth?
> 3. **Product Data Storage**: Should product catalog be stored in Supabase (single source of truth) or Django database (better for complex queries)?
> 4. **Media Upload Flow**: Should images go directly to Supabase Storage from frontend, or proxy through Django backend?

## Proposed Changes

### Monorepo Structure

```
pentorax/
├── backend/                    # Django application
│   ├── apps/
│   │   ├── core/              # Core utilities, base models
│   │   ├── products/          # Product catalog, categories
│   │   ├── cart/              # Shopping cart logic
│   │   ├── orders/            # Order management, checkout
│   │   ├── payments/          # Paystack integration
│   │   ├── reviews/           # Product reviews & ratings
│   │   ├── quotes/            # Quote request system
│   │   ├── blog/              # Blog posts, categories, tags
│   │   └── inventory/         # Stock management
│   ├── config/                # Django settings
│   ├── requirements/
│   │   ├── base.txt
│   │   ├── dev.txt
│   │   └── prod.txt
│   ├── manage.py
│   └── Dockerfile
│
├── frontend/                   # React application (migrated)
│   ├── src/
│   │   ├── components/        # Existing components (migrated)
│   │   │   ├── landing/       # Landing page components
│   │   │   ├── shop/          # E-commerce components
│   │   │   ├── blog/          # Blog components
│   │   │   └── ui/            # Existing UI components
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── ShopPage.tsx
│   │   │   ├── ProductDetailPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   ├── BlogPage.tsx
│   │   │   └── BlogPostPage.tsx
│   │   ├── services/          # API client services
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utilities
│   │   ├── types/             # TypeScript types
│   │   ├── index.css          # Migrated with CSS variables
│   │   └── App.tsx
│   ├── tailwind.config.js     # Migrated config
│   ├── package.json
│   └── Dockerfile
│
├── docker/
│   ├── docker-compose.yml
│   ├── docker-compose.dev.yml
│   └── docker-compose.prod.yml
│
├── Makefile                    # Unified commands
├── .env.example
└── README.md
```

---

### Backend Components

#### [NEW] [backend/apps/core](file:///home/zieeco/Music/pentorax/backend/apps/core)

**Purpose**: Core utilities, base models, Supabase integration, and shared functionality.

**Key Files**:
- `supabase_client.py`: Supabase client initialization
- `auth.py`: Supabase JWT authentication middleware
- `base_models.py`: Abstract base models with `created_at`, `updated_at`, `id` fields
- `exceptions.py`: Custom exception handlers
- `permissions.py`: Custom permission classes

#### [NEW] [backend/apps/products](file:///home/zieeco/Music/pentorax/backend/apps/products)

**Purpose**: Product catalog management for solar panels, inverters, batteries, installation services.

**Models**:
- `Category`: Product categories (e.g., Solar Panels, Inverters, Batteries)
- `Product`: Main product model with name, description, price, images, specifications
- `ProductImage`: Multiple images per product
- `ProductSpecification`: Key-value specs (e.g., "Wattage": "500W")

**API Endpoints**:
- `GET /api/products/`: List products with filtering (category, price range, search)
- `GET /api/products/{id}/`: Product detail
- `GET /api/categories/`: List categories

#### [NEW] [backend/apps/cart](file:///home/zieeco/Music/pentorax/backend/apps/cart)

**Purpose**: Shopping cart management with session-based and user-based carts.

**Models**:
- `Cart`: User's shopping cart
- `CartItem`: Individual items in cart

**API Endpoints**:
- `GET /api/cart/`: Get current cart
- `POST /api/cart/items/`: Add item to cart
- `PATCH /api/cart/items/{id}/`: Update quantity
- `DELETE /api/cart/items/{id}/`: Remove item

#### [NEW] [backend/apps/orders](file:///home/zieeco/Music/pentorax/backend/apps/orders)

**Purpose**: Order processing and management.

**Models**:
- `Order`: Order header with status, total, shipping info
- `OrderItem`: Line items in order
- `ShippingAddress`: Delivery address

**API Endpoints**:
- `POST /api/orders/`: Create order from cart
- `GET /api/orders/`: List user's orders
- `GET /api/orders/{id}/`: Order detail

#### [NEW] [backend/apps/payments](file:///home/zieeco/Music/pentorax/backend/apps/payments)

**Purpose**: Paystack payment integration.

**Models**:
- `Payment`: Payment transaction records

**API Endpoints**:
- `POST /api/payments/initialize/`: Initialize Paystack transaction
- `POST /api/payments/verify/`: Verify payment callback
- `GET /api/payments/{id}/`: Payment status

**Implementation**:
- Use Paystack Python SDK
- Webhook handler for payment confirmation
- Automatic order status update on successful payment

#### [NEW] [backend/apps/reviews](file:///home/zieeco/Music/pentorax/backend/apps/reviews)

**Purpose**: Product reviews and ratings.

**Models**:
- `Review`: User reviews with rating (1-5), comment, verified purchase flag

**API Endpoints**:
- `GET /api/products/{id}/reviews/`: List product reviews
- `POST /api/products/{id}/reviews/`: Create review (authenticated)
- `PATCH /api/reviews/{id}/`: Update own review
- `DELETE /api/reviews/{id}/`: Delete own review

#### [NEW] [backend/apps/quotes](file:///home/zieeco/Music/pentorax/backend/apps/quotes)

**Purpose**: Free quote request system (existing "Get A Free Quote Today" CTA).

**Models**:
- `QuoteRequest`: Customer quote requests with contact info, requirements

**API Endpoints**:
- `POST /api/quotes/`: Submit quote request
- `GET /api/quotes/`: List user's quote requests (authenticated)

#### [NEW] [backend/apps/blog](file:///home/zieeco/Music/pentorax/backend/apps/blog)

**Purpose**: Blog system for content marketing.

**Models**:
- `BlogPost`: Blog posts with title, content, author, featured image
- `BlogCategory`: Blog categories
- `BlogTag`: Tags for posts

**API Endpoints**:
- `GET /api/blog/posts/`: List blog posts (paginated)
- `GET /api/blog/posts/{slug}/`: Blog post detail
- `GET /api/blog/categories/`: List categories

#### [NEW] [backend/apps/inventory](file:///home/zieeco/Music/pentorax/backend/apps/inventory)

**Purpose**: Stock management and inventory tracking.

**Models**:
- `Stock`: Product stock levels
- `StockMovement`: Inventory transactions (in/out)

**API Endpoints**:
- `GET /api/products/{id}/stock/`: Check product availability

---

### Frontend Components

#### [MODIFY] [frontend/src/index.css](file:///home/zieeco/Music/pentorax/src/index.css)

**Changes**:
- Preserve all existing CSS variables (`:root` and `.dark`)
- Maintain brand colors: `--primary: 199 82% 52%`, `--secondary: 43 94% 64%`, `--accent: 158 45% 46%`
- Keep all custom animations and utilities
- No hardcoded color values allowed

#### [MODIFY] [frontend/tailwind.config.js](file:///home/zieeco/Music/pentorax/tailwind.config.js)

**Changes**:
- Update `content` paths to reflect new structure
- Preserve all existing color definitions using CSS variables
- Maintain custom animations (float, shimmer, energy-flow, glow-pulse)
- Keep brand palette configuration

#### [MODIFY] Existing Landing Page Components

Move all existing components to `frontend/src/components/landing/`:
- [Hero.tsx](file:///home/zieeco/Music/pentorax/src/components/Hero.tsx) → `frontend/src/components/landing/Hero.tsx`
- [Header.tsx](file:///home/zieeco/Music/pentorax/src/components/Header.tsx) → `frontend/src/components/landing/Header.tsx`
- [Solutions.tsx](file:///home/zieeco/Music/pentorax/src/components/Solutions.tsx) → `frontend/src/components/landing/Solutions.tsx`
- [CallToAction.tsx](file:///home/zieeco/Music/pentorax/src/components/CallToAction.tsx) → `frontend/src/components/landing/CallToAction.tsx`
- [Offerings.tsx](file:///home/zieeco/Music/pentorax/src/components/Offerings.tsx) → `frontend/src/components/landing/Offerings.tsx`
- [Journey.tsx](file:///home/zieeco/Music/pentorax/src/components/Journey.tsx) → `frontend/src/components/landing/Journey.tsx`
- [Testimonials.tsx](file:///home/zieeco/Music/pentorax/src/components/Testimonials.tsx) → `frontend/src/components/landing/Testimonials.tsx`
- [CustomerStories.tsx](file:///home/zieeco/Music/pentorax/src/components/CustomerStories.tsx) → `frontend/src/components/landing/CustomerStories.tsx`
- [CaseStudies.tsx](file:///home/zieeco/Music/pentorax/src/components/CaseStudies.tsx) → `frontend/src/components/landing/CaseStudies.tsx`
- [Partners.tsx](file:///home/zieeco/Music/pentorax/src/components/Partners.tsx) → `frontend/src/components/landing/Partners.tsx`
- [Contact.tsx](file:///home/zieeco/Music/pentorax/src/components/Contact.tsx) → `frontend/src/components/landing/Contact.tsx`
- [Footer.tsx](file:///home/zieeco/Music/pentorax/src/components/Footer.tsx) → `frontend/src/components/landing/Footer.tsx`
- [Process.tsx](file:///home/zieeco/Music/pentorax/src/components/Process.tsx) → `frontend/src/components/landing/Process.tsx`

**Styling Preservation**:
- All components must continue using CSS variables via Tailwind classes
- No hardcoded colors (e.g., `#29ABE2` → `bg-primary`)
- Maintain existing animations and transitions

#### [NEW] E-commerce Components

Create new components in `frontend/src/components/shop/`:
- `ProductCard.tsx`: Product display card using `bg-card`, `text-card-foreground`
- `ProductGrid.tsx`: Grid layout for products
- `ProductFilter.tsx`: Category/price filtering
- `ProductDetail.tsx`: Full product view
- `CartDrawer.tsx`: Sliding cart panel
- `CartItem.tsx`: Cart item row
- `CheckoutForm.tsx`: Multi-step checkout
- `PaystackButton.tsx`: Paystack payment integration
- `ReviewForm.tsx`: Review submission form
- `ReviewList.tsx`: Display product reviews

**Styling Requirements**:
- Use `bg-primary`, `bg-secondary`, `bg-accent` for brand colors
- Use `text-foreground`, `text-muted-foreground` for text
- Use `border-border`, `bg-card` for UI elements
- Apply existing animations (`animate-shimmer`, `animate-glow-pulse`)

#### [NEW] Blog Components

Create new components in `frontend/src/components/blog/`:
- `BlogCard.tsx`: Blog post preview card
- `BlogGrid.tsx`: Blog post listing
- `BlogPost.tsx`: Full blog post view
- `BlogSidebar.tsx`: Categories, tags, recent posts

#### [NEW] API Services

Create `frontend/src/services/api.ts`:
- Axios instance with Supabase auth token injection
- API client functions for all backend endpoints
- Error handling and retry logic

#### [NEW] Routing

Update `frontend/src/App.tsx`:
- React Router v6 setup
- Routes for landing, shop, product detail, cart, checkout, blog
- Protected routes for authenticated users

---

### Docker Configuration

#### [NEW] [backend/Dockerfile](file:///home/zieeco/Music/pentorax/backend/Dockerfile)

**Multi-stage build**:
- Base stage: Python 3.12, install dependencies
- Development stage: Include dev tools
- Production stage: Optimized, gunicorn server

#### [NEW] [frontend/Dockerfile](file:///home/zieeco/Music/pentorax/frontend/Dockerfile)

**Multi-stage build**:
- Build stage: Node 20, build React app
- Production stage: Nginx to serve static files

#### [NEW] [docker/docker-compose.yml](file:///home/zieeco/Music/pentorax/docker/docker-compose.yml)

**Services**:
- `backend`: Django app on port 8000
- `frontend`: React dev server on port 5173 (dev) or Nginx on port 80 (prod)
- Volumes for hot-reloading in development
- Environment variable injection

---

### Makefile Commands

#### [NEW] [Makefile](file:///home/zieeco/Music/pentorax/Makefile)

**Commands**:
```makefile
dev:                    # Start both frontend and backend in dev mode
build:                  # Build Docker images
up:                     # Start containers
down:                   # Stop containers
logs:                   # View logs
shell-backend:          # Django shell
shell-frontend:         # Frontend container shell
migrate:                # Run Django migrations
makemigrations:         # Create Django migrations
test-backend:           # Run Django tests
test-frontend:          # Run frontend tests
lint:                   # Lint both frontend and backend
format:                 # Format code
clean:                  # Clean up containers and volumes
```

---

### Environment Configuration

#### [NEW] [.env.example](file:///home/zieeco/Music/pentorax/.env.example)

**Backend Variables**:
```
DJANGO_SECRET_KEY=
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=

CORS_ALLOWED_ORIGINS=http://localhost:5173
```

**Frontend Variables**:
```
VITE_API_URL=http://localhost:8000/api
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_PAYSTACK_PUBLIC_KEY=
```

---

## Verification Plan

### Automated Tests

#### Backend Tests

**Django Unit Tests**:
```bash
make test-backend
# Runs: docker-compose exec backend python manage.py test
```

**Test Coverage**:
- `apps/products/tests/test_models.py`: Product, Category model tests
- `apps/cart/tests/test_api.py`: Cart API endpoint tests
- `apps/orders/tests/test_checkout.py`: Order creation flow
- `apps/payments/tests/test_paystack.py`: Payment initialization (mocked)
- `apps/reviews/tests/test_permissions.py`: Review permission tests
- `apps/blog/tests/test_api.py`: Blog API tests

**API Integration Tests**:
```bash
docker-compose exec backend python manage.py test apps.products.tests.test_integration
```

#### Frontend Tests

**Component Tests** (if time permits):
```bash
make test-frontend
# Runs: docker-compose exec frontend npm test
```

### Manual Verification

#### 1. Monorepo Structure Verification

**Steps**:
1. Run `ls -la` in project root
2. Verify `backend/`, `frontend/`, `docker/` directories exist
3. Verify `Makefile` exists
4. Check `backend/apps/` contains all 8 app directories

**Expected Result**: Clean monorepo structure with separated frontend/backend.

#### 2. Development Environment Startup

**Steps**:
1. Copy `.env.example` to `.env` and fill in Supabase/Paystack credentials
2. Run `make build`
3. Run `make dev`
4. Wait for both services to start
5. Check `http://localhost:5173` (frontend)
6. Check `http://localhost:8000/api/` (backend API)

**Expected Result**: Both services running without errors.

#### 3. Styling Preservation Verification

**Steps**:
1. Open `http://localhost:5173` in browser
2. Verify landing page looks identical to original
3. Check hero section gradient and animations
4. Verify "Get A Free Quote Today" button uses `bg-primary` (blue #29ABE2)
5. Toggle dark mode (if implemented) - colors should adapt via CSS variables
6. Inspect element - verify no hardcoded color values in inline styles

**Expected Result**: Visual appearance unchanged, all colors use CSS variables.

#### 4. E-commerce Flow Verification

**Steps**:
1. Navigate to `/shop` page
2. Verify product grid displays (may be empty initially)
3. Click on a product (if seeded) → verify product detail page
4. Click "Add to Cart" → verify cart drawer opens
5. Adjust quantity → verify cart updates
6. Click "Checkout" → verify checkout form
7. Fill form and click "Pay with Paystack"
8. Verify Paystack modal opens (use test keys)
9. Complete test payment
10. Verify order confirmation page

**Expected Result**: Complete checkout flow working with Paystack integration.

#### 5. Blog Verification

**Steps**:
1. Navigate to `/blog` page
2. Verify blog post grid displays
3. Click on a blog post → verify full post view
4. Verify sidebar shows categories/tags

**Expected Result**: Blog system functional with proper routing.

#### 6. Quote Request Verification

**Steps**:
1. On landing page, click "Get A Free Quote Today"
2. Verify quote form modal/page opens
3. Fill form with test data
4. Submit form
5. Check Django admin or database for quote record

**Expected Result**: Quote request saved to database.

#### 7. Docker Verification

**Steps**:
1. Run `docker ps` → verify both containers running
2. Run `make logs` → verify no error logs
3. Run `make down` → verify containers stop
4. Run `make up` → verify containers restart successfully

**Expected Result**: Docker orchestration working correctly.

#### 8. Makefile Commands Verification

**Steps**:
1. Test each Makefile command:
   - `make shell-backend` → Django shell opens
   - `make migrate` → Migrations run
   - `make makemigrations` → Creates migrations
   - `make lint` → Linting runs
2. Verify all commands execute without errors

**Expected Result**: All Makefile commands functional.

---

### User Manual Testing

> [!NOTE]
> **User Involvement Required**
>
> After implementation, please manually test:
> 1. **Supabase Auth**: Sign up, login, logout flows
> 2. **Paystack Payment**: Complete a real transaction with test credentials
> 3. **Media Upload**: Upload product images via Django admin
> 4. **Responsive Design**: Test on mobile, tablet, desktop
> 5. **Dark Mode**: Toggle and verify all pages
> 6. **Performance**: Check page load times, API response times
