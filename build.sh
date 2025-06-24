#!/usr/bin/env bash

VERSION=$1

docker buildx build --platform linux/amd64 --push \
  -t 386757133934.dkr.ecr.us-east-1.amazonaws.com/edyta/self-serve-example:latest \
  -t 386757133934.dkr.ecr.us-east-1.amazonaws.com/edyta/self-serve-example:"$VERSION" .
