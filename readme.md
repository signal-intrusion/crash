Introduction
========================

This document describes the information architecture of the site and all its elements to facilitate and guide development. All document types, fields, categories, pages, etc. will be described here.

CMS
-------

The Video Game Crash will be built upon the Craft CMS.
Resources:

Craft CMS Docs: https://buildwithcraft.com/
Craft Supplemental Tutorials and Docs: http://straightupcraft.com/
Craft Google Group: https://plus.google.com/communities/106505340287442511226

Animations
-------

These are the animations that appear in the margins and elsewhere. They function like pull quotes attracting the reader to a section. Shortcodes will tell js where to drop these animations into the DOM.

Interface Elements
========================

Sidebar
-------

The sidebar is the dynamic marginal notes or side notes displayed on the right of the page. as the user scrolls these notes change depending on the chapter. We way need to find a way to have more than one batch of side notes per chapter.

Sprite Tray
-----------

The sprite tray lives in the left margin of the page on a desktop view and possibly in the nav bar on a mobile viewport. It is an accordion of drop down menu that displays the sprites the reader has collected.

Timeline
--------

The timeline is a feature that helps readers skim the story. It lives at the bottom of the page providing a description of events that took place in the story on the year the reader is currently reading. The reader can click on the timeline and be pulled to a new chapter of the story.

Navbar
-------

Categories
========================

Stories
-------

A `story` is the complete narrative of a company, event, or concept. It's the vertical element of the larger narrative. ex. The story of Atari or the story of the Arcades. A story is made of a series of chapters.

| |
|\*| chapter
| |
|\*| chapter
| |
|\*| chapter
| |

In the Craft CMS a story is represented by a `category`. ex. `nintendo` or `moral panic`. Chapters will be called `levels` and be arranged in order by the chapter number to form the `story`. Stories also have one `storyTimeline` entry that renders the timeline in the browser.

Aside-categories
----------------

`aside-category` will be a category model describing the kind of `aside`. It will be used for layout options:

- `bio`, `company`, `event`, `source`, `excerpt` asides that have short descriptions of people, events, etc and allow the reader to acces other chapters and stories.

Entries
========================

Chapter
--------

A `chapter` is a part of the `story`. Chapters will be `entries` of type `chapter` in the Craft CMS. Chapters have the following fields:

- `number` integer representing level/chapter number [req]
- `title` [req]
- `chapterBody` Matrix field for the content of the story. Field for images and blockquotes. Shortcodes go in text.
- `sidenotes` One or more things that appear in the sidebar as user scrolls through. References to `aside` entries [req]
- `banner` large image to break up flow. reference to an image `asset`
- `sprite` if this chapter earns the reader a sprite. reference to `sprite` entry
- `tags` Craft CMS tag field for semantics
- `javascript` string ron the name of the javascript file that will run the animations for this chapter
- `citations` List of citations that appear in accordion at bottom of the chapter. Reference to `citation` entries

**Unaswered question:** It may be best to use the matrix field to pull together all of the body content (images, pullquotes, etc). The matrix field might eliminate a lot of our need for shortcodes.

Aside
--------

An `aside` is an entry that refers to and is referenced by one or more chapters. These will be displayed in the sidebar. Asides provide in context information and cross links. Asides can have a few different categories `bio`, `company`, `event`, `source`. Asides have the following fields:

- `title` [req]
- `quote` a pithy quote about the thing in the aside
- `body` the content of the aside. A brief paragraph written in Craft's GUI. [req]
- `chapter` chapters that this aside appears in [req]
- `sidenotes` What what this supposed to be??? Things that appear in the sidebar as user scrolls through. References to `aside` entries [req]
- `links` Links/references to other entries for further reading. these links can be bookmarked
- `sprite` if this aside earns the reader a sprite. reference to `sprite` entry
- `tags` Craft CMS tag field for semantics
– `citation` generally for excerpt asides

Media
--------

A `media` entry will be a video or image gallery. Media entries will be listed in the side-notes and slide in like the asides.

- `title` short description/title of the entry
- `images` references to image assets [req]
- `video` a link to a video [req]
- `body` short description of the media entry. [req]
- `tags` Craft CMS tag field for semantics
– `citation`

Citation
--------

A `citation` is an entry that contains metadata for creating a citation at the bottom of a chapter. These will follow APA style. Citations contain the following fields:

- `title` book or journal title [req]
- `article` title of artcle
- `year` [req]
- `author` [req]
- `page`
- `address` web address for online publication
- `type` type of publication ie book, periodical. Used for layout purposes [req]
- `side-note` for major sources or authors ie. Tristan Donovan or Vending Times. A referesnce to an `aside` entry of `aside-category` == `source`

Sprite
--------

A `sprite` is an entry that serves a few functions: bookmark, reminder, achievement. Sprites help readers track their progress, get access to things they've read to remind them, and encourage them to return to the story and earn more sprites. Sprites will be displayed in a pull dawn tray. Readers open the tray and see which sprites they've collected and what's missing.

- `image` the small (30x30px) image that represents the sprite [req]
- `name` name of the sprite. will appear on hovering over the sprite [req]
- `link` reference to an `aside`, `media`, or `chapter` entry. this is the bookmark function [req]
- `origin` where the sprite was earned [req]

Timeline
--------

`timeline` entries  will be used for timeline data for a `story` category. Timelines will use text field for each year in the story from 1977-1985.

`years` Matrix field. Divided into `year` blocks with `year` and `description` fields. The last entry of `years` should be a `today` field. Max: 10 blocks

Short-Codes
========================

Short codes will be used in entry bodies to generate content like animations, footnotes, etc.

Footnote
--------

Will generate a footnote. Probably refers to a `citation` entry.

TODO: define the syntaxt and functionality of this

side-notes
----------

This shortcode might refer to an `aside` entry that is (or is not) listed in the side notes.

TODO: define the syntaxt and functionality of this

Animations
--------

Replace the animation shortcode with the elements required by the scrollmagic animation js file referenced in the `javascript` field of the chapter

Pull quotes
--------

These shortcodes will indicate how to display a particular pull quote ie. left, right, center, etc. Could be used to drop an image into the page as well.

Craft Plugins
========================

Embeder
--------

https://github.com/A-P/Embedder

Shortcodes
--------

https://github.com/samhernandez/craftcms-shortcodes


[1]: https://buildwithcraft.com/
[2]: http://straightupcraft.com/
[3]: https://plus.google.com/communities/106505340287442511226