cd ./backend
rem Construyendo imagen backend
docker compose build
cd ../frontend
rem Construyendo imagen frontend
docker compose build
cd ..
rem Construyendo docker conjunto y ejecutando
docker compose up --build
