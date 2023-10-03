#!/usr/bin/env bash

if ! [ -x "$(command -v openssl)" ]; then
  echo 'Error: openssl is not installed.' >&2
  exit 1
fi

mkdir -p .keys
openssl genpkey -algorithm RSA -out ./.keys/private.key -pkeyopt rsa_keygen_bits:4096
openssl rsa -in ./.keys/private.key -pubout -out ./.keys/public.key