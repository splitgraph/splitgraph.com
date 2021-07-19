#!/usr/bin/env bash

exit_with_err() {
  echo >&2 "Fatal error: $1"; exit 1;
}

test -z "$NOTIFY_WEBHOOK"     && { exit_with_err "Missing NOTIFY_WEBHOOK"; }
command -v jq >/dev/null 2>&1 || { exit_with_err "Missing jq"; }
type jq >/dev/null 2>&1       || { exit_with_err "Missing jq"; }
hash jq 2>/dev/null           || { exit_with_err "Missing jq"; }

if test -f "$1" ; then
    message_body="$(cat "$1")"
elif test -z "$1" ; then
    message_body "Got notify.sh without a message_body"
else
    message_body="$*"
fi


touch preamble.txt
message="$(printf "%s%s%s\n\n%s" \
           "$JOB_ICON" \
           "$(test -n "$JOB_ICON" && echo -n "&emsp;")" \
           "$(cat preamble.txt)" \
           "$message_body" \
       )"

set -e
echo "Send notification..."

echo "---> message"
echo "$message"
echo "----"

# Merge $message into the payload object (currently no other keys)
PAYLOAD='{
}'

body=$(echo $PAYLOAD | jq -c --arg text "$message" '.text = $text')

echo "---> preamble"
cat preamble.txt
echo "----"

echo "---> body"
echo "$body"
echo "----"

curl -i -X POST -H 'Content-Type: application/json' \
    -d "$body" "$NOTIFY_WEBHOOK"
