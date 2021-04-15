FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/
COPY nginx/maintenance.html /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]