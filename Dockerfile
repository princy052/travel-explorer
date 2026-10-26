
FROM nginx:alpine

COPY index.html destinations.html place.html about.html tips.html contact.html login.html register.html /usr/share/nginx/html/

COPY style.css script.js /usr/share/nginx/html/

RUN sed -i 's/index.*index.html.*/index login.html;/' /etc/nginx/conf.d/default.conf

EXPOSE 80
