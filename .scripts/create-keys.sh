#!/usr/bin/env bash
# Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
# http://github.com/fonoster/goodtok
#
# This file is part of Goodtok
#
# Licensed under the MIT License (the "License");
# you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
#
# https://opensource.org/licenses/MIT
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
set -e

if ! [ -x "$(command -v openssl)" ]; then
  echo 'Error: openssl is not installed.' >&2
  exit 1
fi

mkdir -p .keys
openssl genpkey -algorithm RSA -out ./.keys/private.key -pkeyopt rsa_keygen_bits:4096
openssl rsa -in ./.keys/private.key -pubout -out ./.keys/public.key