# Project1 Frontend

Frontend hoàn chỉnh cho Project1, được xây dựng với **Next.js 14**, **React**, **TypeScript**, **Tailwind CSS** và chạy trên **Bun runtime**.

## 🚀 Công nghệ sử dụng

### Core
- **Next.js 14** - React framework với App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Bun** - JavaScript runtime (thay thế Node.js)

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable components với Radix UI
- **Lucide React** - Icon library
- **class-variance-authority** - CSS variants

### State Management & Data Fetching
- **Zustand** - State management (Auth, Data)
- **Axios** - HTTP client với interceptors
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### UI Components
- Dialog, Dropdown Menu, Select, Tabs
- Toast notifications
- Cards, Buttons, Inputs, Labels

## 📁 Cấu trúc dự án

```
frontend/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── auth/                 # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/            # Dashboard pages
│   │   │   ├── buildings/        # Quản lý tòa nhà
│   │   │   ├── levels/           # Quản lý tầng
│   │   │   ├── zones/            # Quản lý khu vực
│   │   │   ├── departments/      # Quản lý phòng ban
│   │   │   ├── doors/            # Quản lý cửa
│   │   │   ├── devices/          # Quản lý thiết bị
│   │   │   └── layout.tsx
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── auth/                 # Auth components
│   │   │   ├── AuthProvider.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui/                   # shadcn/ui components
│   ├── lib/
│   │   ├── axios.ts              # Axios instance với interceptors
│   │   └── utils.ts              # Utility functions
│   ├── services/
│   │   ├── authService.ts        # Authentication API
│   │   └── apiService.ts         # Data API (buildings, levels, etc.)
│   ├── stores/
│   │   ├── useAuthStore.ts       # Auth state management
│   │   └── useDataStore.ts       # Data state management
│   ├── types/
│   │   ├── user.ts               # User types
│   │   ├── api.ts                # API types
│   │   └── store.ts              # Store types
│   ├── hooks/
│   │   └── use-toast.ts          # Toast hook
│   └── middleware.ts             # Next.js middleware (auth)
├── public/                       # Static files
├── tailwind.config.ts            # Tailwind configuration
├── components.json               # shadcn/ui config
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## 🔧 Cài đặt

### Yêu cầu
- **Bun** >= 1.0.0 ([Hướng dẫn cài đặt](https://bun.sh))
- Backend NestJS đang chạy trên port 3000

### Cài đặt dependencies

```bash
cd frontend
bun install
```

## 🏃 Chạy ứng dụng

### Development

```bash
bun run dev
```

Frontend sẽ chạy tại: **http://localhost:3001**

### Production Build

```bash
bun run build
bun run start
```

## 🔐 Authentication Flow

1. **Login/Register** - Người dùng đăng nhập hoặc đăng ký
2. **Token Storage** - Access token và refresh token được lưu trong localStorage
3. **Auto-refresh** - Axios interceptor tự động refresh token khi hết hạn
4. **Protected Routes** - Middleware kiểm tra authentication cho các route được bảo vệ
5. **Zustand Store** - Lưu trữ user state và auth state

## 📡 API Integration

### Backend API
- **Base URL**: `http://localhost:3000/api`
- **Proxy**: Next.js rewrites `/api/*` → `http://localhost:3000/*`

### Available Endpoints

#### Authentication
- `POST /login` - Đăng nhập
- `POST /auth/register` - Đăng ký
- `POST /auth/logout` - Đăng xuất
- `GET /auth/me` - Lấy thông tin user hiện tại
- `POST /auth/refresh` - Refresh token

#### Data Management
- `GET /buildings` - Danh sách tòa nhà
- `GET /levels` - Danh sách tầng
- `GET /zones` - Danh sách khu vực
- `GET /departments` - Danh sách phòng ban
- `GET /doors` - Danh sách cửa
- `GET /devices` - Danh sách thiết bị

## 🎨 Features

### ✅ Đã hoàn thành

- **Authentication System**
  - Login/Register với validation
  - JWT token management
  - Auto-refresh tokens
  - Protected routes với middleware
  - User profile management

- **Dashboard**
  - Tổng quan hệ thống
  - Statistics cards
  - Navigation sidebar
  - User dropdown menu

- **Data Management Pages**
  - Quản lý tòa nhà (Buildings)
  - Quản lý tầng (Levels)
  - Quản lý khu vực (Zones)
  - Quản lý phòng ban (Departments)
  - Quản lý cửa (Doors)
  - Quản lý thiết bị (Devices)

- **UI/UX**
  - Responsive design
  - Dark mode ready (CSS variables)
  - Toast notifications
  - Loading states
  - Empty states
  - Error handling

## 🛠️ shadcn/ui Components

Để thêm components từ shadcn/ui:

```bash
bunx shadcn@latest add [component-name]
```

Ví dụ:
```bash
bunx shadcn@latest add button
bunx shadcn@latest add dialog
bunx shadcn@latest add table
```

Xem danh sách components: https://ui.shadcn.com/

## 🌍 Environment Variables

Tạo file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📝 Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
```

## 🔄 State Management

### Auth Store (useAuthStore)
```typescript
- user: User | null
- accessToken: string | null
- refreshToken: string | null
- isAuthenticated: boolean
- login(credentials)
- register(data)
- logout()
- getCurrentUser()
```

### Data Store (useDataStore)
```typescript
- buildings: Building[]
- levels: Level[]
- zones: Zone[]
- departments: Department[]
- doors: Door[]
- devices: Device[]
- fetchBuildings()
- fetchLevels()
- fetchZones()
...
```

## 🎯 Routing

- `/` - Redirect to dashboard
- `/login` - Login page
- `/auth/register` - Register page
- `/dashboard` - Dashboard overview
- `/dashboard/buildings` - Buildings management
- `/dashboard/levels` - Levels management
- `/dashboard/zones` - Zones management
- `/dashboard/departments` - Departments management
- `/dashboard/doors` - Doors management
- `/dashboard/devices` - Devices management

## 🚦 Middleware

Middleware tự động:
- Kiểm tra authentication
- Redirect chưa đăng nhập → `/login`
- Redirect đã đăng nhập → `/dashboard`

## 💡 Tips

### Chạy với Bun
```bash
# Development
bun --bun run next dev -p 3001

# Production
bun --bun run next build
bun --bun run next start -p 3001
```

### Debugging
- Check browser console cho API errors
- Check Network tab cho request/response
- Check localStorage cho tokens

## 🤝 Contributing

1. Tạo feature branch
2. Commit changes
3. Push to branch
4. Create Pull Request

## 📄 License

MIT License

