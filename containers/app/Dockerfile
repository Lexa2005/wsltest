FROM php:8.1-fpm
LABEL authors="M9M9Ra"

RUN apt-get -y update
RUN apt-get install -y sudo wget curl git-core nano apt-utils
RUN apt-get -y install nmap

RUN apt-get install -y supervisor
COPY ./supervisor/* /etc/supervisor/conf.d/

RUN docker-php-ext-install mysqli

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

RUN apt-get update && apt-get install -y libpq-dev && docker-php-ext-install pdo pdo_pgsql

COPY conf.d/* $PHP_INI_DIR/conf.d/

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - \
	&& sudo apt-get install -y nodejs \
	&& echo "NODE Version:" && node --version \
	&& echo "NPM Version:" && npm --version;


# todo - Устанавливать вручную !!!
#RUN composer require doctrine/annotations;
#RUN composer global require zircote/swagger-php;

WORKDIR /var/www


#COPY entrypoint.sh /entrypoint.sh
#ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]