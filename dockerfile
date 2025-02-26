FROM node:22.14.0-slim

WORKDIR /app

# Copies dependecy files (uses cache to avoid re-downloading an bigger compilation times)
COPY package*.json ./

RUN npm install

#Copy file without this generate problems
COPY . .

#runnig prisma without coping generate problems
RUN npx prisma generate

#Be sure tha there is a build script on package json
RUN npm run build

ENV DATABASE_URL="mongodb+srv://projetoaprendizurucania:Maranata386@projetoaprendizurucania.orhat.mongodb.net/ProjetoAprendizUrucania?retryWrites=true&w=majority&appName=ProjetoAprendizUrucania"

ENV JWT="c9bd4601dd9f791eedf663b0eec348cbad4578b1c70cfeaeeaf38e087533693f" 

#exposes port
EXPOSE 5722 

CMD ["npx", "ts-node", "src/server/server.ts"]
