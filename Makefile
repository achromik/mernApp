## Variables ###

containers-tool = docker-compose
dev-dockerfile = -f docker-compose.yml -f docker-compose.dev.yml
staging-dockerfile = -f docker-compose.yml -f docker-compose.staging.yml

### Build & start app ###

.PHONY: build-dev
build-dev:
	$(containers-tool) $(dev-dockerfile) build

.PHONY: build-staging
build-staging:
	$(containers-tool) $(staging-dockerfile) build

.PHONY: dev
dev:
	$(containers-tool) $(dev-dockerfile) up

.PHONY: staging
staging:
	$(containers-tool) $(staging-dockerfile) up -d
