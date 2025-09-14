# Google Search Engine Robot
# ==========================
User-agent: Googlebot

Allow: /*?lang=
Allow: /hashtag/*?src=
Allow: /search?q=%23
Allow: /i/api/
Disallow: /search/realtime
Disallow: /search/users
Disallow: /search/*/grid

Disallow: /*?
Disallow: /*/followers
Disallow: /*/following

Disallow: /account/deactivated
Disallow: /settings/deactivated


# Every bot that might possibly read and respect this file
# ========================================================
User-agent: *
Disallow: /
