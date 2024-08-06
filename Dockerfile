# Menggunakan image Node.js versi 20 LTS
FROM node:20

# Menetapkan direktori kerja
WORKDIR /app

# Menyalin file package.json dan package-lock.json
COPY package*.json ./

# Menginstal dependensi
RUN npm install

# Menyalin sisa file proyek
COPY . .

# Menjalankan migrasi dan aplikasi
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]