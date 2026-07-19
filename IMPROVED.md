# IMPROVED.md — deliberate deviations from the references

Log of every place this pass intentionally departs from solidroad.com (navbar+hero)
or agentify-template.webflow.io (body). Everything else is rebuilt to measurement.

| # | section | deviation | why it is an improvement |
|---|---------|-----------|--------------------------|
| 1 | showcase | Replaced the fictional Gujarati demo-site wireframe with a real capture of a live generated demo (`public/demo/showcase-overview.webp`) inside the same CSS browser chrome | A real capture proves the product output instead of illustrating it; the lede copy was updated so it no longer claims "no real shop is shown" |
| 2 | hero | The layered SVG ridge art is gone; the scene is now our own dusk photography (opaque panorama background + alpha-cutout foreground peak), with the lime journey line relocated over the photographed ridge | Matches the ref's photographic composition with assets we own — no reference-site files shipped |
| 3 | hero | Entrance choreography starts at hydration with no added base delay; the ref's shared start lands ~710ms post-navigation because that is when its JS runs | Same landing order/durations/easing without artificially freezing the hero for 0.7s |
| 4 | navbar | Scrolled state flips to our dark body surface (#0E0D14/85 + blur) instead of the ref's solid white | The ref's body is white, ours is Agentify near-black; flipping to the body surface is the same design move in our palette |
| 5 | from-the-field | Featured pull-quote composition adopted, but stars and client-quote framing are replaced by lime layer tags and explicit "illustrative" labels; collage photography is our own panorama in grayscale | Honesty rules: no invented testimonials, no stock imagery |
| 6 | how-it-works | The ref's blurred human photo cell is our own dusk photograph under a deep-green wash with the journey-line overlay kept | No-stock rule; ties the section back to the hero's photography |
| 7 | showcase | The ref's office-interior photo panel remains a CSS-composed warm scene (with the measured 1.3→1 scroll scrub applied to it) | No-stock rule — no real interior photography is available to us |
| 8 | final-cta | Panel stays solid lime (prior spec ruling) with the ref's edge stripe texture and ~590px vertical air added on top | Keeps the established brand move while adopting the ref's texture and breathing room |
| 9 | buttons | The ref's 16×16 lime corner squares are not reproduced; our offset `frame-lime` hairline (plus the measured torn-edge fill, inset highlight, and dual-label hover slide) is the frame treatment | One frame language across the page instead of two competing ornaments |
| 10 | faq | The ref's 2-col intro-left accordion composition is not adopted; the centered single column stays (row height and question weight were brought to ref values) | Prior accepted spec deviation; centered column reads better with our shorter FAQ copy |
