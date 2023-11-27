## Instalation

### Requirements

- Docker

### Steps

- Clone this repository
- If composer is not installed run this`docker run --rm \
  -u "$(id -u):$(id -g)" \
  -v "$(pwd):/var/www/html" \
  -w /var/www/html \
  laravelsail/php82-composer:latest \
  composer install --ignore-platform-reqs`
- If composer installed run this `composer install`
- Run this `./vendor/bin/sail up -d` or if you have alias `sail up -d`

## Usage

- Phpstan: `composer phpstan`