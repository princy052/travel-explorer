
FROM nginx:alpine

COPY index.html destinations.html place.html about.html tips.html contact.html /usr/share/nginx/html/

COPY style.css script.js /usr/share/nginx/html/

EXPOSE 80
