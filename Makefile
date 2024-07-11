install:
	echo "Installing..."
	docker run --rm \
         -u "$(id -u):$(id -g)" \
         -v "$(pwd):/var/www/html" \
         -w /var/www/html \
         laravelsail/php83-composer:latest \
         composer install --ignore-platform-reqs
	@echo "Done!"
	cp .env.example .env
	./vendor/bin/sail up -d
	./vendor/bin/sail npm install
	./vendor/bin/sail artisan key:generate
	./vendor/bin/sail artisan migrate
	./vendor/bin/sail artisan db:seed
	./vendor/bin/sail artisan ziggy:generate
	@echo "Running..."

pull:
	@echo "Pulling..."
	@git pull
	./vendor/bin/sail up -d
	./vendor/bin/sail composer install
	./vendor/bin/sail artisan migrate
	./vendor/bin/sail artisan cache:clear
	./vendor/bin/sail artisan ziggy:generate
	@echo "Done!"
