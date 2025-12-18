# Remplace complètement ton fichier eslint.config.mjs
cat > eslint.config.mjs << 'EOF'
import next from "eslint-config-next";

export default [
  ...next,
];
EOF