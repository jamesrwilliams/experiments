<?php

            // Get the users lat and lng
            $user_lat    = $users_geom->results[0]->geometry->location->lat;
            $user_lng    = $users_geom->results[0]->geometry->location->lng;

            // Set up array of dealer data
            $available_dealers = [];

            $loop = new WP_Query(['post_type' => 'dealers', 'posts_per_page' => -1]);
            
            if ($loop->have_posts()) {

                $distances    = [];
                $pi_deg        = pi() / 180;
                
                $i = 0;
                while ($loop->have_posts()) {
                    $loop->the_post();

                    // Get dealer data from ACF fields
                    $d_telephone_fax    = get_field('telephone_fax');
                    $d_emails            = get_field('emails');
                    $d_website            = get_field('website');
                    $d_location            = get_field('location');

                    // Add dealer to reusable array
                    $available_dealers[$i] = [
                        'id'        => get_the_id(),
                        'name'        => get_the_title(),
                        'permalink'    => add_query_arg('from', $postcode, get_permalink()),
                        'fields'    => [
                            'telephone_fax'    => $d_telephone_fax,
                            'emails'        => $d_emails,
                            'website'        => $d_website,
                            'location'        => $d_location ?: []
                        ]
                    ];

                    // If has dealer location data
                    if (!empty($d_location)) {

                        // Dealer lat and long
                        $dealer_lat    = $d_location['lat'];
                        $dealer_lng    = $d_location['lng'];

                        // Eh?
                        $lat_rad    = ($dealer_lat - $user_lat) * $pi_deg;
                        $lng_rad    = ($dealer_lng - $user_lng) * $pi_deg;
                        
                        // Some crazy math shit.. don't know what it does, but it works (y) <-- only msn users will remeber that
                        $area            = sin($lat_rad/2) * sin($lat_rad / 2) + cos($user_lat * $pi_deg) * cos($user_lat * $pi_deg) * sin($lng_rad / 2) * sin($lng_rad / 2);
                        $circumference    = 2 * atan2(sqrt($area), sqrt(1 - $area));
                        $distance        = 6371 * $circumference; // Radius of earth in km * value gives distance in miles

                        // Add distance to array for sorting
                        $distances[$i] = $distance;

                        // Add distance to dealer for matching
                        $available_dealers[$i]['distance'] = $distance;

                        $i++;
                    }
                }

                // Sort distances, closest first
                sort($distances);

                // Get the first three closest dealers
                $closest_three = array_slice($distances, 0, 3);

                // Generate results
                $resutls = [];
                foreach ($closest_three as $key) {
                    $matched_key = array_search($key, array_column($available_dealers, 'distance'));
                    $results[] = $available_dealers[$matched_key];
                }

                // Send results to JS
                return wp_send_json_success([
                    'closest' => $results
                ]);
            }