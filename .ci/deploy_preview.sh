#!/usr/bin/env bash

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR="$CI_DIR/.."

COMMITISH="$(git rev-parse HEAD | cut -c -8)"
COMMIT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

# We don't want google indexing the preview website(s)
# Inject robots.txt here instead of at build step, because this is only for preview
inject_robots_txt() {
    cat <<EOF > "${SPLITGRAPH_DIR}/docs/out/robots.txt" && return 0
User-agent: *
Disallow: /
EOF
    return 1
}

pushd "$SPLITGRAPH_DIR" \
    && inject_robots_txt \
    && echo "Deploy preview: $COMMITISH ($COMMIT_BRANCH)" \
    && yarn deploy \
        $( test ! -z $NOW_TOKEN && echo "--token $NOW_TOKEN" ) \
        --force \
        -m COMMITISH="$COMMITISH" \
        -m COMMIT_BRANCH="$COMMIT_BRANCH" \
    && echo "" \
    && echo "Deployment successful" \
    && echo "Deployment URL: $("$CI_DIR"/get_preview_url.sh)" \
    && echo \
    && exit 0

exit 1
