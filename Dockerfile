FROM node:20

WORKDIR /app
COPY . .
EXPOSE 3000
RUN npm i
CMD ["npm","start"]

# docker build .
# docker run -d -p 3000:3000 <id image>
# docker stop <id container>