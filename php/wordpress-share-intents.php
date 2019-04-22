<?php
/**
 * Example social share intent URLs.
 *
 * @link https://jamesrwilliams.ca/blog/social-links/
 */
?>
<ul id="share-links">
	<li><a target="_blank" href="https://twitter.com/home?status=<?php the_permalink(); ?>"></a></li>
	<li><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>"></a></li>
	<li><a target="_blank" href="https://plus.google.com/share?url=<?php the_permalink(); ?>"></a></li>
	<li><a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>"></a></li>
	<li><a target="_blank" href="https://pinterest.com/pin/create/button/?url=<?php the_permalink(); ?>"></a></li>
</ul>
