FROM nginx:latest

RUN mkdir -p /etc/nginx/keys/

COPY ./keys /etc/nginx/keys/
RUN chown -R $USER:$USER /etc/nginx/keys/*
RUN chmod -R 600 /etc/nginx/keys/*

COPY ./conf.d /etc/nginx/conf.d/

#sudo mkdir /etc/nginx/ssl
#sudo chmod -R 600 /etc/nginx/ssl

CMD nginx -g "daemon off;"
