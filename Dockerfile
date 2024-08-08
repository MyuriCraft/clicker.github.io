FROM php:8.0-apache

#RUN docker-php-ext-install pdo pdo_mysql
RUN apt-get update && apt-get install -y libzip-dev zip curl libpng-dev libonig-dev libjpeg-dev libfreetype6-dev
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && docker-php-ext-install -j$(nproc) mysqli pdo pdo_mysql zip gd mbstring exif iconv

COPY / /var/www/html

EXPOSE 80