# Menggunakan image Node.js LTS sebagai base image
FROM node:20

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstal dependencies
RUN npm install -g pm2 && npm install

# Menyalin seluruh kode sumber ke direktori kerja
COPY . .

# Mengekspos port yang akan digunakan oleh aplikasi
EXPOSE 3000

# Menjalankan perintah untuk memulai aplikasi menggunakan PM2
CMD ["pm2-runtime", "start", "src/app.js", "--name", "backend-ecatalog-js"]