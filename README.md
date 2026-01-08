# Project-1

Dự án bao gồm:
- **Backend**
- **Frontend**
- **Nginx** (reverse proxy)
- Chạy bằng **Docker Compose** hoặc chạy trực tiếp (Local)

---

## 📂 Cấu trúc thư mục
```text
Project-1/
├── project1/       # Thư mục Backend
├── frontend/       # Thư mục Frontend
├── nginx/          # Cấu hình Nginx
└── docker-compose.yml
```
---

## 🛠 Yêu cầu hệ thống

Trước khi cài đặt, đảm bảo máy bạn đã có:
- **Git**
- **Node.js**
- **Bun**
- **Docker & Docker Compose**

### Kiểm tra cài đặt:
- Git: `git --version`
- Node & NPM: `node -v` và `npm -v`
- Bun: `bun -v`
- Docker: `docker --version` và `docker compose version`

---

## 🚀 Các bước chuẩn bị chung

### Bước 1: Clone dự án
```bash
git clone https://github.com/Mr-Gwenchana/Project-1.git
cd Project-1
```

### Bước 2: Cấu hình môi trường (.env)
1. **Backend (project1):** Mở folder `project1`, tạo file `.env` từ `.env.example`. Thay đổi các thông tin sau:
   - `NAVIS_BASE_URL`: Link URL hệ thống Navis
   - `NAVIS_USERNAME`: Tên đăng nhập hệ thống Navis
   - `NAVIS_PASSWORD`: Mật khẩu đăng nhập hệ thống Navis
2. **Frontend:** Mở folder `frontend`, trong file `.env.local`, đổi `8080` của `NEXT_PUBLIC_API_URL` thành số cổng của Backend (mặc định là `3000`).

---

## 💻 Phương pháp 1: Chạy trực tiếp (Local Development)

### 1. Cài đặt thư viện
- Frontend: Truy cập `frontend` và chạy: `bun install`
- Backend: Truy cập `project1` và chạy: `npm install`

### 2. Khởi chạy ứng dụng (Dev Mode)
- Frontend: `bun run dev`
- Backend: `npm run dev`
Sau đó, truy cập vào hệ thống qua địa chỉ: 'http://localhost:3001' 
---

## 🐳 Phương pháp 2: Chạy bằng Docker Compose

### 1. Tải các Docker Images về máy (Pull)
```bash
docker pull mrgwenchana/prj1-backend:v1
docker pull mrgwenchana/prj1-frontend:v1
docker pull mrgwenchana/prj1-nginx:v1
```
### 2. Thông tin chi tiết Images
- **Backend:** [prj1-backend:v1](https://hub.docker.com/layers/mrgwenchana/prj1-backend/v1/images/sha256:3770baf25d8b338435967409ae6fd7cb957f55ae70a382efe9f89383cf521bde)
- **Frontend:** [prj1-frontend:v1](https://hub.docker.com/layers/mrgwenchana/prj1-frontend/v1/images/sha256:d991bf881fec5e4a5ff31bc8f204ddc2aeae1ef9efe8eb15f8821847706b07e3)
- **Nginx:** [prj1-nginx:v1](https://hub.docker.com/layers/mrgwenchana/prj1-nginx/v1/images/sha256:d16138956991cb49d65756e1ec8caa3997e3f03b92c412284f96609ac4096234)

### 3. Khởi động hệ thống
Tại thư mục gốc dự án, chạy lệnh:
```bash
docker-compose up -d
```
Sau đó, truy cập vào hệ thống qua địa chỉ: 'http://localhost:8080' 

### 4. Dừng hệ thống
Để dừng và xóa các container đang chạy:
```bash
docker-compose down
```
---
