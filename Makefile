GCP_PROJECT        ?= fibra-weaving
GCP_REGION         ?= europe-west1
GCP_SA             ?= fibra-dev-build@fibra-weaving.iam.gserviceaccount.com
CLOUD_RUN_SERVICE  ?= fibra-artisan-weaving
CLOUD_RUN_IMAGE    ?= $(GCP_REGION)-docker.pkg.dev/$(GCP_PROJECT)/$(CLOUD_RUN_SERVICE)/$(CLOUD_RUN_SERVICE)

# =============================================================================
# Local Docker
# =============================================================================

docker-build:
	docker build -t $(CLOUD_RUN_SERVICE) .

docker-run:
	docker run -p 8080:8080 $(CLOUD_RUN_SERVICE)

docker: docker-build docker-run

# =============================================================================
# Cloud Run Deployment
# =============================================================================
# Build the image via Cloud Build, push to Artifact Registry, then deploy.

deploy-build:
	gcloud builds submit \
		--config=cloudbuild.yaml \
		--project=$(GCP_PROJECT) \
		--substitutions=_IMAGE=$(CLOUD_RUN_IMAGE)

deploy-run:
	gcloud run deploy $(CLOUD_RUN_SERVICE) \
		--image=$(CLOUD_RUN_IMAGE):latest \
		--region=$(GCP_REGION) \
		--project=$(GCP_PROJECT) \
		--allow-unauthenticated \
		--service-account=$(GCP_SA) \
		--port=8080 \
		--memory=512Mi \
		--cpu=1 \
		--concurrency=80 \
		--min-instances=0 \
		--max-instances=3

deploy: deploy-build deploy-run
