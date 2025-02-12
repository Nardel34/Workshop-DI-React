#!/bin/bash
# Vérifiez si jq et yq sont installés
if ! command -v jq &> /dev/null || ! command -v yq &> /dev/null
then
    echo "jq et yq sont requis pour exécuter ce script."
    exit 1
fi

# Vérifiez si les arguments sont donnés
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <fichier.json> <fichier.yaml>"
    exit 1
fi

# Echo the given arguments
echo "Versionning de sso.identities.web: $1 $2"

# Les fichiers d'entrée
JSON_FILE=$1
YAML_FILE=$2

# Vérifiez si les fichiers existent
if [ ! -f "$JSON_FILE" ] || [ ! -f "$YAML_FILE" ]; then
    echo "Les fichiers spécifiés n'existent pas."
    exit 1
fi

# Mise à jour pour sso.identities.web si présente
if jq -e '. | has("sso.identities.web")' "$JSON_FILE" > /dev/null; then
    WEB_VALUE=$(jq -r '.["sso.identities.web"]' "$JSON_FILE")
    yq eval -i ".ssoIdentitiesWeb.tag = \"$WEB_VALUE\"" "$YAML_FILE"
    echo "La valeur pour sso.identities.web a été mise à jour : $WEB_VALUE"
else
    echo "Clé 'sso.identities.web' absente du JSON : Aucune opération effectuée."
fi