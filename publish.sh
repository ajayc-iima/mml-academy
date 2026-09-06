#!/usr/bin/env bash
# One-shot publisher for MML Academy -> GitHub Pages.
# Run inside this folder in Git Bash:  bash publish.sh
set -e
cd "$(dirname "$0")"

read -r -p "GitHub username: " GH_USER
read -r -p "Repo name [mml-academy]: " REPO_NAME
REPO_NAME=${REPO_NAME:-mml-academy}

echo
echo ">> Make sure you have created the EMPTY repo first:"
echo ">>   https://github.com/new  ->  name: $REPO_NAME  ->  Public  ->  Create"
echo ">>   (do NOT add a README/license there)"
echo
read -r -p "Press Enter once the repo exists on github.com..."

git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$GH_USER/$REPO_NAME.git"

echo ">> Pushing (a login window may open the first time)..."
git push -u origin main

echo
echo ">> DONE. Now enable Pages (one-time, 30 seconds):"
echo ">>   1. Open: https://github.com/$GH_USER/$REPO_NAME/settings/pages"
echo ">>   2. Source: 'Deploy from a branch'"
echo ">>   3. Branch: 'main'  +  Folder: '/ (root)'  ->  Save"
echo
echo ">> Your app goes live in ~1 minute at:"
echo ">>   https://$GH_USER.github.io/$REPO_NAME/"
