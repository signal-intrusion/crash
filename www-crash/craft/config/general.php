<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(

    '*' => array(
    ),

    '.com' => array(
        'devMode' => false,
        // 'usePathInfo' => true,
        'omitScriptNameInUrls' => true
    ),

    'local' => array(
      'devMode' => true,
      'usePathInfo' => true,
      'omitScriptNameInUrls' => true
    ),

);