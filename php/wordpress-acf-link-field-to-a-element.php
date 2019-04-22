<?php
/**
 * Generate a HTML <a> link from an ACF link field
 *
 * @param string|array $acf_link The ACF field to base the link on.
 * @param array $args Extra configuration to be used.
 * @param array $classes Array of classes that need to be added to the <a>
 * @return void
 */
function print_acf_link( $acf_link, $args, $classes) {

	/***
	 * Define the default arguments.
	 */
	$defaults = array(
		'hide_on_empty' => true,
		'title' => '',
		'target' => false,
		'echo' => true,
	);

	$args = wp_parse_args( $args, $defaults );

	$is_array = is_array( $acf_link );

	if ( $is_array ) {

		$link_target = ( isset( $acf_link['target'] ) ?: $args['target'] );
		$link_url    = ( isset( $acf_link['href'] ) ?: false );
		$link_title  = ( isset( $acf_link['title'] ) ?: $args['title'] );

		$href = ( $args['hide_on_empty'] ? ' href="' . $link_url . '"' : null );

		if ( '' !== $acf_link['href'] || false === $args['hide_on_empty'] ){

			$output = '<a href="" target="">' . $link_title . '</a>';

		}

	} else if ( '' !== $acf_link ) {
		echo $acf_link;
	}

	if( true === $echo ) {
		echo $output;
	} else {
		return $output;
	}
}
